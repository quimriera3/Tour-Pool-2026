"use client";
// components/EventList.js
//
// Lists a championship's events on the homepage.
//
// A World Championship is a set of separate races rather than consecutive
// stages, so the homepage's job is different from a Grand Tour's: instead of
// "stage 4 of 21 and a progress bar", people need to see at a glance what
// races there are, when each one is, and which are still open to predict.
import { useEffect, useState } from "react";
import { stageStartDate, stageIsLocked, TYPE_LABEL } from "../lib/data";
import StageTypeIcon from "../components/StageTypeIcon";
import { localised } from "../lib/races";

const COPY = {
  en: {
    heading: "The championship races",
    lead: "Each race is predicted separately. Picks close 1 hour before the start.",
    open: "Open",
    closed: "Closed",
    done: "Done",
    all: "Full programme",
    at: "at",
  },
  es: {
    heading: "Las pruebas del Mundial",
    lead: "Cada prueba se predice por separado. Los picks se cierran 1 hora antes de la salida.",
    open: "Abierto",
    closed: "Cerrado",
    done: "Disputada",
    all: "Programa completo",
    at: "a las",
  },
};

const DAYS = {
  en: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
  es: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
};

export default function EventList({ race, lang = "en", base = "", results = {} }) {
  const c = COPY[lang] || COPY.en;
  const days = DAYS[lang] || DAYS.en;

  // Everything except the open/closed badge is static, so it renders on the
  // server and is fully crawlable. Whether a race is still open depends on the
  // current time, which would differ between the build and the visitor's
  // browser -- so that part waits for mount rather than causing a hydration
  // mismatch.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="events" aria-labelledby="events-heading">
      <div className="events-head">
        <h2 id="events-heading">{c.heading}</h2>
      </div>
      <p className="events-lead">{c.lead}</p>

      <div className="events-list">
        {race.stages.map((stage) => {
          const start = stageStartDate(stage, race);
          const locked = mounted ? stageIsLocked(stage, undefined, race) : false;
          const hasResult = Boolean(results[stage.n]);
          const label = stage.eventName
            ? localised(stage.eventName, lang)
            : (lang === "es" ? "Etapa " : "Stage ") + stage.n;

          const status = hasResult ? "done" : locked ? "closed" : "open";
          const showStatus = mounted;

          return (
            <a
              key={stage.n}
              href={base + "/stage/" + stage.n}
              className={"event" + (mounted && status === "open" ? " event-open" : "") + (mounted && status === "done" ? " event-done" : "")}
            >
              <span className="event-bar" />
              <span className="event-date">
                <span className="event-day">{days[start.getDay()]}</span>
                <span className="event-num">{start.getDate()}</span>
              </span>
              <span className="event-info">
                <span className="event-name">{label}</span>
                <span className="event-meta">
                  <StageTypeIcon type={stage.type} size={11} />
                  {stage.km} km
                  {stage.elevationGain ? " · " + stage.elevationGain.toLocaleString() + " m ↑" : ""}
                  {" · "}{stage.from}{stage.to !== stage.from ? " → " + stage.to : ""}
                  {" · "}{c.at} {stage.startTime}
                </span>
              </span>
              {showStatus && (
                <span className={"event-status status-" + status}>
                  {status === "done" ? c.done : status === "closed" ? c.closed : c.open}
                </span>
              )}
            </a>
          );
        })}
      </div>
    </section>
  );
}
