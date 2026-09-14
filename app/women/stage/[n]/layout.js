// app/women/stage/[n]/layout.js
import { getRace, localised } from "../../../../lib/races";

const RACE = getRace("worlds-2026-women");

export function generateStaticParams() {
  return RACE.stages.map((s) => ({ n: String(s.n) }));
}

export function generateMetadata({ params }) {
  const n = parseInt(params.n, 10);
  const stage = RACE.stages.find((s) => s.n === n);
  if (!stage) return { title: "Race not found" };

  const raceName = localised(RACE.name, "en");
  const label = stage.eventName ? localised(stage.eventName, "en") : "Race " + stage.n;

  return {
    title: { absolute: label + " | " + raceName + " - Grand Tour Pool" },
    description:
      label + " — " + raceName + ": " + stage.from + " to " + stage.to + ", " + stage.km + " km" +
      (stage.elevationGain ? ", " + stage.elevationGain.toLocaleString() + " m of climbing" : "") +
      " (" + stage.date.split("-").reverse().join("/") + "). Route preview, profile and free predictions.",
    alternates: { canonical: "/women/stage/" + stage.n },
  };
}

export default function WomenStageLayout({ children }) {
  return children;
}
