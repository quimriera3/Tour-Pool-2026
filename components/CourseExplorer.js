"use client";

import { localised } from "../lib/races";

const UCI_COURSE_SOURCE = "https://www.uci.org/pressrelease/200-days-to-go-a-look-at-the-courses-of-the-2026-uci-road-world/7MNCbBHZySudjNAoDW4R8x";
const MONTREAL_RESOURCES = "https://www.montreal2026.org/en/media-library/";

// Real course visuals. Route maps are the UCI/Cycling Canada course artwork
// distributed around the original course launch. Current official metrics are
// always rendered from our race registry above the image, so stale labels in an
// older artwork release never drive the game data.
const COURSE_MEDIA = {
  men: {
    roadMap: "https://cdn.mos.cms.futurecdn.net/WqUcGQBvnZCyoYbUBK6nTJ.png",
    roadMapSource: "https://www.cyclingnews.com/races/uci-road-world-championships-2026-2026/map/",
  },
  women: {
    roadMap: "https://cdn.mos.cms.futurecdn.net/RvHBACDhveKiG4pBjsbA3J.png",
    roadMapSource: "https://www.cyclingnews.com/races/uci-road-world-championships-2026-2026/map/",
  },
  shared: {
    ttMap: "https://cdn.mos.cms.futurecdn.net/AhF5CPNUnhf4SMgss4QFiJ.png",
    ttMapSource: "https://www.cyclingnews.com/races/uci-road-world-championships-2026-2026/map/",
    ttProfile: "https://cyclingoo.com/storage/media/stages/profiles/9DhwPkBplqmgVzaEBaWAvcocNuT7LCQnAQ3GBMcT.jpg",
    ttProfileSource: "https://cyclingoo.com/en/race/uci-road-world-championships-2026/485",
    menRoadProfile: "https://www.procyclingstats.com/images/profiles/ap/bd/world-championship-2026-result-profile-e4e3872df654d1346a6d.jpg",
    menRoadProfileSource: "https://www.procyclingstats.com/race/world-championship/2026/result/info/profiles",
    womenRoadProfile: "https://d3g42de5vbfx19.cloudfront.net/competitions/6925ccd5734529d85ec0d1bf/stages/I5xbeF-stage_undefined_profile.png",
    womenRoadProfileSource: "https://cyclingfantasy.cc/en/race/uci-road-world-championships-women-irr/2026/route-and-favourites",
  },
};

function MediaCredit({ children, href, lang }) {
  return (
    <div className="course-real-credit">
      <span>{children}</span>
      <a href={href} target="_blank" rel="noreferrer">
        {lang === "es" ? "Ver fuente" : "View source"} ↗
      </a>
    </div>
  );
}

function RealCourseMap({ race, stage, lang }) {
  const road = stage.type === "hills";
  const women = race.category === "women";
  const src = road
    ? (women ? COURSE_MEDIA.women.roadMap : COURSE_MEDIA.men.roadMap)
    : COURSE_MEDIA.shared.ttMap;
  const source = road
    ? (women ? COURSE_MEDIA.women.roadMapSource : COURSE_MEDIA.men.roadMapSource)
    : COURSE_MEDIA.shared.ttMapSource;

  return (
    <div className="course-real-shell">
      <div className={`course-real-map-frame ${road ? "is-road" : "is-tt"}`}>
        <img
          className="course-real-img"
          src={src}
          alt={road
            ? (lang === "es" ? "Mapa real del recorrido de la prueba en ruta de Montreal 2026" : "Real route map for the Montréal 2026 road race")
            : (lang === "es" ? "Mapa real del recorrido de la contrarreloj de Montreal 2026" : "Real route map for the Montréal 2026 individual time trial")}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>
      <MediaCredit href={source} lang={lang}>
        {lang === "es" ? "Mapa oficial UCI / Cycling Canada" : "Official UCI / Cycling Canada route map"}
      </MediaCredit>
    </div>
  );
}

