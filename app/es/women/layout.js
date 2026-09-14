import { getRace } from "../../../lib/races";
const RACE = getRace("worlds-2026-women");
export const metadata = {
  title: { absolute: "Porra Mundial de Ciclismo Femenino 2026 — Montreal" },
  description: "Porra gratis del Mundial de Ciclismo femenino 2026 en Montreal: contrarreloj y prueba en ruta, predicciones, startlist y clasificación.",
  alternates: { canonical: "/es/women", languages: { en: "/women", es: "/es/women" } },
};
export default function Layout({ children }) {
  return <><style dangerouslySetInnerHTML={{ __html: `:root{--accent:${RACE.theme.accent};--accent-dark:${RACE.theme.accentDark};--accent-ink:${RACE.theme.accentInk};--accent-soft:${RACE.theme.accentSoft};}` }} />{children}</>;
}
