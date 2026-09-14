"use client";
// app/tour-de-france-2026/page.js
//
// Index page for the archived 2026 Tour de France.
//
// Its purpose is to give the 21 archived stage pages at least one internal
// link. Without it they would be completely orphaned — reachable only from
// the sitemap — which makes them much harder for crawlers to keep discovering
// and re-evaluating over time.
import { getRace, TYPE_LABEL } from "../../lib/data";
import ArchivedRaceBanner from "../../components/ArchivedRaceBanner";
import StageTypeIcon from "../../components/StageTypeIcon";
import { useLang } from "../../lib/i18n";

const RACE_SLUG = "tour-de-france-2026";

export default function TourArchive() {
  const lang = useLang();
  const race = getRace(RACE_SLUG);
  const raceName = lang === "es" ? "Tour de Francia 2026" : "Tour de France 2026";

  return (
    <div>
      <ArchivedRaceBanner raceName={raceName} href={lang === "es" ? "/es" : "/"} />

      <div className="page-header">
        <span className="eyebrow">
          {lang === "es" ? "Archivo · 4 — 26 de julio de 2026" : "Archive · 4 — 26 July 2026"}
        </span>
        <h1>{raceName}</h1>
        <p className="subtitle">
          {lang === "es"
            ? "Las 21 etapas del Tour de Francia 2026, de Barcelona a París: recorrido, perfil y resultado final de cada una."
            : "All 21 stages of the 2026 Tour de France, from Barcelona to Paris: route, profile and final result for each one."}
        </p>
      </div>

      <div className="card" style={{ marginBottom: 16, textAlign: "center" }}>
        <h2 style={{ fontSize: 16 }}>
          {lang === "es" ? "Clasificación final" : "Final standings"}
        </h2>
        <p className="subtitle" style={{ marginTop: 8 }}>
          {lang === "es"
            ? "Consulta cómo terminó la porra del Tour 2026."
            : "See how the 2026 Tour pool finished."}
        </p>
        <a href="/tour-de-france-2026/leaderboard" className="btn btn-outline" style={{ marginTop: 12, display: "inline-block" }}>
          {lang === "es" ? "Ver clasificación" : "View leaderboard"}
        </a>
      </div>

      <div className="card">
        <h2 style={{ fontSize: 16 }}>{lang === "es" ? "Todas las etapas" : "All stages"}</h2>
        <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 2 }}>
          {race.stages.map((s) => (
            <a
              key={s.n}
              href={"/" + RACE_SLUG + "/stage/" + s.n}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "11px 10px",
                borderBottom: "1px solid var(--grey-light)",
                textDecoration: "none",
                color: "inherit",
              }}
            >
              <span style={{ fontWeight: 800, fontSize: 12, color: "var(--grey)", minWidth: 22 }}>
                {s.n}
              </span>
              <span style={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
                <StageTypeIcon type={s.type} size={13} />
              </span>
              <span style={{ flex: 1, fontSize: 13, fontWeight: 600 }}>
                {s.from} → {s.to}
              </span>
              <span style={{ fontSize: 11, color: "var(--grey)", whiteSpace: "nowrap" }}>
                {s.km} km · {TYPE_LABEL[s.type]}
              </span>
            </a>
          ))}
        </div>
      </div>

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <h2 style={{ fontSize: 16 }}>
          {lang === "es" ? "La carrera actual" : "The current race"}
        </h2>
        <p className="subtitle" style={{ marginTop: 8 }}>
          {lang === "es"
            ? "La porra está ahora abierta para el Mundial de Ciclismo 2026 en Montreal."
            : "The pool is now open for the 2026 Road World Championships in Montreal."}
        </p>
        <a
          href={lang === "es" ? "/es" : "/"}
          className="btn"
          style={{ marginTop: 14, display: "inline-block" }}
        >
          {lang === "es" ? "Ir al Mundial 2026" : "Go to Worlds 2026"}
        </a>
      </div>
    </div>
  );
}
