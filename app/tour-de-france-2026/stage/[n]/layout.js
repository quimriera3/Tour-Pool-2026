// app/tour-de-france-2026/stage/[n]/layout.js
import { getRace } from "../../../../lib/races";

const RACE = getRace("tour-de-france-2026");

export function generateStaticParams() {
  return RACE.stages.map((s) => ({ n: String(s.n) }));
}

export function generateMetadata({ params }) {
  const n = parseInt(params.n, 10);
  const stage = RACE.stages.find((s) => s.n === n);
  if (!stage) return { title: "Stage not found" };

  return {
    title: {
      absolute: `Stage ${stage.n}: ${stage.from} to ${stage.to} | Tour de France 2026 - Grand Tour Pool`,
    },
    description:
      `Tour de France 2026 Stage ${stage.n}: ${stage.from} to ${stage.to} (${stage.km} km, ` +
      `${stage.date.split("-").reverse().join("/")}). Stage profile, route preview and final result.`,
    alternates: {
      canonical: `/tour-de-france-2026/stage/${stage.n}`,
    },
  };
}

export default function ArchivedStageLayout({ children }) {
  return children;
}
