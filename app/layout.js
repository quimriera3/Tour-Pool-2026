import "./globals.css";
import Nav from "../components/Nav";
import CtaBar from "../components/CtaBar";
import DisclaimerBanner from "../components/DisclaimerBanner";
import CookieBanner from "../components/CookieBanner";
import Footer from "../components/Footer";
import { Analytics } from "@vercel/analytics/react";

// Set this to your real domain once you have one (or your *.vercel.app URL for now).
// Vercel: Settings > Environment Variables > NEXT_PUBLIC_SITE_URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.vercel.app";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Tour de France 2026 Sweepstakes — Predict Every Stage & Win",
    template: "%s | Grand Tour Pool",
  },
  description:
    "Play the best Tour de France pool online, 100% free. Predict Tour de France stages, pick your jersey winners, and climb a live leaderboard across all 21 real 2026 stages.",
  keywords: [
    "Tour de France 2026 sweepstakes",
    "best Tour de France pool online",
    "predict Tour de France stages",
    "Tour de France 2026 predictions",
    "Tour de France fantasy game",
    "free cycling pool 2026",
    "Tour de France pick'em",
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
    title: "Tour de France 2026 Sweepstakes — Predict Every Stage & Win",
    description: "The best Tour de France pool online: predict every 2026 stage winner, free, and climb the live leaderboard.",
    url: SITE_URL,
    siteName: "Grand Tour Pool",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png?v=2",
        width: 916,
        height: 493,
        alt: "Tour de France Pool 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour de France 2026 Sweepstakes — Predict Every Stage & Win",
    description: "The best Tour de France pool online: predict every 2026 stage winner, free, and climb the live leaderboard.",
    images: ["/og-image.png?v=2"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#111111",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
        <CtaBar />
        <DisclaimerBanner />
        <main className="container">{children}</main>
        <Footer />
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}
