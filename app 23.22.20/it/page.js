// /it/page.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Pronostici Vuelta 2026 — Gioco Fantasy Gratis",
  description:
    "Fai i tuoi pronostici sulla Vuelta di Spagna 2026 tappa per tappa: gioco fantasy gratuito con gli amici, classifica live e premi in palio.",
  alternates: alternatesFor("/it"),
  openGraph: {
    title: "Pronostici Vuelta 2026 — Gioco Fantasy Gratis",
    description: "Pronostici tappa per tappa della Vuelta 2026, gratuiti, con classifica live e premi.",
    locale: "it_IT",
    type: "website",
  },
};

export default function ItalianLanding() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">La Vuelta a España 2026 · 22 agosto — 13 settembre</span>
        <h1>Pronostici Vuelta 2026</h1>
        <p className="subtitle">
          Un gioco di pronostici gratuito tra amici: indovina chi vincerà ogni tappa della Vuelta di Spagna 2026 e dimostra di saperne di ciclismo più di tutti.
        </p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16 }}>Come funziona?</h2>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
          <li>Registrazione gratuita con nome e indirizzo email.</li>
          <li>Per ognuna delle 21 tappe scegli il corridore che secondo te vincerà.</li>
          <li><strong>10 punti</strong> se indovini il vincitore, <strong>5 punti</strong> se il tuo corridore arriva 2º, <strong>2 punti</strong> se arriva 3º.</li>
          <li>Puoi anche pronosticare le maglie Roja, Verde, a Pois e Bianca.</li>
          <li><strong>3 premi</strong> di materiale ciclistico per i primi in classifica.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>La Vuelta 2026 in cifre</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>
          3.298 km · 21 tappe · 4 paesi (Monaco, Francia, Andorra e Spagna) · 7 tappe di montagna · un settore di sterrato · Partenza da Monaco il 22 agosto, arrivo a Granada il 13 settembre con salita finale all&apos;Alhambra.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h2 style={{ fontSize: 16 }}>Invita i tuoi amici</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>
          L&apos;applicazione è in inglese e spagnolo, ma registrarsi e scegliere i corridori è semplicissimo anche senza conoscere la lingua.
        </p>
        <a href="/predictions" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
          Gioca ora
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/it/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", textDecoration: "underline" }}>
          Leggi la nostra anteprima della Vuelta 2026: percorso, tappe chiave e favoriti →
        </a>
      </p>
    </div>
  );
}
