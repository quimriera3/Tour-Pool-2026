"use client";

import { useEffect, useMemo, useState } from "react";
import { countryFlag, favoritesForStage, nextStage, previousStage, riderById, stageIsLocked } from "../lib/data";
import { computeLeaderboard, getResults, getPicksFor, useSession } from "../lib/store";
import Podium from "../components/Podium";
import AuthModal from "../components/AuthModal";
import PreviewArticleContent from "../components/PreviewArticleContent";
import StructuredData from "../components/StructuredData";
import EventList from "../components/EventList";
import GameCountdown from "../components/GameCountdown";
import { isChampionship, localised } from "../lib/races";
import { useRace, useRaceBase } from "../lib/useRace";
import { useLang } from "../lib/i18n";

function raceIntro(race, lang) {
  if (race.slug === "worlds-2026-women") {
    return lang === "es"
      ? { eyebrow: "Montreal · 20–26 septiembre 2026", titleLines: ["MUNDIAL", "FEMENINO"], body: "Elige a las campeonas del mundo de contrarreloj y ruta. Dos picks, guardado automático y premios para el top 3." }
      : { eyebrow: "Montreal · 20–26 September 2026", titleLines: ["WOMEN'S", "WORLDS"], body: "Pick the time trial and road race world champions. Two picks, auto-save and prizes for the top three." };
  }
  if (race.slug === "worlds-2026") {
    return lang === "es"
      ? { eyebrow: "Montreal · 20–27 septiembre 2026", titleLines: ["MUNDIAL", "MASCULINO"], body: "Elige a los campeones del mundo de contrarreloj y ruta. Dos picks, guardado automático y premios para el top 3." }
      : { eyebrow: "Montreal · 20–27 September 2026", titleLines: ["MEN'S", "WORLDS"], body: "Pick the time trial and road race world champions. Two picks, auto-save and prizes for the top three." };
  }
  return {
    eyebrow: `${localised(race.name, lang)} · ${race.startDate} — ${race.endDate}`,
    titleLines: [localised(race.name, lang)],
    body: lang === "es" ? "Haz tus predicciones, suma puntos y sigue la clasificación en directo." : "Make your picks, score points and follow the live leaderboard.",
  };
}

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0]).join("").toUpperCase();
}

