"use client";

import { useEffect, useMemo, useState } from "react";
import { riderById, pointsForPick, stageIsLocked, stageStartDate, TYPE_LABEL } from "../../lib/data";
import { useSession, savePick, getPicksFor, getResults } from "../../lib/store";
import StageTypeIcon from "../../components/StageTypeIcon";
import TeamRiderPicker from "../../components/TeamRiderPicker";
import Podium from "../../components/Podium";
import AutoSaveNotice from "../../components/AutoSaveNotice";
import AuthModal from "../../components/AuthModal";
import { useLang, t } from "../../lib/i18n";
import { useRace, useRaceBase } from "../../lib/useRace";
import { isChampionship, localised } from "../../lib/races";

function formatLock(stage, race, lang) {
  const lock = new Date(stageStartDate(stage, race).getTime() - 60 * 60 * 1000);
  const locale = lang === "es" ? "es-ES" : "en-GB";
  const opts = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    ...(race.timeZone ? { timeZone: race.timeZone } : {}),
  };
  return new Intl.DateTimeFormat(locale, opts).format(lock) + (race.timeZone ? " · Montréal" : "");
}

function copyFor(race, lang) {
  if (isChampionship(race)) {
    return lang === "es"
      ? {
          eyebrow: "Tus pronósticos",
          title: "Elige a los campeones del mundo",
          subtitle: "Haz una predicción para cada prueba. Puedes cambiarla tantas veces como quieras hasta una hora antes de la salida.",
          groupTitle: "Pruebas élite",
          groupSubtitle: "Cada prueba puntúa por separado: 10 puntos al ganador, 5 al segundo y 2 al tercero.",
        }
      : {
          eyebrow: "Your picks",
          title: "Pick the world champions",
          subtitle: "Make one prediction for each event. Change it as often as you like until one hour before the official start.",
          groupTitle: "Elite events",
          groupSubtitle: "Each event scores separately: 10 points for the winner, 5 for second and 2 for third.",
        };
  }
  return {
    eyebrow: t(lang, "predictions.eyebrow"),
    title: t(lang, "predictions.title"),
    subtitle: t(lang, "predictions.subtitle"),
    groupTitle: lang === "es" ? "Etapas" : "Stages",
    groupSubtitle: t(lang, "scoring.stage"),
  };
}

function StageCard({ race, stage, pick, onPick, result, lang, base, saveState }) {
  const locked = stageIsLocked(stage, undefined, race);
  const pts = result ? pointsForPick(pick, result) : null;
  const pickedRider = pick ? riderById(pick, race) : null;
  const label = stage.eventName ? localised(stage.eventName, lang) : `${lang === "es" ? "Etapa" : "Stage"} ${stage.n}`;
  const podiumItems = result
    ? [result.first, result.second, result.third].map((id) => ({ label: riderById(id, race)?.name || id }))
    : null;

  return (
    <article className={"stage-card prediction-card" + (locked && !result ? " locked" : "")}>
      <div className="stage-top">
        <span className="bib">{stage.n}</span>
        <span className={"stage-type type-" + stage.type}>
          <StageTypeIcon type={stage.type} size={13} /> {TYPE_LABEL[stage.type]}
        </span>
      </div>
      <h2 className="prediction-event-title">{label}</h2>
      <div className="stage-route">{stage.from}{stage.to !== stage.from ? " → " + stage.to : ""}</div>
      <div className="stage-meta">
        {stage.date.split("-").reverse().join("/")} · {stage.km} km
        {stage.elevationGain ? " · ↗ " + stage.elevationGain.toLocaleString() + " m" : ""}
      </div>

      <a href={base + "/stage/" + stage.n} className="text-link">
        {t(lang, "predictions.seeDetails")} →
      </a>

      {!result ? (
        <>
          <TeamRiderPicker
            race={race}
            value={pick}
            onChange={(riderId) => onPick(stage.n, riderId)}
            disabled={locked}
            stageType={stage.type}
            selectedRiderName={pickedRider ? pickedRider.name + " — " + pickedRider.team : ""}
          />
          <div className="pick-status-row" aria-live="polite">
            {!locked && <span>{lang === "es" ? "Cierra" : "Closes"}: {formatLock(stage, race, lang)}</span>}
            {locked && <span>{lang === "es" ? "Predicción cerrada" : "Pick locked"}</span>}
            {saveState === "saving" && <strong>{lang === "es" ? "Guardando…" : "Saving…"}</strong>}
            {saveState === "saved" && <strong className="save-ok">{lang === "es" ? "Guardado ✓" : "Saved ✓"}</strong>}
            {saveState === "error" && <strong className="save-error">{lang === "es" ? "No se ha guardado" : "Not saved"}</strong>}
          </div>
        </>
      ) : (
        <>
          <Podium items={podiumItems} />
          <p className="stage-meta result-pick-line">
            {lang === "es" ? "Tu pick:" : "Your pick:"} {pick ? riderById(pick, race)?.name : "—"}
          </p>
          <div className="result-points"><span className={"points-pill points-" + pts}>{pts} pts</span></div>
        </>
      )}
    </article>
  );
}

