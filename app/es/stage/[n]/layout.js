// app/es/stage/[n]/layout.js
import { STAGES } from "../../../../lib/data";

export function generateStaticParams() {
  return STAGES.map((s) => ({ n: String(s.n) }));
}

export function generateMetadata({ params }) {
  const n = parseInt(params.n, 10);
  const stage = STAGES.find((s) => s.n === n);
  if (!stage) {
    return { title: "Etapa no encontrada" };
  }
  return {
    title: "Etapa " + stage.n + ": " + stage.from + " a " + stage.to,
    description:
      "Tour de Francia 2026, etapa " + stage.n + " (" + stage.date.split("-").reverse().join("/") + "): " +
      stage.from + " a " + stage.to + ", " + stage.km + " km. Elige quién crees que ganará.",
  };
}

export default function StageLayout({ children }) {
  return children;
}
