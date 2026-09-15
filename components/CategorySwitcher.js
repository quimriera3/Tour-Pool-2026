"use client";
// components/CategorySwitcher.js
//
// Switches between the men's and women's editions of a championship, keeping
// the visitor on the equivalent page (/predictions -> /women/predictions).
//
// Only rendered when the current race actually has a sibling category, so it
// stays invisible for the Tour, the Vuelta and any other single-category race.
import { usePathname } from "next/navigation";
import { raceBasePath } from "../lib/races";
import { useRace, useRaceCategories } from "../lib/useRace";
import { useLang } from "../lib/i18n";

const LABEL = {
  en: { men: "Men's pool", women: "Women's pool" },
  es: { men: "Masculino", women: "Femenino" },
  ca: { men: "Masculí", women: "Femení" },
  fr: { men: "Hommes", women: "Femmes" },
  it: { men: "Uomini", women: "Donne" },
  nl: { men: "Mannen", women: "Vrouwen" },
};

export default function CategorySwitcher() {
  const pathname = usePathname();
  const lang = useLang();
  const race = useRace();
  const categories = useRaceCategories();

  if (categories.length < 2) return null;

  const labels = LABEL[lang] || LABEL.en;
  const currentBase = raceBasePath(race, lang);

  // Whatever page we're on, stay on it when switching category.
  const suffix = pathname.startsWith(currentBase) && currentBase
    ? pathname.slice(currentBase.length)
    : pathname === "/" || pathname === "/es"
      ? ""
      : pathname.replace(/^\/es/, "");

  return (
    <div className="cat-switch" role="group" aria-label="Category">
      {categories.map((r) => {
        const base = raceBasePath(r, lang);
        const href = (base + suffix) || "/";
        const active = r.slug === race.slug;
        return (
          <a
            key={r.slug}
            href={href}
            className={"cat-switch-btn" + (active ? " active" : "")}
            aria-current={active ? "page" : undefined}
          >
            <strong>{labels[r.category] || r.category}</strong>
            <small>{r.stages.length} {lang === "es" ? "picks" : "picks"}</small>
          </a>
        );
      })}
    </div>
  );
}
