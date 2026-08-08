// /fr/page.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Pronostics La Vuelta 2026 — Jeu Fantasy Gratuit",
  description:
    "Faites vos pronostics du Tour d'Espagne 2026 étape par étape : jeu fantasy gratuit entre amis, classement en direct et lots à gagner.",
  alternates: alternatesFor("/fr"),
  openGraph: {
    title: "Pronostics La Vuelta 2026 — Jeu Fantasy Gratuit",
    description: "Pronostics La Vuelta étape par étape, gratuits, entre amis, avec classement en direct.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function FrenchLanding() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">La Vuelta a España 2026 · 22 août — 13 septembre</span>
        <h1>Pronostics La Vuelta 2026</h1>
        <p className="subtitle">
          Un jeu de pronostics gratuit entre amis : devinez qui gagnera chaque étape du Tour d'Espagne 2026 et prouvez que vous vous y connaissez mieux que les autres.
        </p>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16 }}>Comment ça marche ?</h2>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
          <li>Inscription gratuite avec un nom et une adresse e-mail.</li>
          <li>Pour chacune des 21 étapes, vous choisissez le coureur qui, selon vous, va gagner.</li>
          <li><strong>10 points</strong> si vous trouvez le vainqueur, <strong>5 points</strong> si votre coureur finit 2e, <strong>2 points</strong> s&apos;il finit 3e.</li>
          <li>Vous pouvez aussi pronostiquer les maillots Rouge, Vert, à Pois et Blanc.</li>
          <li><strong>3 lots</strong> de matériel de cyclisme pour les premiers du classement.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>La Vuelta 2026 en chiffres</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>
          3 298 km · 21 étapes · 4 pays (Monaco, France, Andorre et Espagne) · 7 étapes de montagne · un secteur de gravel · Départ de Monaco le 22 août, arrivée à Grenade le 13 septembre avec une montée finale vers l&apos;Alhambra.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h2 style={{ fontSize: 16 }}>Invitez vos amis</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>
          L&apos;application est en anglais et en espagnol, mais s&apos;inscrire et choisir ses coureurs reste très simple même sans maîtriser la langue.
        </p>
        <a href="/predictions" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
          Jouer maintenant
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/fr/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--accent)", textDecoration: "underline" }}>
          Lisez notre aperçu de La Vuelta 2026 : parcours, étapes clés et favoris →
        </a>
      </p>
    </div>
  );
}
