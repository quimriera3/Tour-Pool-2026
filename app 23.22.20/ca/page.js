// /ca/page.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Millor Porra de La Vuelta 2026 Online i Gratis",
  description:
    "La millor porra de La Vuelta a Espanya 2026 en català: fes els teus pronòstics d'etapes gratis, juga amb els amics i puja a la classificació en directe.",
  alternates: alternatesFor("/ca"),
  openGraph: {
    title: "Millor Porra de La Vuelta 2026 Online i Gratis",
    description: "Pronòstics d'etapes de La Vuelta 2026: juga gratis, competeix amb amics i guanya material de ciclisme.",
    locale: "ca_ES",
    type: "website",
  },
};

export default function CatalanLanding() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">La Vuelta a Espanya 2026 · 22 d'agost — 13 de setembre</span>
        <h1>Porra de La Vuelta 2026</h1>
        <p className="subtitle">
          Pronòstics, porra, quina-quina: és un joc gratuït entre amics per endevinar qui guanyarà cada etapa de La Vuelta a Espanya 2026 i demostrar que en saps més de ciclisme que ningú.
        </p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16 }}>Com funciona?</h2>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
          <li>Registre gratuït amb nom i correu electrònic.</li>
          <li>A cada una de les 21 etapes, tries el corredor que creus que guanyarà.</li>
          <li><strong>10 punts</strong> si encertes el guanyador, <strong>5 punts</strong> si el teu corredor fa 2n, <strong>2 punts</strong> si fa 3r.</li>
          <li>També pots pronosticar qui s&apos;endurà el mallot Vermell, Verd, de Pics i Blanc al final.</li>
          <li>Hi haurà <strong>3 premis</strong> de material de ciclisme per als primers classificats.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>La Vuelta 2026, en xifres</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>
          3.298 km · 21 etapes · 4 països (Mònaco, França, Andorra i Espanya) · 7 etapes de muntanya · un sector de grava · Sortida de Mònaco el 22 d&apos;agost, arribada a Granada el 13 de setembre amb final en alt a l&apos;Alhambra.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h2 style={{ fontSize: 16 }}>Convida els amics a la porra</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>
          L&apos;aplicació per jugar és en anglès i castellà, però registrar-se i triar corredors és molt senzill encara que no hi dominis l&apos;idioma.
        </p>
        <a href="/predictions" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
          Jugar ara
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/ca/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", textDecoration: "underline" }}>
          Llegeix la nostra previsió de La Vuelta 2026: recorregut, etapes clau i favorits →
        </a>
      </p>
    </div>
  );
}
