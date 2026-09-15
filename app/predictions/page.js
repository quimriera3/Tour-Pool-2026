"use client";

import { useEffect, useMemo, useState } from "react";
import { pointsForPick, riderById, riderEligibleForStage, ridersForStage, stageIsLocked, stageStartDate, TYPE_LABEL, countryFlag } from "../../lib/data";
import { useSession, savePick, getPicksFor, getResults } from "../../lib/store";
import StageTypeIcon from "../../components/StageTypeIcon";
import TeamRiderPicker from "../../components/TeamRiderPicker";
import Podium from "../../components/Podium";
import AutoSaveNotice from "../../components/AutoSaveNotice";
import AuthModal from "../../components/AuthModal";
import GameCountdown from "../../components/GameCountdown";
import QuickPickGrid from "../../components/QuickPickGrid";
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
          eyebrow: "Zona de juego",
          title: "Elige a tus campeones",
          subtitle: "Dos picks. Dos maillots arcoíris. Elige un corredor por prueba y cámbialo cuando quieras hasta una hora antes de la salida.",
          groupTitle: "Tus dos picks",
          groupSubtitle: "10 puntos si gana, 5 si acaba 2º y 2 si acaba 3º.",
          login: "Inicia sesión para que tus picks cuenten.",
        }
      : {
          eyebrow: "Game zone",
          title: "Pick your world champions",
          subtitle: "Two picks. Two rainbow jerseys. Choose one rider per event and change your mind until one hour before the start.",
          groupTitle: "Your two picks",
          groupSubtitle: "10 points for a winner, 5 for 2nd and 2 for 3rd.",
          login: "Log in so your picks count.",
        };
  }
  return {
    eyebrow: t(lang, "predictions.eyebrow"),
    title: t(lang, "predictions.title"),
    subtitle: t(lang, "predictions.subtitle"),
    groupTitle: lang === "es" ? "Etapas" : "Stages",
    groupSubtitle: t(lang, "scoring.stage"),
    login: lang === "es" ? "Inicia sesión para guardar tus picks." : "Log in to save your picks.",
  };
}

