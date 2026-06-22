// app/es/page.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Porra y Pronósticos del Tour de Francia 2026",
  description:
    "Porra del Tour de Francia 2026 gratis. Apuesta amistosa con tus amigos: acierta el ganador de cada etapa, sube en la clasificación y gana material de ciclismo.",
  alternates: alternatesFor("/es"),
  openGraph: {
    title: "Porra y Pronósticos del Tour de Francia 2026",
    description: "Acierta el ganador de cada etapa del Tour de Francia 2026 y gana material de ciclismo.",
    locale: "es_ES",
    type: "website",
  },
};

export default function SpanishLanding() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Tour de Francia 2026 · 4 — 26 de julio</span>
        <h1>Porra del Tour de Francia 2026</h1>
        <p className="subtitle">
          ¿Quinielas, porra, pronósticos? Da igual cómo lo llames: es un juego gratuito para
          adivinar quién gana cada etapa del Tour de Francia 2026 y demostrar a tus amigos que
          sabes más de ciclismo que ellos.
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>¿Cómo funciona la porra?</h3>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.8 }}>
          <li>Te registras gratis con tu nombre y correo.</li>
          <li>En cada una de las 21 etapas, eliges al corredor que crees que ganará.</li>
          <li><strong>10 puntos</strong> si aciertas al ganador, <strong>5 puntos</strong> si tu corredor llega 2º, <strong>2 puntos</strong> si llega 3º.</li>
          <li>También puedes pronosticar quién se lleva el maillot Amarillo, Verde, de Topos y Blanco al final del Tour — <strong>10 puntos</strong> por cada uno que aciertes.</li>
          <li>Habrá <strong>3 premios</strong> de material de ciclismo para los primeros clasificados.</li>
        </ul>
      </div>

      <a href="/es/final-classification" className="jersey-banner">
        <span className="jersey-banner-icon">🏆</span>
        <span>
          <strong>Asegura ya tus pronósticos de maillots.</strong> Las predicciones de los
          maillots Amarillo, Verde, de Topos y Blanco se bloquean 1 hora antes de la salida de
          la Etapa 1 (4 de julio) — una vez empiece el Tour, ya no podrás cambiarlas.
        </span>
        <span className="jersey-banner-arrow">→</span>
      </a>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>El Tour de Francia 2026, en cifras</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          3.321 km · 21 etapas · 56.308 m de desnivel acumulado · 5 cordilleras (Pirineos,
          Macizo Central, Jura, Vosgos y Alpes) · Salida desde Barcelona el 4 de julio, llegada
          a París el 26 · doble ascensión a Alpe d&apos;Huez en la última semana.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h3 style={{ fontSize: 16 }}>Apunta a tus amigos a la porra</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Regístrate, elige tus corredores para cada etapa, y compite con tus amigos en la
          clasificación — toda la aplicación está disponible en español.
        </p>
        <a href="/es/predictions" className="btn" style={{ marginTop: 16, display: "inline-block" }}>
          Jugar ahora
        </a>
      </div>

      <p style={{ textAlign: "center", marginTop: 16 }}>
        <a href="/es/preview" style={{ fontSize: 13, fontWeight: 700, color: "var(--red)", textDecoration: "underline" }}>
          Lee nuestro análisis previo del Tour 2026: favoritos, sprinters y outsiders →
        </a>
      </p>
    </div>
  );
}
