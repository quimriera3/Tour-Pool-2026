"use client";
// app/leaderboard/page.js
import { useEffect, useState } from "react";
import { computeLeaderboard, useSession } from "../../lib/store";
import Podium from "../../components/Podium";
import { useLang, t } from "../../lib/i18n";

export default function Leaderboard() {
  const lang = useLang();
  const session = useSession();
  const [board, setBoard] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;
    computeLeaderboard().then((data) => {
      if (active) setBoard(data);
    });
    return () => {
      active = false;
    };
  }, []);

  const top3 = board.slice(0, 3).map((row) => ({ label: row.name, value: row.total }));
  // Attach each player's TRUE rank before filtering, so searching never
  // renumbers anyone -- you should always see your real position.
  const rest = board.slice(3).map((row, i) => ({ ...row, rank: i + 4 }));
  const query = search.trim().toLowerCase();
  const visibleRest = query ? rest.filter((row) => row.name.toLowerCase().includes(query)) : rest;

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{t(lang, "leaderboard.eyebrow")}</span>
        <h1>{t(lang, "leaderboard.title")}</h1>
        <p className="subtitle">{t(lang, "leaderboard.subtitle")}</p>
      </div>

      {board.length > 0 && (
        <div className="card">
          <Podium items={top3} valueSuffix=" pts" />
        </div>
      )}

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t(lang, "leaderboard.searchPlaceholder")}
        className="rider-search"
        style={{ marginTop: 16 }}
      />

      <div className="card">
        <div className="table-scroll">
        <table className="leaderboard">
          <thead>
            <tr>
              <th>#</th>
              <th>{t(lang, "leaderboard.colName")}</th>
              <th><span className="th-full">{t(lang, "leaderboard.colPointsFull")}</span><span className="th-short">{t(lang, "leaderboard.colPointsShort")}</span></th>
              <th><span className="th-full">{t(lang, "leaderboard.colStagesFull")}</span><span className="th-short">{t(lang, "leaderboard.colStagesShort")}</span></th>
              <th><span className="th-full">{t(lang, "leaderboard.colLastFull")}</span><span className="th-short">{t(lang, "leaderboard.colLastShort")}</span></th>
            </tr>
          </thead>
          <tbody>
            {visibleRest.map((row) => (
              <tr key={row.id} className={session && row.id === session.id ? "me" : ""}>
                <td>{row.rank}</td>
                <td>{row.name}</td>
                <td style={{ fontWeight: 800 }}>{row.total}</td>
                <td>{row.correctCount}</td>
                <td>
                  {row.lastFive.map((ok, idx) => (
                    <span key={idx} className={"dot " + (ok ? "dot-green" : "dot-red")}></span>
                  ))}
                </td>
              </tr>
            ))}
            {board.length === 0 && (
              <tr>
                <td colSpan={5}>{t(lang, "leaderboard.noUsers")}</td>
              </tr>
            )}
            {board.length > 0 && visibleRest.length === 0 && query && (
              <tr>
                <td colSpan={5}>{t(lang, "leaderboard.noResultsFor")} &quot;{search}&quot; {t(lang, "leaderboard.found")}</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}
