"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { riderById, riderEligibleForStage, pointsForPick, stageIsLocked, stageStartDate, TYPE_LABEL } from "../../../lib/data";
import { useSession, savePick, getPicksFor, getResults } from "../../../lib/store";
import CourseExplorer from "../../../components/CourseExplorer";
import StageProfile from "../../../components/StageProfile";
import StageTypeIcon from "../../../components/StageTypeIcon";
import TeamRiderPicker from "../../../components/TeamRiderPicker";
import Podium from "../../../components/Podium";
import StageFavourites from "../../../components/StageFavourites";
import AuthModal from "../../../components/AuthModal";
import GameCountdown from "../../../components/GameCountdown";
import QuickPickGrid from "../../../components/QuickPickGrid";
import { useLang } from "../../../lib/i18n";
import { useRace, useRaceBase } from "../../../lib/useRace";
import { isChampionship, localised } from "../../../lib/races";

function lockLabel(stage, race, lang) {
  const d = new Date(stageStartDate(stage, race).getTime() - 60 * 60 * 1000);
  return new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", {
    weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false,
    ...(race.timeZone ? { timeZone: race.timeZone } : {}),
  }).format(d) + (race.timeZone ? " · Montréal" : "");
}

export default function StageDetail() {
  const lang = useLang();
  const race = useRace();
  const base = useRaceBase();
  const params = useParams();
  const n = parseInt(params.n, 10);
  const stage = race.stages.find((s) => s.n === n);
  const session = useSession();
  const [pick, setPick] = useState(null);
  const [result, setResult] = useState(null);
  const [mounted, setMounted] = useState(false);
  const [saveState, setSaveState] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [pendingPick, setPendingPick] = useState(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let active = true;
    Promise.all([
      session ? getPicksFor(session.id, race.slug) : Promise.resolve({}),
      getResults(race.slug),
    ]).then(([picks, results]) => {
      if (!active) return;
      setPick(picks[n] || null);
      setResult(results[n] || null);
    });
    return () => { active = false; };
  }, [session, n, race.slug]);

  async function handlePick(riderId) {
    if (!session) { setPendingPick(riderId); setShowAuth(true); return; }
    const previous = pick;
    setPick(riderId);
    setSaveState("saving");
    const response = await savePick(session.id, stage.n, riderId, race.slug);
    if (response?.ok) {
      setSaveState("saved");
      window.setTimeout(() => setSaveState(null), 1800);
    } else {
      setPick(previous);
      setSaveState("error");
    }
  }

  useEffect(() => {
    if (!session || !pendingPick) return;
    const queued = pendingPick;
    setPendingPick(null);
    handlePick(queued);
  }, [session, pendingPick]);

  if (!stage) {
    return (
      <div className="page-header">
        <h1>{lang === "es" ? "Prueba no encontrada" : "Event not found"}</h1>
        <p className="subtitle">{lang === "es" ? "Esta prueba no existe en esta competición." : "This event does not exist in this competition."}</p>
        <a href={base + "/predictions"} className="btn">{lang === "es" ? "Volver a los picks" : "Back to picks"}</a>
      </div>
    );
  }

  const locked = mounted ? stageIsLocked(stage, undefined, race) : true;
  const pts = result ? pointsForPick(pick, result) : null;
  const pickedRider = pick ? riderById(pick, race) : null;
  const idx = race.stages.findIndex((s) => s.n === n);
  const prevStage = idx > 0 ? race.stages[idx - 1] : null;
  const nextStage = idx >= 0 && idx < race.stages.length - 1 ? race.stages[idx + 1] : null;
  const label = stage.eventName ? localised(stage.eventName, lang) : `${lang === "es" ? "Etapa" : "Stage"} ${stage.n}`;
  const podiumItems = result ? [result.first, result.second, result.third].map((id) => ({ label: riderById(id, race)?.name || id })) : null;

  const navBlock = isChampionship(race) ? (
    <div className="stage-nav stage-nav-game">
      <a href={base + "/predictions"} className="stage-nav-link stage-nav-back">← {lang === "es" ? "Todos los picks" : "All picks"}</a>
      <div className="stage-nav-event-links">
        {prevStage && <a href={base + "/stage/" + prevStage.n} className="stage-nav-link">← {prevStage.type === "itt" ? "ITT" : (lang === "es" ? "Ruta" : "Road race")}</a>}
        {nextStage && <a href={base + "/stage/" + nextStage.n} className="stage-nav-link stage-nav-next">{nextStage.type === "itt" ? "ITT" : (lang === "es" ? "Ruta" : "Road race")} →</a>}
      </div>
    </div>
  ) : (
    <div className="stage-nav">
      {prevStage ? <a href={base + "/stage/" + prevStage.n} className="stage-nav-link">← {prevStage.eventName ? localised(prevStage.eventName, lang) : `${lang === "es" ? "Etapa" : "Stage"} ${prevStage.n}`}</a> : <span className="stage-nav-link disabled">←</span>}
      <a href={base + "/predictions"} className="stage-nav-link center">{lang === "es" ? "Todas las etapas" : "All stages"}</a>
      {nextStage ? <a href={base + "/stage/" + nextStage.n} className="stage-nav-link">{nextStage.eventName ? localised(nextStage.eventName, lang) : `${lang === "es" ? "Etapa" : "Stage"} ${nextStage.n}`} →</a> : <span className="stage-nav-link disabled">→</span>}
    </div>
  );

  return (
    <article>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={() => setShowAuth(false)} />}
      {navBlock}

      <div className="page-header event-detail-header">
        <span className="eyebrow">{isChampionship(race) ? (lang === "es" ? "Mundial 2026" : "World Championships 2026") : `${lang === "es" ? "Etapa" : "Stage"} ${stage.n} / ${race.stages.length}`} · {stage.date.split("-").reverse().join("/")}</span>
        <h1>{label}</h1>
        <p className="subtitle event-detail-meta">
          <span className={"stage-type type-" + stage.type}><StageTypeIcon type={stage.type} size={13} /> {TYPE_LABEL[stage.type]}</span>
          <span>{stage.km} km</span>
          {stage.elevationGain ? <span>↗ {stage.elevationGain.toLocaleString()} m</span> : null}
          <span>{stage.from}{stage.to !== stage.from ? " → " + stage.to : ""}</span>
        </p>
        {!result && <div className="event-detail-countdown"><GameCountdown stage={stage} race={race} lang={lang} /></div>}
      </div>

      <section id="make-pick" className="card pick-card event-pick-first" style={{ marginTop: 12 }} aria-labelledby={"stage-pick-" + n}>
        <div className="event-pick-first-head">
          <div>
            <span className="mini-eyebrow">{lang === "es" ? "JUEGA PRIMERO" : "PLAY FIRST"}</span>
            <h2 id={"stage-pick-" + n}>{lang === "es" ? "Tu predicción" : "Your pick"}</h2>
          </div>
          <p className="scoring-note">10 {lang === "es" ? "puntos" : "points"} · 5 {lang === "es" ? "puntos" : "points"} · 2 {lang === "es" ? "puntos" : "points"}</p>
        </div>

        {!result ? (
          <>
            <QuickPickGrid race={race} stage={stage} value={pick} onPick={handlePick} disabled={locked} lang={lang} />
            <TeamRiderPicker
              race={race}
              value={pick}
              onChange={handlePick}
              disabled={locked}
              stageType={stage.type}
              riderFilter={(rider) => riderEligibleForStage(rider, stage)}
              selectedRiderName={pickedRider ? pickedRider.name + " — " + pickedRider.team : ""}
              label={lang === "es" ? "O busca en la lista completa" : "Or search the full startlist"}
            />
            <div className="pick-status-row" aria-live="polite">
              {!locked && <span>{lang === "es" ? "Cierra" : "Closes"}: {lockLabel(stage, race, lang)}</span>}
              {locked && <span>{lang === "es" ? "Predicción cerrada" : "Pick locked"}</span>}
              {saveState === "saving" && <strong>{lang === "es" ? "Guardando…" : "Saving…"}</strong>}
              {saveState === "saved" && <strong className="save-ok">{lang === "es" ? "Guardado ✓" : "Saved ✓"}</strong>}
              {saveState === "error" && <strong className="save-error">{lang === "es" ? "No se ha guardado" : "Not saved"}</strong>}
            </div>
          </>
        ) : (
          <>
            <Podium items={podiumItems} />
            <p className="stage-meta result-pick-line">{lang === "es" ? "Tu pick:" : "Your pick:"} {pick ? riderById(pick, race)?.name : "—"}</p>
            <div className="result-points"><span className={"points-pill points-" + pts}>{pts} pts</span></div>
          </>
        )}
      </section>

      {isChampionship(race) ? (
        <div id="course">
          <CourseExplorer stage={stage} race={race} lang={lang} />
        </div>
      ) : (
        <section className="card" aria-labelledby={"course-character-" + n}>
          <div className="section-title-row">
            <h2 id={"course-character-" + n}>{lang === "es" ? "Carácter del recorrido" : "Course character"}</h2>
            <span className="data-note">{lang === "es" ? "visual orientativo" : "illustrative visual"}</span>
          </div>
          <StageProfile type={stage.type} elevationGain={stage.elevationGain} />
        </section>
      )}

      <section className="card" style={{ marginTop: 16 }} aria-labelledby={"stage-preview-" + n}>
        <h2 id={"stage-preview-" + n}>{lang === "es" ? "Previa" : "Preview"}</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>{lang === "es" && stage.previewEs ? stage.previewEs : stage.preview}</p>
      </section>

      <StageFavourites stage={stage} lang={lang} race={race} />

      <div style={{ marginTop: 16 }}>{navBlock}</div>
    </article>
  );
}
