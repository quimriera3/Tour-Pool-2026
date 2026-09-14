import { NextResponse } from "next/server";
import { buildEmailHtml, textToHtmlParagraphs } from "../../../lib/emailTemplate";
import { translateText } from "../../../lib/translate";
import { getRace, getActiveRace, localised, isChampionship } from "../../../lib/races";

const COPY = {
  en: (race) => ({
    subject: `Welcome to the ${localised(race.shortName || race.name, "en")} pool`,
    body: isChampionship(race)
      ? `You're in. Pick the winner of each ${race.category || "elite"} event before the deadline. A correct winner scores 10 points, second place scores 5 and third place scores 2. Picks lock one hour before the official start and can be changed until then.\n\nGood luck — and enjoy the racing.`
      : `You're in. Pick a winner for each stage before the deadline and follow your score on the leaderboard. Picks lock one hour before the official start and can be changed until then.\n\nGood luck — and enjoy the racing.`,
  }),
  es: (race) => ({
    subject: `Bienvenido a la porra de ${localised(race.shortName || race.name, "es")}`,
    body: isChampionship(race)
      ? `Ya estás dentro. Elige al ganador de cada prueba ${race.category === "women" ? "femenina" : "masculina"} antes del cierre. Acertar el ganador suma 10 puntos, el segundo puesto 5 y el tercero 2. Los picks se cierran una hora antes de la salida oficial y puedes cambiarlos hasta entonces.\n\nMucha suerte y disfruta de las carreras.`
      : `Ya estás dentro. Elige al ganador de cada etapa antes del cierre y sigue tus puntos en la clasificación. Los picks se cierran una hora antes de la salida oficial y puedes cambiarlos hasta entonces.\n\nMucha suerte y disfruta de la carrera.`,
  }),
  ca: (race) => ({
    subject: `Benvingut a la porra de ${localised(race.shortName || race.name, "ca")}`,
    body: isChampionship(race)
      ? `Ja hi ets. Tria el guanyador de cada prova abans del tancament. Encertar el guanyador suma 10 punts, el segon lloc 5 i el tercer 2. Els picks es tanquen una hora abans de la sortida oficial i els pots canviar fins aleshores.\n\nMolta sort i gaudeix de les curses.`
      : `Ja hi ets. Tria un guanyador per a cada etapa abans del tancament i segueix els teus punts a la classificació. Els picks es tanquen una hora abans de la sortida oficial i els pots canviar fins aleshores.\n\nMolta sort i gaudeix de la cursa.`,
  }),
};

export async function POST(request) {
  const { name, email, lang, race: raceSlug } = await request.json();
  if (!email) return NextResponse.json({ ok: false, error: "Email is required." }, { status: 400 });
  if (!process.env.RESEND_API_KEY) return NextResponse.json({ ok: true, skipped: "RESEND_API_KEY not set" });

  const race = getRace(raceSlug) || getActiveRace();
  const L = lang || "en";
  const english = COPY.en(race);
  let content = COPY[L] ? COPY[L](race) : english;
  if (!COPY[L]) {
    try {
      const [subject] = await translateText(english.subject, "en", L, false);
      const [body] = await translateText(english.body, "en", L, false);
      content = { subject, body };
    } catch {}
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: "Bearer " + process.env.RESEND_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.RESEND_FROM || "Grand Tour Pool <onboarding@resend.dev>",
        to: [email],
        subject: content.subject,
        html: buildEmailHtml({ name, bodyHtml: textToHtmlParagraphs(content.body), lang: L, raceSlug: race.slug }),
      }),
    });
    if (!res.ok) return NextResponse.json({ ok: true, warning: (await res.json().catch(() => ({}))).message || "Email provider returned an error" });
  } catch {
    return NextResponse.json({ ok: true, warning: "Could not reach email provider" });
  }
  return NextResponse.json({ ok: true });
}
