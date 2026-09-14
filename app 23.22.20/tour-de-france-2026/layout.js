// app/tour-de-france-2026/layout.js
export const metadata = {
  title: {
    absolute: "Tour de France 2026 — All 21 Stages & Results | Grand Tour Pool",
  },
  description:
    "Archive of the 2026 Tour de France: all 21 stages from Barcelona to Paris with route details, stage profiles and final results.",
  alternates: {
    canonical: "/tour-de-france-2026",
  },
};

export default function TourArchiveLayout({ children }) {
  // Server-render this race's colours so archived pages paint yellow from the
  // very first frame. RaceTheme also sets them on <html> after hydration, but
  // without this there would be a brief flash of the live race's red first.
  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html:
            ":root{--accent:#ffd400;--accent-dark:#9a7d00;--accent-ink:#111111;--accent-soft:#fff9e0;}",
        }}
      />
      {children}
    </>
  );
}
