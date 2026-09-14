import { getRace, localised } from "../../../../../lib/races";
const RACE = getRace("worlds-2026-women");
export function generateStaticParams() { return RACE.stages.map((s) => ({ n: String(s.n) })); }
export function generateMetadata({ params }) {
  const stage = RACE.stages.find((s) => s.n === Number(params.n));
  if (!stage) return { title: "Prueba no encontrada" };
  const label = localised(stage.eventName, "es") || `Prueba ${stage.n}`;
  return { title: { absolute: `${label} | Mundial de Ciclismo Femenino 2026` }, description: `${label}: ${stage.km} km${stage.elevationGain ? ` y ${stage.elevationGain.toLocaleString("es-ES")} m de desnivel` : ""}. Previa y predicción gratis.`, alternates: { canonical: `/es/women/stage/${stage.n}`, languages: { en: `/women/stage/${stage.n}`, es: `/es/women/stage/${stage.n}` } } };
}
export default function Layout({ children }) { return children; }