function StageCard({ race, stage, pick, onPick, result, lang, base, saveState }) {
  const locked = stageIsLocked(stage, undefined, race);
  const pts = result ? pointsForPick(pick, result) : null;
  const pickedRider = pick ? riderById(pick, race) : null;
  const label = stage.eventName ? localised(stage.eventName, lang) : `${lang === "es" ? "Etapa" : "Stage"} ${stage.n}`;
  const eligibleCount = ridersForStage(stage, race).length;
  const podiumItems = result
    ? [result.first, result.second, result.third].map((id) => ({ label: riderById(id, race)?.name || id }))
    : null;

  return (
    <article className={"stage-card prediction-card game-pick-card" + (locked && !result ? " locked" : "") + (pick ? " has-selection" : "")}>
      <div className="game-card-topline">
        <span className="game-event-index">{String(stage.n).padStart(2, "0")}</span>
        <span className={"stage-type type-" + stage.type}>
          <StageTypeIcon type={stage.type} size={13} /> {TYPE_LABEL[stage.type]}
        </span>
        {!result && <GameCountdown stage={stage} race={race} lang={lang} compact />}
        {result && <span className="game-result-badge">{lang === "es" ? "Resultado" : "Result"}</span>}
      </div>

      <h2 className="prediction-event-title">{label}</h2>
      <div className="game-event-route">{stage.from}{stage.to !== stage.from ? " → " + stage.to : ""}</div>
      <div className="game-stat-row">
        <span><small>{lang === "es" ? "Distancia" : "Distance"}</small><strong>{stage.km} km</strong></span>
        <span><small>{lang === "es" ? "Desnivel" : "Climbing"}</small><strong>{stage.elevationGain ? `${stage.elevationGain.toLocaleString()} m` : "—"}</strong></span>
        <span><small>{lang === "es" ? "Lista" : "Startlist"}</small><strong>{eligibleCount || "—"}</strong></span>
      </div>

      {pickedRider && !result && (
        <div className="current-pick-hero">
          <span className="current-pick-flag" aria-hidden="true">{countryFlag(pickedRider.team)}</span>
          <span><small>{lang === "es" ? "Tu pick actual" : "Your current pick"}</small><strong>{pickedRider.name}</strong></span>
          <b>✓</b>
        </div>
      )}

      {!result ? (
        <>
          <QuickPickGrid
            race={race}
            stage={stage}
            value={pick}
            onPick={(riderId) => onPick(stage.n, riderId)}
            disabled={locked}
            lang={lang}
          />
          <TeamRiderPicker
            race={race}
            value={pick}
            onChange={(riderId) => onPick(stage.n, riderId)}
            disabled={locked}
            stageType={stage.type}
            riderFilter={(rider) => riderEligibleForStage(rider, stage)}
            selectedRiderName={pickedRider ? pickedRider.name + " — " + pickedRider.team : ""}
            label={lang === "es" ? "O busca en la lista completa" : "Or search the full startlist"}
          />
          <div className="pick-status-row" aria-live="polite">
            {!locked && <span>{lang === "es" ? "Cierra" : "Closes"}: {formatLock(stage, race, lang)}</span>}
            {locked && <span>{lang === "es" ? "Predicción cerrada" : "Pick locked"}</span>}
            {saveState === "saving" && <strong>{lang === "es" ? "Guardando…" : "Saving…"}</strong>}
            {saveState === "saved" && <strong className="save-ok">{lang === "es" ? "Guardado ✓" : "Saved ✓"}</strong>}
            {saveState === "error" && <strong className="save-error">{lang === "es" ? "No se ha guardado · inténtalo otra vez" : "Not saved · try again"}</strong>}
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

      <a href={base + "/stage/" + stage.n} className="game-details-link">
        {t(lang, "predictions.seeDetails")} <span aria-hidden="true">→</span>
      </a>
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
    <div className="game-zone-page">
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={() => setShowAuth(false)} />}
      <div className="page-header predictions-header game-page-header">
        <span className="eyebrow">{copy.eyebrow}</span>
        <h1>{copy.title}</h1>
        <p className="subtitle">{copy.subtitle}</p>
        <div className="game-header-strip">
          <span><b>10</b><em>{lang === "es" ? "puntos" : "points"}</em><small>{lang === "es" ? "ganador" : "winner"}</small></span>
          <span><b>5</b><em>{lang === "es" ? "puntos" : "points"}</em><small>{lang === "es" ? "2º" : "2nd"}</small></span>
          <span><b>2</b><em>{lang === "es" ? "puntos" : "points"}</em><small>{lang === "es" ? "3º" : "3rd"}</small></span>
          <span className="game-header-prize">{lang === "es" ? "Premios TOP 3" : "TOP 3 prizes"}</span>
        </div>
        {session ? (
          <div className="pick-progress game-progress" aria-label={`${completed} of ${race.stages.length} picks completed`}>
            <span>{lang === "es" ? "Tu partida" : "Your game"}</span>
            <strong>{completed}/{race.stages.length} {lang === "es" ? "picks listos" : "picks ready"}</strong>
            <div><i style={{ width: `${race.stages.length ? (completed / race.stages.length) * 100 : 0}%` }} /></div>
          </div>
        ) : (
          <button type="button" className="login-game-banner" onClick={() => setShowAuth(true)}>{copy.login} <strong>{lang === "es" ? "Entrar →" : "Log in →"}</strong></button>
        )}
      </div>

      <AutoSaveNotice lang={lang} />

      {!ready ? (
        <div className="grid grid-2 predictions-grid" style={{ marginTop: 18 }}>
          {race.stages.map((s) => <div key={s.n} className="card skeleton-card" aria-hidden="true" />)}
        </div>
      ) : groups.map((group, i) => (
        <section key={group.key || i} className="prediction-group">
          <div className="week-header game-week-header">
            <div><span className="mini-eyebrow">{isChampionship(race) ? (lang === "es" ? "2 decisiones · 1 clasificación" : "2 decisions · 1 leaderboard") : ""}</span><h2>{isChampionship(race) ? copy.groupTitle : (lang === "es" ? `Semana ${i + 1}` : `Week ${i + 1}`)}</h2></div>
            <p>{copy.groupSubtitle}</p>
          </div>
          <div className={"grid " + (group.stages.length <= 2 ? "grid-2" : "grid-3") + " predictions-grid game-picks-grid"}>
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
