"use client";
// app/rules/page.js
import { useLang, t } from "../../lib/i18n";

const JERSEY_INFO = {
  en: [
    { icon: "🔴", name: "Red Jersey", desc: "Worn by the leader of the general classification — the rider with the lowest cumulative race time. The red jersey is La Vuelta's equivalent of the Tour's yellow, and winning it in Granada is the goal of every GC contender." },
    { icon: "🟢", name: "Green Jersey", desc: "Awarded to the leader of the points classification. Points are earned at intermediate sprints and stage finishes. Usually fought over by pure sprinters." },
    { icon: "⚪🔴", name: "Polka Dot Jersey", desc: "The best climber's jersey, known in French as the 'maillot à pois'. Points are awarded at the top of categorised climbs (HC, Cat 1, Cat 2, Cat 3, Cat 4)." },
    { icon: "⚪", name: "White Jersey", desc: "The best young rider's jersey, for the highest-placed GC rider born on or after 1 January 2001 (for the 2026 edition). The next generation of Tour stars compete for this." },
  ],
  es: [
    { icon: "🔴", name: "Maillot Rojo", desc: "Lo lleva el líder de la clasificación general, el corredor con el menor tiempo acumulado. El maillot rojo es el equivalente en La Vuelta al amarillo del Tour, y ganarlo en Granada es el objetivo de todo aspirante a la general." },
    { icon: "🟢", name: "Maillot Verde", desc: "Se otorga al líder de la clasificación por puntos. Los puntos se acumulan en esprints intermedios y llegadas de etapa. Suele disputarse entre esprínters puros." },
    { icon: "⚪🔴", name: "Maillot de Montaña", desc: "El maillot de lunares rojos distingue al mejor escalador. Los puntos se conceden en la cima de los puertos catalogados (HC, 1.ª, 2.ª, 3.ª y 4.ª categoría)." },
    { icon: "⚪", name: "Maillot Blanco", desc: "El mejor joven: el corredor mejor clasificado en la general nacido a partir del 1 de enero de 2001 (para la edición 2026). La próxima generación de estrellas del Tour compite por él." },
  ],
};

const TOUR_INFO = {
  en: {
    heading: "About La Vuelta a España 2026",
    body: "La Vuelta a España 2026 is the 81st edition of Spain's Grand Tour and the final Grand Tour of the season. It starts in Monaco on 22 August with a short individual time trial — the first time the principality has hosted a Vuelta start — and crosses France and Andorra before entering Spain on stage five. From there the race stays in Spain until it finishes in Granada on 13 September, with the last ten stages held entirely in Andalusia. The 3,291 km route features seven mountain stages, a gravel sector on stage six, and a final stage that climbs to the Alhambra rather than the usual processional sprint.",
    jerseyHeading: "The four jerseys",
  },
  es: {
    heading: "Sobre La Vuelta a España 2026",
    body: "La Vuelta a España 2026 es la 81.ª edición de la gran vuelta española y la última gran vuelta de la temporada. Arranca en Mónaco el 22 de agosto con una contrarreloj individual corta —la primera vez que el principado acoge una salida de La Vuelta— y atraviesa Francia y Andorra antes de entrar en España en la quinta etapa. A partir de ahí la carrera no sale de España hasta el final en Granada, el 13 de septiembre, con las diez últimas etapas íntegramente en Andalucía. Los 3.291 km del recorrido incluyen siete etapas de montaña, un sector de grava en la sexta etapa y una etapa final que sube a la Alhambra en lugar del habitual paseo con esprint.",
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
              <div className="bar" style={{ height: 86, background: "var(--accent)", color: "var(--black)" }}>10</div>
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

