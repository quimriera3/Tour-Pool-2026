"use client";

import { useEffect, useState } from "react";
import { computeLeaderboard, useSession } from "../../lib/store";
import Podium from "../../components/Podium";
import { useLang } from "../../lib/i18n";
import { useRace } from "../../lib/useRace";
import { hasJerseys, isChampionship, localised } from "../../lib/races";

export default function Leaderboard() {
  const lang = useLang();
  const race = useRace();
  const session = useSession();
  const [board, setBoard] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const showJerseys = hasJerseys(race);
  const championship = isChampionship(race);

  useEffect(() => {
    let active = true;
    setLoading(true);
    computeLeaderboard(race.slug).then((data) => {
      if (active) {
        setBoard(data);
        setLoading(false);
      }
    });
    return () => { active = false; };
  }, [race.slug]);

  const query = search.trim().toLowerCase();
  const visible = query ? board.filter((row) => row.name.toLowerCase().includes(query)) : board;
  const top3 = board.slice(0, 3).map((row) => ({ label: row.name, value: row.total }));
  const emptyCopy = lang === "es" ? "La clasificación aparecerá cuando se introduzca el primer resultado." : "The leaderboard will come alive as soon as the first result is entered.";

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{lang === "es" ? "Clasificación en directo" : "Live standings"}</span>
        <h1>{lang === "es" ? "Clasificación" : "Leaderboard"}</h1>
        <p className="subtitle">
          {championship
            ? (lang === "es" ? "10 puntos al ganador, 5 al segundo y 2 al tercero. En caso de empate mandan primero los ganadores acertados y después los podios acertados." : "10 points for a winner, 5 for second and 2 for third. Ties are broken first by correct winners, then by total podium hits.")
            : (lang === "es" ? "La clasificación se actualiza al introducir cada resultado." : "Standings update whenever a result is entered.")}
        </p>
      </div>

      {!loading && board.length > 0 && (
        <div className="card leaderboard-podium-card"><Podium items={top3} valueSuffix=" pts" /></div>
      )}

      <label className="sr-only" htmlFor="leaderboard-search">{lang === "es" ? "Buscar jugador" : "Search player"}</label>
      <input
        id="leaderboard-search"
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={lang === "es" ? "Buscar jugador…" : "Search a player…"}
        className="rider-search"
        style={{ marginTop: 16 }}
      />

      <div className="card leaderboard-card">
        <div className="table-scroll">
          <table className="leaderboard">
            <thead>
              <tr>
                <th>#</th>
                <th>{lang === "es" ? "Jugador" : "Player"}</th>
                {championship && race.stages.map((stage) => (
                  <th key={stage.n} title={localised(stage.eventName, lang)}>{stage.type === "itt" ? "ITT" : (lang === "es" ? "Ruta" : "Road")}</th>
                ))}
                <th>{lang === "es" ? "Puntos" : "Points"}</th>
                {!championship && <th>{lang === "es" ? "Ganadores" : "Winners"}</th>}
                {showJerseys && <th>{lang === "es" ? "Maillots" : "Jerseys"}</th>}
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className={session && row.id === session.id ? "me" : ""}>
                  <td>{row.rank}</td>
                  <td><strong>{row.name}</strong>{session && row.id === session.id ? <span className="you-tag">{lang === "es" ? "Tú" : "You"}</span> : null}</td>
                  {championship && race.stages.map((stage) => {
                    const pts = row.eventPoints?.[stage.n];
                    return <td key={stage.n}><span className={pts === null ? "score-pending" : `score score-${pts}`}>{pts === null ? "—" : pts}</span></td>;
                  })}
                  <td className="total-cell">{row.total}</td>
                  {!championship && <td>{row.winnerCount}</td>}
                  {showJerseys && <td>{row.jerseysWon} / {race.jerseys.length}</td>}
                </tr>
              ))}
              {!loading && board.length === 0 && <tr><td colSpan={4 + (championship ? race.stages.length : 0)}>{emptyCopy}</td></tr>}
              {!loading && board.length > 0 && visible.length === 0 && <tr><td colSpan={4 + (championship ? race.stages.length : 0)}>{lang === "es" ? "No hay jugadores que coincidan con la búsqueda." : "No players match your search."}</td></tr>}
              {loading && <tr><td colSpan={4 + (championship ? race.stages.length : 0)}>{lang === "es" ? "Cargando clasificación…" : "Loading leaderboard…"}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
