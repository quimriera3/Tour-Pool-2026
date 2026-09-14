// components/StageFavourites.js
//
// Shows the top 5 riders suited to a stage's terrain, generated automatically
// from the scores already stored in lib/data.js. Adds unique, crawlable content
// to every stage page without any manual editing.
import { RIDERS, getActiveRace } from "../lib/data";

// Score key to use for each stage type
const SCORE_KEY = {
  flat: "flat",
  hills: "hills",
  mountains: "mountains",
  itt: "itt",
  ttt: "ttt",
};

// Specialty label per score key, per language
const SPECIALTY_LABEL = {
  en: { flat: "Sprinter", hills: "Puncheur", mountains: "Climber", itt: "Time triallist", ttt: "TTT specialist" },
  es: { flat: "Esprínter", hills: "Puncheur", mountains: "Escalador", itt: "Contrarrelojista", ttt: "Especialista TTT" },
};

// Human description of each stage type for the intro paragraph
// Stages whose climbing figure hasn't been published yet render without it
// rather than printing "null m".
function climb(stage, lang) {
  if (!stage.elevationGain) return "";
  const n = stage.elevationGain.toLocaleString();
  return lang === "es" ? ` con ${n} m de desnivel acumulado` : ` with ${n} m of cumulative climbing`;
}

const TYPE_INTRO = {
  en: {
    flat:      (stage) => `Stage ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) is a flat sprint stage${climb(stage, 'en')}. The peloton will almost certainly arrive together and the finish will come down to the pure sprinters and their lead-out trains.`,
    hills:     (stage) => `Stage ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) is a hilly stage${climb(stage, 'en')}. Puncheurs who can follow explosive accelerations on short, steep climbs will have the edge over flat-out sprinters.`,
    mountains: (stage) => `Stage ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) is a mountain stage${climb(stage, 'en')} — one of the race's queen stages. Pure climbers capable of sustaining high power output on long ascents are the ones to watch.`,
    itt:       (stage) => `Stage ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) is an individual time trial. Every rider races alone against the clock, so pure time-trial specialists and all-rounders with a powerful engine will shine, while climbers and sprinters are likely to lose time.`,
    ttt:       (stage) => `Stage ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) is a team time trial. Teams race together and the result is taken on the fifth rider to cross the line. Teams with a full complement of strong diesels and excellent synchronisation will gain precious seconds on GC rivals.`,
  },
  es: {
    flat:      (stage) => `La etapa ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) es una etapa llana de esprín${climb(stage, 'es')}. El pelotón llegará casi con toda seguridad junto y la decisión caerá en manos de los esprínters puros y sus trenes de lanzamiento.`,
    hills:     (stage) => `La etapa ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) es una etapa de media montaña${climb(stage, 'es')}. Los puncheurs capaces de seguir aceleraciones explosivas en repechos cortos y pronunciados tendrán ventaja sobre los esprínters puros.`,
    mountains: (stage) => `La etapa ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) es una etapa de alta montaña${climb(stage, 'es')}, una de las reinas de la carrera. Los escaladores puros capaces de mantener una alta potencia en subidas largas son los grandes favoritos.`,
    itt:       (stage) => `La etapa ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) es una contrarreloj individual. Cada corredor compite solo contra el cronómetro, por lo que los especialistas de la crono y los rodadores con un motor poderoso brillarán, mientras que escaladores y esprínters tenderán a perder tiempo.`,
    ttt:       (stage) => `La etapa ${stage.n} (${stage.from} → ${stage.to}, ${stage.km} km) es una contrarreloj por equipos. Los equipos corren juntos y el tiempo se toma sobre el quinto corredor que cruza la línea. Los equipos con un bloque sólido de rodadores y una excelente sincronización ganarán segundos valiosos a sus rivales en la general.`,
  },
};

