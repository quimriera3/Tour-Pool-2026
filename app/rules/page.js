"use client";

import { useLang } from "../../lib/i18n";
import { useRace } from "../../lib/useRace";
import { hasJerseys, isChampionship, localised } from "../../lib/races";

function Rule({ n, title, children }) {
  return <div className="rule-item"><span className="rule-number">{n}</span><div><h2>{title}</h2><div className="rule-body">{children}</div></div></div>;
}

export default function Rules() {
  const lang = useLang();
  const race = useRace();
  const championship = isChampionship(race);
  const jerseys = hasJerseys(race);
  const es = lang === "es";

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{es ? "Reglas del juego" : "Game rules"}</span>
        <h1>{es ? "Normas y puntuación" : "Rules & scoring"}</h1>
        <p className="subtitle">{localised(race.name, lang)} · {es ? "versión vigente" : "current rules"}</p>
      </div>

      <div className="rules-list">
        <Rule n="01" title={es ? "Qué tienes que predecir" : "What you predict"}>
          <p>{championship
            ? (es ? `Elige un ganador para cada una de las ${race.stages.length} pruebas élite de esta categoría. Cada prueba es independiente.` : `Pick one winner for each of the ${race.stages.length} elite events in this category. Each event is independent.`)
            : (es ? `Elige un ganador para cada etapa de ${localised(race.name, lang)}.` : `Pick one winner for every stage of ${localised(race.name, lang)}.`)}</p>
          {jerseys && <p>{es ? "También puedes predecir las clasificaciones finales disponibles antes de su fecha límite." : "You can also predict the available final classifications before their deadline."}</p>}
        </Rule>

        <Rule n="02" title={es ? "Cómo se consiguen puntos" : "How scoring works"}>
          <div className="score-explainer"><span><strong>10</strong>{es ? "Ganador" : "Winner"}</span><span><strong>5</strong>{es ? "2º" : "2nd"}</span><span><strong>2</strong>{es ? "3º" : "3rd"}</span><span><strong>0</strong>{es ? "Fuera del podio" : "Outside podium"}</span></div>
          {jerseys && <p>{es ? "Cada clasificación final acertada suma 10 puntos adicionales." : "Each correctly predicted final classification adds 10 points."}</p>}
        </Rule>

        <Rule n="03" title={es ? "Cuándo se cierran los picks" : "When picks lock"}>
          <p>{es ? "Cada pick se cierra exactamente una hora antes de la hora oficial de salida de su prueba. Hasta ese momento puedes cambiarlo tantas veces como quieras." : "Every pick locks exactly one hour before the event's official start time. Until then, you can change it as many times as you like."}</p>
          <p>{es ? "La hora de cierre que muestra la web es la que manda para el juego." : "The lock time shown on the site is the deadline used for the game."}</p>
        </Rule>

        <Rule n="04" title={es ? "Guardado de predicciones" : "Saving your picks"}>
          <p>{es ? "No hay botón de enviar. Al elegir un corredor, la web guarda el pick automáticamente y muestra el estado Guardado ✓. Si aparece un error, el cambio no cuenta hasta que se guarde correctamente." : "There is no submit button. Choosing a rider saves the pick automatically and the site shows Saved ✓. If an error appears, the change does not count until it saves successfully."}</p>
        </Rule>

        <Rule n="05" title={es ? "Empates" : "Ties"}>
          <p>{es ? "Si dos jugadores terminan con los mismos puntos, queda por delante quien haya acertado más ganadores. Si sigue el empate, manda el mayor número de podios acertados. Si todavía siguen empatados, comparten posición; cualquier premio afectado se resolverá mediante un sorteo transparente entre los jugadores empatados." : "If players finish level on points, the first tiebreak is more correct winners, then more total podium hits. If they are still level, they share the same rank; any affected prize will be decided by a transparent draw between the tied players."}</p>
        </Rule>

        <Rule n="06" title={es ? "Resultados y correcciones" : "Results & corrections"}>
          <p>{es ? "La clasificación se actualiza cuando el administrador introduce el podio oficial. Si una sanción o corrección oficial cambia el resultado, Grand Tour Pool puede corregirlo y recalcular la puntuación." : "The leaderboard updates when the administrator enters the official podium. If an official sanction or correction changes the result, Grand Tour Pool may correct it and recalculate points."}</p>
        </Rule>

        <Rule n="07" title={es ? "Premios" : "Prizes"}>
          <p>{es ? "Los tres primeros de la clasificación final reciben premios de material de ciclismo. No hay cuota de inscripción ni compra necesaria." : "The final top three receive cycling-gear prizes. There is no entry fee and no purchase is required."}</p>
        </Rule>

        <Rule n="08" title={es ? "Juego limpio" : "Fair play"}>
          <p>{es ? "Una persona, una cuenta. El organizador puede excluir cuentas duplicadas, automatizadas o claramente abusivas para proteger la competición." : "One person, one account. The organiser may remove duplicate, automated or clearly abusive accounts to protect the competition."}</p>
        </Rule>
      </div>
    </div>
  );
}
