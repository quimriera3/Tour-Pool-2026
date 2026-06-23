"use client";
// components/PreviewArticleContent.js
import { useState } from "react";
import { getPreviewArticle } from "../lib/previewArticle";

const TOGGLE_LABELS = {
  en: { more: "Read the full preview →", less: "Show less ↑" },
  es: { more: "Leer la previa completa →", less: "Ver menos ↑" },
  ca: { more: "Llegeix la previsió completa →", less: "Veure'n menys ↑" },
  fr: { more: "Lire l'aperçu complet →", less: "Voir moins ↑" },
  it: { more: "Leggi l'anteprima completa →", less: "Mostra meno ↑" },
  nl: { more: "Lees de volledige preview →", less: "Toon minder ↑" },
};

// variant="page"  -> used inside app/preview/* dedicated pages (full page-header + cards)
// variant="home"  -> used on the homepage, below the Leaderboard. Same width as the
//                    other homepage cards; title + first paragraph show by default,
//                    the rest of the article is a "read more" disclosure.
export default function PreviewArticleContent({ lang, variant = "page" }) {
  const article = getPreviewArticle(lang);
  const [expanded, setExpanded] = useState(false);

  if (variant === "home") {
    const labels = TOGGLE_LABELS[lang] || TOGGLE_LABELS.en;
    return (
      <div className="card preview-block">
        <span className="eyebrow">{article.eyebrow}</span>
        <h2 className="preview-block-title">{article.h1}</h2>
        <p className="preview-block-intro">{article.intro}</p>

        {expanded && (
          <>
            {article.sections.map((section, i) => (
              <div key={i} className="preview-block-section">
                <h3>{section.heading}</h3>
                {section.paragraphs.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            ))}

            <p className="preview-block-closing">
              {article.closingPrefix}{" "}
              <a href={article.closingHref}>{article.closingLinkText}</a>{" "}
              {article.closingSuffix}
            </p>
          </>
        )}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="preview-block-toggle"
        >
          {expanded ? labels.less : labels.more}
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{article.eyebrow}</span>
        <h1>{article.h1}</h1>
      </div>

      <div className="card">
        <p className="subtitle" style={{ marginTop: 0 }}>{article.intro}</p>
      </div>

      {article.sections.map((section, i) => (
        <div key={i} className="card" style={{ marginTop: 16 }}>
          <h3 style={{ fontSize: 18 }}>{section.heading}</h3>
          {section.paragraphs.map((p, j) => (
            <p key={j} className="subtitle" style={{ marginTop: j === 0 ? 10 : 12 }}>
              {p}
            </p>
          ))}
        </div>
      ))}

      <div className="card" style={{ marginTop: 16 }}>
        <p className="subtitle">
          {article.closingPrefix}{" "}
          <a href={article.closingHref} style={{ textDecoration: "underline", color: "var(--black)" }}>
            {article.closingLinkText}
          </a>{" "}
          {article.closingSuffix}
        </p>
      </div>
    </div>
  );
}
