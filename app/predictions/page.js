"use client";
// app/predictions/page.js
import { useEffect, useState } from "react";
import { STAGES, WEEKS, riderById, pointsForPick, stageIsLocked, stageStartDate, TYPE_LABEL } from "../../lib/data";
import { useSession, savePick, getPicksFor, getResults } from "../../lib/store";
import StageProfile from "../../components/StageProfile";
import StageTypeIcon from "../../components/StageTypeIcon";
import TeamRiderPicker from "../../components/TeamRiderPicker";
import Podium from "../../components/Podium";
import { useLang, t } from "../../lib/i18n";

const WEEK_KEYS = ["week.1", "week.2", "week.3"];

const EN_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const EN_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const ES_DAYS = ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"];
const ES_MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

function lockTimeLabel(stage, lang) {
  const start = stageStartDate(stage);
  const lock = new Date(start.getTime() - 60 * 60 * 1000);
  const time = lock.toTimeString().slice(0, 5);
  // Always show the date too, explicitly -- the lock is the same calendar
  // day as the stage itself, but spelling it out avoids any ambiguity.
  if (lang === "es") {
    return ES_DAYS[lock.getDay()] + " " + lock.getDate() + " " + ES_MONTHS[lock.getMonth()] + ", " + time;
  }
  return EN_DAYS[lock.getDay()] + " " + lock.getDate() + " " + EN_MONTHS[lock.getMonth()] + ", " + time;
}

function StageCard({ stage, pick, onPick, result, lang, stagePrefix }) {
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
        href={stagePrefix + "/stage/" + stage.n}
        style={{ fontSize: 12, fontWeight: 700, color: "var(--red)" }}
      >
        {t(lang, "predictions.seeDetails")} ↗
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
              {t(lang, "predictions.closesAt")} {lockTimeLabel(stage, lang)}
            </p>
          )}
          {locked && (
            <p className="stage-meta" style={{ marginTop: 6 }}>
              {t(lang, "predictions.locked")}
            </p>
          )}
        </>
      )}

      {result && (
        <>
          <Podium items={podiumItems} />
          <p className="stage-meta" style={{ marginTop: 8, textAlign: "center" }}>
            {t(lang, "stage.yourPick")} {pick ? riderById(pick)?.name : "— " + t(lang, "stage.none") + " —"}
          </p>
          <div style={{ textAlign: "center" }}>
            <span className={"points-pill points-" + pts}>{pts} {t(lang, "stage.points")}</span>
          </div>
        </>
      )}
    </div>
  );
}

export default function Predictions() {
  const lang = useLang();
  const stagePrefix = lang === "es" ? "/es" : "";
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
      alert(lang === "es" ? "Necesitas registrarte o iniciar sesión para hacer predicciones." : "You need to sign up or log in to make predictions.");
      return;
    }
    setPicks((prev) => ({ ...prev, [stageN]: riderId }));
    await savePick(session.id, stageN, riderId);
  }

  if (!ready) return null;

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{t(lang, "predictions.eyebrow")}</span>
        <h1>{t(lang, "predictions.title")}</h1>
        <p className="subtitle">{t(lang, "predictions.subtitle")}</p>
        <p className="scoring-note">{t(lang, "scoring.stage")}</p>
      </div>

      {WEEKS.map((week, i) => (
        <div key={week.title}>
          <div className="week-header">
            <h2>{t(lang, WEEK_KEYS[i] + ".title")}</h2>
            <p>{t(lang, WEEK_KEYS[i] + ".subtitle")}</p>
          </div>
          <div className="grid grid-3">
            {STAGES.filter((s) => s.n >= week.from && s.n <= week.to).map((stage) => (
              <StageCard
                key={stage.n}
                stage={stage}
                pick={picks[stage.n]}
                onPick={handlePick}
                result={results[stage.n]}
                lang={lang}
                stagePrefix={stagePrefix}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
