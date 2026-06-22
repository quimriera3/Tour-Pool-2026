"use client";
// components/CookieBanner.js
import { useEffect, useState } from "react";

export default function CookieBanner() {
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
          We use cookies for basic analytics and to show ads. See our{" "}
          <a href="/privacy" style={{ textDecoration: "underline" }}>privacy policy</a> for details.
        </p>
        <button className="btn" onClick={accept} style={{ flexShrink: 0 }}>
          Got it
        </button>
      </div>
    </div>
  );
}
