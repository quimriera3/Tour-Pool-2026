"use client";
// lib/useRace.js
//
// Resolves which race the current page belongs to, from the URL.
//
// Pages used to read `getActiveRace()`, a module-level constant, which meant
// every page always rendered the live race no matter what URL it was served
// at. That was fine while there was one race at a time; it breaks as soon as
// two editions run side by side (men's and women's Worlds) or an archived race
// needs its own pages.
//
// Using the pathname instead means a single set of page components serves
// every race, and adding a race adds routes rather than duplicated code.
import { usePathname } from "next/navigation";
import { raceFromPathname, raceBasePath, siblingCategories } from "./races";
import { useLang } from "./i18n";

export function useRace() {
  const pathname = usePathname();
  return raceFromPathname(pathname);
}

// Base path for links within the current race, language included:
// "" for the live men's Worlds, "/women", "/es/women", "/tour-de-france-2026".
export function useRaceBase() {
  const race = useRace();
  const lang = useLang();
  return raceBasePath(race, lang);
}

// The other editions of the same championship (men's <-> women's), for the
// category switcher. Returns [] for races that have no sibling.
export function useRaceCategories() {
  const race = useRace();
  const siblings = siblingCategories(race);
  return siblings.length > 1 ? siblings : [];
}
