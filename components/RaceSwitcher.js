"use client";
// components/RaceSwitcher.js
//
// Small dropdown showing which race the pool is currently running, with links
// to any archived races. Deliberately understated: for most visitors there is
// only ever one race that matters (the live one), so this reads as a label
// first and a menu second.
//
// Adding a race to lib/races/ makes it appear here automatically.
import { useState, useEffect, useRef } from "react";
import { getActiveRace, racesByDate, isArchived, localised } from "../lib/races";
import { useLang } from "../lib/i18n";

const COPY = {
  en: { live: "Live now", finished: "Finished", heading: "Races" },
  es: { live: "En directo", finished: "Finalizada", heading: "Carreras" },
  ca: { live: "En directe", finished: "Finalitzada", heading: "Curses" },
  fr: { live: "En direct", finished: "Terminée", heading: "Courses" },
  it: { live: "In diretta", finished: "Conclusa", heading: "Corse" },
  nl: { live: "Live", finished: "Afgelopen", heading: "Koersen" },
};

// Where a race lives on the site: the active race owns the root URLs, every
// other race sits under its own slug.
function raceHref(race, active, lang) {
  const prefix = lang === "es" ? "/es" : "";
  return race.slug === active.slug ? prefix || "/" : "/" + race.slug;
}

export default function RaceSwitcher() {
  const lang = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = getActiveRace();
  const races = racesByDate();
  const c = COPY[lang] || COPY.en;

  useEffect(() => {
    if (!open) return;
    function onClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  // With only one race there is nothing to switch to — show a plain label.
  if (races.length < 2) {
    return (
      <span className="race-switcher-label">
        <span className="race-live-dot" />
        {localised(active.shortName, lang)}
      </span>
    );
  }

  return (
    <div className="race-switcher" ref={ref}>
      <button type="button" className="race-switcher-btn" onClick={() => setOpen((v) => !v)}>
        <span className="race-live-dot" />
        {localised(active.shortName, lang)}
        <span className="race-switcher-caret">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div className="race-switcher-menu">
          <span className="race-switcher-heading">{c.heading}</span>
          {races.map((r) => {
            const archived = isArchived(r);
            return (
              <a
                key={r.slug}
                href={raceHref(r, active, lang)}
                className={"race-switcher-item" + (r.slug === active.slug ? " current" : "")}
              >
                <span className="race-switcher-name">{localised(r.shortName, lang)}</span>
                <span className={"race-switcher-status" + (archived ? " archived" : "")}>
                  {archived ? c.finished : c.live}
                </span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
