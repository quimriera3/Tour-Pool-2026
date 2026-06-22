// app/fr/page.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Pronostics Tour de France 2026 — Jeu Gratuit",
  description:
    "Jeu de pronostics gratuit pour le Tour de France 2026. Devinez le vainqueur de chaque étape entre amis, grimpez au classement et gagnez du matériel de cyclisme.",
  alternates: alternatesFor("/fr"),
  openGraph: {
    title: "Pronostics Tour de France 2026 — Jeu Gratuit",
    description: "Devinez le vainqueur de chaque étape du Tour de France 2026 et gagnez du matériel de cyclisme.",
    locale: "fr_FR",
    type: "website",
  },
};

export default function FrenchLanding() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Tour de France 2026 · 4 — 26 juillet</span>
        <h1>Pronostics du Tour de France 2026</h1>
        <p className="subtitle">
          Un jeu de pronostics gratuit, entre copains, pour deviner qui va gagner chaque étape
          du Tour de France 2026 — et prouver que vous connaissez le cyclisme mieux que vos
          amis.
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>Comment ça marche ?</h3>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
          <li>Inscription gratuite avec votre nom et votre e-mail.</li>
          <li>Pour chacune des 21 étapes, choisissez le coureur que vous pensez vainqueur.</li>
          <li><strong>10 points</strong> si votre coureur gagne, <strong>5 points</strong> s&apos;il termine 2e, <strong>2 points</strong> s&apos;il termine 3e.</li>
          <li>Vous pouvez aussi pronostiquer les maillots Jaune, Vert, à Pois et Blanc en fin de Tour.</li>
          <li><strong>3 lots</strong> de matériel de cyclisme récompenseront les premiers du classement.</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Le Tour de France 2026 en chiffres</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          3 321 km · 21 étapes · 56 308 m de dénivelé positif · 5 massifs montagneux (Pyrénées,
          Massif Central, Jura, Vosges, Alpes) · Départ de Barcelone le 4 juillet, arrivée à
          Paris le 26 · double ascension de l&apos;Alpe d&apos;Huez lors de la dernière semaine.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h3 style={{ fontSize: 16 }}>Invitez vos amis à pronostiquer</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          L&apos;application de jeu est en anglais pour le moment, mais s&apos;inscrire et
          choisir ses coureurs reste très simple même sans parler la langue.
        </p>
        <a href="/predictions" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
          Jouer maintenant
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/fr/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textDecoration: "underline" }}>
          Lisez notre avant-Tour 2026 : favoris, sprinteurs et outsiders →
        </a>
      </p>
    </div>
  );
}
