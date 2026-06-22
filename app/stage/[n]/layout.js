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
    title: "Stage " + stage.n + ": " + stage.from + " to " + stage.to,
    description:
      "Tour de France 2026 stage " + stage.n + " (" + stage.date.split("-").reverse().join("/") + "): " +
      stage.from + " to " + stage.to + ", " + stage.km + " km. Pick who you think will win.",
  };
}

export default function StageLayout({ children }) {
  return children;
}
