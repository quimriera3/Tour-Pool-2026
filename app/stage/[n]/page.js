"use client";
// app/stage/[n]/page.js
//
// Detailed view for a single stage. Reuses the exact same data store
// (lib/store.js) as the main /predictions page, so a pick made here or
// there is always the same pick -- there's only one source of truth
// (Supabase), not two states to keep in sync.
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { STAGES, riderById, pointsForPick, stageIsLocked, stageStartDate, TYPE_LABEL } from "../../../lib/data";
import { useSession, savePick, getPicksFor, getResults } from "../../../lib/store";
import StageProfile from "../../../components/StageProfile";
import StageTypeIcon from "../../../components/StageTypeIcon";
import TeamRiderPicker from "../../../components/TeamRiderPicker";
import Podium from "../../../components/Podium";

function lockTimeLabel(stage) {
  const start = stageStartDate(stage);
  const lock = new Date(start.getTime() - 60 * 60 * 1000);
  return lock.toTimeString().slice(0, 5);
}

export default function StageDetail() {
  const params = useParams();
  const n = parseInt(params.n, 10);
  const stage = STAGES.find((s) => s.n === n);

  const session = useSession();
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState(null);
  const [ready, setReady] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let active = true;
    async function load() {
      const [userPicks, allResults] = await Promise.all([
        session ? getPicksFor(session.id) : Promise.resolve({}),
        getResults(),
      ]);
      if (!active) return;
      setPick(userPicks[n] || null);
      setResult(allResults[n] || null);
      setReady(true);
    }
    load();
    return () => {
      active = false;
    };
  }, [session, n]);

  if (!stage) {
    return (
      <div className="page-header">
        <h1>Stage not found</h1>
        <p className="subtitle">There&apos;s no stage number {params.n}. There are 21 stages in total.</p>
        <a href="/predictions" className="btn" style={{ marginTop: 14, display: "inline-block" }}>
          Back to all stages
        </a>
      </div>
    );
  }

  async function handlePick(stageN, riderId) {
    if (!session) {
      alert("You need to sign up or log in to make predictions.");
      return;
    }
    setPick(riderId);
    await savePick(session.id, stageN, riderId);
  }

  const locked = mounted ? stageIsLocked(stage) : true;
  const pts = result ? pointsForPick(pick, result) : null;
  const pickedRider = pick ? riderById(pick) : null;
  const prevStage = STAGES.find((s) => s.n === n - 1);
  const nextStage = STAGES.find((s) => s.n === n + 1);

  const podiumItems = result
    ? [
        { label: riderById(result.first)?.name || result.first },
        { label: riderById(result.second)?.name || result.second },
        { label: riderById(result.third)?.name || result.third },
      ]
    : null;

  return (
    <div>
      {/* Quick prev/next navigation between the 21 stages */}
      <div className="stage-nav">
        {prevStage ? (
          <a href={"/stage/" + prevStage.n} className="stage-nav-link">
            ← Stage {prevStage.n}
          </a>
        ) : (
          <span className="stage-nav-link disabled">← Stage {n}</span>
        )}
        <a href="/predictions" className="stage-nav-link center">
          All 21 stages
        </a>
        {nextStage ? (
          <a href={"/stage/" + nextStage.n} className="stage-nav-link">
            Stage {nextStage.n} →
          </a>
        ) : (
          <span className="stage-nav-link disabled">Stage {n} →</span>
        )}
      </div>

      <div className="page-header">
        <span className="eyebrow">Stage {stage.n} of 21 · {stage.date.split("-").reverse().join("/")}</span>
        <h1>{stage.from} → {stage.to}</h1>
        <p className="subtitle" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className={"stage-type type-" + stage.type} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <StageTypeIcon type={stage.type} size={13} />
            {TYPE_LABEL[stage.type]}
          </span>
          · {stage.km} km · ↗ {stage.elevationGain} m of climbing
          {stage.profileScore && <> · Difficulty score: {stage.profileScore}</>}
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 15 }}>Make your pick</h3>

        {!result && (
          <>
            <TeamRiderPicker
              value={pick}
              onChange={(riderId) => handlePick(stage.n, riderId)}
              disabled={locked}
              stageType={stage.type}
              selectedRiderName={pickedRider ? pickedRider.name + " — " + pickedRider.team : ""}
            />
            {!locked && (
              <p className="stage-meta" style={{ marginTop: 8 }}>
                Predictions close at {lockTimeLabel(stage)}
              </p>
            )}
            {locked && <p className="stage-meta" style={{ marginTop: 8 }}>This stage is locked.</p>}
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

      {/* Real, original stage preview text -- good for SEO, not a placeholder */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 15 }}>Stage preview</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>{stage.preview}</p>
      </div>

      {/* Elevation profile -- this part is real, not a placeholder */}
      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 15 }}>Elevation profile</h3>
        <StageProfile type={stage.type} elevationGain={stage.elevationGain} />
        <a
          href={stage.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: 10, fontSize: 12, fontWeight: 700, color: "var(--red)" }}
        >
          More detailed stage info ↗
        </a>
      </div>

      <div className="stage-nav" style={{ marginTop: 16 }}>
        {prevStage ? (
          <a href={"/stage/" + prevStage.n} className="stage-nav-link">
            ← Stage {prevStage.n}
          </a>
        ) : (
          <span className="stage-nav-link disabled">← Stage {n}</span>
        )}
        <a href="/predictions" className="stage-nav-link center">
          All 21 stages
        </a>
        {nextStage ? (
          <a href={"/stage/" + nextStage.n} className="stage-nav-link">
            Stage {nextStage.n} →
          </a>
        ) : (
          <span className="stage-nav-link disabled">Stage {n} →</span>
        )}
      </div>
    </div>
  );
}
