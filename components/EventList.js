"use client";

import { useEffect, useState } from "react";
import { countryFlag, ridersForStage, stageIsLocked } from "../lib/data";
import StageTypeIcon from "./StageTypeIcon";
import GameCountdown from "./GameCountdown";
import { localised } from "../lib/races";

const COPY = {
  en: { heading: "Choose your race", lead: "Two events. Two picks. Every decision counts.", open: "OPEN", closed: "LOCKED", done: "RESULT", yourPick: "Your pick", choose: "MAKE PICK", riders: "riders" },
  es: { heading: "Elige tu prueba", lead: "Dos pruebas. Dos picks. Cada decisión cuenta.", open: "ABIERTO", closed: "CERRADO", done: "RESULTADO", yourPick: "Tu pick", choose: "HACER PICK", riders: "corredores" },
};

export default function EventList({ race, lang = "en", base = "", results = {}, picks = {} }) {
  const c = COPY[lang] || COPY.en;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="events game-events" aria-labelledby="events-heading">
      <div className="events-head game-events-head">
        <div>
          <span className="eyebrow">{lang === "es" ? "Zona de juego" : "Game board"}</span>
          <h2 id="events-heading">{c.heading}</h2>
        </div>
        <p className="events-lead">{c.lead}</p>
      </div>

      <div className="game-event-grid">
        {race.stages.map((stage) => {
          const locked = mounted ? stageIsLocked(stage, undefined, race) : false;
          const hasResult = Boolean(results[stage.n]);
          const label = stage.eventName ? localised(stage.eventName, lang) : `${lang === "es" ? "Etapa" : "Stage"} ${stage.n}`;
          const status = hasResult ? "done" : locked ? "closed" : "open";
          const picked = picks[stage.n];
          const rider = picked ? race.riders.find((r) => r.id === picked) : null;
          const [year, month, day] = stage.date.split("-").map(Number);
          const dateLabel = new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", { weekday: "short", day: "numeric", month: "short" }).format(new Date(Date.UTC(year, month - 1, day)));
          const eligible = ridersForStage(stage, race).length;

          return (
            <a key={stage.n} href={base + "/stage/" + stage.n} className={`game-event-card game-event-${status}${rider ? " has-pick" : ""}`}>
              <span className="game-event-rainbow" aria-hidden="true" />
              <div className="game-event-card-top">
                <span className={`event-status status-${status}`}>{status === "done" ? c.done : status === "closed" ? c.closed : c.open}</span>
                {!hasResult && <GameCountdown stage={stage} race={race} lang={lang} compact />}
              </div>
              <div className="game-event-number">0{stage.n}</div>
              <div className="game-event-type"><StageTypeIcon type={stage.type} size={15} /> {stage.type === "itt" ? "ITT" : (lang === "es" ? "RUTA" : "ROAD RACE")}</div>
              <h3>{label.replace(/^Elite (Men|Women) — /, "")}</h3>
              <p className="game-event-date">{dateLabel} · {stage.startTime} Montréal</p>
              <div className="game-event-stats">
                <span><small>KM</small><strong>{stage.km}</strong></span>
                <span><small>{lang === "es" ? "DESN." : "CLIMB"}</small><strong>{stage.elevationGain ? stage.elevationGain.toLocaleString() + " m" : "—"}</strong></span>
                <span><small>{lang === "es" ? "LISTA" : "FIELD"}</small><strong>{eligible || "—"}</strong></span>
              </div>
              <div className="game-event-course-note">
                <span>{stage.type === "itt" ? (lang === "es" ? "Old Montréal · Gilles-Villeneuve · Parc Jean-Drapeau" : "Old Montréal · Gilles-Villeneuve · Parc Jean-Drapeau") : `${race.category === "women" ? 8 : 12} × Mount Royal · Camillien-Houde · >11%`}</span>
                <b>{lang === "es" ? "MAPA + PERFIL" : "MAP + PROFILE"} →</b>
              </div>
              <div className={"game-event-action" + (rider ? " selected" : "")}>
                {rider ? (
                  <><span className="game-picked-flag" aria-hidden="true">{countryFlag(rider.team)}</span><span><small>{c.yourPick}</small><strong>{rider.name}</strong></span><b>✓</b></>
                ) : (
                  <><span>{c.choose}</span><b>→</b></>
                )}
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
