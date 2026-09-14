"use client";
// app/tour-de-france-2026/leaderboard/page.js
//
// Final standings of the 2026 Tour de France pool.
//
// Read-only: the race is over, so this simply reports how it ended. It reads
// the same tables as the live leaderboard but filtered to the Tour's own race
// key, which is exactly what the multi-race migration made possible.
import { useEffect, useState } from "react";
import { computeLeaderboard } from "../../../lib/store";
import { getRace } from "../../../lib/data";
import ArchivedRaceBanner from "../../../components/ArchivedRaceBanner";
import Podium from "../../../components/Podium";
import { useLang } from "../../../lib/i18n";

const RACE_SLUG = "tour-de-france-2026";

export default function ArchivedTourLeaderboard() {
  const lang = useLang();
  const race = getRace(RACE_SLUG);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    let active = true;
    computeLeaderboard(RACE_SLUG).then((rows) => {
      if (active) setBoard(rows);
    });
    return () => {
      active = false;
    };
  }, []);

  const raceName = lang === "es" ? "Tour de Francia 2026" : "Tour de France 2026";
  const podiumItems = board
    ? board.slice(0, 3).map((r) => ({ label: r.name, value: r.total }))
    : [];

  return (
    <div>
      <ArchivedRaceBanner raceName={raceName} href={lang === "es" ? "/es" : "/"} />

      <div className="page-header">
        <span className="eyebrow">
          {lang === "es" ? "Clasificación final" : "Final standings"}
        </span>
        <h1>{raceName}</h1>
        <p className="subtitle">
          {lang === "es"
            ? "Así terminó la porra del Tour de Francia 2026."
            : "How the 2026 Tour de France pool finished."}
        </p>
      </div>

      {board === null ? (
        <div className="card">
          <p className="subtitle">{lang === "es" ? "Cargando..." : "Loading..."}</p>
        </div>
      ) : board.length === 0 ? (
        <div className="card">
          <p className="subtitle">
            {lang === "es" ? "No hay resultados registrados." : "No results were recorded."}
          </p>
        </div>
      ) : (
        <>
          <div className="card">
            <h2 style={{ fontSize: 16 }}>{lang === "es" ? "Podio" : "Podium"}</h2>
            <Podium items={podiumItems} valueSuffix=" pts" />
          </div>

          <div className="card" style={{ marginTop: 16 }}>
            <h2 style={{ fontSize: 16 }}>
              {lang === "es" ? "Clasificación completa" : "Full standings"}
            </h2>
            <table className="leaderboard-table" style={{ marginTop: 12 }}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>{lang === "es" ? "Nombre" : "Name"}</th>
                  <th>{lang === "es" ? "Aciertos" : "Correct"}</th>
                  <th>{lang === "es" ? "Maillots" : "Jerseys"}</th>
                  <th>{lang === "es" ? "Puntos" : "Points"}</th>
                </tr>
              </thead>
              <tbody>
                {board.map((row, i) => (
                  <tr key={row.id}>
                    <td>{i + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.correctCount}</td>
                    <td>{row.jerseysWon} / 4</td>
                    <td><strong>{row.total}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="card" style={{ marginTop: 16, textAlign: "center" }}>
        <p className="subtitle">
          {lang === "es"
            ? "Revive el recorrido etapa por etapa:"
            : "Revisit the route stage by stage:"}
        </p>
        <a href={"/" + RACE_SLUG} className="btn" style={{ marginTop: 12, display: "inline-block" }}>
          {lang === "es" ? "Ver las 21 etapas" : "See all 21 stages"}
        </a>
      </div>
    </div>
  );
}
