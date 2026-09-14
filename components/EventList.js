"use client";

import { useEffect, useState } from "react";
import { stageStartDate, stageIsLocked } from "../lib/data";
import StageTypeIcon from "./StageTypeIcon";
import { localised } from "../lib/races";

const COPY = {
  en: { heading: "Championship events", lead: "Pick each event separately. Picks close one hour before the official start.", open: "Pick open", closed: "Locked", done: "Result", at: "at", yourPick: "Your pick", choose: "Make your pick" },
  es: { heading: "Pruebas del Mundial", lead: "Predice cada prueba por separado. Los picks se cierran una hora antes de la salida oficial.", open: "Pick abierto", closed: "Cerrado", done: "Resultado", at: "a las", yourPick: "Tu pick", choose: "Haz tu pick" },
};

const DAYS = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  es: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
};

export default function EventList({ race, lang = "en", base = "", results = {}, picks = {} }) {
  const c = COPY[lang] || COPY.en;
  const days = DAYS[lang] || DAYS.en;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="events" aria-labelledby="events-heading">
      <div className="events-head">
        <div>
          <span className="eyebrow">{lang === "es" ? `${race.stages.length} pruebas élite · ${race.stages.length} predicciones` : `${race.stages.length} elite events · ${race.stages.length} predictions`}</span>
          <h2 id="events-heading">{c.heading}</h2>
        </div>
        <p className="events-lead">{c.lead}</p>
      </div>

      <div className="events-list">
        {race.stages.map((stage) => {
          const start = stageStartDate(stage, race);
          const locked = mounted ? stageIsLocked(stage, undefined, race) : false;
          const hasResult = Boolean(results[stage.n]);
          const label = stage.eventName ? localised(stage.eventName, lang) : `${lang === "es" ? "Etapa" : "Stage"} ${stage.n}`;
          const status = hasResult ? "done" : locked ? "closed" : "open";
          const picked = picks[stage.n];
          const rider = picked ? race.riders.find((r) => r.id === picked) : null;

          return (
            <a key={stage.n} href={base + "/stage/" + stage.n} className={`event event-${status}`}>
              <span className="event-bar" />
              <span className="event-date" aria-hidden="true">
                <span className="event-day">{days[start.getDay()]}</span>
                <span className="event-num">{start.getDate()}</span>
              </span>
              <span className="event-info">
                <span className="event-name">{label}</span>
                <span className="event-meta">
                  <StageTypeIcon type={stage.type} size={11} />
                  {stage.km} km{stage.elevationGain ? ` · ${stage.elevationGain.toLocaleString()} m ↑` : ""}
                  {` · ${stage.from}${stage.to !== stage.from ? " → " + stage.to : ""} · ${c.at} ${stage.startTime}`}
                </span>
                <span className={"event-pick " + (rider ? "has-pick" : "")}>{rider ? `${c.yourPick}: ${rider.name} ✓` : c.choose}</span>
              </span>
              {mounted && <span className={`event-status status-${status}`}>{status === "done" ? c.done : status === "closed" ? c.closed : c.open}</span>}
            </a>
          );
        })}
      </div>
    </section>
  );
}
