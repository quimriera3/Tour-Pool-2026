"use client";
// components/CookieBanner.js
import { useEffect, useState } from "react";
import { useLang, t } from "../lib/i18n";

export default function CookieBanner() {
  const lang = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("cookie-consent")) {
      setVisible(true);
    }
  }, []);

  function accept() {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="cookie-banner">
      <div className="container cookie-banner-inner">
        <p>
          {t(lang, "cookie.text")}{" "}
          <a href={lang === "es" ? "/es/privacy" : "/privacy"} style={{ textDecoration: "underline" }}>{t(lang, "cookie.privacyLink")}</a>{" "}
          {t(lang, "cookie.forDetails")}
        </p>
        <button className="btn" onClick={accept} style={{ flexShrink: 0 }}>
          {t(lang, "cookie.gotIt")}
        </button>
      </div>
    </div>
  );
}
