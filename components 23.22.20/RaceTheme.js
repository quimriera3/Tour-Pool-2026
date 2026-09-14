"use client";
// components/RaceTheme.js
//
// Applies the theme of whichever race the current URL belongs to.
//
// The root layout renders the active race's colours for the first paint (so
// there's no flash), but the nav, footer and every page live above the route
// that identifies the race. Setting the variables on <html> from here is what
// makes the switch total: open an archived Tour page and the entire site —
// navigation included — turns yellow, not just the page body.
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { raceFromPathname } from "../lib/races";

export default function RaceTheme() {
  const pathname = usePathname();

  useEffect(() => {
    const race = raceFromPathname(pathname);
    const theme = race.theme || {};
    const root = document.documentElement;
    root.style.setProperty("--accent", theme.accent);
    root.style.setProperty("--accent-dark", theme.accentDark);
    root.style.setProperty("--accent-ink", theme.accentInk);
    root.style.setProperty("--accent-soft", theme.accentSoft);
    root.setAttribute("data-race", race.slug);
  }, [pathname]);

  return null;
}
