"use client";
// app/tour-de-france-2026/stage/[n]/page.js
//
// Read-only archive of the 2026 Tour de France stage pages.
//
// The live /stage/[n] URLs now serve the current race, so the Tour's stage
// content lives here instead. These pages keep the full route detail, preview
// text and final podium, but no rider picker — the race is over and picks are
// closed. They are not linked from the navigation; they exist so the content
// stays available to anyone arriving from search.
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getRace, riderById, TYPE_LABEL } from "../../../../lib/data";
import { getResults } from "../../../../lib/store";
import StageProfile from "../../../../components/StageProfile";
import StageTypeIcon from "../../../../components/StageTypeIcon";
import Podium from "../../../../components/Podium";
import ArchivedRaceBanner from "../../../../components/ArchivedRaceBanner";
import StageFavourites from "../../../../components/StageFavourites";
import { useLang, t } from "../../../../lib/i18n";

const RACE_SLUG = "tour-de-france-2026";

export default function ArchivedTourStage() {
  const lang = useLang();
  const params = useParams();
  const n = parseInt(params.n, 10);
  const race = getRace(RACE_SLUG);
  const stage = race ? race.stages.find((s) => s.n === n) : null;

  const [result, setResult] = useState(null);

  useEffect(() => {
    let active = true;
    getResults(RACE_SLUG).then((all) => {
      if (active) setResult(all[n] || null);
    });
    return () => {
      active = false;
    };
  }, [n]);

  if (!stage) {
    return (
      <div className="page-header">
        <h1>{t(lang, "stage.notFound")}</h1>
        <a href="/" className="btn" style={{ marginTop: 14, display: "inline-block" }}>
          {lang === "es" ? "Ir al inicio" : "Go to the homepage"}
        </a>
      </div>
    );
  }

  const prevStage = race.stages.find((s) => s.n === n - 1);
  const nextStage = race.stages.find((s) => s.n === n + 1);

  const podiumItems = result
    ? [
        { label: riderById(result.first, race)?.name || result.first },
        { label: riderById(result.second, race)?.name || result.second },
        { label: riderById(result.third, race)?.name || result.third },
      ]
    : null;

  const raceName = lang === "es" ? "Tour de Francia 2026" : "Tour de France 2026";

  return (
    <article>
      <ArchivedRaceBanner raceName={raceName} href={lang === "es" ? "/es" : "/"} />

      <div className="stage-nav">
        {prevStage ? (
          <a href={"/" + RACE_SLUG + "/stage/" + prevStage.n} className="stage-nav-link">
            ← {lang === "es" ? "Etapa" : "Stage"} {prevStage.n}
          </a>
        ) : (
          <span className="stage-nav-link disabled">← {lang === "es" ? "Etapa" : "Stage"} {n}</span>
        )}
        <span className="stage-nav-link center">{raceName}</span>
        {nextStage ? (
          <a href={"/" + RACE_SLUG + "/stage/" + nextStage.n} className="stage-nav-link">
            {lang === "es" ? "Etapa" : "Stage"} {nextStage.n} →
          </a>
        ) : (
          <span className="stage-nav-link disabled">{lang === "es" ? "Etapa" : "Stage"} {n} →</span>
        )}
      </div>

      <div className="page-header">
        <span className="eyebrow">
          {raceName} · {lang === "es" ? "Etapa " + stage.n + " de 21" : "Stage " + stage.n + " of 21"} ·{" "}
          {stage.date.split("-").reverse().join("/")}
        </span>
        <h1>{stage.from} → {stage.to}</h1>
        <p className="subtitle" style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <span className={"stage-type type-" + stage.type} style={{ display: "inline-flex", alignItems: "center", gap: 5 }}>
            <StageTypeIcon type={stage.type} size={13} />
            {TYPE_LABEL[stage.type]}
          </span>
          · {stage.km} km
          {stage.elevationGain ? <> · ↗ {stage.elevationGain.toLocaleString()} m {lang === "es" ? "de desnivel" : "of climbing"}</> : null}
        </p>
      </div>

      <section className="card" aria-labelledby={"arch-elev-" + n}>
        <h2 id={"arch-elev-" + n} style={{ fontSize: 15 }}>{t(lang, "stage.elevationProfile")}</h2>
        <StageProfile type={stage.type} elevationGain={stage.elevationGain} />
      </section>

      <section className="card" style={{ marginTop: 16 }} aria-labelledby={"arch-prev-" + n}>
        <h2 id={"arch-prev-" + n} style={{ fontSize: 15 }}>{t(lang, "stage.stagePreview")}</h2>
        <p className="subtitle" style={{ marginTop: 10 }}>
          {lang === "es" && stage.previewEs ? stage.previewEs : stage.preview}
        </p>
      </section>

      <StageFavourites stage={stage} lang={lang} race={race} />

      {podiumItems && (
        <section className="card" style={{ marginTop: 16 }} aria-labelledby={"arch-res-" + n}>
          <h2 id={"arch-res-" + n} style={{ fontSize: 15 }}>
            {lang === "es" ? "Resultado final" : "Final result"}
          </h2>
          <Podium items={podiumItems} />
        </section>
      )}
    </article>
  );
}