function RealCourseProfile({ race, stage, lang }) {
  const road = stage.type === "hills";
  const women = race.category === "women";

  if (!road) {
    return (
      <div className="course-real-shell">
        <div className="course-real-profile-frame is-tt-profile">
          <img
            className="course-real-profile-img"
            src={COURSE_MEDIA.shared.ttProfile}
            alt={lang === "es" ? "Perfil real de la contrarreloj de Montreal 2026" : "Real elevation profile of the Montréal 2026 time trial"}
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
          />
        </div>
        <MediaCredit href={COURSE_MEDIA.shared.ttProfileSource} lang={lang}>
          {women
          ? (lang === "es" ? "Perfil publicado · élite femenina" : "Published profile · elite women")
          : (lang === "es" ? "Perfil publicado · élite masculina" : "Published profile · elite men")}
        </MediaCredit>
      </div>
    );
  }

  const profileSrc = women ? COURSE_MEDIA.shared.womenRoadProfile : COURSE_MEDIA.shared.menRoadProfile;
  const profileSource = women ? COURSE_MEDIA.shared.womenRoadProfileSource : COURSE_MEDIA.shared.menRoadProfileSource;

  return (
    <div className="course-real-shell">
      <div className="course-real-road-profile">
        <img
          className="course-real-road-profile-img"
          src={profileSrc}
          alt={women
            ? (lang === "es" ? "Perfil real de la prueba femenina en ruta de Montreal 2026" : "Real profile of the Montréal 2026 women's road race")
            : (lang === "es" ? "Perfil real de la prueba masculina en ruta de Montreal 2026" : "Real profile of the Montréal 2026 men's road race")}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
        />
      </div>
      <MediaCredit href={profileSource} lang={lang}>
        {women
          ? (lang === "es" ? "Perfil publicado · élite femenina" : "Published profile · elite women")
          : (lang === "es" ? "Perfil publicado · élite masculina" : "Published profile · elite men")}
      </MediaCredit>
    </div>
  );
}

function Stat({ label, value, detail }) {
  return <div className="course-stat"><small>{label}</small><strong>{value}</strong>{detail ? <span>{detail}</span> : null}</div>;
}

