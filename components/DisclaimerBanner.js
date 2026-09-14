"use client";
// components/DisclaimerBanner.js
import { useLang, t } from "../lib/i18n";

export default function DisclaimerBanner() {
  const lang = useLang();

  return (
    <div className="disclaimer-banner">
      <div className="container disclaimer-inner">
        <span className="disclaimer-icon">⚠️</span>
        <p>{t(lang, "disclaimer.text")}</p>
      </div>
    </div>
  );
}
