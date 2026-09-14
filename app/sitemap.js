import { getRace } from "../lib/races";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.grandtourpool.com";

export default function sitemap() {
  const men = getRace("worlds-2026");
  const women = getRace("worlds-2026-women");
  const tour = getRace("tour-de-france-2026");

  const core = [
    "", "/predictions", "/riders", "/leaderboard", "/rules", "/faq", "/preview", "/privacy", "/contact",
    "/es", "/es/predictions", "/es/riders", "/es/leaderboard", "/es/rules", "/es/faq", "/es/preview", "/es/privacy", "/es/contact",
    "/ca", "/ca/preview", "/fr", "/fr/preview", "/it", "/it/preview", "/nl", "/nl/preview",
  ];
  const menStages = men ? men.stages.flatMap((s) => [`/stage/${s.n}`, `/es/stage/${s.n}`]) : [];
  const womenCore = ["", "/predictions", "/riders", "/leaderboard", "/rules", "/faq", "/preview"];
  const womenRoutes = women ? [
    ...womenCore.map((p) => `/women${p}`),
    ...womenCore.map((p) => `/es/women${p}`),
    ...women.stages.flatMap((s) => [`/women/stage/${s.n}`, `/es/women/stage/${s.n}`]),
  ] : [];
  const archive = tour ? [
    "/tour-de-france-2026",
    "/tour-de-france-2026/leaderboard",
    ...tour.stages.map((s) => `/tour-de-france-2026/stage/${s.n}`),
  ] : [];

  return [...new Set([...core, ...menStages, ...womenRoutes, ...archive])].map((route) => ({
    url: SITE_URL + route,
    changeFrequency: route.includes("tour-de-france-2026") ? "monthly" : route.includes("preview") ? "daily" : "weekly",
    priority: route === "" ? 1 : route.includes("predictions") ? 0.9 : route.includes("stage/") ? 0.8 : 0.7,
  }));
}
