"use client";

import { countryFlag, favoritesForStage } from "../lib/data";

function initials(name) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join("").toUpperCase();
}

export default function QuickPickGrid({ race, stage, value, onPick, disabled, lang = "en", limit = 6 }) {
  const riders = favoritesForStage(stage, race).slice(0, limit);
  if (!riders.length) return null;

  return (
    <div className="quick-pick-wrap">
      <div className="quick-pick-head">
        <strong>{lang === "es" ? "Favoritos rápidos" : "Quick favourites"}</strong>
        <span>{lang === "es" ? "Toca para elegir" : "Tap to pick"}</span>
      </div>
      <div className="quick-pick-grid">
        {riders.map((rider, index) => {
          const selected = rider.id === value;
          return (
            <button
              key={rider.id}
              type="button"
              disabled={disabled}
              onClick={() => onPick(rider.id)}
              className={"quick-rider" + (selected ? " selected" : "")}
              aria-pressed={selected}
            >
              <span className="quick-rider-rank">{index + 1}</span>
              <span className="quick-rider-avatar" aria-hidden="true">{initials(rider.name)}</span>
              <span className="quick-rider-copy">
                <strong>{rider.name}</strong>
                <small>{countryFlag(rider.team)} {rider.team}</small>
              </span>
              <span className="quick-rider-check" aria-hidden="true">{selected ? "✓" : "+"}</span>
            </button>
          );
        })}
      </div>
      <p className="quick-pick-note">{lang === "es" ? "Ranking editorial por encaje con el recorrido. Puedes buscar cualquier corredor de la lista completa debajo." : "Editorial course-fit ranking. You can search the full startlist below."}</p>
    </div>
  );
}
