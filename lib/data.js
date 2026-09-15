// lib/data.js
//
// Race-aware data layer.
//
// Every race lives in lib/races/. This module exposes helpers that work on ANY
// race, plus convenience constants (STAGES, RIDERS, ALL_TEAMS...) bound to the
// currently active race so existing pages keep working unchanged.
//
// Every function takes an optional `race` argument. Omit it and you get the
// active race; pass one to work with an archived race (e.g. rendering the Tour
// leaderboard while the Vuelta is live).

import { getActiveRace, getRace, hasJerseys } from "./races";

export { getRace, getActiveRace, hasJerseys };
export { RACES, ACTIVE_RACE_SLUG, allRaces, racesByDate, isRaceFinished, isRaceRunning, isOneDay, localised } from "./races";

const ACTIVE = getActiveRace();

// ---------------------------------------------------------------------------
// Convenience bindings to the ACTIVE race.
// ---------------------------------------------------------------------------
export const STAGES = ACTIVE.stages;
export const RIDERS = ACTIVE.riders;
export const ALL_TEAMS = ACTIVE.teams;
export const REST_DAYS = ACTIVE.restDays || [];
export const OFFICIAL_TEAMS = new Set(ACTIVE.officialTeams || ACTIVE.teams || []);
export const JERSEYS = ACTIVE.jerseys || [];

// Week grouping, resolved from the race's week definition.
export const WEEKS = (ACTIVE.weeks || []).map((w) => ({
  key: w.key,
  stages: w.stages.map((n) => ACTIVE.stages.find((s) => s.n === n)).filter(Boolean),
}));

// ---------------------------------------------------------------------------
// Stage type presentation
// ---------------------------------------------------------------------------
export const TYPE_COLOR = {
  mountains: "#d6432f",
  hills: "#b8860b",
  flat: "#1f8a4c",
  itt: "#3a3fae",
  ttt: "#3a3fae",
};

export const TYPE_LABEL = {
  mountains: "Mountain",
  hills: "Hilly",
  flat: "Flat / sprint",
  itt: "Individual TT",
  ttt: "Team TT",
};

// ---------------------------------------------------------------------------
// Riders
// ---------------------------------------------------------------------------
const SPECIALTY_LABELS = {
  mountains: "Climber",
  hills: "Puncheur",
  flat: "Sprinter",
  itt: "Time triallist",
  ttt: "Time triallist",
};

export function riderSpecialty(rider) {
  const entries = Object.entries(rider.scores).filter(([k]) => k !== "ttt");
  entries.sort((a, b) => b[1] - a[1]);
  return SPECIALTY_LABELS[entries[0][0]] || "All-rounder";
}

const SPECIALTY_TO_TYPE = {
  Climber: "mountains",
  Puncheur: "hills",
  Sprinter: "flat",
  "Time triallist": "itt",
};

export function specialtyToType(specialty) {
  return SPECIALTY_TO_TYPE[specialty] || "flat";
}

// Youth classification eligibility ("best young rider"): born on or after the
// race's own cutoff year, since the rule is age-based and each race sets it.
export function isYouthEligible(rider, race) {
  const r = race || ACTIVE;
  return (rider.birthYear || 0) >= (r.youthBornFrom || 2001);
}

// Kept for backwards compatibility with existing pages.
export function isWhiteJerseyEligible(rider, race) {
  return isYouthEligible(rider, race);
}

export function riderById(id, race) {
  return (race || ACTIVE).riders.find((r) => r.id === id);
}

// Championship events can have different fields (for example the road race
// and the individual time trial). When `eligibleRiderIds` is present on an
// event, it is the source of truth for who can be picked in that event.
export function riderEligibleForStage(rider, stage) {
  if (!rider || !stage) return false;
  if (!Array.isArray(stage.eligibleRiderIds) || stage.eligibleRiderIds.length === 0) return true;
  return stage.eligibleRiderIds.includes(rider.id);
}

export function ridersForStage(stage, race) {
  const r = race || ACTIVE;
  return (r.riders || []).filter((rider) => riderEligibleForStage(rider, stage));
}

