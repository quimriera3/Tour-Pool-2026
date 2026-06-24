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
    title: {
      absolute: `Etapa ${stage.n}: Perfil y Pronósticos | Tour de Francia 2026 - Grand Tour Pool`,
    },
    description:
      `Pronósticos etapa ${stage.n} del Tour de Francia 2026: ${stage.from} a ${stage.to} (${stage.km} km, ` +
      `${stage.date.split("-").reverse().join("/")}). Perfil de la etapa, desnivel y elige tu corredor ganador gratis.`,
  };
}

export default function StageLayout({ children }) {
  return children;
}
