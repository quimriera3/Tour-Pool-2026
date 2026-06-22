// app/ca/page.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Porra i Pronòstics del Tour de França 2026",
  description:
    "Porra gratuïta del Tour de França 2026. Endevina el guanyador de cada etapa amb els amics, puja a la classificació i guanya material de ciclisme.",
  alternates: alternatesFor("/ca"),
  openGraph: {
    title: "Porra i Pronòstics del Tour de França 2026",
    description: "Endevina el guanyador de cada etapa del Tour de França 2026 i guanya material de ciclisme.",
    locale: "ca_ES",
    type: "website",
  },
};

export default function CatalanLanding() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Tour de França 2026 · 4 — 26 de juliol</span>
        <h1>Porra del Tour de França 2026</h1>
        <p className="subtitle">
          Pronòstics, porra, quina-quina: és un joc gratuït entre amics per endevinar qui
          guanyarà cada etapa del Tour de França 2026 i demostrar que en saps més de ciclisme
          que ningú.
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>Com funciona?</h3>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
          <li>Registre gratuït amb nom i correu electrònic.</li>
          <li>A cada una de les 21 etapes, tries el corredor que creus que guanyarà.</li>
          <li><strong>10 punts</strong> si encertes el guanyador, <strong>5 punts</strong> si el teu corredor fa 2n, <strong>2 punts</strong> si fa 3r.</li>
          <li>També pots pronosticar qui s&apos;endurà el mallot Groc, Verd, de Pics i Blanc al final.</li>
          <li>Hi haurà <strong>3 premis</strong> de material de ciclisme per als primers classificats.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>El Tour de França 2026, en xifres</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          3.321 km · 21 etapes · 56.308 m de desnivell acumulat · 5 serralades (Pirineus,
          Massís Central, Jura, Vosgos i Alps) · Sortida des de Barcelona el 4 de juliol,
          arribada a París el 26 · doble pujada a l&apos;Alpe d&apos;Huez l&apos;última setmana.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h3 style={{ fontSize: 16 }}>Convida els amics a la porra</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          L&apos;aplicació per jugar és en anglès de moment, però registrar-se i triar
          corredors és molt senzill encara que no hi dominis l&apos;idioma.
        </p>
        <a href="/predictions" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
          Jugar ara
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/ca/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textDecoration: "underline" }}>
          Llegeix la nostra previsió del Tour 2026: favorits, esprínters i outsiders →
        </a>
      </p>
    </div>
  );
}