export function favoritesForStage(stage, race) {
  const key = stage?.type || "flat";
  return ridersForStage(stage, race).sort((a, b) => (b.scores?.[key] ?? 0) - (a.scores?.[key] ?? 0));
}

const COUNTRY_CODES = {
  Australia: "AU", Austria: "AT", Belgium: "BE", Canada: "CA", Colombia: "CO",
  "Costa Rica": "CR", "Czech Republic": "CZ", Denmark: "DK", Ecuador: "EC",
  Eritrea: "ER", France: "FR", Germany: "DE", "Great Britain": "GB", Hungary: "HU",
  Ireland: "IE", Italy: "IT", Latvia: "LV", Mauritius: "MU", Mexico: "MX",
  Netherlands: "NL", "New Zealand": "NZ", Norway: "NO", Poland: "PL", Portugal: "PT",
  Slovenia: "SI", "South Africa": "ZA", Spain: "ES", Sweden: "SE", Switzerland: "CH",
  "United States": "US",
};

export function countryFlag(country) {
  const code = COUNTRY_CODES[country];
  if (!code) return "";
  return String.fromCodePoint(...[...code].map((c) => 127397 + c.charCodeAt(0)));
}

export function pcsUrl(rider) {
  return "https://www.procyclingstats.com/rider/" + rider.pcsSlug;
}

// Riders sorted from most to least suited to a given stage type.
export function favoritesForType(type, race) {
  return [...(race || ACTIVE).riders].sort((a, b) => (b.scores[type] ?? 0) - (a.scores[type] ?? 0));
}

// ---------------------------------------------------------------------------
// Teams
// ---------------------------------------------------------------------------
const TEAM_COLORS = {
  "UAE Team Emirates XRG": ["#ffffff", "#111111"],
  "Team Visma | Lease a Bike": "#f4e300",
  "Movistar Team": "#0f52ba",
  "Soudal Quick-Step": "#0093d0",
  "Red Bull - BORA Hansgrohe": ["#0a1a3c", "#d6001c"],
  "Netcompany INEOS": "#5bc2e7",
  "Alpecin Premier Tech": ["#0b1f33", "#00c2de"],
  "Lidl Trek": "#c8102e",
  "Lotto Intermarché": "#ff6a00",
  "Team Jayco AlUla": ["#0b6e4f", "#ffc72c"],
  "Decathlon CMA CGM Team": "#0086a8",
  "EF Education EasyPost": "#ff1d8e",
  "Groupama FDJ United": "#7a1f2b",
  "Bahrain Victorious": ["#a6192e", "#c9a227"],
  "Pinarello - Q36.5 Pro Cycling Team": "#2b2b2b",
  "Tudor Pro Cycling Team": ["#1a1a1a", "#c5a572"],
  "NSN Cycling Team": "#00a86b",
  "Team Picnic PostNL": ["#f5821f", "#003da5"],
  "Uno-X Mobility": "#e2001a",
  "XDS Astana Team": ["#00b4d8", "#ffda4d"],
  "Caja Rural Seguros RGA": "#1b5e20",
  "Cofidis": "#b8002e",
  "TotalEnergies": "#1c3f94",
  // National teams (World Championships)
  "Australia": "#00843d",
  "Austria": "#ed2939",
  "Belgium": "#111111",
  "Canada": "#d80621",
  "Colombia": "#fcd116",
  "Costa Rica": "#002b7f",
  "Czech Republic": "#11457e",
  "Denmark": "#c60c30",
  "Ecuador": "#ffd100",
  "Eritrea": "#4189dd",
  "France": "#0055a4",
  "Germany": "#111111",
  "Great Britain": "#012169",
  "Hungary": "#436f4d",
  "Ireland": "#169b62",
  "Italy": "#009246",
  "Latvia": "#9e3039",
  "Mauritius": "#ea2839",
  "Mexico": "#006847",
  "Netherlands": "#f58220",
  "New Zealand": "#111111",
  "Norway": "#ba0c2f",
  "Poland": "#dc143c",
  "Portugal": "#046a38",
  "Slovenia": "#005da4",
  "South Africa": "#007749",
  "Spain": "#aa151b",
  "Sweden": "#006aa7",
  "Switzerland": "#d52b1e",
  "United States": "#3c3b6e",
};

