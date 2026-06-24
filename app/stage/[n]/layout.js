// app/stage/[n]/layout.js
import { STAGES } from "../../../lib/data";

export function generateStaticParams() {
  return STAGES.map((s) => ({ n: String(s.n) }));
}

export function generateMetadata({ params }) {
  const n = parseInt(params.n, 10);
  const stage = STAGES.find((s) => s.n === n);
  if (!stage) {
    return { title: "Stage not found" };
  }
  return {
    title: {
      absolute: `Stage ${stage.n} Profile & Predictions | Tour de France 2026 - Grand Tour Pool`,
    },
    description:
      `Predict Tour de France 2026 Stage ${stage.n}: ${stage.from} to ${stage.to} (${stage.km} km, ` +
      `${stage.date.split("-").reverse().join("/")}). Free stage profile, elevation, and rider picks for the best Tour de France pool online.`,
  };
}

export default function StageLayout({ children }) {
  return children;
}
