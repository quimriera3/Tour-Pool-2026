// app/stage/[n]/layout.js
import { STAGES, getActiveRace, localised } from "../../../lib/data";

export function generateStaticParams() {
  return STAGES.map((s) => ({ n: String(s.n) }));
}

export function generateMetadata({ params }) {
  const n = parseInt(params.n, 10);
  const stage = STAGES.find((s) => s.n === n);
  if (!stage) {
    const race = getActiveRace();
  const raceName = localised(race.name, "en");
  const label = stage.eventName
    ? localised(stage.eventName, "en")
    : `Stage ${stage.n} Profile & Predictions`;

  return { title: "Stage not found" };
  }
  const race = getActiveRace();
  const raceName = localised(race.name, "en");
  const label = stage.eventName
    ? localised(stage.eventName, "en")
    : `Stage ${stage.n} Profile & Predictions`;

  return {
    // Event name and race name both come from the active race, so switching
    // races never leaves a stale title behind.
    title: {
      absolute: `${label} | ${raceName} - Grand Tour Pool`,
    },
    description:
      `Predict La Vuelta 2026 Stage ${stage.n}: ${stage.from} to ${stage.to} (${stage.km} km, ` +
      `${stage.date.split("-").reverse().join("/")}). Free stage profile, route details, and rider picks for the best Vuelta pool online.`,
  };
}

export default function StageLayout({ children }) {
  return children;
}
