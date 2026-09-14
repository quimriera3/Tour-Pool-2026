const COPY = {
  ca: {
    eyebrow: "Mundial de Ciclisme en Ruta 2026 · Montreal · 20–27 de setembre",
    title: "Porra del Mundial de Ciclisme 2026",
    intro: "Un joc gratuït de pronòstics per seguir el Mundial de Montreal: tria els guanyadors de les proves elit masculina i femenina i competeix a la classificació.",
    how: "Com funciona?", bullets: ["Registra't gratis.", "Fes un pick per a cada contrarellotge i prova en ruta.", "10 punts si encertes el guanyador, 5 si el teu pick fa segon i 2 si fa tercer.", "Els picks es tanquen una hora abans de la sortida oficial i es poden canviar fins aleshores.", "Hi ha 3 premis de material de ciclisme per al podi final."],
    facts: "Montreal 2026, en xifres", factBody: "CRI elit: 39,2 km i 220 m de desnivell. Ruta femenina: 180,4 km i 2.570 m. Ruta masculina: 273,7 km i 3.803 m, amb el circuit final del Mont Royal.",
    app: "L'aplicació completa està disponible en anglès i castellà. Aquest resum està disponible en català; la prèvia editorial completa s'ofereix en anglès.", play: "Jugar ara", preview: "Llegir la prèvia completa en anglès →",
  },
  fr: {
    eyebrow: "Championnats du Monde Route UCI 2026 · Montréal · 20–27 septembre",
    title: "Pronostics Mondiaux de Cyclisme 2026",
    intro: "Un jeu de pronostics gratuit pour suivre les Mondiaux de Montréal : choisissez les vainqueurs des épreuves élite hommes et femmes et grimpez au classement.",
    how: "Comment ça marche ?", bullets: ["Inscription gratuite.", "Un pronostic pour chaque contre-la-montre et course en ligne élite.", "10 points pour le vainqueur, 5 si votre choix termine 2e, 2 s'il termine 3e.", "Les pronostics ferment une heure avant le départ officiel et restent modifiables jusque-là.", "3 prix de matériel cycliste pour le podium final."],
    facts: "Montréal 2026 en chiffres", factBody: "CLM élite : 39,2 km et 220 m de dénivelé. Course femmes : 180,4 km et 2 570 m. Course hommes : 273,7 km et 3 803 m, avec le circuit final du Mont-Royal.",
    app: "L'application complète est disponible en anglais et en espagnol. Ce résumé est disponible en français ; l'analyse éditoriale complète est proposée en anglais.", play: "Jouer maintenant", preview: "Lire l'aperçu complet en anglais →",
  },
  it: {
    eyebrow: "Mondiali di Ciclismo su Strada 2026 · Montréal · 20–27 settembre",
    title: "Pronostici Mondiali di Ciclismo 2026",
    intro: "Un gioco gratuito di pronostici per seguire i Mondiali di Montréal: scegli i vincitori delle prove élite maschili e femminili e scala la classifica.",
    how: "Come funziona?", bullets: ["Registrazione gratuita.", "Un pronostico per ogni cronometro e prova in linea élite.", "10 punti per il vincitore, 5 se il tuo ciclista arriva 2°, 2 se arriva 3°.", "I pronostici chiudono un'ora prima della partenza ufficiale e si possono cambiare fino ad allora.", "3 premi di materiale da ciclismo per il podio finale."],
    facts: "Montréal 2026 in numeri", factBody: "Cronometro élite: 39,2 km e 220 m di dislivello. Gara donne: 180,4 km e 2.570 m. Gara uomini: 273,7 km e 3.803 m, con il circuito finale del Mont Royal.",
    app: "L'app completa è disponibile in inglese e spagnolo. Questo riepilogo è disponibile in italiano; l'anteprima editoriale completa è in inglese.", play: "Gioca ora", preview: "Leggi l'anteprima completa in inglese →",
  },
  nl: {
    eyebrow: "WK Wielrennen op de Weg 2026 · Montréal · 20–27 september",
    title: "WK Wielrennen 2026 Voorspellen",
    intro: "Een gratis voorspellingsspel voor het WK in Montréal: kies de winnaars van de elitewedstrijden voor mannen en vrouwen en klim op het klassement.",
    how: "Hoe werkt het?", bullets: ["Gratis registreren.", "Eén voorspelling voor elke elite tijdrit en wegwedstrijd.", "10 punten voor de winnaar, 5 als je renner 2e wordt en 2 als die 3e wordt.", "Voorspellingen sluiten één uur voor de officiële start en kunnen tot dan worden gewijzigd.", "3 wielerprijzen voor het eindpodium."],
    facts: "Montréal 2026 in cijfers", factBody: "Elite tijdrit: 39,2 km en 220 hoogtemeters. Vrouwen: 180,4 km en 2.570 hm. Mannen: 273,7 km en 3.803 hm, met het slotcircuit op Mount Royal.",
    app: "De volledige app is beschikbaar in het Engels en Spaans. Deze samenvatting is beschikbaar in het Nederlands; de volledige redactionele preview is in het Engels.", play: "Speel nu", preview: "Lees de volledige preview in het Engels →",
  },
};

export default function WorldsSeoLanding({ lang }) {
  const c = COPY[lang];
  return <div className="seo-landing">
    <div className="page-header"><span className="eyebrow">{c.eyebrow}</span><h1>{c.title}</h1><p className="subtitle">{c.intro}</p></div>
    <div className="card"><h2>{c.how}</h2><ul className="seo-bullets">{c.bullets.map((x) => <li key={x}>{x}</li>)}</ul></div>
    <div className="card seo-card-gap"><h2>{c.facts}</h2><p className="subtitle">{c.factBody}</p></div>
    <div className="card seo-card-gap seo-cta"><p>{c.app}</p><a href="/predictions" className="btn">{c.play}</a></div>
    <p className="seo-preview-link"><a href={`/${lang}/preview`}>{c.preview}</a></p>
  </div>;
}
