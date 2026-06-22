"use client";
// components/Footer.js
import { useLang } from "../lib/i18n";

export default function Footer() {
  const lang = useLang();
  const prefix = lang === "es" ? "/es" : "";

  return (
    <p className="footer-note container">
      © 2026 Sports Pools 26. All rights reserved.
      <br />
      <span style={{ marginTop: 6, display: "inline-block" }}>
        <a href={prefix + "/privacy"} style={{ textDecoration: "underline" }}>
          {lang === "es" ? "Política de privacidad" : "Privacy policy"}
        </a>
        {" · "}
        <a href={prefix + "/contact"} style={{ textDecoration: "underline" }}>
          {lang === "es" ? "Contacto" : "Contact"}
        </a>
      </span>
      <br />
      <span style={{ marginTop: 6, display: "inline-block" }}>
        {lang === "es" ? "También en:" : "Also in:"}{" "}
        <a href="/" style={{ textDecoration: "underline" }}>English</a>{" · "}
        <a href="/es" style={{ textDecoration: "underline" }}>Español</a>{" · "}
        <a href="/fr" style={{ textDecoration: "underline" }}>Français</a>{" · "}
        <a href="/it" style={{ textDecoration: "underline" }}>Italiano</a>{" · "}
        <a href="/nl" style={{ textDecoration: "underline" }}>Nederlands</a>{" · "}
        <a href="/ca" style={{ textDecoration: "underline" }}>Català</a>
      </span>
    </p>
  );
}