export default function CourseExplorer({ stage, race, lang = "en" }) {
  if (!stage || !race || race.type !== "championship") return null;
  const road = stage.type === "hills";
  const women = race.category === "women";
  const laps = women ? 8 : 12;

  const story = road
    ? (women
      ? [
          ["Brossard", lang === "es" ? "Salida al sur de Montreal y aproximación por Carignan, Chambly y Richelieu." : "Start south of Montréal, then the approach through Carignan, Chambly and Richelieu."],
          ["Samuel-De Champlain", lang === "es" ? "Cruce del San Lorenzo y entrada al tramo urbano decisivo." : "Cross the St. Lawrence and enter the decisive urban section."],
          ["Mount Royal", lang === "es" ? "8 vueltas: Camillien-Houde, Polytechnique y Avenue du Parc." : "8 laps: Camillien-Houde, Polytechnique and Avenue du Parc."],
        ]
      : [
          ["Montérégie", lang === "es" ? "Más de cien kilómetros de aproximación por la ribera sur antes del circuito." : "A long South Shore approach before the finishing circuit."],
          ["Samuel-De Champlain", lang === "es" ? "La carrera cruza el río y entra a Montreal para la parte más selectiva." : "The race crosses the river into Montréal for its most selective phase."],
          ["Mount Royal", lang === "es" ? "12 vueltas y desgaste acumulado: aquí se decide el arcoíris." : "12 laps of accumulated attrition: this is where the rainbow jersey is decided."],
        ])
    : [
        ["Old Montréal", lang === "es" ? "Tramo urbano con ritmo y cambios de dirección antes de abrir gas." : "An urban section where rhythm and positioning matter before the course opens up."],
        ["Gilles-Villeneuve", lang === "es" ? "Asfalto rápido y aerodinámico en el circuito de Fórmula 1." : "Fast, aerodynamic roads on the Formula 1 circuit."],
        ["Avenue du Parc", lang === "es" ? "Regreso hacia el centro y llegada común del Mundial." : "The return into the city and the Championships' shared finish."],
      ];

  return (
    <section className="course-explorer course-explorer--real" aria-labelledby={`course-explorer-${stage.n}`}>
      <div className="course-explorer-head">
        <div>
          <span className="eyebrow">{lang === "es" ? "RECORRIDO" : "COURSE INTEL"}</span>
          <h2 id={`course-explorer-${stage.n}`}>{road ? (lang === "es" ? "El recorrido que decidirá el arcoíris" : "The course that decides the rainbow jersey") : (lang === "es" ? "La contrarreloj, punto por punto" : "The time trial, point by point")}</h2>
          <p className="course-explorer-deck">
            {road
              ? (lang === "es" ? "Mapa y perfil reales del recorrido, con las cifras oficiales actualizadas de la UCI." : "Real route map and elevation profile, paired with the latest official UCI race metrics.")
              : (lang === "es" ? "El trazado real de 39,2 km por Montreal y su perfil: rápido, técnico y con 220 m de desnivel." : "The real 39.2 km Montréal course and its elevation profile: fast, technical and 220 m of climbing.")}
          </p>
        </div>
        <div className="course-source-links">
          <a href={UCI_COURSE_SOURCE} target="_blank" rel="noreferrer">UCI ↗</a>
          <a href={MONTREAL_RESOURCES} target="_blank" rel="noreferrer">{lang === "es" ? "Mapas oficiales" : "Official media"} ↗</a>
        </div>
      </div>

      <div className="course-stat-grid">
        <Stat label={lang === "es" ? "DISTANCIA" : "DISTANCE"} value={`${stage.km} km`} />
        <Stat label={lang === "es" ? "DESNIVEL" : "CLIMBING"} value={stage.elevationGain ? `${stage.elevationGain.toLocaleString()} m` : "—"} />
        {road ? <Stat label={lang === "es" ? "CIRCUITO FINAL" : "FINAL CIRCUIT"} value={`${laps} × 13.4 km`} detail="269 m / lap" /> : <Stat label={lang === "es" ? "FORMATO" : "FORMAT"} value="ITT" detail={lang === "es" ? "mismo recorrido H/M" : "same course men/women"} />}
        {road ? <Stat label={lang === "es" ? "RAMPA CLAVE" : "KEY RAMP"} value=">11%" detail="Polytechnique" /> : <Stat label={lang === "es" ? "META" : "FINISH"} value="Avenue du Parc" />}
      </div>

      <div className="course-real-media-stack">
        <div className="course-visual-card course-visual-card--real">
          <div className="course-visual-title">
            <span>{lang === "es" ? "MAPA DEL RECORRIDO" : "COURSE MAP"}</span>
            <strong>{road ? `${stage.from} → ${stage.to}` : "Montréal"}</strong>
          </div>
          <RealCourseMap race={race} stage={stage} lang={lang} />
        </div>

        <div className="course-visual-card course-visual-card--real">
          <div className="course-visual-title">
            <span>{lang === "es" ? "PERFIL DE ALTITUD" : "ELEVATION PROFILE"}</span>
            <strong>{road ? (lang === "es" ? "El desgaste está en la repetición" : "The repetition is the race") : (lang === "es" ? "Rápida, larga, poco descanso" : "Fast, long, little respite")}</strong>
          </div>
          <RealCourseProfile race={race} stage={stage} lang={lang} />
        </div>
      </div>

      <div className="course-lower-grid">
        <div className="course-story-card">
          <span className="eyebrow">{lang === "es" ? "CÓMO SE DESARROLLA" : "HOW IT UNFOLDS"}</span>
          <div className="course-story-line">
            {story.map(([name, detail], index) => <div className="course-story-step" key={name}><span>{index + 1}</span><div><strong>{name}</strong><p>{detail}</p></div></div>)}
          </div>
        </div>

        {road ? (
          <div className="course-key-card">
            <span className="eyebrow">{lang === "es" ? "ANATOMÍA DE UNA VUELTA" : "ANATOMY OF A LAP"}</span>
            <div className="course-sector-list">
              {race.circuit?.sectors?.map((sector, index) => (
                <div key={sector.name}><b>0{index + 1}</b><span><strong>{sector.name}</strong><small>{localised(sector.detail, lang)}</small></span></div>
              ))}
            </div>
          </div>
        ) : (
          <div className="course-key-card">
            <span className="eyebrow">{lang === "es" ? "QUÉ EXIGE" : "WHAT IT REWARDS"}</span>
            <div className="course-demand-list">
              <div><b>01</b><span><strong>{lang === "es" ? "Potencia sostenida" : "Sustained power"}</strong><small>{lang === "es" ? "39,2 km castigan cualquier exceso al inicio." : "39.2 km punishes an overcooked start."}</small></span></div>
              <div><b>02</b><span><strong>{lang === "es" ? "Aerodinámica" : "Aerodynamics"}</strong><small>{lang === "es" ? "Gran parte del recorrido favorece especialistas puros." : "Long fast sections favour pure specialists."}</small></span></div>
              <div><b>03</b><span><strong>{lang === "es" ? "Ritmo técnico" : "Technical rhythm"}</strong><small>{lang === "es" ? "Puentes, islas y tramos urbanos rompen la monotonía." : "Bridges, islands and city roads repeatedly break the rhythm."}</small></span></div>
            </div>
          </div>
        )}
      </div>

      <p className="course-method-note">
        {lang === "es"
          ? "Las cifras del juego usan los datos oficiales UCI más recientes. Los visuales del mapa corresponden al material de recorrido UCI/Cycling Canada; algunos gráficos publicados durante la presentación inicial pueden conservar cifras antiguas en la propia imagen."
          : "Game metrics use the latest official UCI figures. Route-map visuals are UCI/Cycling Canada course media; some artwork first published at the original course launch may retain earlier figures inside the image itself."}
      </p>
    </section>
  );
}
