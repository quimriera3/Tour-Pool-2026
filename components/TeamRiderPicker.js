"use client";
// components/TeamRiderPicker.js
// Two-step rider picker: pick a team (shown with a colour swatch), then pick a
// rider within that team. Each rider shows the same icon/colour used for stage
// types, matched to their specialty (climber -> mountain icon, sprinter -> flat
// icon, etc.) so it's instantly clear who's good for what.

import { useState } from "react";
import { teamsList, teamColor, riderSpecialty, specialtyToType, TYPE_COLOR } from "../lib/data";
import StageTypeIcon from "./StageTypeIcon";

export default function TeamRiderPicker({ value, onChange, disabled, selectedRiderName, stageType, riderFilter }) {
  const [open, setOpen] = useState(false);
  const [openTeam, setOpenTeam] = useState(null);
  const [search, setSearch] = useState("");
  const allTeams = teamsList();
  const baseTeams = allTeams.filter((t) => t.riders.length > 0);
  const teams = riderFilter
    ? baseTeams
        .map((t) => ({ team: t.team, riders: t.riders.filter(riderFilter) }))
        .filter((t) => t.riders.length > 0)
    : baseTeams;
  const query = search.trim().toLowerCase();

  function pick(riderId) {
    onChange(riderId);
    setOpen(false);
    setOpenTeam(null);
    setSearch("");
  }

  const searchMatches = query
    ? teams.flatMap(({ team, riders }) =>
        riders.filter((r) => r.name.toLowerCase().includes(query)).map((r) => ({ ...r, team }))
      )
    : null;

  return (
    <div style={{ position: "relative", marginTop: 14 }}>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="pick-select"
        style={{ textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: disabled ? "default" : "pointer" }}
      >
        <span>{selectedRiderName || "Pick the winner..."}</span>
        <span style={{ fontSize: 11, color: "var(--grey)" }}>{open ? "▲" : "▼"}</span>
      </button>

      {open && !disabled && (
        <div
          style={{
            position: "absolute",
            zIndex: 10,
            top: "100%",
            left: 0,
            right: 0,
            marginTop: 4,
            background: "var(--white)",
            border: "1.5px solid var(--black)",
            borderRadius: 8,
            maxHeight: 340,
            overflowY: "auto",
          }}
        >
          <div style={{ padding: 8, borderBottom: "1px solid var(--grey-light)", position: "sticky", top: 0, background: "var(--white)" }}>
            <input
              type="text"
              autoFocus
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenTeam(null);
              }}
              placeholder="Search a rider..."
              onClick={(e) => e.stopPropagation()}
              style={{
                width: "100%",
                padding: "8px 10px",
                borderRadius: 6,
                border: "1.5px solid var(--grey-light)",
                fontSize: 13,
              }}
            />
          </div>

          {searchMatches ? (
            <div>
              {searchMatches.length === 0 && (
                <p style={{ padding: "12px 10px", fontSize: 13, color: "var(--grey)" }}>No riders match &quot;{search}&quot;.</p>
              )}
              {searchMatches.map((r) => {
                const specType = specialtyToType(riderSpecialty(r));
                return (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => pick(r.id)}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      padding: "9px 10px",
                      background: value === r.id ? "#fffaf0" : "transparent",
                      border: "none",
                      borderBottom: "1px solid var(--grey-light)",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    <span style={{ width: 9, height: 9, borderRadius: "50%", background: teamColor(r.team), border: "1px solid rgba(0,0,0,0.2)", flexShrink: 0 }} />
                    <StageTypeIcon type={specType} size={13} color={TYPE_COLOR[specType]} />
                    <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{r.name}</span>
                    <span style={{ fontSize: 10, color: "var(--grey)" }}>{r.team}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div>
              {teams.map(({ team, riders }) => {
                const isOpen = openTeam === team;
                return (
                  <div key={team} style={{ borderBottom: "1px solid var(--grey-light)" }}>
                    <button
                      type="button"
                      onClick={() => setOpenTeam(isOpen ? null : team)}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "9px 10px",
                        background: isOpen ? "var(--grey-light)" : "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                      }}
                    >
                      <span
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          background: teamColor(team),
                          border: "1px solid rgba(0,0,0,0.2)",
                          flexShrink: 0,
                        }}
                      />
                      <span style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>{team}</span>
                      <span style={{ fontSize: 10, color: "var(--grey)" }}>{isOpen ? "▲" : "▼"}</span>
                    </button>

                    {isOpen && (
                      <div>
                        {(stageType
                          ? [...riders].sort((a, b) => (b.scores[stageType] ?? 0) - (a.scores[stageType] ?? 0))
                          : riders
                        ).map((r) => {
                          const specType = specialtyToType(riderSpecialty(r));
                          return (
                            <button
                              key={r.id}
                              type="button"
                              onClick={() => pick(r.id)}
                              style={{
                                width: "100%",
                                display: "flex",
                                alignItems: "center",
                                gap: 8,
                                padding: "8px 10px 8px 26px",
                                background: value === r.id ? "#fffaf0" : "transparent",
                                border: "none",
                                borderTop: "1px solid var(--grey-light)",
                                cursor: "pointer",
                                textAlign: "left",
                              }}
                            >
                              <StageTypeIcon type={specType} size={13} color={TYPE_COLOR[specType]} />
                              <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{r.name}</span>
                              <span style={{ fontSize: 10, color: "var(--grey)" }}>{riderSpecialty(r)}</span>
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
