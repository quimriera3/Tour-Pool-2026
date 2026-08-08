import "./globals.css";
import Nav from "../components/Nav";
import RaceTheme from "../components/RaceTheme";
import CookieBanner from "../components/CookieBanner";
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
    default: "Vuelta a Espa\u00f1a 2026 Sweepstakes \u2014 Predict Every Stage & Win",
    template: "%s | Grand Tour Pool",
  },
  description:
    "Play the best Vuelta a Espa\u00f1a pool online, 100% free. Predict every stage of La Vuelta 2026, pick your jersey winners, and climb a live leaderboard across all 21 stages from Monaco to Granada.",
  keywords: [
    "Vuelta a Espa\u00f1a 2026 sweepstakes",
    "best Vuelta pool online",
    "predict Vuelta stages",
    "La Vuelta 2026 predictions",
    "Vuelta fantasy game",
    "free cycling pool 2026",
    "Vuelta a Espa\u00f1a pick'em",
  ],
  alternates: {
    canonical: "/",
    languages: {
      en: "/",
      es: "/es",
      fr: "/fr",
      it: "/it",
      nl: "/nl",
      ca: "/ca",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Vuelta a Espa\u00f1a 2026 Sweepstakes \u2014 Predict Every Stage & Win",
    description: "The best Vuelta a Espa\u00f1a pool online: predict every 2026 stage winner, free, and climb the live leaderboard.",
    url: SITE_URL,
    siteName: "Grand Tour Pool",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png?v=4",
        width: 916,
        height: 493,
        alt: "Grand Tour Pool \u2014 " + RACE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vuelta a Espa\u00f1a 2026 Sweepstakes \u2014 Predict Every Stage & Win",
    description: "The best Vuelta a Espa\u00f1a pool online: predict every 2026 stage winner, free, and climb the live leaderboard.",
    images: ["/og-image.png?v=4"],
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
    <html lang="en">
      <head>
        {/* Race theme: every accent on the site reads these, so changing the
            active race in lib/races/index.js reskins the whole platform. */}
        <style
          dangerouslySetInnerHTML={{
            __html: `:root{--accent:${theme.accent};--accent-dark:${theme.accentDark};--accent-ink:${theme.accentInk};--accent-soft:${theme.accentSoft};}`,
          }}
        />
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5JL4TSPS');`,
          }}
        />
        {/* End Google Tag Manager */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1513665218593400"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        <RaceTheme />
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5JL4TSPS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Nav />
        <main className="container">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
