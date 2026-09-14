// app/es/stage/[n]/layout.js
import { STAGES, getActiveRace, localised } from "../../../../lib/data";

export function generateStaticParams() {
  return STAGES.map((s) => ({ n: String(s.n) }));
}

export function generateMetadata({ params }) {
  const n = parseInt(params.n, 10);
  const stage = STAGES.find((s) => s.n === n);
  if (!stage) {
    return { title: "Prueba no encontrada" };
  }

  // Both the event label and the race name come from the active race, so
  // switching races never leaves a stale title behind. Championship events
  // carry their own name; stage races fall back to "Etapa N".
  const race = getActiveRace();
  const raceName = localised(race.name, "es");
  const label = stage.eventName
    ? localised(stage.eventName, "es")
    : "Etapa " + stage.n + ": Perfil y Pronósticos";

  return {
    title: {
      absolute: label + " | " + raceName + " - Grand Tour Pool",
    },
    description:
      label + " — " + raceName + ": " + stage.from + " a " + stage.to + ", " + stage.km + " km" +
      (stage.elevationGain ? ", " + stage.elevationGain.toLocaleString() + " m de desnivel" : "") +
      " (" + stage.date.split("-").reverse().join("/") + "). Previa del recorrido, perfil y pronósticos gratis.",
  };
}

export default function StageLayout({ children }) {
  return children;
}
