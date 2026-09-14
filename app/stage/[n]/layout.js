import { getRace, localised } from "../../../lib/races";
const RACE = getRace("worlds-2026");
export function generateStaticParams() { return RACE.stages.map((s) => ({ n: String(s.n) })); }
export function generateMetadata({ params }) {
  const stage = RACE.stages.find((s) => s.n === Number(params.n));
  if (!stage) return { title: "Event not found" };
  const label = localised(stage.eventName, "en") || `Event ${stage.n}`;
  return {
    title: { absolute: `${label} | Road World Championships 2026` },
    description: `${label} in Montreal: ${stage.km} km${stage.elevationGain ? `, ${stage.elevationGain.toLocaleString("en-US")} m of climbing` : ""}. Original route preview, favourites and free winner prediction.`,
    alternates: { canonical: `/stage/${stage.n}`, languages: { en: `/stage/${stage.n}`, es: `/es/stage/${stage.n}` } },
  };
}
export default function Layout({ children }) { return children; }
