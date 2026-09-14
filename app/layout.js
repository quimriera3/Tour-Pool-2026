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
    default: "Road World Championships 2026 Predictions \u2014 Montreal Worlds Pool",
    template: "%s | Grand Tour Pool",
  },
  description:
    "Free 2026 UCI Road World Championships prediction pool. Predict who wins the rainbow jersey in Montreal: full route preview of the 273.4 km race, Mount Royal circuit analysis and the ten favourites.",
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
      fr: "/fr",
      it: "/it",
      nl: "/nl",
      ca: "/ca",
      "x-default": "/",
    },
  },
  openGraph: {
    title: "Road World Championships 2026 Predictions \u2014 Montreal Worlds Pool",
    description: "Predict the rainbow jersey in Montreal: route preview, Mount Royal analysis and the ten favourites. Free to play.",
    url: SITE_URL,
    siteName: "Grand Tour Pool",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png?v=5",
        width: 916,
        height: 493,
        alt: "Grand Tour Pool \u2014 Road World Championships 2026" + RACE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Road World Championships 2026 Predictions \u2014 Montreal Worlds Pool",
    description: "Predict the rainbow jersey in Montreal: route preview, Mount Royal analysis and the ten favourites. Free to play.",
    images: ["/og-image.png?v=5"],
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
