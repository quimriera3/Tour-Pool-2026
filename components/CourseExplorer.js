"use client";

import { localised } from "../lib/races";

const UCI_COURSE_SOURCE = "https://www.uci.org/pressrelease/200-days-to-go-a-look-at-the-courses-of-the-2026-uci-road-world/7MNCbBHZySudjNAoDW4R8x";
const MONTREAL_RESOURCES = "https://www.montreal2026.org/en/federation-resources/";

function RoadMap({ race, lang }) {
  const women = race.category === "women";
  const stops = women
    ? [
        { x: 108, y: 312, label: "Brossard" },
        { x: 208, y: 282, label: "Carignan" },
        { x: 302, y: 235, label: "Chambly" },
        { x: 378, y: 205, label: "Richelieu" },
        { x: 552, y: 147, label: "Samuel-De Champlain" },
        { x: 673, y: 92, label: "Mount Royal" },
      ]
    : [
        { x: 92, y: 318, label: "Brossard" },
        { x: 165, y: 278, label: "Carignan" },
        { x: 250, y: 242, label: "Chambly" },
        { x: 316, y: 304, label: "St-Jean-sur-Richelieu" },
        { x: 410, y: 245, label: "Mont-Saint-Hilaire" },
        { x: 470, y: 190, label: "Richelieu" },
        { x: 556, y: 145, label: "Samuel-De Champlain" },
        { x: 675, y: 92, label: "Mount Royal" },
      ];

  const path = stops.map((s) => `${s.x},${s.y}`).join(" ");
  const laps = women ? 8 : 12;

  return (
    <div className="course-map-shell">
      <svg className="course-map" viewBox="0 0 760 390" role="img" aria-label={lang === "es" ? "Mapa esquemático de la prueba en ruta" : "Schematic road-race map"}>
        <defs>
          <linearGradient id="riverGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eaf5ff" />
            <stop offset="100%" stopColor="#d7ebfb" />
          </linearGradient>
          <marker id="routeArrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" />
          </marker>
        </defs>
        <rect x="0" y="0" width="760" height="390" rx="18" fill="#f7f8fa" />
        <path d="M-30 70 C145 105 210 80 342 115 C455 145 535 184 790 245 L790 355 C565 294 452 250 332 235 C196 219 108 246 -30 210Z" fill="url(#riverGradient)" />
        <text x="356" y="178" className="course-water-label">ST. LAWRENCE RIVER</text>

        <path d="M600 36 C654 30 711 43 737 83 C746 115 723 147 685 155 C648 162 610 149 593 119 C579 91 582 57 600 36Z" fill="#eef1e9" />
        <text x="653" y="65" textAnchor="middle" className="course-area-label">MONTRÉAL</text>

        <polyline points={path} fill="none" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={path} fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#routeArrow)" />

        {stops.map((s, i) => (
          <g key={s.label}>
            <circle cx={s.x} cy={s.y} r={i === 0 || i === stops.length - 1 ? 8 : 5} fill={i === stops.length - 1 ? "#111" : i === 0 ? "var(--accent)" : "#fff"} stroke={i === stops.length - 1 ? "#111" : "var(--accent)"} strokeWidth="3" />
            <text x={s.x} y={s.y + (i % 2 ? -15 : 23)} textAnchor="middle" className="course-map-label">{s.label}</text>
          </g>
        ))}

        <g transform="translate(655,92)">
          <circle r="38" fill="none" stroke="#111" strokeWidth="3" strokeDasharray="5 5" />
          <circle r="27" fill="none" stroke="var(--accent)" strokeWidth="3" />
          <text y="4" textAnchor="middle" className="course-lap-number">×{laps}</text>
          <text y="55" textAnchor="middle" className="course-map-label">13.4 km circuit</text>
        </g>
      </svg>
      <div className="course-map-caption">
        <span>{lang === "es" ? "Mapa esquemático" : "Route schematic"}</span>
        <small>{lang === "es" ? "Basado en el trazado oficial UCI; no es navegación GPS." : "Based on the official UCI route; not a GPS navigation trace."}</small>
      </div>
    </div>
  );
}

