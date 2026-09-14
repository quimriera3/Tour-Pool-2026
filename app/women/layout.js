// app/women/layout.js
import { getRace, localised } from "../../lib/races";

const RACE = getRace("worlds-2026-women");

export const metadata = {
  title: {
    absolute: "Women's Road World Championships 2026 Predictions — Montreal",
  },
  description:
    "Free prediction pool for the 2026 elite women's UCI Road World Championships in Montreal: the 180.4 km road race, the 39.2 km time trial, route analysis and the favourites for the rainbow jersey.",
  alternates: { canonical: "/women" },
};

export default function WomenLayout({ children }) {
  // Paint this race's surface and accent server-side so the first frame is
  // already correct, before RaceTheme runs.
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            ':root{--accent:' + RACE.theme.accent + ';--accent-dark:' + RACE.theme.accentDark +
            ';--accent-ink:' + RACE.theme.accentInk + ';--accent-soft:' + RACE.theme.accentSoft + ';}',
        }}
      />
      {children}
    </>
  );
}
