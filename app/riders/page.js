"use client";

import { useMemo, useState } from "react";
import { countryFlag, teamsList, teamColor, teamPastelBg, pcsUrl, riderSpecialty, isTeamOfficial, riderEligibleForStage } from "../../lib/data";
import { useLang, t } from "../../lib/i18n";
import { useRace } from "../../lib/useRace";
import { isChampionship } from "../../lib/races";

const SPECIALTIES = ["All", "Climber", "Puncheur", "Sprinter", "Time triallist"];

function riderEvents(rider, race) {
  return race.stages.filter((stage) => riderEligibleForStage(rider, stage));
}

function EventBadges({ rider, race, lang }) {
  if (!isChampionship(race)) return <span className="specialty-tag">{riderSpecialty(rider)}</span>;
  const events = riderEvents(rider, race);
  return (
    <span className="rider-event-badges">
      {events.map((stage) => <b key={stage.n} className={stage.type === "itt" ? "itt" : "road"}>{stage.type === "itt" ? "ITT" : (lang === "es" ? "RUTA" : "ROAD")}</b>)}
    </span>
  );
}

export default function Riders() {
  const lang = useLang();
  const race = useRace();
  const teams = teamsList(race);
  const championship = isChampionship(race);
  const [filter, setFilter] = useState("All");
  const [eventFilter, setEventFilter] = useState("all");
  const [openTeam, setOpenTeam] = useState(null);
  const [search, setSearch] = useState("");
  const query = search.trim().toLowerCase();

  const eventStages = championship ? race.stages : [];
  const roadStage = eventStages.find((s) => s.type !== "itt" && s.type !== "ttt");
  const ittStage = eventStages.find((s) => s.type === "itt");
  const roadCount = roadStage ? race.riders.filter((r) => riderEligibleForStage(r, roadStage)).length : race.riders.length;
  const ittCount = ittStage ? race.riders.filter((r) => riderEligibleForStage(r, ittStage)).length : 0;
  const publishedRiderIds = championship
    ? new Set(eventStages.flatMap((stage) => (stage.eligibleRiderIds || []).map(String)))
    : null;
  const publishedCount = championship ? publishedRiderIds.size : race.riders.length;

  function matchesRider(rider) {
    if (championship && publishedRiderIds.size && !publishedRiderIds.has(String(rider.id))) return false;
    if (filter !== "All" && riderSpecialty(rider) !== filter) return false;
    if (query && !rider.name.toLowerCase().includes(query)) return false;
    if (eventFilter === "road" && roadStage && !riderEligibleForStage(rider, roadStage)) return false;
    if (eventFilter === "itt" && ittStage && !riderEligibleForStage(rider, ittStage)) return false;
    return true;
  }

  const filteredTeams = useMemo(() => teams.map(({ team, riders }) => ({ team, riders: riders.filter(matchesRider) })).filter(({ riders }) => riders.length > 0), [teams, filter, eventFilter, query, roadStage, ittStage]);
  const totalVisible = filteredTeams.reduce((sum, item) => sum + item.riders.length, 0);

  return (
    <div className="riders-v96">
      <div className="page-header riders-page-header">
        <span className="eyebrow">{championship ? (lang === "es" ? "LISTAS DE SALIDA · MONTREAL 2026" : "STARTLISTS · MONTREAL 2026") : t(lang, "riders.eyebrow")}</span>
        <h1>{championship ? (lang === "es" ? "Corredores por prueba" : "Riders by event") : t(lang, "riders.title")}</h1>
        <p className="subtitle">{championship
          ? (lang === "es" ? "Ruta y contrarreloj tienen listas distintas. Filtra por prueba para ver solo los corredores que pueden ser elegidos en ese pick." : "Road race and time trial have different fields. Filter by event to see only riders who can be picked for that event.")
          : t(lang, "riders.subtitle")}</p>
      </div>

      {championship && (
        <div className="startlist-dashboard">
          <div><small>{lang === "es" ? "PRUEBA EN RUTA" : "ROAD RACE"}</small><strong>{roadCount}</strong><span>{lang === "es" ? "corredores publicados" : "published riders"}</span></div>
          <div><small>INDIVIDUAL TT</small><strong>{ittCount}</strong><span>{lang === "es" ? "corredores publicados" : "published riders"}</span></div>
          <div className="startlist-update"><small>{lang === "es" ? "ÚLTIMA REVISIÓN" : "LAST REVIEW"}</small><strong>{race.startlistUpdated ? race.startlistUpdated.split("-").reverse().join("/") : "—"}</strong><span>{lang === "es" ? "Se actualiza con anuncios oficiales" : "Updated from published selections"}</span></div>
        </div>
      )}

      {championship && (
        <div className="event-filter-tabs" role="group" aria-label={lang === "es" ? "Filtrar por prueba" : "Filter by event"}>
          <button type="button" className={eventFilter === "all" ? "active" : ""} onClick={() => setEventFilter("all")}>{lang === "es" ? "TODOS" : "ALL"} <span>{publishedCount}</span></button>
          <button type="button" className={eventFilter === "road" ? "active" : ""} onClick={() => setEventFilter("road")}>{lang === "es" ? "RUTA" : "ROAD"} <span>{roadCount}</span></button>
          <button type="button" className={eventFilter === "itt" ? "active" : ""} onClick={() => setEventFilter("itt")}>ITT <span>{ittCount}</span></button>
        </div>
      )}

      <div className="rider-tools-card">
        <label className="sr-only" htmlFor="rider-search">{lang === "es" ? "Buscar corredor" : "Search rider"}</label>
        <input
          id="rider-search"
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder={t(lang, "riders.searchPlaceholder")}
          className="rider-search"
        />
        <div className="chip-row rider-specialty-chips">
          {SPECIALTIES.map((s) => (
            <button key={s} className={"chip" + (filter === s ? " active" : "")} onClick={() => setFilter(s)}>
              {t(lang, "specialty." + s)}
            </button>
          ))}
        </div>
        <span className="rider-filter-count">{totalVisible} {lang === "es" ? "corredores" : "riders"}</span>
      </div>

      {query ? (
        <div className="rider-search-results">
          {filteredTeams.flatMap(({ team, riders }) => riders.map((r) => ({ ...r, team }))).map((r) => (
            <a key={r.id} href={pcsUrl(r)} target="_blank" rel="noopener noreferrer" className="rider-result-card">
              <span className="rider-result-flag">{countryFlag(r.team)}</span>
              <span><strong>{r.name}</strong><small>{r.team} · {riderSpecialty(r)}</small></span>
              <EventBadges rider={r} race={race} lang={lang} />
              <b className="external-arrow">↗</b>
            </a>
          ))}
          {totalVisible === 0 && <div className="empty-state-card">{lang === "es" ? `No encontramos “${search}” con estos filtros.` : `No riders match “${search}” with these filters.`}</div>}
        </div>
      ) : (
        <div className="rider-country-list">
          {filteredTeams.map(({ team, riders }) => {
            const isOpen = openTeam === team;
            return (
              <div key={team} className="team-accordion rider-country-card" style={{ background: teamPastelBg(team) }}>
                <button type="button" className="team-accordion-header" onClick={() => setOpenTeam(isOpen ? null : team)} aria-expanded={isOpen}>
                  <span className="country-flag-big" aria-hidden="true">{countryFlag(team)}</span>
                  <span className="team-accordion-name">{team}</span>
                  {isTeamOfficial(team, race) && <span className="official-badge">✓ {lang === "es" ? "publicada" : "published"}</span>}
                  <span className="team-accordion-count">{riders.length}</span>
                  <span className="team-accordion-chevron">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="team-accordion-body">
                    {riders.map((r) => (
                      <a key={r.id} href={pcsUrl(r)} target="_blank" rel="noopener noreferrer" className="team-rider-row rider-row-v96">
                        <span className="rider-row-main"><span className="team-dot" style={{ background: teamColor(team) }} /><strong>{r.name}</strong>{!r.confirmed && <span className="unconfirmed-tag"> · {t(lang, "riders.unconfirmed")}</span>}<small>{riderSpecialty(r)}</small></span>
                        <EventBadges rider={r} race={race} lang={lang} />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {championship && (
        <section className="startlist-source-card">
          <div><strong>{lang === "es" ? "Sobre las listas" : "About the startlists"}</strong><p>{lang === "es" ? "Las selecciones cambian hasta los últimos días. Ruta e ITT se revisan por separado y no rellenamos huecos con nombres inventados." : "Selections can change in the final days. Road and ITT are checked separately, and missing names are never filled with guesses."}</p></div>
          {race.startlistSources?.length > 0 && <div className="startlist-links">{race.startlistSources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>}
        </section>
      )}
    </div>
  );
}