export default function Predictions() {
  const lang = useLang();
  const race = useRace();
  const base = useRaceBase();
  const session = useSession();
  const [picks, setPicks] = useState({});
  const [results, setResults] = useState({});
  const [saveStates, setSaveStates] = useState({});
  const [ready, setReady] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const copy = copyFor(race, lang);

  const groups = useMemo(() => {
    const defined = (race.weeks || []).map((w) => ({
      key: w.key,
      stages: (w.stages || []).map((n) => race.stages.find((s) => s.n === n)).filter(Boolean),
    })).filter((w) => w.stages.length);
    return defined.length ? defined : [{ key: "all", stages: race.stages }];
  }, [race]);

  useEffect(() => {
    let active = true;
    setReady(false);
    Promise.all([
      session ? getPicksFor(session.id, race.slug) : Promise.resolve({}),
      getResults(race.slug),
    ]).then(([userPicks, raceResults]) => {
      if (!active) return;
      setPicks(userPicks);
      setResults(raceResults);
      setReady(true);
    });
    return () => { active = false; };
  }, [session, race.slug]);

  async function handlePick(stageN, riderId) {
    if (!session) {
      setShowAuth(true);
      return;
    }
    const previous = picks[stageN] || null;
    setPicks((prev) => ({ ...prev, [stageN]: riderId }));
    setSaveStates((prev) => ({ ...prev, [stageN]: "saving" }));
    const response = await savePick(session.id, stageN, riderId, race.slug);
    if (response?.ok) {
      setSaveStates((prev) => ({ ...prev, [stageN]: "saved" }));
      window.setTimeout(() => setSaveStates((prev) => ({ ...prev, [stageN]: null })), 1800);
    } else {
      setPicks((prev) => ({ ...prev, [stageN]: previous }));
      setSaveStates((prev) => ({ ...prev, [stageN]: "error" }));
    }
  }

  const completed = race.stages.filter((s) => picks[s.n]).length;

  return (
    <div>
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={() => setShowAuth(false)} />}
      <div className="page-header predictions-header">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p className="subtitle">{copy.subtitle}</p>
        {session && (
          <div className="pick-progress" aria-label={`${completed} of ${race.stages.length} picks completed`}>
            <span>{lang === "es" ? "Tus picks" : "Your picks"}</span>
            <strong>{completed}/{race.stages.length}</strong>
            <div><i style={{ width: `${race.stages.length ? (completed / race.stages.length) * 100 : 0}%` }} /></div>
          </div>
        )}
      </div>

      <AutoSaveNotice lang={lang} />

      {!ready ? (
        <div className="grid grid-2 predictions-grid" style={{ marginTop: 18 }}>
          {race.stages.map((s) => <div key={s.n} className="card skeleton-card" aria-hidden="true" />)}
        </div>
      ) : groups.map((group, i) => (
        <section key={group.key || i} className="prediction-group">
          <div className="week-header">
            <h2>{isChampionship(race) ? copy.groupTitle : (lang === "es" ? `Semana ${i + 1}` : `Week ${i + 1}`)}</h2>
            <p>{copy.groupSubtitle}</p>
          </div>
          <div className={"grid " + (group.stages.length <= 2 ? "grid-2" : "grid-3") + " predictions-grid"}>
            {group.stages.map((stage) => (
              <StageCard
                key={stage.n}
                race={race}
                stage={stage}
                pick={picks[stage.n]}
                onPick={handlePick}
                result={results[stage.n]}
                lang={lang}
                base={base}
                saveState={saveStates[stage.n]}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
