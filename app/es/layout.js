// app/es/layout.js
import { alternatesFor } from "../../lib/seo";

export const metadata = {
  title: "Mejor Porra de La Vuelta 2026 Online y Gratis",
  description:
    "La mejor porra de La Vuelta a España 2026 online: haz tus pronósticos de etapas de La Vuelta gratis, compite con amigos y sube en la clasificación en directo.",
  alternates: alternatesFor("/es"),
  openGraph: {
    title: "Mejor Porra de La Vuelta 2026 Online y Gratis",
    description: "Pronósticos etapas La Vuelta 2026: juega gratis, compite con amigos y gana material de ciclismo.",
    locale: "es_ES",
    type: "website",
  },
};

export default function EsLayout({ children }) {
  return children;
}