export default function Dashboard() {
  const lang = useLang();
  const race = useRace();
  const base = useRaceBase();
  const session = useSession();
  const [showAuth, setShowAuth] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [board, setBoard] = useState([]);
  const [results, setResults] = useState({});
  const [picks, setPicks] = useState({});

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    let active = true;
    Promise.all([
      computeLeaderboard(race.slug),
      getResults(race.slug),
      session ? getPicksFor(session.id, race.slug) : Promise.resolve({}),
    ]).then(([b, r, p]) => {
      if (!active) return;
      setBoard(b);
      setResults(r);
      setPicks(p);
    });
    return () => { active = false; };
  }, [race.slug, session]);

  const copy = raceIntro(race, lang);
  const completed = race.stages.filter((stage) => picks[stage.n]).length;
  const next = mounted ? nextStage(undefined, race) : null;
  const prev = mounted ? previousStage(undefined, race) : null;
  const latestResultStage = [...race.stages].reverse().find((s) => results[s.n]);
  const latestResult = latestResultStage ? results[latestResultStage.n] : null;
  const podiumItems = latestResult ? [latestResult.first, latestResult.second, latestResult.third].map((id) => ({ label: riderById(id, race)?.name || id })) : null;
  const top3 = board.slice(0, 3).map((row) => ({ label: row.name, value: row.total }));
  const featureStage = race.stages.find((s) => s.type === "hills") || race.stages[0];
  const contenders = useMemo(() => favoritesForStage(featureStage, race).slice(0, 5), [featureStage, race]);
  const otherCategoryHref = race.category === "women" ? (lang === "es" ? "/es" : "/") : (lang === "es" ? "/es/women" : "/women");
  const allResulted = race.stages.length > 0 && race.stages.every((stage) => results[stage.n]);
  const anyOpen = mounted && race.stages.some((stage) => !results[stage.n] && !stageIsLocked(stage, undefined, race));
  const gameStatus = allResulted
    ? (lang === "es" ? "FINALIZADO" : "COMPLETE")
    : anyOpen || !mounted
      ? (lang === "es" ? "PICKS ABIERTOS" : "PICKS OPEN")
      : (lang === "es" ? "PICKS CERRADOS" : "PICKS LOCKED");

  return (
    <div>
      <StructuredData lang={lang} raceSlug={race.slug} />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={() => setShowAuth(false)} />}

      <section className="worlds-hero worlds-hero-v96">
        <div className="worlds-hero-copy">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1 className={race.category === "women" ? "hero-title hero-title-women" : "hero-title"}>{copy.titleLines.map((line) => <span key={line}>{line}</span>)}</h1>
          <p>{copy.body}</p>
          <div className="hero-actions">
            <a href={base + "/predictions"} className="btn hero-primary hero-play-btn">{lang === "es" ? "JUGAR AHORA" : "PLAY NOW"} <span aria-hidden="true">→</span></a>
            {!session && <button type="button" className="btn btn-outline" onClick={() => setShowAuth(true)}>{lang === "es" ? "Crear cuenta gratis" : "Create free account"}</button>}
          </div>
          <div className="hero-trust-row">
            <span>{lang === "es" ? "Gratis" : "Free to play"}</span>
            <span>{lang === "es" ? "Guardado automático" : "Auto-save"}</span>
            <span>{lang === "es" ? "Premios top 3" : "Top-3 prizes"}</span>
          </div>
        </div>

        <aside className="worlds-hero-panel game-control-card" aria-label={lang === "es" ? "Estado de tu partida" : "Your game status"}>
          <div className="game-control-top">
            <span className="game-live-dot" />
            <span>{gameStatus}</span>
            <b>{race.category === "women" ? (lang === "es" ? "FEM" : "WOMEN") : (lang === "es" ? "MAS" : "MEN")}</b>
          </div>

          <div className="game-control-progress">
            <div>
              <small>{session ? (lang === "es" ? "TU PARTIDA" : "YOUR GAME") : (lang === "es" ? "PARA JUGAR" : "TO PLAY")}</small>
              <strong>{session ? `${completed}/${race.stages.length}` : race.stages.length}</strong>
              <span>{session ? (lang === "es" ? "picks listos" : "picks ready") : (lang === "es" ? "picks" : "picks")}</span>
            </div>
            <div className="game-progress-ring" style={{ "--progress": `${race.stages.length ? completed / race.stages.length * 360 : 0}deg` }}><span>{session ? Math.round((completed / race.stages.length) * 100) : 0}%</span></div>
          </div>

          {session && (
            <div className="game-control-picks">
              {race.stages.map((stage) => {
                const rider = picks[stage.n] ? riderById(picks[stage.n], race) : null;
                return <div key={stage.n} className={rider ? "ready" : "missing"}><span>{stage.type === "itt" ? "ITT" : (lang === "es" ? "RUTA" : "ROAD")}</span><strong>{rider ? `${countryFlag(rider.team)} ${rider.name}` : (lang === "es" ? "Sin pick" : "No pick")}</strong><i>{rider ? "✓" : "○"}</i></div>;
              })}
            </div>
          )}

          {next ? (
            <div className="game-next-lock">
              <span>{lang === "es" ? "PRÓXIMO CIERRE" : "NEXT LOCK"}</span>
              <strong>{next.type === "itt" ? "ITT" : (lang === "es" ? "PRUEBA EN RUTA" : "ROAD RACE")}</strong>
              <GameCountdown stage={next} race={race} lang={lang} />
            </div>
          ) : <div className="game-next-lock"><strong>{lang === "es" ? "Competición finalizada" : "Competition finished"}</strong></div>}
        </aside>
      </section>

      {isChampionship(race) ? (
        <>
          <EventList race={race} lang={lang} base={base} results={results} picks={picks} />
          <section className="home-scoring-strip" aria-label={lang === "es" ? "Sistema de puntos" : "Scoring system"}>
            <div className="home-scoring-copy">
              <span className="eyebrow">{lang === "es" ? "PUNTUACIÓN" : "SCORING"}</span>
              <strong>{lang === "es" ? "Un pick. Tres formas de sumar." : "One pick. Three ways to score."}</strong>
            </div>
            <div className="home-scoring-values">
              <span><b>10 <em>{lang === "es" ? "puntos" : "points"}</em></b><small>{lang === "es" ? "GANADOR" : "WINNER"}</small></span>
              <span><b>5 <em>{lang === "es" ? "puntos" : "points"}</em></b><small>{lang === "es" ? "2º PUESTO" : "2ND PLACE"}</small></span>
              <span><b>2 <em>{lang === "es" ? "puntos" : "points"}</em></b><small>{lang === "es" ? "3º PUESTO" : "3RD PLACE"}</small></span>
            </div>
            <a href={base + "/rules"} className="home-scoring-link">{lang === "es" ? "Ver reglas" : "Full rules"} →</a>
          </section>
        </>
      ) : (
        <section className="card" style={{ marginTop: 20 }}>
          <h2>{lang === "es" ? "Próxima etapa" : "Next stage"}</h2>
          {next ? <a href={base + "/stage/" + next.n} className="text-link">{next.from} → {next.to} · {next.km} km →</a> : <p className="subtitle">{lang === "es" ? "La carrera ha terminado." : "The race is finished."}</p>}
        </section>
      )}

      {isChampionship(race) && contenders.length > 0 && (
        <section className="home-contenders">
          <div className="section-title-row contenders-title-row">
            <div><span className="eyebrow">{lang === "es" ? "RADAR DE FAVORITOS" : "CONTENDER RADAR"}</span><h2>{lang === "es" ? "Quién encaja con la ruta" : "Who suits the road race"}</h2></div>
            <a href={base + "/riders"} className="text-link">{lang === "es" ? "Ver lista completa" : "Full startlist"} →</a>
          </div>
          <div className="contender-strip">
            {contenders.map((rider, index) => (
              <a href={base + "/stage/" + featureStage.n} key={rider.id} className="contender-tile">
                <span className="contender-rank">{String(index + 1).padStart(2, "0")}</span>
                <span className="contender-avatar">{initials(rider.name)}</span>
                <span className="contender-copy"><strong>{rider.name}</strong><small>{countryFlag(rider.team)} {rider.team}</small></span>
              </a>
            ))}
          </div>
          <p className="data-note">{lang === "es" ? "Ranking editorial por encaje con el recorrido; no es una clasificación oficial." : "Editorial course-fit ranking; not an official ranking."}</p>
        </section>
      )}

      <section className="cross-pool-cta">
        <div><span className="eyebrow">{lang === "es" ? "DOBLE RETO" : "DOUBLE CHALLENGE"}</span><h2>{race.category === "women" ? (lang === "es" ? "¿Ya has jugado la masculina?" : "Played the men's pool yet?") : (lang === "es" ? "¿Ya has jugado la femenina?" : "Played the women's pool yet?")}</h2><p>{lang === "es" ? "Son clasificaciones separadas. Puedes competir en las dos." : "They are separate leaderboards. You can play both."}</p></div>
        <a href={otherCategoryHref} className="btn secondary">{race.category === "women" ? (lang === "es" ? "Ir a masculino" : "Play men's") : (lang === "es" ? "Ir a femenino" : "Play women's")} →</a>
      </section>

      <div className="grid grid-2 home-dashboard-grid">
        <section className="card home-score-card">
          <div className="section-title-row">
            <h2>{lang === "es" ? "Último resultado" : "Latest result"}</h2>
            {latestResultStage && <a href={base + "/stage/" + latestResultStage.n} className="text-link">{lang === "es" ? "Ver prueba" : "View event"} →</a>}
          </div>
          {podiumItems ? <Podium items={podiumItems} /> : <p className="subtitle">{prev ? (lang === "es" ? "Resultado pendiente." : "Result pending.") : (lang === "es" ? "La competición todavía no ha empezado." : "The competition has not started yet.")}</p>}
        </section>

        <section className="card home-score-card">
          <div className="section-title-row">
            <h2>{lang === "es" ? "Clasificación" : "Leaderboard"}</h2>
            <a href={base + "/leaderboard"} className="text-link">{lang === "es" ? "Ver completa" : "Full table"} →</a>
          </div>
          {top3.length ? <Podium items={top3} valueSuffix=" pts" /> : <p className="subtitle">{lang === "es" ? "Se activará con el primer resultado." : "It will activate with the first result."}</p>}
        </section>
      </div>

      <section className="how-it-works-grid game-rules-grid">
        <div className="how-step"><strong>1</strong><h3>{lang === "es" ? "ELIGE" : "PICK"}</h3><p>{lang === "es" ? "Un corredor para cada prueba." : "One rider for each event."}</p></div>
        <div className="how-step"><strong>2</strong><h3>{lang === "es" ? "SUMA" : "SCORE"}</h3><p>{lang === "es" ? "10 al ganador, 5 al 2º, 2 al 3º." : "10 for 1st, 5 for 2nd, 2 for 3rd."}</p></div>
        <div className="how-step"><strong>3</strong><h3>{lang === "es" ? "COMPITE" : "COMPETE"}</h3><p>{lang === "es" ? "Sube en la tabla y lucha por los premios." : "Climb the table and race for the prizes."}</p></div>
      </section>

      <PreviewArticleContent lang={lang} variant="home" raceSlug={race.slug} />

      <p className="home-rules-link"><a href={base + "/rules"}>{lang === "es" ? "Leer las normas completas" : "Read the full rules"} →</a></p>
    </div>
  );
}
