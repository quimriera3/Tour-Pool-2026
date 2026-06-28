"use client";
// app/riders/page.js
import { useState } from "react";
import { teamsList, teamColor, teamPastelBg, pcsUrl, riderSpecialty, isTeamOfficial } from "../../lib/data";
import { useLang, t } from "../../lib/i18n";

const SPECIALTIES = ["All", "Climber", "Puncheur", "Sprinter", "Time triallist"];

export default function Riders() {
  const lang = useLang();
  const teams = teamsList();
  const [filter, setFilter] = useState("All");
  const [openTeam, setOpenTeam] = useState(null);
  const [search, setSearch] = useState("");

  const query = search.trim().toLowerCase();

  // When searching, show a flat list of matches across every team instead of
  // the team-by-team accordion -- faster for someone who already knows the
  // name they're looking for.
  if (query) {
    const matches = teams.flatMap(({ team, riders }) =>
      riders
        .filter((r) => (filter === "All" || riderSpecialty(r) === filter) && r.name.toLowerCase().includes(query))
        .map((r) => ({ ...r, team }))
    );

    return (
      <div>
        <div className="page-header">
          <span className="eyebrow">{t(lang, "riders.eyebrow")}</span>
          <h1>{t(lang, "riders.title")}</h1>
        </div>

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t(lang, "riders.searchPlaceholder")}
          className="rider-search"
          autoFocus
        />

        <div className="chip-row">
          {SPECIALTIES.map((s) => (
            <button key={s} className={"chip" + (filter === s ? " active" : "")} onClick={() => setFilter(s)}>
              {t(lang, "specialty." + s)}
            </button>
          ))}
        </div>

        <div className="team-accordion">
          <div className="team-accordion-body" style={{ borderTop: "none" }}>
            {matches.length === 0 && (
              <p className="subtitle" style={{ padding: "16px" }}>No riders match &quot;{search}&quot;.</p>
            )}
            {matches.map((r) => (
              <a key={r.id} href={pcsUrl(r)} target="_blank" rel="noopener noreferrer" className="team-rider-row">
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span className="team-dot" style={{ background: teamColor(r.team) }} />
                  {r.name}
                  {!r.confirmed && <span className="unconfirmed-tag"> · {t(lang, "riders.unconfirmed")}</span>}
                </span>
                <span className="specialty-tag">{r.team}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{t(lang, "riders.eyebrow")}</span>
        <h1>{t(lang, "riders.title")}</h1>
        <p className="subtitle">{t(lang, "riders.subtitle")}</p>
      </div>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t(lang, "riders.searchPlaceholder")}
        className="rider-search"
      />

      <div className="chip-row">
        {SPECIALTIES.map((s) => (
          <button key={s} className={"chip" + (filter === s ? " active" : "")} onClick={() => setFilter(s)}>
            {t(lang, "specialty." + s)}
          </button>
        ))}
      </div>

      <div>
        {teams.map(({ team, riders }) => {
          const visible = riders.filter((r) => filter === "All" || riderSpecialty(r) === filter);
          const hasNoRidersAtAll = riders.length === 0;
          // Hide a team entirely only when a specialty filter is active and it
          // has zero matches for it. Under "All", every one of the 23 teams
          // stays visible -- even ones with no confirmed riders yet -- so the
          // full roster of teams is always represented.
          if (visible.length === 0 && !(filter === "All" && hasNoRidersAtAll)) return null;
          const isOpen = openTeam === team;
          return (
            <div key={team} className="team-accordion" style={{ background: teamPastelBg(team) }}>
              <button
                type="button"
                className="team-accordion-header"
                onClick={() => setOpenTeam(isOpen ? null : team)}
              >
                <span className="team-dot" style={{ background: teamColor(team) }} />
                <span className="team-accordion-name">{team}</span>
                {isTeamOfficial(team) && (
                  <span className="official-badge" title={t(lang, "riders.officialLineup")}>
                    ✓ {t(lang, "riders.officialLineup")}
                  </span>
                )}
                <span className="team-accordion-count">
                  {hasNoRidersAtAll ? t(lang, "riders.tbc") : visible.length + " rider" + (visible.length !== 1 ? "s" : "")}
                </span>
                <span className="team-accordion-chevron">{isOpen ? "▲" : "▼"}</span>
              </button>

              {isOpen && (
                <div className="team-accordion-body">
                  {hasNoRidersAtAll ? (
                    <p className="subtitle" style={{ padding: "14px 16px" }}>
                      {t(lang, "riders.noRidersYet")}
                    </p>
                  ) : (
                    visible.map((r) => (
                      <a key={r.id} href={pcsUrl(r)} target="_blank" rel="noopener noreferrer" className="team-rider-row">
                        <span>
                          {r.name}
                          {!r.confirmed && <span className="unconfirmed-tag"> · {t(lang, "riders.unconfirmed")}</span>}
                        </span>
                        <span className="specialty-tag">{riderSpecialty(r)}</span>
                      </a>
                    ))
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
