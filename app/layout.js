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
    default: "Tour de France Pool 2026 — Stage Predictions & Sweepstake",
    template: "%s | Tour de France Pool",
  },
  description:
    "Free Tour de France 2026 predictions pool and sweepstake. Pick the winner of every stage, climb the leaderboard, and win cycling gear. 21 stages, real riders.",
  keywords: ["Tour de France 2026", "Tour de France pool", "cycling sweepstake", "Tour de France predictions", "fantasy cycling", "cycling pick'em"],
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
    title: "Tour de France Pool 2026 — Stage Predictions & Sweepstake",
    description: "Pick the winner of every Tour de France 2026 stage and climb the leaderboard.",
    url: SITE_URL,
    siteName: "Tour de France Pool",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 916,
        height: 493,
        alt: "Tour de France Pool 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tour de France Pool 2026 — Stage Predictions & Sweepstake",
    description: "Pick the winner of every Tour de France 2026 stage and climb the leaderboard.",
    images: ["/og-image.png"],
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
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1513665218593400"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
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
