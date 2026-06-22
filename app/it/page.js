// app/it/page.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Pronostici Tour de France 2026 — Schedina Gratis",
  description:
    "Pronostici gratis per il Tour de France 2026. Indovina il vincitore di ogni tappa con gli amici, scala la classifica e vinci materiale da ciclismo.",
  alternates: alternatesFor("/it"),
  openGraph: {
    title: "Pronostici Tour de France 2026 — Schedina Gratis",
    description: "Indovina il vincitore di ogni tappa del Tour de France 2026 e vinci materiale da ciclismo.",
    locale: "it_IT",
    type: "website",
  },
};

export default function ItalianLanding() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Tour de France 2026 · 4 — 26 luglio</span>
        <h1>Pronostici del Tour de France 2026</h1>
        <p className="subtitle">
          Una schedina gratuita tra amici per indovinare chi vince ogni tappa del Tour de
          France 2026 — e dimostrare che ne sai più di ciclismo di tutti gli altri.
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>Come funziona</h3>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
          <li>Iscrizione gratuita con nome e email.</li>
          <li>Per ognuna delle 21 tappe, scegli il corridore che pensi vincerà.</li>
          <li><strong>10 punti</strong> se il tuo corridore vince, <strong>5 punti</strong> se arriva 2°, <strong>2 punti</strong> se arriva 3°.</li>
          <li>Puoi anche pronosticare le maglie Gialla, Verde, a Pois e Bianca di fine corsa.</li>
          <li>In palio <strong>3 premi</strong> di materiale da ciclismo per i primi in classifica.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Il Tour de France 2026 in numeri</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          3.321 km · 21 tappe · 56.308 m di dislivello totale · 5 catene montuose (Pirenei,
          Massiccio Centrale, Giura, Vosgi, Alpi) · Partenza da Barcellona il 4 luglio, arrivo a
          Parigi il 26 · doppia salita all&apos;Alpe d&apos;Huez nell&apos;ultima settimana.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h3 style={{ fontSize: 16 }}>Invita gli amici a giocare</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Per ora l&apos;app di gioco è in inglese, ma registrarsi e scegliere i corridori è
          molto semplice anche senza parlare la lingua.
        </p>
        <a href="/predictions" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
          Gioca ora
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/it/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textDecoration: "underline" }}>
          Leggi la nostra anteprima del Tour 2026: favoriti, sprinter e outsider →
        </a>
      </p>
    </div>
  );
}
