// /nl/page.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Vuelta 2026 Voorspellen — Gratis Fantasy Game",
  description:
    "Voorspel de Ronde van Spanje 2026 etappe voor etappe in dit gratis fantasy game: speel met vrienden, klim de live ranglijst en maak kans op prijzen.",
  alternates: alternatesFor("/nl"),
  openGraph: {
    title: "Vuelta 2026 Voorspellen — Gratis Fantasy Game",
    description: "Voorspel elke etappe van de Vuelta 2026, gratis, met vrienden en een live ranglijst.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function DutchLanding() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">La Vuelta a España 2026 · 22 augustus — 13 september</span>
        <h1>Vuelta 2026 Voorspellen</h1>
        <p className="subtitle">
          Een gratis voorspellingsspel met vrienden: raad wie elke etappe van de Ronde van Spanje 2026 wint en bewijs dat jij er het meeste verstand van hebt.
        </p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16 }}>Hoe werkt het?</h2>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
          <li>Gratis registreren met naam en e-mailadres.</li>
          <li>Voor elk van de 21 etappes kies je de renner die volgens jou wint.</li>
          <li><strong>10 punten</strong> als je de winnaar raadt, <strong>5 punten</strong> als je renner 2e wordt, <strong>2 punten</strong> bij een 3e plaats.</li>
          <li>Je kunt ook de Rode, Groene, Bolletjes- en Witte trui voorspellen.</li>
          <li><strong>3 prijzen</strong> met wielermateriaal voor de bovenste plaatsen.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>De Vuelta 2026 in cijfers</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>
          3.291 km · 21 etappes · 4 landen (Monaco, Frankrijk, Andorra en Spanje) · 7 bergetappes · een gravelsector · Start in Monaco op 22 augustus, finish in Granada op 13 september met een slotklim naar het Alhambra.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h2 style={{ fontSize: 16 }}>Nodig je vrienden uit</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>
          De app is in het Engels en Spaans, maar registreren en renners kiezen is heel eenvoudig, ook zonder de taal te beheersen.
        </p>
        <a href="/predictions" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
          Nu spelen
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/nl/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", textDecoration: "underline" }}>
          Lees onze Vuelta 2026 preview: parcours, sleuteletappes en favorieten →
        </a>
      </p>
    </div>
  );
}
