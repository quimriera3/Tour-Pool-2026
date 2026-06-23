// components/PreviewArticleContent.js
import { getPreviewArticle } from "../lib/previewArticle";

// variant="page"  -> used inside app/preview/* dedicated pages (full page-header + cards)
// variant="home"  -> used inside the homepage, below the Leaderboard, as an SEO content
//                    block. Same full article, calmer typography, generous margins, no
//                    duplicate page title (the homepage already has its own h1).
export default function PreviewArticleContent({ lang, variant = "page" }) {
  const article = getPreviewArticle(lang);

  if (variant === "home") {
    return (
      <div className="preview-block">
        <span className="eyebrow">{article.eyebrow}</span>
        <h2 className="preview-block-title">{article.h1}</h2>
        <p className="preview-block-intro">{article.intro}</p>

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
