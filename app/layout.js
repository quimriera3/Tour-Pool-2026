import "./globals.css";
import Nav from "../components/Nav";
import RaceTheme from "../components/RaceTheme";
import CookieBanner from "../components/CookieBanner";
import ConsentScripts from "../components/ConsentScripts";
import DocumentLocale from "../components/DocumentLocale";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";
import { getActiveRace, localised } from "../lib/races";

// Set this to your real domain once you have one (or your *.vercel.app URL for now).
// Vercel: Settings > Environment Variables > NEXT_PUBLIC_SITE_URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.vercel.app";

const RACE = getActiveRace();
const RACE_NAME = localised(RACE.name, "en");

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Road World Championships 2026 Predictions \u2014 Montreal Worlds Pool",
    template: "%s | Grand Tour Pool",
  },
  description:
    "Free 2026 UCI Road World Championships prediction pool. Pick the elite men’s time trial and road race winners in Montreal, score 10/5/2 points and compete on the live leaderboard.",
  keywords: [
    "Road World Championships 2026 predictions",
    "cycling Worlds 2026 Montreal",
    "rainbow jersey 2026 favourites",
    "Montreal Worlds route",
    "UCI Road Worlds pool",
    "who will win the Worlds 2026",
    "Mount Royal circuit cycling",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Road World Championships 2026 Predictions \u2014 Montreal Worlds Pool",
    description: "Pick the 2026 road world champions in Montreal. Free to play: time trial and road race predictions, live leaderboard and prizes.",
    url: SITE_URL,
    siteName: "Grand Tour Pool",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png?v=6",
        width: 1200,
        height: 630,
        alt: "Grand Tour Pool — " + RACE_NAME + " — Montreal 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Road World Championships 2026 Predictions \u2014 Montreal Worlds Pool",
    description: "Pick the 2026 road world champions in Montreal. Free to play: time trial and road race predictions, live leaderboard and prizes.",
    images: ["/og-image.png?v=6"],
  },
  robots: { index: true, follow: true },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export default function RootLayout({ children }) {
  const theme = getActiveRace().theme || {};
  return (
    <html lang="en" data-surface={getActiveRace().surface || "dark"}>
      <head>
        {/* Race theme: every accent on the site reads these, so changing the
            active race in lib/races/index.js reskins the whole platform. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--accent:${theme.accent};--accent-dark:${theme.accentDark};--accent-ink:${theme.accentInk};--accent-soft:${theme.accentSoft};}`,
          }}
        />
      </head>
      <body>
        <RaceTheme />
        <DocumentLocale />
        <ConsentScripts />
        <Nav />
        <main className="container">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
