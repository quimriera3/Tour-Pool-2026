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
  if (!events.length) return <span className="rider-pool-badge">POOL</span>;
  return (
    <span className="rider-event-badges">
      {events.map((stage) => <b key={stage.n} className={stage.type === "itt" ? "itt" : "road"}>{stage.type === "itt" ? "ITT" : (lang === "es" ? "RUTA" : "ROAD")}</b>)}
    </span>
  );
}

function RiderResult({ rider, race, lang }) {
  const url = pcsUrl(rider);
  const content = <>
    <span className="rider-result-flag">{countryFlag(rider.team)}</span>
    <span className="rider-result-copy"><strong>{rider.name}</strong><small>{rider.team}{!isChampionship(race) ? ` · ${riderSpecialty(rider)}` : ""}</small></span>
    <EventBadges rider={rider} race={race} lang={lang} />
    {url && <b className="external-arrow">↗</b>}
  </>;
  return url
    ? <a href={url} target="_blank" rel="noopener noreferrer" className="rider-result-card">{content}</a>
    : <div className="rider-result-card rider-result-static">{content}</div>;
}

function RiderCountryRow({ rider, team, race, lang }) {
  const url = pcsUrl(rider);
  const content = <>
    <span className="rider-row-main">
      <span className="team-dot" style={{ background: teamColor(team) }} />
      <strong>{rider.name}</strong>
      {!rider.confirmed && <span className="unconfirmed-tag"> · {t(lang, "riders.unconfirmed")}</span>}
      {!isChampionship(race) && <small>{riderSpecialty(rider)}</small>}
    </span>
    <EventBadges rider={rider} race={race} lang={lang} />
    {url && <span className="rider-row-external" aria-hidden="true">↗</span>}
  </>;
  return url
    ? <a href={url} target="_blank" rel="noopener noreferrer" className="team-rider-row rider-row-v96 rider-row-v98">{content}</a>
    : <div className="team-rider-row rider-row-v96 rider-row-v98 rider-row-static">{content}</div>;
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
  const poolCount = race.riders.length;
  const listedIds = championship
    ? new Set(eventStages.flatMap((stage) => (stage.eligibleRiderIds || []).map(String)))
    : new Set(race.riders.map((r) => String(r.id)));

  function matchesRider(rider) {
    if (!championship && filter !== "All" && riderSpecialty(rider) !== filter) return false;
    if (query && !(`${rider.name} ${rider.team}`).toLowerCase().includes(query)) return false;
    if (eventFilter === "road" && roadStage && !riderEligibleForStage(rider, roadStage)) return false;
    if (eventFilter === "itt" && ittStage && !riderEligibleForStage(rider, ittStage)) return false;
    return true;
  }

  const filteredTeams = useMemo(
    () => teams
      .map(({ team, riders }) => ({ team, riders: riders.filter(matchesRider) }))
      .filter(({ riders }) => riders.length > 0),
    [teams, filter, eventFilter, query, roadStage, ittStage]
  );
  const totalVisible = filteredTeams.reduce((sum, item) => sum + item.riders.length, 0);

  return (
    <div className="riders-v98">
      <div className="page-header riders-page-header riders-page-header-v98">
        <span className="eyebrow">{championship ? "STARTLIST · MONTRÉAL 2026" : t(lang, "riders.eyebrow")}</span>
        <h1>{championship ? (lang === "es" ? "Corredores" : "Riders") : t(lang, "riders.title")}</h1>
        <p className="subtitle">{championship
          ? (lang === "es"
            ? "Lista completa que estamos siguiendo para el Mundial. Cambia entre Todos, Ruta e ITT para ver exactamente quién figura en cada prueba."
            : "The complete rider pool we are tracking for the Worlds. Switch between All, Road and ITT to see exactly who is listed for each event.")
          : t(lang, "riders.subtitle")}</p>
      </div>

      {championship && (
        <div className="startlist-dashboard startlist-dashboard-v98">
          <div className="startlist-pool-stat"><small>{lang === "es" ? "POOL TOTAL" : "RIDER POOL"}</small><strong>{poolCount}</strong><span>{lang === "es" ? "nombres seguidos" : "tracked riders"}</span></div>
          <div><small>{lang === "es" ? "STARTLIST RUTA" : "ROAD STARTLIST"}</small><strong>{roadCount}</strong><span>{lang === "es" ? "corredores" : "riders"}</span></div>
          <div><small>ITT STARTLIST</small><strong>{ittCount}</strong><span>{lang === "es" ? "corredores" : "riders"}</span></div>
          <div className="startlist-update"><small>{lang === "es" ? "ACTUALIZADO" : "UPDATED"}</small><strong>{race.startlistUpdated ? race.startlistUpdated.split("-").reverse().join("/") : "—"}</strong><span>{lang === "es" ? "lista provisional" : "provisional list"}</span></div>
        </div>
      )}

      {championship && (
        <div className="event-filter-tabs event-filter-tabs-v98" role="group" aria-label={lang === "es" ? "Filtrar por prueba" : "Filter by event"}>
          <button type="button" className={eventFilter === "all" ? "active" : ""} onClick={() => setEventFilter("all")}>{lang === "es" ? "TODOS" : "ALL"} <span>{poolCount}</span></button>
          <button type="button" className={eventFilter === "road" ? "active" : ""} onClick={() => setEventFilter("road")}>{lang === "es" ? "RUTA" : "ROAD"} <span>{roadCount}</span></button>
          <button type="button" className={eventFilter === "itt" ? "active" : ""} onClick={() => setEventFilter("itt")}>ITT <span>{ittCount}</span></button>
        </div>
      )}

      <div className="rider-tools-card rider-tools-v98">
        <div className="rider-search-block">
          <label className="sr-only" htmlFor="rider-search">{lang === "es" ? "Buscar corredor" : "Search rider"}</label>
          <input id="rider-search" type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder={lang === "es" ? "Buscar corredor o país…" : "Search rider or nation…"} className="rider-search" />
          <span className="rider-filter-count"><strong>{totalVisible}</strong> {lang === "es" ? "visibles" : "shown"}</span>
        </div>
        {!championship && <div className="chip-row rider-specialty-chips">{SPECIALTIES.map((s) => <button key={s} className={"chip" + (filter === s ? " active" : "")} onClick={() => setFilter(s)}>{t(lang, "specialty." + s)}</button>)}</div>}
      </div>

      {championship && (
        <div className="startlist-legend-v98">
          <span><b className="legend-road">ROAD</b>{lang === "es" ? "figura en la startlist de Ruta" : "listed for the road race"}</span>
          <span><b className="legend-itt">ITT</b>{lang === "es" ? "figura en la startlist de la CRI" : "listed for the time trial"}</span>
          <span><b className="legend-pool">POOL</b>{lang === "es" ? "seguido, pero no figura todavía en una prueba" : "tracked, not currently listed for an event"}</span>
        </div>
      )}

      {query ? (
        <div className="rider-search-results">
          {filteredTeams.flatMap(({ team, riders }) => riders.map((r) => ({ ...r, team }))).map((r) => <RiderResult key={r.id} rider={r} race={race} lang={lang} />)}
          {totalVisible === 0 && <div className="empty-state-card">{lang === "es" ? `No encontramos “${search}” con estos filtros.` : `No riders match “${search}” with these filters.`}</div>}
        </div>
      ) : (
        <div className="rider-country-list rider-country-list-v98">
          {filteredTeams.map(({ team, riders }) => {
            const isOpen = openTeam === team;
            const currentListCount = riders.filter((r) => listedIds.has(String(r.id))).length;
            return (
              <div key={team} className="team-accordion rider-country-card rider-country-card-v98" style={{ background: teamPastelBg(team) }}>
                <button type="button" className="team-accordion-header" onClick={() => setOpenTeam(isOpen ? null : team)} aria-expanded={isOpen}>
                  <span className="country-flag-big" aria-hidden="true">{countryFlag(team)}</span>
                  <span className="team-accordion-name">{team}</span>
                  {isTeamOfficial(team, race) && <span className="official-badge">✓ {lang === "es" ? "lista actual" : "current list"}</span>}
                  <span className="team-accordion-count">{riders.length}</span>
                  <span className="team-accordion-chevron">{isOpen ? "▲" : "▼"}</span>
                </button>
                {isOpen && (
                  <div className="team-accordion-body">
                    {riders.map((r) => <RiderCountryRow key={r.id} rider={r} team={team} race={race} lang={lang} />)}
                    {championship && eventFilter === "all" && currentListCount === 0 && <p className="team-pending-note">{lang === "es" ? "Estos nombres siguen en el pool, pero no figuran todavía en la startlist de Ruta o ITT que estamos usando." : "These riders remain in the pool but are not currently listed for Road or ITT in the startlists we are using."}</p>}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {championship && (
        <section className="startlist-source-card startlist-source-v98">
          <div><strong>{lang === "es" ? "Cómo actualizamos las startlists" : "How the startlists are updated"}</strong><p>{lang === "es" ? "Ruta e ITT se controlan por separado. Usamos listas públicas actuales como referencia de cobertura y damos prioridad a los anuncios de las federaciones cuando existe una discrepancia. ProCyclingStats sigue enlazado como contraste, pero su versión indexada puede ir con retraso." : "Road and ITT are tracked separately. Current public startlists are used for coverage, while federation announcements take priority when sources disagree. ProCyclingStats remains linked as a cross-check, but its indexed version can lag behind."}</p></div>
          {race.startlistSources?.length > 0 && <div className="startlist-links">{race.startlistSources.map((source) => <a key={source.href} href={source.href} target="_blank" rel="noopener noreferrer">{source.label} ↗</a>)}</div>}
        </section>
      )}
    </div>
  );
}
