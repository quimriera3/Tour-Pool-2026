"use client";
// app/predictions/page.js
import { useEffect, useState } from "react";
import { STAGES, WEEKS, riderById, pointsForPick, stageIsLocked, stageStartDate, TYPE_LABEL } from "../../lib/data";
import { useSession, savePick, getPicksFor, getResults } from "../../lib/store";
import StageProfile from "../../components/StageProfile";
import StageTypeIcon from "../../components/StageTypeIcon";
import TeamRiderPicker from "../../components/TeamRiderPicker";
import Podium from "../../components/Podium";

function lockTimeLabel(stage) {
  const start = stageStartDate(stage);
  const lock = new Date(start.getTime() - 60 * 60 * 1000);
  return lock.toTimeString().slice(0, 5);
}

function StageCard({ stage, pick, onPick, result }) {
  const locked = stageIsLocked(stage);
  const pts = result ? pointsForPick(pick, result) : null;
  const pickedRider = pick ? riderById(pick) : null;

  const podiumItems = result
    ? [
        { label: riderById(result.first)?.name || result.first },
        { label: riderById(result.second)?.name || result.second },
        { label: riderById(result.third)?.name || result.third },
      ]
    : null;

  return (
    <div id={"stage-" + stage.n} className={"stage-card" + (locked && !result ? " locked" : "")}>
      {locked && !result && <span className="locked-stamp">Locked</span>}
      <div className="stage-top">
        <span className="bib">{stage.n}</span>
        <span className={"stage-type type-" + stage.type} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
          <StageTypeIcon type={stage.type} size={13} />
          {TYPE_LABEL[stage.type]}
        </span>
      </div>
      <div className="stage-route" style={{ marginTop: 8 }}>
        {stage.from} → {stage.to}
      </div>
      <div className="stage-meta">
        {stage.date.split("-").reverse().join("/")} · {stage.km} km · ↗ {stage.elevationGain} m
      </div>

      <StageProfile type={stage.type} elevationGain={stage.elevationGain} />

      <a
        href={"/stage/" + stage.n}
        style={{ fontSize: 12, fontWeight: 700, color: "var(--red)" }}
      >
        See full stage details ↗
      </a>

      {!result && (
        <>
          <TeamRiderPicker
            value={pick}
            onChange={(riderId) => onPick(stage.n, riderId)}
            disabled={locked}
            stageType={stage.type}
            selectedRiderName={pickedRider ? pickedRider.name + " — " + pickedRider.team : ""}
          />
          {!locked && (
            <p className="stage-meta" style={{ marginTop: 6 }}>
              Predictions close at {lockTimeLabel(stage)}
            </p>
          )}
        </>
      )}

      {result && (
        <>
          <Podium items={podiumItems} />
          <p className="stage-meta" style={{ marginTop: 8, textAlign: "center" }}>
            Your pick: {pick ? riderById(pick)?.name : "— none —"}
          </p>
          <div style={{ textAlign: "center" }}>
            <span className={"points-pill points-" + pts}>{pts} points</span>
          </div>
        </>
      )}
    </div>
  );
}

export default function Predictions() {
  const session = useSession();
  const [picks, setPicks] = useState({});
  const [results, setResults] = useState({});
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    async function load() {
      const [userPicks, allResults] = await Promise.all([
        session ? getPicksFor(session.id) : Promise.resolve({}),
        getResults(),
      ]);
      if (!active) return;
      setPicks(userPicks);
      setResults(allResults);
      setReady(true);
    }
    load();
    return () => {
      active = false;
    };
  }, [session]);

  async function handlePick(stageN, riderId) {
    if (!session) {
      alert("You need to sign up or log in to make predictions.");
      return;
    }
    setPicks((prev) => ({ ...prev, [stageN]: riderId }));
    await savePick(session.id, stageN, riderId);
  }

  if (!ready) return null;

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">21 stages</span>
        <h1>Stage Predictions</h1>
        <p className="subtitle">
          Pick who you think will win each stage. Riders are listed from most to least favourite
          based on the stage profile. You can change your pick until the stage starts.
        </p>
      </div>

      {WEEKS.map((week) => (
        <div key={week.title}>
          <div className="week-header">
            <h2>{week.title}</h2>
            <p>{week.subtitle}</p>
          </div>
          <div className="grid grid-3">
            {STAGES.filter((s) => s.n >= week.from && s.n <= week.to).map((stage) => (
              <StageCard
                key={stage.n}
                stage={stage}
                pick={picks[stage.n]}
                onPick={handlePick}
                result={results[stage.n]}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
