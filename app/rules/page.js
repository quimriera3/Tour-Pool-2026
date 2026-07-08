"use client";
// app/rules/page.js
import { useLang, t } from "../../lib/i18n";

const JERSEY_INFO = {
  en: [
    { icon: "🟡", name: "Yellow Jersey", desc: "Worn by the leader of the general classification — the rider with the lowest cumulative race time. Winning the yellow jersey in Paris is the highest honour in professional cycling." },
    { icon: "🟢", name: "Green Jersey", desc: "Awarded to the leader of the points classification. Points are earned at intermediate sprints and stage finishes. Usually fought over by pure sprinters." },
    { icon: "⚪🔴", name: "Polka Dot Jersey", desc: "The best climber's jersey, known in French as the 'maillot à pois'. Points are awarded at the top of categorised climbs (HC, Cat 1, Cat 2, Cat 3, Cat 4)." },
    { icon: "⚪", name: "White Jersey", desc: "The best young rider's jersey, for the highest-placed GC rider born on or after 1 January 2001 (for the 2026 edition). The next generation of Tour stars compete for this." },
  ],
  es: [
    { icon: "🟡", name: "Maillot Amarillo", desc: "Lo lleva el líder de la clasificación general, el corredor con el menor tiempo acumulado. Ganar el maillot amarillo en París es el mayor honor del ciclismo profesional." },
    { icon: "🟢", name: "Maillot Verde", desc: "Se otorga al líder de la clasificación por puntos. Los puntos se acumulan en esprints intermedios y llegadas de etapa. Suele disputarse entre esprínters puros." },
    { icon: "⚪🔴", name: "Maillot de Montaña", desc: "El maillot de lunares rojos distingue al mejor escalador. Los puntos se conceden en la cima de los puertos catalogados (HC, 1.ª, 2.ª, 3.ª y 4.ª categoría)." },
    { icon: "⚪", name: "Maillot Blanco", desc: "El mejor joven: el corredor mejor clasificado en la general nacido a partir del 1 de enero de 2001 (para la edición 2026). La próxima generación de estrellas del Tour compite por él." },
  ],
};

const TOUR_INFO = {
  en: {
    heading: "About the Tour de France 2026",
    body: "The 2026 Tour de France is the 113th edition of the world's most famous cycling race. Starting in Barcelona on 4 July with a team time trial, the peloton covers 3,321 km over 21 stages before arriving in Paris on 26 July. This edition is unusually demanding, with 56,308 m of cumulative climbing — including a double ascent of the iconic Alpe d'Huez in the final week. 184 riders from 23 teams compete across mountain stages in the Pyrenees and Alps, flat sprint stages, and two time trials.",
    jerseyHeading: "The four jerseys",
  },
  es: {
    heading: "Sobre el Tour de Francia 2026",
    body: "El Tour de Francia 2026 es la 113.ª edición de la carrera ciclista más famosa del mundo. Con salida en Barcelona el 4 de julio con una contrarreloj por equipos, el pelotón recorre 3.321 km en 21 etapas hasta llegar a París el 26 de julio. Esta edición es especialmente exigente, con 56.308 m de desnivel acumulado —incluyendo un doble ascenso al icónico Alpe d'Huez en la última semana—. 184 corredores de 23 equipos se miden en etapas de montaña en Pirineos y Alpes, etapas llanas de esprín y dos contrarrelojes.",
    jerseyHeading: "Los cuatro maillots",
  },
};

export default function Rules() {
  const lang = useLang();
  const jerseys = JERSEY_INFO[lang] || JERSEY_INFO.en;
  const tourInfo = TOUR_INFO[lang] || TOUR_INFO.en;

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{t(lang, "rules.eyebrow")}</span>
        <h1>{t(lang, "rules.title")}</h1>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h2 style={{ fontSize: 16 }}>{t(lang, "rules.stagePred.title")}</h2>
          <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "rules.stagePred.body")}</p>
          <div className="points-podium">
            <div className="step">
              <div className="bar" style={{ height: 68, background: "var(--black)" }}>5</div>
              <p className="jpick" style={{ marginTop: 6 }}>{t(lang, "rules.2nd")}</p>
            </div>
            <div className="step">
              <div className="bar" style={{ height: 86, background: "var(--yellow)", color: "var(--black)" }}>10</div>
              <p className="jpick" style={{ marginTop: 6 }}>{t(lang, "rules.winner")}</p>
            </div>
            <div className="step">
              <div className="bar" style={{ height: 50, background: "var(--black)" }}>2</div>
              <p className="jpick" style={{ marginTop: 6 }}>{t(lang, "rules.3rd")}</p>
            </div>
          </div>
          <p className="subtitle" style={{ marginTop: 14, textAlign: "center" }}>{t(lang, "rules.zeroPoints")}</p>
        </div>

        <div className="card">
          <h2 style={{ fontSize: 16 }}>{t(lang, "rules.locking.title")}</h2>
          <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "rules.locking.body")}</p>
          <h2 style={{ fontSize: 16, marginTop: 18 }}>{t(lang, "rules.jersey.title")}</h2>
          <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "rules.jersey.body")}</p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>{t(lang, "rules.prizes.title")}</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>{t(lang, "rules.prizes.body")}</p>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.7 }}>
          <li>{t(lang, "rules.prize1")}</li>
          <li>{t(lang, "rules.prize2")}</li>
          <li>{t(lang, "rules.prize3")}</li>
        </ul>
      </div>

      {/* SEO content: Tour context + jersey guide */}
      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>{tourInfo.heading}</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>{tourInfo.body}</p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>{tourInfo.jerseyHeading}</h2>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 14 }}>
          {jerseys.map((j) => (
            <div key={j.name} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ fontSize: 20, flexShrink: 0, marginTop: 1 }}>{j.icon}</span>
              <div>
                <p style={{ fontWeight: 700, fontSize: 14 }}>{j.name}</p>
                <p className="subtitle" style={{ marginTop: 3 }}>{j.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p style={{ marginTop: 16, fontSize: 12, color: "#aaa" }}>
          {lang === "es"
            ? "Tienes hasta 1 hora antes de la Etapa 5 para hacer tus predicciones de maillots en Grand Tour Pool."
            : "You have until 1 hour before Stage 5 to submit your jersey predictions in Grand Tour Pool."}
        </p>
      </div>
    </div>
  );
}

