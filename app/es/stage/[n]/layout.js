import { getRace, localised } from "../../../../lib/races";
const RACE = getRace("worlds-2026");
export function generateStaticParams() { return RACE.stages.map((s) => ({ n: String(s.n) })); }
export function generateMetadata({ params }) {
  const stage = RACE.stages.find((s) => s.n === Number(params.n));
  if (!stage) return { title: "Prueba no encontrada" };
  const label = localised(stage.eventName, "es") || `Prueba ${stage.n}`;
  return { title: { absolute: `${label} | Mundial de Ciclismo 2026` }, description: `${label} en Montreal: ${stage.km} km${stage.elevationGain ? ` y ${stage.elevationGain.toLocaleString("es-ES")} m de desnivel` : ""}. Previa original, favoritos y predicción gratis.`, alternates: { canonical: `/es/stage/${stage.n}`, languages: { en: `/stage/${stage.n}`, es: `/es/stage/${stage.n}` } } };
}
export default function Layout({ children }) { return children; }
