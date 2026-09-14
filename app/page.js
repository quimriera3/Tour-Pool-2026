"use client";

import { useEffect, useState } from "react";
import { nextStage, previousStage, stageStartDate, riderById } from "../lib/data";
import { computeLeaderboard, getResults, getPicksFor, useSession } from "../lib/store";
import Podium from "../components/Podium";
import AuthModal from "../components/AuthModal";
import PreviewArticleContent from "../components/PreviewArticleContent";
import StructuredData from "../components/StructuredData";
import EventList from "../components/EventList";
import { isChampionship, localised } from "../lib/races";
import { useRace, useRaceBase } from "../lib/useRace";
import { useLang } from "../lib/i18n";

function raceIntro(race, lang) {
  if (race.slug === "worlds-2026-women") {
    return lang === "es"
      ? { eyebrow: "Montreal · 20–26 septiembre 2026", title: "Mundial Élite Femenino 2026", body: "Predice las campeonas del mundo de contrarreloj y ruta. Dos pruebas, una hora límite antes de cada salida y 10/5/2 puntos por podio." }
      : { eyebrow: "Montreal · 20–26 September 2026", title: "Women's Worlds Pool 2026", body: "Pick the women's time trial and road race world champions. Two events, a one-hour pick deadline, and 10/5/2 points for the podium." };
  }
  if (race.slug === "worlds-2026") {
    return lang === "es"
      ? { eyebrow: "Montreal · 20–27 septiembre 2026", title: "Porra del Mundial 2026", body: "Predice los campeones del mundo élite de contrarreloj y ruta. Dos pruebas, una hora límite antes de cada salida y 10/5/2 puntos por podio." }
      : { eyebrow: "Montreal · 20–27 September 2026", title: "Road Worlds Pool 2026", body: "Pick the elite men's time trial and road race world champions. Two events, a one-hour pick deadline, and 10/5/2 points for the podium." };
  }
  return {
    eyebrow: `${localised(race.name, lang)} · ${race.startDate} — ${race.endDate}`,
    title: localised(race.name, lang),
    body: lang === "es" ? "Haz tus predicciones, suma puntos y sigue la clasificación en directo." : "Make your picks, score points and follow the live leaderboard.",
  };
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

  return (
    <div>
      <StructuredData lang={lang} raceSlug={race.slug} />
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onAuth={() => setShowAuth(false)} />}

      <section className="worlds-hero">
        <div className="worlds-hero-copy">
          <span className="eyebrow">{copy.eyebrow}</span>
          <h1>{copy.title}</h1>
          <p>{copy.body}</p>
          <div className="hero-actions">
            <a href={base + "/predictions"} className="btn hero-primary">{lang === "es" ? "Haz tus picks" : "Make your picks"} →</a>
            {!session && <button type="button" className="btn btn-outline" onClick={() => setShowAuth(true)}>{lang === "es" ? "Crear cuenta gratis" : "Create free account"}</button>}
          </div>
          <div className="hero-trust-row">
            <span>{lang === "es" ? "Gratis" : "Free to play"}</span>
            <span>10 / 5 / 2 pts</span>
            <span>{lang === "es" ? "Premios top 3" : "Top-3 prizes"}</span>
          </div>
        </div>
        <div className="worlds-hero-panel">
          <span className="panel-kicker">{lang === "es" ? "Tu progreso" : "Your progress"}</span>
          {session ? (
            <>
              <div className="hero-progress-number"><strong>{completed}</strong><span>/{race.stages.length}</span></div>
              <p>{completed === race.stages.length ? (lang === "es" ? "Todos tus picks están listos." : "All your picks are ready.") : (lang === "es" ? "Completa tus predicciones antes del cierre." : "Complete your picks before the deadlines.")}</p>
              <div className="hero-progress-bar"><i style={{ width: `${race.stages.length ? completed / race.stages.length * 100 : 0}%` }} /></div>
            </>
          ) : (
            <>
              <div className="hero-progress-number"><strong>{race.stages.length}</strong><span>{lang === "es" ? " pruebas" : " events"}</span></div>
              <p>{lang === "es" ? "Elige un ganador para cada prueba. Puedes cambiarlo hasta una hora antes." : "Choose one winner for each event. Change it until one hour before the start."}</p>
            </>
          )}
          {next && (
            <div className="next-deadline">
              <span>{lang === "es" ? "Próxima prueba" : "Next event"}</span>
              <strong>{next.eventName ? localised(next.eventName, lang) : `${lang === "es" ? "Etapa" : "Stage"} ${next.n}`}</strong>
              <small>{new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false, ...(race.timeZone ? { timeZone: race.timeZone } : {}) }).format(stageStartDate(next, race))} · Montréal</small>
            </div>
          )}
        </div>
      </section>

      {isChampionship(race) ? (
        <EventList race={race} lang={lang} base={base} results={results} picks={picks} />
      ) : (
        <section className="card" style={{ marginTop: 20 }}>
          <h2>{lang === "es" ? "Próxima etapa" : "Next stage"}</h2>
          {next ? <a href={base + "/stage/" + next.n} className="text-link">{next.from} → {next.to} · {next.km} km →</a> : <p className="subtitle">{lang === "es" ? "La carrera ha terminado." : "The race is finished."}</p>}
        </section>
      )}

      <div className="grid grid-2 home-dashboard-grid">
        <section className="card">
          <div className="section-title-row">
            <h2>{lang === "es" ? "Último resultado" : "Latest result"}</h2>
            {latestResultStage && <a href={base + "/stage/" + latestResultStage.n} className="text-link">{lang === "es" ? "Ver prueba" : "View event"} →</a>}
          </div>
          {podiumItems ? <Podium items={podiumItems} /> : <p className="subtitle">{prev ? (lang === "es" ? "Resultado pendiente." : "Result pending.") : (lang === "es" ? "La competición todavía no ha empezado." : "The competition has not started yet.")}</p>}
        </section>

        <section className="card">
          <div className="section-title-row">
            <h2>{lang === "es" ? "Clasificación" : "Leaderboard"}</h2>
            <a href={base + "/leaderboard"} className="text-link">{lang === "es" ? "Ver completa" : "Full table"} →</a>
          </div>
          {top3.length ? <Podium items={top3} valueSuffix=" pts" /> : <p className="subtitle">{lang === "es" ? "Se activará con el primer resultado." : "It will activate with the first result."}</p>}
        </section>
      </div>

      <PreviewArticleContent lang={lang} variant="home" raceSlug={race.slug} />

      <section className="how-it-works-grid">
        <div className="how-step"><strong>1</strong><h3>{lang === "es" ? "Elige" : "Pick"}</h3><p>{lang === "es" ? "Un corredor para cada prueba." : "One rider for each event."}</p></div>
        <div className="how-step"><strong>2</strong><h3>{lang === "es" ? "Suma" : "Score"}</h3><p>{lang === "es" ? "10 al ganador, 5 al 2º, 2 al 3º." : "10 for 1st, 5 for 2nd, 2 for 3rd."}</p></div>
        <div className="how-step"><strong>3</strong><h3>{lang === "es" ? "Compite" : "Compete"}</h3><p>{lang === "es" ? "Sube en la clasificación y lucha por los premios." : "Climb the leaderboard and race for the prizes."}</p></div>
      </section>

      <p className="home-rules-link"><a href={base + "/rules"}>{lang === "es" ? "Leer las normas completas" : "Read the full rules"} →</a></p>
    </div>
  );
}
