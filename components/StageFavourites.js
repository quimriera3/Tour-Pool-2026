import { RIDERS } from "../lib/data";
import { isChampionship, localised } from "../lib/races";

const SCORE_KEY = { flat: "flat", hills: "hills", mountains: "mountains", itt: "itt", ttt: "ttt" };
const SPECIALTY = {
  en: { flat: "Sprinter", hills: "Puncheur", mountains: "Climber", itt: "Time triallist", ttt: "TT specialist" },
  es: { flat: "Esprínter", hills: "Puncheur", mountains: "Escalador", itt: "Contrarrelojista", ttt: "Especialista crono" },
};

function terrainIntro(stage, lang, championship) {
  const climbing = stage.elevationGain ? (lang === "es" ? ` y ${stage.elevationGain.toLocaleString()} m de desnivel` : ` and ${stage.elevationGain.toLocaleString()} m of climbing`) : "";
  if (championship) {
    if (stage.type === "itt") return lang === "es"
      ? `Una contrarreloj individual de ${stage.km} km${climbing}: una prueba de potencia sostenida, aerodinámica, ritmo y ejecución técnica.`
      : `A ${stage.km} km individual time trial${climbing}: a test of sustained power, aerodynamics, pacing and technical execution.`;
    if (stage.type === "hills") return lang === "es"
      ? `Una prueba en ruta de ${stage.km} km${climbing}. El desgaste de las subidas repetidas favorece a corredores explosivos que conservan potencia tras muchas horas.`
      : `A ${stage.km} km road race${climbing}. Repeated climbing rewards explosive riders who can still produce power after a long day.`;
  }
  const label = lang === "es" ? `La etapa ${stage.n}` : `Stage ${stage.n}`;
  if (stage.type === "flat") return lang === "es" ? `${label} es llana y favorece a los velocistas.` : `${label} is flat and favours the sprinters.`;
  if (stage.type === "mountains") return lang === "es" ? `${label} es de montaña y favorece a los escaladores.` : `${label} is a mountain stage and favours climbers.`;
  if (stage.type === "itt") return lang === "es" ? `${label} es una contrarreloj individual.` : `${label} is an individual time trial.`;
  return lang === "es" ? `${label} es quebrada y favorece a los puncheurs.` : `${label} is hilly and favours puncheurs.`;
}

export default function StageFavourites({ stage, lang = "en", race }) {
  const key = SCORE_KEY[stage.type] || "flat";
  const pool = race ? race.riders : RIDERS;
  const top5 = [...pool].sort((a, b) => (b.scores?.[key] || 0) - (a.scores?.[key] || 0)).slice(0, 5);
  const championship = race ? isChampionship(race) : false;
  const heading = championship
    ? (lang === "es" ? "Quién encaja mejor con el recorrido" : "Who suits this course")
    : (lang === "es" ? "Favoritos de la etapa" : "Stage favourites");

  return (
    <section className="card favourites-card" style={{ marginTop: 16 }} aria-labelledby={"stage-favs-" + stage.n}>
      <h2 id={"stage-favs-" + stage.n}>{heading}</h2>
      <p className="subtitle" style={{ marginTop: 10 }}>{terrainIntro(stage, lang, championship)}</p>
      {top5.length > 0 ? (
        <div className="favourites-list">
          {top5.map((rider, i) => (
            <div key={rider.id} className={"favourite-row" + (i === 0 ? " top" : "")}>
              <span className="favourite-rank">{i + 1}</span>
              <div><strong>{rider.name}</strong><small>{rider.team}</small></div>
              <span className="specialty-tag">{(SPECIALTY[lang] || SPECIALTY.en)[key]}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="data-note" style={{ marginTop: 14 }}>{lang === "es" ? "Añadiremos el ranking de favoritas cuando la lista de salida esté confirmada." : "We will add the rider ranking when the startlist is confirmed."}</p>
      )}
      {stage.eventName && <p className="data-note">{lang === "es" ? "Ranking editorial basado en el perfil del recorrido; no es una clasificación oficial." : "Editorial course-fit ranking; not an official ranking."}</p>}
    </section>
  );
}
