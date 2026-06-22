// app/sitemap.js
import { STAGES } from "../lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.vercel.app";

export default function sitemap() {
  const routes = [
    "",
    "/predictions",
    "/riders",
    "/final-classification",
    "/leaderboard",
    "/rules",
    "/preview",
    "/es",
    "/es/predictions",
    "/es/riders",
    "/es/final-classification",
    "/es/leaderboard",
    "/es/rules",
    "/es/preview",
    "/fr",
    "/fr/preview",
    "/it",
    "/it/preview",
    "/nl",
    "/nl/preview",
    "/ca",
    "/ca/preview",
  ];

  const stageRoutes = STAGES.flatMap((s) => ["/stage/" + s.n, "/es/stage/" + s.n]);

  return [...routes, ...stageRoutes].map((route) => ({
    url: SITE_URL + route,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : route.startsWith("/stage/") ? 0.6 : 0.7,
  }));
}