// Returns a CSS background value: a solid colour, or a left/right split
// gradient for two-colour teams.
export function teamColor(teamName) {
  const c = TEAM_COLORS[teamName];
  if (!c) return "#999999";
  if (Array.isArray(c)) {
    return "linear-gradient(90deg, " + c[0] + " 0%, " + c[0] + " 50%, " + c[1] + " 50%, " + c[1] + " 100%)";
  }
  return c;
}

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

// A soft, low-opacity tint of the team's own colour, for card backgrounds.
export function teamPastelBg(teamName) {
  const c = TEAM_COLORS[teamName];
  if (!c) return "rgba(150, 150, 150, 0.08)";
  const base = Array.isArray(c) ? c[0] : c;
  return hexToRgba(base, 0.1);
}

export function teamsList(race) {
  const r = race || ACTIVE;
  const map = {};
  (r.teams || []).forEach((team) => {
    map[team] = [];
  });
  (r.riders || []).forEach((rider) => {
    if (!map[rider.team]) map[rider.team] = [];
    map[rider.team].push(rider);
  });
  return Object.entries(map)
    .map(([team, riders]) => ({ team, riders: riders.sort((a, b) => a.name.localeCompare(b.name)) }))
    .sort((a, b) => a.team.localeCompare(b.team));
}

export function isTeamOfficial(team, race) {
  const r = race || ACTIVE;
  const official = r.officialTeams || r.teams || [];
  return official.includes(team);
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------
// Correctly pick the stage winner = 10 points, 2nd = 5, 3rd = 2, else 0.
export function pointsForPick(pickId, result) {
  if (!result || !pickId) return 0;
  if (pickId === result.first) return 10;
  if (pickId === result.second) return 5;
  if (pickId === result.third) return 2;
  return 0;
}

// ---------------------------------------------------------------------------
// Timing
// ---------------------------------------------------------------------------
// Builds a stage's real start instant using the RACE's own fixed UTC offset.
// Without this, "new Date(date + 'T' + time)" would be parsed in each visitor's
// local timezone rather than race-local time, silently shifting every countdown
// and lock time for anyone outside that zone. This is the single place that
// converts a stage into an absolute instant.
export function stageStartDate(stage, race) {
  const offset = (race || ACTIVE).utcOffset || "+02:00";
  return new Date(stage.date + "T" + stage.startTime + ":00" + offset);
}

// Picks lock 1 hour before the real start.
export function stageIsLocked(stage, now, race) {
  const current = now || new Date();
  const lockTime = new Date(stageStartDate(stage, race).getTime() - 60 * 60 * 1000);
  return current >= lockTime;
}

// Jersey predictions stay open until 1h before the race's jerseyLockStage.
// Returns null for races with no jerseys (one-day races, classics).
export function jerseyLockDate(race) {
  const r = race || ACTIVE;
  if (!hasJerseys(r)) return null;
  const target = r.stages.find((s) => s.n === r.jerseyLockStage) || r.stages[0];
  return new Date(stageStartDate(target, r).getTime() - 60 * 60 * 1000);
}

export function jerseyPredictionsLocked(now, race) {
  const lock = jerseyLockDate(race);
  if (!lock) return true;
  return (now || new Date()) >= lock;
}

export function totalKm(race) {
  return Math.round((race || ACTIVE).stages.reduce((sum, s) => sum + s.km, 0));
}

export function kmCompleted(now, race) {
  const r = race || ACTIVE;
  const prev = previousStage(now, r);
  if (!prev) return 0;
  return Math.round(r.stages.filter((s) => s.n <= prev.n).reduce((sum, s) => sum + s.km, 0));
}

export function nextStage(now, race) {
  const r = race || ACTIVE;
  const current = now || new Date();
  return r.stages.find((s) => stageStartDate(s, r) > current) || null;
}

export function previousStage(now, race) {
  const r = race || ACTIVE;
  const current = now || new Date();
  const started = r.stages.filter((s) => stageStartDate(s, r) <= current);
  return started.length ? started[started.length - 1] : null;
}
