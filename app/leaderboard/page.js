"use client";

import { useEffect, useMemo, useState } from "react";
import { computeLeaderboard, useSession } from "../../lib/store";
import Podium from "../../components/Podium";
import { useLang } from "../../lib/i18n";
import { useRace, useRaceBase } from "../../lib/useRace";
import { hasJerseys, isChampionship, localised } from "../../lib/races";

export default function Leaderboard() {
  const lang = useLang();
  const race = useRace();
  const base = useRaceBase();
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
  const myRow = session ? board.find((row) => row.id === session.id) : null;
  const maxPoints = race.stages.length * 10 + (showJerseys ? race.jerseys.length * 10 : 0);
  const scoredEvents = useMemo(() => race.stages.filter((stage) => board.some((row) => row.eventPoints?.[stage.n] !== null && row.eventPoints?.[stage.n] !== undefined)).length, [board, race.stages]);
  const emptyCopy = lang === "es" ? "La clasificación aparecerá cuando se introduzca el primer resultado." : "The leaderboard will come alive as soon as the first result is entered.";

  return (
    <div className="leaderboard-v96">
      <div className="page-header leaderboard-game-header">
        <span className="eyebrow">{lang === "es" ? "MARCADOR EN DIRECTO" : "LIVE SCOREBOARD"}</span>
        <h1>{lang === "es" ? "Clasificación" : "Leaderboard"}</h1>
        <p className="subtitle">
          {championship
            ? (lang === "es" ? "Cada prueba vale 10/5/2. Si hay empate: primero ganadores acertados, después podios acertados." : "Each event scores 10/5/2. Ties: correct winners first, then total podium hits.")
            : (lang === "es" ? "La clasificación se actualiza al introducir cada resultado." : "Standings update whenever a result is entered.")}
        </p>
        <div className="leaderboard-stat-strip">
          <div><small>{lang === "es" ? "JUGADORES" : "PLAYERS"}</small><strong>{loading ? "—" : board.length}</strong></div>
          <div><small>{lang === "es" ? "PRUEBAS PUNTUADAS" : "EVENTS SCORED"}</small><strong>{scoredEvents}/{race.stages.length}</strong></div>
          <div><small>{lang === "es" ? "MÁXIMO" : "MAX SCORE"}</small><strong>{maxPoints} <span>pts</span></strong></div>
          {session && <div className="my-rank-stat"><small>{lang === "es" ? "TU POSICIÓN" : "YOUR RANK"}</small><strong>{myRow ? `#${myRow.rank}` : "—"}</strong></div>}
        </div>
      </div>

      {!loading && board.length > 0 ? (
        <section className="leaderboard-podium-zone">
          <div className="podium-zone-head"><span>{lang === "es" ? "PODIO ACTUAL" : "CURRENT PODIUM"}</span><small>{lang === "es" ? "Se actualiza con cada resultado" : "Updates after each result"}</small></div>
          <div className="card leaderboard-podium-card"><Podium items={top3} valueSuffix=" pts" /></div>
        </section>
      ) : !loading ? (
        <section className="leaderboard-empty-hero">
          <span className="leaderboard-empty-trophy" aria-hidden="true">🏆</span>
          <div><h2>{lang === "es" ? "La carrera por el #1 aún no ha empezado" : "The race for #1 hasn't started yet"}</h2><p>{emptyCopy}</p></div>
          <a href={base + "/predictions"} className="btn hero-primary">{lang === "es" ? "Hacer mis picks" : "Make my picks"} →</a>
        </section>
      ) : null}

      <div className="leaderboard-tools">
        <label className="sr-only" htmlFor="leaderboard-search">{lang === "es" ? "Buscar jugador" : "Search player"}</label>
        <input
          id="leaderboard-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={lang === "es" ? "Buscar jugador…" : "Search a player…"}
          className="rider-search"
        />
        {session && <span className="leaderboard-you-hint">{lang === "es" ? "Tu fila aparece destacada" : "Your row is highlighted"}</span>}
      </div>

      <div className="card leaderboard-card leaderboard-table-v96">
        <div className="table-scroll">
          <table className="leaderboard">
            <thead>
              <tr>
                <th>#</th>
                <th>{lang === "es" ? "Jugador" : "Player"}</th>
                {championship && race.stages.map((stage) => (
                  <th key={stage.n} title={localised(stage.eventName, lang)}>{stage.type === "itt" ? "ITT" : (lang === "es" ? "Ruta" : "Road")}</th>
                ))}
                <th>{lang === "es" ? "Total" : "Total"}</th>
                {!championship && <th>{lang === "es" ? "Ganadores" : "Winners"}</th>}
                {showJerseys && <th>{lang === "es" ? "Maillots" : "Jerseys"}</th>}
              </tr>
            </thead>
            <tbody>
              {visible.map((row) => (
                <tr key={row.id} className={session && row.id === session.id ? "me" : ""}>
                  <td className="rank-cell">{row.rank <= 3 ? <span className={`rank-medal rank-${row.rank}`}>{row.rank}</span> : row.rank}</td>
                  <td><strong>{row.name}</strong>{session && row.id === session.id ? <span className="you-tag">{lang === "es" ? "Tú" : "You"}</span> : null}</td>
                  {championship && race.stages.map((stage) => {
                    const pts = row.eventPoints?.[stage.n];
                    return <td key={stage.n}><span className={pts === null || pts === undefined ? "score-pending" : `score score-${pts}`}>{pts === null || pts === undefined ? "—" : pts}</span></td>;
                  })}
                  <td className="total-cell"><strong>{row.total}</strong><small> pts</small></td>
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

      {championship && <div className="leaderboard-rule-note">{lang === "es" ? "Desempate: ganadores acertados → podios acertados → posición compartida y sorteo transparente si afecta a premios." : "Tiebreak: correct winners → podium hits → shared rank and transparent draw if a prize is affected."}</div>}
    </div>
  );
}
