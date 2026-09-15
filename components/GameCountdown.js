"use client";

import { useEffect, useMemo, useState } from "react";
import { stageStartDate } from "../lib/data";

function parts(ms) {
  const totalMinutes = Math.max(0, Math.floor(ms / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  return { days, hours, minutes };
}

export default function GameCountdown({ stage, race, lang = "en", compact = false }) {
  const [mounted, setMounted] = useState(false);
  const [now, setNow] = useState(0);

  const lockMs = useMemo(() => {
    if (!stage || !race) return 0;
    return stageStartDate(stage, race).getTime() - 60 * 60 * 1000;
  }, [stage, race]);

  useEffect(() => {
    setMounted(true);
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(id);
  }, []);

  const locked = mounted && now >= lockMs;
  const remaining = mounted ? parts(lockMs - now) : { days: "—", hours: "—", minutes: "—" };
  const labels = lang === "es"
    ? { title: "Cierre de picks", locked: "Picks cerrados", d: "d", h: "h", m: "min" }
    : { title: "Pick deadline", locked: "Picks locked", d: "d", h: "h", m: "min" };

  if (locked) return <span className={compact ? "countdown-locked compact" : "countdown-locked"}>{labels.locked}</span>;

  return (
    <div className={compact ? "game-countdown compact" : "game-countdown"} aria-live="polite">
      {!compact && <span className="countdown-label">{labels.title}</span>}
      <span className="countdown-unit"><strong>{remaining.days}</strong><small>{labels.d}</small></span>
      <span className="countdown-unit"><strong>{remaining.hours}</strong><small>{labels.h}</small></span>
      <span className="countdown-unit"><strong>{remaining.minutes}</strong><small>{labels.m}</small></span>
    </div>
  );
}
