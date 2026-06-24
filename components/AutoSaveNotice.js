"use client";
// components/AutoSaveNotice.js
//
// Some people don't realise picks save themselves the moment you tap a
// rider -- there's no "submit" button, and you can change your mind freely
// right up until the lock. To make that obvious without nagging everyone
// forever: show a dismissible banner the FIRST time anyone lands on either
// /predictions or /final-classification (one shared localStorage flag, so
// dismissing it on one page also dismisses it on the other), then fall back
// to a small permanent one-line hint at the top of both pages after that.
import { useEffect, useState } from "react";

const STORAGE_KEY = "tdfpool_seen_autosave_notice";

const COPY = {
  en: {
    title: "Your picks save automatically",
    body: "There's no submit button -- the moment you tap a rider, it's saved. Change your mind as many times as you like, right up until that stage or jersey locks.",
    hint: "Saves automatically -- change it anytime until it locks.",
  },
  es: {
    title: "Tus predicciones se guardan solas",
    body: "No hay botón de enviar: en el momento en que eliges un corredor, ya está guardado. Puedes cambiarlo tantas veces como quieras, hasta que esa etapa o maillot se bloquee.",
    hint: "Se guarda solo -- puedes cambiarlo hasta que se bloquee.",
  },
};

export default function AutoSaveNotice({ lang }) {
  const [mounted, setMounted] = useState(false);
  const [seen, setSeen] = useState(true); // assume "already seen" until checked, to avoid a flash

  useEffect(() => {
    setMounted(true);
    try {
      setSeen(window.localStorage.getItem(STORAGE_KEY) === "1");
    } catch (e) {
      setSeen(true);
    }
  }, []);

  function dismiss() {
    setSeen(true);
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch (e) {
      // localStorage unavailable (private mode, etc.) -- not a big deal,
      // worst case the banner shows again next visit.
    }
  }

  if (!mounted) return null;
  const c = COPY[lang] || COPY.en;

  if (!seen) {
    return (
      <div className="autosave-banner">
        <button type="button" className="autosave-banner-close" onClick={dismiss} aria-label="Close">
          ×
        </button>
        <strong className="autosave-banner-title">💾 {c.title}</strong>
        <p className="autosave-banner-body">{c.body}</p>
      </div>
    );
  }

  return <p className="autosave-hint">💾 {c.hint}</p>;
}
