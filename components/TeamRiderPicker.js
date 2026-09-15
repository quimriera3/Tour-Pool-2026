"use client";

import { useEffect, useRef, useState } from "react";
import { teamsList, teamColor, riderSpecialty, specialtyToType, TYPE_COLOR, isTeamOfficial, countryFlag } from "../lib/data";
import StageTypeIcon from "./StageTypeIcon";
import { useLang } from "../lib/i18n";

const NO_STARTLIST = {
  en: {
    button: "Startlist not published yet",
    title: "No riders to pick yet",
    body: "The confirmed startlist is still incomplete. Picks will open here as soon as the field is ready.",
    search: "Search a rider…",
    empty: "No riders match",
    pick: "Pick the winner…",
  },
  es: {
    button: "Lista de salida aún no publicada",
    title: "Todavía no hay corredoras o corredores para elegir",
    body: "La lista confirmada todavía está incompleta. Los picks se abrirán aquí en cuanto el pelotón esté listo.",
    search: "Buscar corredor/a…",
    empty: "No hay resultados para",
    pick: "Elige al ganador…",
  },
};

export default function TeamRiderPicker({ race, value, onChange, disabled, selectedRiderName, stageType, riderFilter, label }) {
  const lang = useLang();
  const c = NO_STARTLIST[lang] || NO_STARTLIST.en;
  const [open, setOpen] = useState(false);
  const [openTeam, setOpenTeam] = useState(null);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);

  const derivedSelectedName = selectedRiderName || (value ? race?.riders?.find((r) => r.id === value)?.name : "");
  const allTeams = teamsList(race);
  const baseTeams = allTeams.filter((t) => t.riders.length > 0);
  const teams = riderFilter
    ? baseTeams.map((t) => ({ team: t.team, riders: t.riders.filter(riderFilter) })).filter((t) => t.riders.length > 0)
    : baseTeams;
  const query = search.trim().toLowerCase();
  const noStartlist = teams.length === 0;

  useEffect(() => {
    function closeOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    }
    function closeEscape(e) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", closeOutside);
    document.addEventListener("keydown", closeEscape);
    return () => {
      document.removeEventListener("mousedown", closeOutside);
      document.removeEventListener("keydown", closeEscape);
    };
  }, []);

  if (noStartlist) {
    return (
      <div className="picker-empty" role="status">
        <strong>{c.title}</strong>
        <p>{c.body}</p>
      </div>
    );
  }

  function pick(riderId) {
    onChange(riderId);
    setOpen(false);
    setOpenTeam(null);
    setSearch("");
  }

  const searchMatches = query
    ? teams.flatMap(({ team, riders }) => riders
        .filter((r) => `${r.name} ${team}`.toLowerCase().includes(query))
        .map((r) => ({ ...r, team })))
    : null;

  return (
    <div ref={wrapperRef} className="rider-picker">
      {label && <span className="picker-label">{label}</span>}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="pick-select"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <span>{derivedSelectedName || c.pick}</span>
        <span aria-hidden="true" className="picker-chevron">{open ? "▲" : "▼"}</span>
      </button>

      {open && !disabled && (
        <div className="picker-menu" role="listbox">
          <div className="picker-search-wrap">
            <input
              type="search"
              autoFocus
              value={search}
              onChange={(e) => { setSearch(e.target.value); setOpenTeam(null); }}
              placeholder={c.search}
              className="picker-search"
              aria-label={c.search}
            />
          </div>

          {searchMatches ? (
            <div>
              {searchMatches.length === 0 && <p className="picker-no-results">{c.empty} “{search}”.</p>}
              {searchMatches.map((r) => {
                const specType = specialtyToType(riderSpecialty(r));
                return (
                  <button key={r.id} type="button" onClick={() => pick(r.id)} className={"picker-rider" + (value === r.id ? " selected" : "")}>
                    <span className="picker-country-flag" aria-hidden="true">{countryFlag(r.team)}</span>
                    <StageTypeIcon type={specType} size={13} color={TYPE_COLOR[specType]} />
                    <span className="picker-rider-name">{r.name}</span>
                    <span className="picker-rider-team">{r.team}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              {teams.map(({ team, riders }) => {
                const isOpen = openTeam === team;
                return (
                  <div key={team} className="picker-team">
                    <button type="button" onClick={() => setOpenTeam(isOpen ? null : team)} className={"picker-team-btn" + (isOpen ? " open" : "")} aria-expanded={isOpen}>
                      <span className="picker-country-flag" aria-hidden="true">{countryFlag(team)}</span>
                      <span className="picker-team-name">{team} {isTeamOfficial(team, race) && <span className="official-badge">✓</span>}</span>
                      <span className="picker-count">{riders.length}</span>
                      <span aria-hidden="true">{isOpen ? "▲" : "▼"}</span>
                    </button>
                    {isOpen && (
                      <div>
                        {(stageType ? [...riders].sort((a, b) => (b.scores?.[stageType] ?? 0) - (a.scores?.[stageType] ?? 0)) : riders).map((r) => {
                          const specType = specialtyToType(riderSpecialty(r));
                          return (
                            <button key={r.id} type="button" onClick={() => pick(r.id)} className={"picker-rider nested" + (value === r.id ? " selected" : "")}>
                              <StageTypeIcon type={specType} size={13} color={TYPE_COLOR[specType]} />
                              <span className="picker-rider-name">{r.name}</span>
                              <span className="picker-rider-team">{riderSpecialty(r)}</span>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
