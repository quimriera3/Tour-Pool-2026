"use client";
import { useEffect } from "react";

const GTM_ID = "GTM-5JL4TSPS";

export default function ConsentScripts() {
  useEffect(() => {
    function load() {
      const consent = localStorage.getItem("gtp-cookie-consent") || localStorage.getItem("cookie-consent");
      if (consent !== "accepted" || document.getElementById("gtp-gtm")) return;
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      const script = document.createElement("script");
      script.id = "gtp-gtm";
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
      document.head.appendChild(script);
    }
    load();
    window.addEventListener("gtp-consent-changed", load);
    return () => window.removeEventListener("gtp-consent-changed", load);
  }, []);
  return null;
}
