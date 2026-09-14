"use client";
import { useEffect, useState } from "react";
import { useLang } from "../lib/i18n";

const COPY = {
  en: { text: "We use optional analytics cookies to understand how the game is used. You can accept or reject them; the game works either way.", accept: "Accept analytics", reject: "Reject", privacy: "Privacy" },
  es: { text: "Usamos cookies opcionales de analítica para entender cómo se utiliza el juego. Puedes aceptarlas o rechazarlas; el juego funciona igual.", accept: "Aceptar analítica", reject: "Rechazar", privacy: "Privacidad" },
};

export default function CookieBanner() {
  const lang = useLang();
  const c = COPY[lang] || COPY.en;
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const current = localStorage.getItem("gtp-cookie-consent") || localStorage.getItem("cookie-consent");
    if (!current) setVisible(true);
    else if (current === "accepted" && !localStorage.getItem("gtp-cookie-consent")) localStorage.setItem("gtp-cookie-consent", "accepted");
  }, []);

  function choose(value) {
    localStorage.setItem("gtp-cookie-consent", value);
    localStorage.removeItem("cookie-consent");
    setVisible(false);
    window.dispatchEvent(new Event("gtp-consent-changed"));
  }
  if (!visible) return null;
  return <div className="cookie-banner" role="dialog" aria-label="Cookie preferences">
    <div className="container cookie-banner-inner">
      <p>{c.text} <a href={lang === "es" ? "/es/privacy" : "/privacy"}>{c.privacy}</a></p>
      <div className="cookie-actions"><button className="btn btn-ghost" onClick={() => choose("rejected")}>{c.reject}</button><button className="btn" onClick={() => choose("accepted")}>{c.accept}</button></div>
    </div>
  </div>;
}
