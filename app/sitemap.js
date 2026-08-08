// app/sitemap.js
import { STAGES, getRace } from "../lib/data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.vercel.app";

export default function sitemap() {
  const routes = [
    "",
    "/predictions",
    "/riders",
    "/final-classification",
    "/leaderboard",
    "/rules",
    "/faq",
    "/preview",
    "/es",
    "/es/predictions",
    "/es/riders",
    "/es/final-classification",
    "/es/leaderboard",
    "/es/rules",
    "/es/faq",
    "/es/preview",
    "/es/privacy",
    "/es/contact",
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

  // Archived races stay in the sitemap: their pages are no longer linked from
  // the navigation, but they remain live and should keep being crawled.
  const archived = getRace("tour-de-france-2026");
  const archivedRoutes = archived
    ? ["/tour-de-france-2026", "/tour-de-france-2026/leaderboard", ...archived.stages.map((s) => "/tour-de-france-2026/stage/" + s.n)]
    : [];

  return [...routes, ...stageRoutes, ...archivedRoutes].map((route) => ({
    url: SITE_URL + route,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: route === "" ? 1 : route.startsWith("/stage/") ? 0.6 : 0.7,
  }));
}