const WHAT_TO_WATCH = {
  en: {
    flat:      "Watch for the lead-out trains forming in the final 3 km, and for any crosswind splits that might splinter the peloton before the sprint.",
    hills:     "Watch for lone attacks on the final climb, or a reduced sprint between a small group of survivors off the last ascent.",
    mountains: "The real race begins on the final climb. Any rider distanced before the summit will lose significant time on GC rivals.",
    itt:       "Riders start at two-minute intervals. Check the intermediate time splits at the halfway point to follow the gaps live.",
    ttt:       "Teams must keep together as long as possible before the strongest riders push to the line. Dropping even one team member early can cost seconds.",
  },
  es: {
    flat:      "Hay que estar atentos a los trenes de lanzamiento formándose en los últimos 3 km, y a cualquier abanico por viento que pueda romper el pelotón antes del esprín final.",
    hills:     "Hay que vigilar los ataques en solitario en la última subida o un esprín reducido entre los supervivientes del último repecho.",
    mountains: "La carrera real comienza en el último ascenso. Cualquier corredor que se descuelgue antes de la cima perderá tiempo considerable frente a sus rivales en la general.",
    itt:       "Los corredores salen con intervalos de dos minutos. Sigue las diferencias en los controles de tiempo a mitad de recorrido para seguir la clasificación en directo.",
    ttt:       "Los equipos deben mantenerse juntos el mayor tiempo posible antes de que los más fuertes tiren hacia la meta. Perder a un compañero pronto puede costar segundos decisivos.",
  },
};

const HEADING = {
  en: "Stage favourites",
  es: "Favoritos de la etapa",
};
const BASED_ON = {
  en: "Ranked by suitability for this stage's terrain",
  es: "Clasificados por adecuación al terreno de esta etapa",
};

export default function StageFavourites({ stage, lang = "en", race }) {
  const key = SCORE_KEY[stage.type] || "flat";
  const specialties = SPECIALTY_LABEL[lang] || SPECIALTY_LABEL.en;
  const intros = TYPE_INTRO[lang] || TYPE_INTRO.en;
  const watches = WHAT_TO_WATCH[lang] || WHAT_TO_WATCH.en;

  const pool = race ? race.riders : RIDERS;
  const top5 = [...pool]
    .sort((a, b) => (b.scores?.[key] || 0) - (a.scores?.[key] || 0))
    .slice(0, 5);

  // No startlist published yet -- show the terrain analysis but no rider
  // ranking, rather than an empty list.
  const hasRiders = top5.length > 0;

  return (
    <section
      className="card"
      style={{ marginTop: 16 }}
      aria-labelledby={"stage-favs-" + stage.n}
    >
      <h2 id={"stage-favs-" + stage.n} style={{ fontSize: 15 }}>
        {HEADING[lang] || HEADING.en}
      </h2>

      <p className="subtitle" style={{ marginTop: 10 }}>
        {intros[stage.type]?.(stage)}
      </p>

      {hasRiders && (
      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 8 }}>
        {top5.map((rider, i) => (
          <div
            key={rider.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 8,
              background: i === 0 ? "#fffae8" : "var(--off-white, #f9f9f9)",
              borderLeft: i === 0 ? "3px solid var(--accent)" : "3px solid transparent",
            }}
          >
            <span style={{ fontWeight: 900, fontSize: 13, color: i === 0 ? "#9a7d00" : "#aaa", minWidth: 18 }}>
              {i + 1}
            </span>
            <div style={{ flex: 1 }}>
              <span style={{ fontWeight: 700, fontSize: 13 }}>{rider.name}</span>
              <span style={{ fontSize: 11, color: "#999", marginLeft: 8 }}>{rider.team}</span>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                background: "#111",
                color: "var(--accent)",
                borderRadius: 20,
                padding: "3px 9px",
              }}
            >
              {specialties[key]}
            </span>
          </div>
        ))}
      </div>
      )}

      <p className="subtitle" style={{ marginTop: 14, fontSize: 12, color: "#888", fontStyle: "italic" }}>
        ⚡ {watches[stage.type]}
      </p>

      {hasRiders && (
        <p style={{ marginTop: 6, fontSize: 11, color: "#ccc" }}>
          {BASED_ON[lang] || BASED_ON.en}
        </p>
      )}
    </section>
  );
}
