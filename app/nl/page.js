// app/nl/page.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Tour de France 2026 Poule & Voorspellingen — Gratis",
  description:
    "Gratis wielerpoule voor de Tour de France 2026. Voorspel de winnaar van elke etappe, klim de ranglijst en win wielerkleding of materiaal.",
  alternates: alternatesFor("/nl"),
  openGraph: {
    title: "Tour de France 2026 Poule & Voorspellingen — Gratis",
    description: "Voorspel de winnaar van elke etappe van de Tour de France 2026 en win wielermateriaal.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function DutchLanding() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Tour de France 2026 · 4 — 26 juli</span>
        <h1>Tour de France 2026 Poule</h1>
        <p className="subtitle">
          Een gratis wielerpoule tussen vrienden: voorspel wie elke etappe van de Tour de
          France 2026 wint, en bewijs dat jij meer van wielrennen weet dan de rest.
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>Hoe werkt de poule?</h3>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
          <li>Gratis registreren met je naam en e-mailadres.</li>
          <li>Kies voor elk van de 21 etappes de renner die volgens jou wint.</li>
          <li><strong>10 punten</strong> bij de juiste winnaar, <strong>5 punten</strong> als je renner 2e wordt, <strong>2 punten</strong> bij een 3e plaats.</li>
          <li>Je voorspelt ook de Gele, Groene, Bolletjes- en Witte trui aan het einde van de Tour.</li>
          <li>De top 3 van de eindstand wint <strong>3 prijzen</strong> aan wielermateriaal.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>De Tour de France 2026 in cijfers</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          3.321 km · 21 etappes · 56.308 hoogtemeters · 5 bergmassieven (Pyreneeën, Massif
          Central, Jura, Vogezen, Alpen) · Start in Barcelona op 4 juli, finish in Parijs op
          26 juli · Alpe d&apos;Huez twee keer beklommen in de laatste week.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h3 style={{ fontSize: 16 }}>Nodig je vrienden uit voor de poule</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          De speel-app is momenteel in het Engels, maar registreren en je renners kiezen is heel
          eenvoudig, ook als je de taal niet vloeiend spreekt.
        </p>
        <a href="/predictions" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
          Nu spelen
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/nl/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textDecoration: "underline" }}>
          Lees onze Tour 2026 preview: favorieten, sprinters en outsiders →
        </a>
      </p>
    </div>
  );
}