function TTMap({ lang }) {
  const stops = [
    { x: 86, y: 92, label: "Montréal" },
    { x: 164, y: 137, label: "Old Montréal" },
    { x: 276, y: 247, label: "St. Lawrence" },
    { x: 408, y: 286, label: "Gilles-Villeneuve" },
    { x: 503, y: 236, label: "Parc Jean-Drapeau" },
    { x: 582, y: 177, label: "Concorde Bridge" },
    { x: 655, y: 91, label: "Avenue du Parc" },
  ];
  const path = stops.map((s) => `${s.x},${s.y}`).join(" ");
  return (
    <div className="course-map-shell">
      <svg className="course-map" viewBox="0 0 760 390" role="img" aria-label={lang === "es" ? "Mapa esquemático de la contrarreloj" : "Schematic time-trial map"}>
        <defs>
          <linearGradient id="ttRiverGradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#eaf5ff" />
            <stop offset="100%" stopColor="#d5eafa" />
          </linearGradient>
          <marker id="ttArrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto" markerUnits="strokeWidth">
            <path d="M0,0 L0,6 L6,3 z" fill="var(--accent)" />
          </marker>
        </defs>
        <rect width="760" height="390" rx="18" fill="#f7f8fa" />
        <path d="M30 205 C163 175 236 188 322 232 C395 270 504 292 765 242 L765 380 L22 380Z" fill="url(#ttRiverGradient)" />
        <ellipse cx="414" cy="274" rx="90" ry="32" fill="#eef1e9" />
        <ellipse cx="505" cy="235" rx="54" ry="22" fill="#eef1e9" />
        <text x="393" y="350" className="course-water-label">ST. LAWRENCE RIVER</text>
        <text x="104" y="57" className="course-area-label">MONTRÉAL</text>

        <polyline points={path} fill="none" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={path} fill="none" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" markerEnd="url(#ttArrow)" />
        {stops.map((s, i) => (
          <g key={s.label}>
            <circle cx={s.x} cy={s.y} r={i === stops.length - 1 ? 8 : 5} fill={i === stops.length - 1 ? "#111" : "#fff"} stroke={i === stops.length - 1 ? "#111" : "var(--accent)"} strokeWidth="3" />
            <text x={s.x} y={s.y + (i % 2 ? 25 : -15)} textAnchor="middle" className="course-map-label">{s.label}</text>
          </g>
        ))}
        <g transform="translate(76,300)">
          <rect width="134" height="50" rx="12" fill="#fff" stroke="#dce1e6" />
          <text x="14" y="20" className="course-chip-label">SAME COURSE</text>
          <text x="14" y="38" className="course-chip-value">MEN + WOMEN</text>
        </g>
      </svg>
      <div className="course-map-caption">
        <span>{lang === "es" ? "Mapa esquemático" : "Route schematic"}</span>
        <small>{lang === "es" ? "Basado en los puntos de paso publicados por la UCI; no es navegación GPS." : "Based on UCI-published route landmarks; not a GPS navigation trace."}</small>
      </div>
    </div>
  );
}

function RoadProfile({ race, lang }) {
  const laps = race.category === "women" ? 8 : 12;
  const points = [[0,170],[70,163],[125,150],[180,158],[230,146]];
  const startX = 250;
  const endX = 780;
  const step = (endX - startX) / laps;
  for (let i = 0; i < laps; i += 1) {
    const x = startX + i * step;
    points.push([x, 150]);
    points.push([x + step * .28, 98]);
    points.push([x + step * .44, 137]);
    points.push([x + step * .62, 112]);
    points.push([x + step * .82, 143]);
    points.push([x + step, 130]);
  }
  const line = points.map((p) => p.join(",")).join(" ");
  const area = `0,190 ${line} 800,190`;
  return (
    <div className="course-profile-shell">
      <svg className="course-profile-svg" viewBox="0 0 800 210" role="img" aria-label={lang === "es" ? "Perfil esquemático de la prueba en ruta" : "Schematic road-race profile"}>
        <defs>
          <linearGradient id="profileFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--accent)" stopOpacity=".22" />
            <stop offset="100%" stopColor="var(--accent)" stopOpacity=".02" />
          </linearGradient>
        </defs>
        <line x1="0" y1="190" x2="800" y2="190" stroke="#d9dde2" strokeWidth="1" />
        <polygon points={area} fill="url(#profileFill)" />
        <polyline points={line} fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        <line x1="244" y1="32" x2="244" y2="190" stroke="#cfd4da" strokeWidth="1.5" strokeDasharray="5 5" />
        <text x="10" y="30" className="profile-zone-label">{lang === "es" ? "APROXIMACIÓN POR MONTÉRÉGIE" : "MONTÉRÉGIE APPROACH"}</text>
        <text x="262" y="30" className="profile-zone-label">MOUNT ROYAL · {laps} × 13.4 KM</text>
        <text x="520" y="75" className="profile-annotation">Camillien-Houde</text>
        <text x="560" y="110" className="profile-annotation">Polytechnique</text>
        <text x="648" y="152" className="profile-annotation">Avenue du Parc</text>
      </svg>
      <div className="course-profile-caption"><span>{lang === "es" ? "Perfil de carrera" : "Race-shape profile"}</span><small>{lang === "es" ? "Esquema basado en la estructura oficial del recorrido, no una traza altimétrica GPX." : "Schematic based on the official race structure, not a GPX elevation trace."}</small></div>
    </div>
  );
}

function TTProfile({ lang }) {
  const line = "0,158 58,152 105,144 155,150 212,137 270,145 326,132 384,140 448,128 506,138 562,126 618,134 674,118 732,128 800,112";
  return (
    <div className="course-profile-shell">
      <svg className="course-profile-svg" viewBox="0 0 800 210" role="img" aria-label={lang === "es" ? "Perfil esquemático de la contrarreloj" : "Schematic time-trial profile"}>
        <defs>
          <linearGradient id="ttProfileFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--accent)" stopOpacity=".22"/><stop offset="100%" stopColor="var(--accent)" stopOpacity=".02"/></linearGradient>
        </defs>
        <line x1="0" y1="180" x2="800" y2="180" stroke="#d9dde2" />
        <polygon points={`0,180 ${line} 800,180`} fill="url(#ttProfileFill)" />
        <polyline points={line} fill="none" stroke="var(--accent)" strokeWidth="4" strokeLinejoin="round" strokeLinecap="round" />
        <text x="12" y="32" className="profile-zone-label">39.2 KM · 220 M ↑</text>
        <text x="222" y="115" className="profile-annotation">Old Montréal</text>
        <text x="425" y="104" className="profile-annotation">Gilles-Villeneuve</text>
        <text x="650" y="95" className="profile-annotation">Avenue du Parc</text>
      </svg>
      <div className="course-profile-caption"><span>{lang === "es" ? "Perfil de carrera" : "Race-shape profile"}</span><small>{lang === "es" ? "La UCI publica 220 m de desnivel total; el dibujo es esquemático y no una traza GPX." : "The UCI publishes 220 m total climbing; this is a schematic, not a GPX elevation trace."}</small></div>
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
    <section className="course-explorer" aria-labelledby={`course-explorer-${stage.n}`}>
      <div className="course-explorer-head">
        <div>
          <span className="eyebrow">{lang === "es" ? "RECORRIDO" : "COURSE INTEL"}</span>
          <h2 id={`course-explorer-${stage.n}`}>{road ? (lang === "es" ? "El recorrido que decidirá el arcoíris" : "The course that decides the rainbow jersey") : (lang === "es" ? "La contrarreloj, punto por punto" : "The time trial, point by point")}</h2>
        </div>
        <div className="course-source-links">
          <a href={UCI_COURSE_SOURCE} target="_blank" rel="noreferrer">UCI ↗</a>
          <a href={MONTREAL_RESOURCES} target="_blank" rel="noreferrer">{lang === "es" ? "Guía / GPX oficial" : "Official guide / GPX"} ↗</a>
        </div>
      </div>

      <div className="course-stat-grid">
        <Stat label={lang === "es" ? "DISTANCIA" : "DISTANCE"} value={`${stage.km} km`} />
        <Stat label={lang === "es" ? "DESNIVEL" : "CLIMBING"} value={stage.elevationGain ? `${stage.elevationGain.toLocaleString()} m` : "—"} />
        {road ? <Stat label={lang === "es" ? "CIRCUITO FINAL" : "FINAL CIRCUIT"} value={`${laps} × 13.4 km`} detail="269 m / lap" /> : <Stat label={lang === "es" ? "FORMATO" : "FORMAT"} value="ITT" detail={lang === "es" ? "mismo recorrido H/M" : "same course men/women"} />}
        {road ? <Stat label={lang === "es" ? "RAMPA CLAVE" : "KEY RAMP"} value=">11%" detail="Polytechnique" /> : <Stat label={lang === "es" ? "META" : "FINISH"} value="Avenue du Parc" />}
      </div>

      <div className="course-visual-grid">
        <div className="course-visual-card">
          <div className="course-visual-title"><span>{lang === "es" ? "MAPA" : "MAP"}</span><strong>{road ? `${stage.from} → ${stage.to}` : "Montréal"}</strong></div>
          {road ? <RoadMap race={race} lang={lang} /> : <TTMap lang={lang} />}
        </div>
        <div className="course-visual-card">
          <div className="course-visual-title"><span>{lang === "es" ? "PERFIL" : "PROFILE"}</span><strong>{road ? (lang === "es" ? "Desgaste por repetición" : "Repeated climbing") : (lang === "es" ? "Rápida, larga, poco descanso" : "Fast, long, little respite")}</strong></div>
          {road ? <RoadProfile race={race} lang={lang} /> : <TTProfile lang={lang} />}
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

      <p className="course-method-note">{lang === "es" ? "Visuales propios de Grand Tour Pool creados a partir de la información pública de recorrido de la UCI. Los mapas y perfiles son esquemáticos: para navegación o trazado exacto consulta la guía/GPX oficial." : "Original Grand Tour Pool visuals built from public UCI course information. Maps and profiles are schematic; use the official guide/GPX for exact navigation or trace data."}</p>
    </section>
  );
}
