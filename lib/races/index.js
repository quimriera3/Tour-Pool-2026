// lib/races/index.js
//
// Central registry of every race the platform runs a pool for.
//
// A "race" is anything people can predict: a Grand Tour (21 stages + jerseys),
// a shorter stage race (Paris-Nice, Itzulia), or a one-day race (Milan-San
// Remo, the World Championships). The differences are expressed in data, not
// in code, so adding a new race means adding one file here — no component or
// database change.
//
// RACE SHAPE
// ----------
//   slug          unique, URL-safe, immutable once live (it is stored in the
//                 database against every pick, so renaming it orphans data)
//   type          "grand-tour" | "stage-race" | "one-day"
//   name/shortName localised display names
//   startDate/endDate  ISO dates
//   utcOffset     fixed offset for the whole race, used for lock times
//   stages[]      always present. A one-day race has exactly one "stage".
//   jerseys[]     final classifications people predict. Empty for one-day races.
//   jerseyLockStage  jersey picks close 1h before this stage starts. Omit when
//                 there are no jerseys.
//   teams[]       team names taking part
//   riders[]      the startlist. May be empty until it is published.
//
// ADDING A RACE
// -------------
//   1. create lib/races/<slug>.js exporting the object
//   2. import it below and add it to RACES
//   3. to make it the live race, change ACTIVE_RACE_SLUG

import { TDF_2026 } from "./tdf2026";
import { VUELTA_2026 } from "./vuelta2026";

export const RACES = {
  [TDF_2026.slug]: TDF_2026,
  [VUELTA_2026.slug]: VUELTA_2026,
};

// The race the site shows by default (homepage, /predictions, /leaderboard...).
// Everything else stays reachable as an archive.
export const ACTIVE_RACE_SLUG = VUELTA_2026.slug;

export function getRace(slug) {
  return RACES[slug] || null;
}

export function getActiveRace() {
  return RACES[ACTIVE_RACE_SLUG];
}

export function allRaces() {
  return Object.values(RACES);
}

// Races sorted newest first — used for archive listings and race switchers.
export function racesByDate() {
  return allRaces().slice().sort((a, b) => (a.startDate < b.startDate ? 1 : -1));
}

export function isRaceFinished(race, now) {
  const current = now || new Date();
  return current > new Date(race.endDate + "T23:59:59" + (race.utcOffset || "+02:00"));
}

export function isRaceRunning(race, now) {
  const current = now || new Date();
  const start = new Date(race.startDate + "T00:00:00" + (race.utcOffset || "+02:00"));
  const end = new Date(race.endDate + "T23:59:59" + (race.utcOffset || "+02:00"));
  return current >= start && current <= end;
}

// A one-day race has no jerseys and a single stage; several parts of the UI
// (jersey pages, week grouping, stage navigation) switch on this.
export function hasJerseys(race) {
  return Array.isArray(race.jerseys) && race.jerseys.length > 0;
}

export function isOneDay(race) {
  return race.type === "one-day";
}

// A race is archived once it is over: it stays online and crawlable so its
// stage pages keep their search ranking, but it is removed from the navigation
// and cannot take new picks.
export function isArchived(race) {
  return race.status === "finished";
}

export function archivedRaces() {
  return allRaces().filter(isArchived);
}

// Which race does a given URL belong to?
//
// The active race owns the root URLs (/, /es, /stage/3...). Every other race
// lives under its own slug (/tour-de-france-2026/stage/3). Deriving the race
// from the path — rather than from a single global constant — is what lets an
// archived race render in its own colours and branding: open a Tour page and
// the whole site turns yellow again, open a Vuelta page and it is red.
export function raceFromPathname(pathname) {
  if (!pathname) return getActiveRace();
  const segments = pathname.split("/").filter(Boolean);
  for (const seg of segments) {
    if (RACES[seg]) return RACES[seg];
  }
  return getActiveRace();
}

export function localised(field, lang) {
  if (!field) return "";
  if (typeof field === "string") return field;
  return field[lang] || field.en || Object.values(field)[0] || "";
}
