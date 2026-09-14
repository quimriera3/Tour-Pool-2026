"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getActiveRace, racesByDate, isArchived, isRaceRunning, localised, raceFromPathname, raceBasePath } from "../lib/races";
import { useLang } from "../lib/i18n";

const COPY = {
  en: { live: "Live", upcoming: "Picks open", finished: "Finished", heading: "Pools" },
  es: { live: "En directo", upcoming: "Picks abiertos", finished: "Finalizada", heading: "Porras" },
};

function statusFor(race, c) {
  if (isArchived(race)) return c.finished;
  if (isRaceRunning(race)) return c.live;
  return c.upcoming;
}

export default function RaceSwitcher() {
  const lang = useLang();
  const pathname = usePathname();
  const current = raceFromPathname(pathname);
  const active = getActiveRace();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const c = COPY[lang] || COPY.en;

  // Men/Women are categories of the same championship from the user's point
  // of view, so list the Worlds once here and let CategorySwitcher handle sex.
  const seenChampionship = new Set();
  const pools = racesByDate().filter((r) => {
    if (r.type !== "championship") return true;
    const key = `${r.year}-${r.host?.city || ""}-${r.type}`;
    if (seenChampionship.has(key)) return false;
    seenChampionship.add(key);
    return true;
  });

  useEffect(() => {
    if (!open) return;
    function onDown(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    function onKey(e) { if (e.key === "Escape") setOpen(false); }
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("keydown", onKey); };
  }, [open]);

  const currentLabel = current.type === "championship" ? localised(active.shortName, lang).replace(/\s[—-]\s.*$/, "") : localised(current.shortName, lang);

  return (
    <div className="race-switcher" ref={ref}>
      <button type="button" className="race-switcher-btn" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-haspopup="menu">
        <span className={"race-live-dot" + (isArchived(current) ? " archived" : "")} />
        {currentLabel}
        <span className="race-switcher-caret" aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="race-switcher-menu" role="menu">
          <span className="race-switcher-heading">{c.heading}</span>
          {pools.map((r) => {
            const href = r.slug === active.slug ? (lang === "es" ? "/es" : "/") : raceBasePath(r, lang) || "/";
            const selected = current.type === "championship" && r.type === "championship" ? true : r.slug === current.slug;
            return (
              <a key={r.slug} href={href} className={"race-switcher-item" + (selected ? " current" : "")} role="menuitem">
                <span className="race-switcher-name">{r.type === "championship" ? localised(r.shortName, lang).replace(/\s[—-]\s.*$/, "") : localised(r.shortName, lang)}</span>
                <span className={"race-switcher-status" + (isArchived(r) ? " archived" : "")}>{statusFor(r, c)}</span>
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
