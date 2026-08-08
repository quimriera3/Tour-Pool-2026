// lib/races/vuelta2026.js
//
// La Vuelta a España 2026 — the 81st edition, and the third Grand Tour of the
// 2026 season. Route announced 17 December 2025 in Monaco.
//
// Route data (dates, start/finish towns, distances, stage types) is real and
// taken from the official route announcement.
//
// ⚠️ TWO FIELDS STILL NEED REAL DATA BEFORE THIS RACE GOES LIVE:
//   - startTime: pick locking is calculated as (startTime - 1 hour), so a wrong
//     start time means picks lock at the wrong moment. The values below are
//     placeholders based on typical Vuelta start times and MUST be replaced
//     with the official ones once ASO publishes the roadbook.
//   - elevationGain: not yet published per stage. Left as null; the UI hides
//     the climbing figure when it is null rather than showing a made-up number.

export const VUELTA_2026 = {
  slug: "vuelta-2026",
  type: "grand-tour",
  year: 2026,
  edition: 81,

  name: {
    en: "La Vuelta a España 2026",
    es: "La Vuelta a España 2026",
    ca: "La Vuelta a Espanya 2026",
    fr: "Tour d'Espagne 2026",
    it: "Vuelta di Spagna 2026",
    nl: "Ronde van Spanje 2026",
  },
  shortName: {
    en: "La Vuelta 2026",
    es: "La Vuelta 2026",
    ca: "La Vuelta 2026",
    fr: "La Vuelta 2026",
    it: "La Vuelta 2026",
    nl: "La Vuelta 2026",
  },

  status: "upcoming",

  // Brand theme. The Vuelta's identity colour is red, not the Tour's yellow —
  // every accent on the site reads from here, so switching races reskins the
  // whole platform without touching a component.
  theme: {
    accent: "#E4002B",
    accentDark: "#8a0019",
    accentInk: "#ffffff",
    accentSoft: "#fff0f2",
  },

  startDate: "2026-08-22",
  endDate: "2026-09-13",
  // Spain/France/Monaco/Andorra are all CEST (UTC+2) for the whole race.
  utcOffset: "+02:00",

  countries: ["Monaco", "France", "Andorra", "Spain"],
  restDays: ["2026-08-31", "2026-09-07"],

  // The Vuelta's leader's jersey is RED, not yellow — this is why jerseys are
  // defined per race rather than hardcoded.
  jerseys: [
    { key: "gc", color: "red", label: { en: "Red Jersey", es: "Maillot Rojo", ca: "Mallot Vermell", fr: "Maillot Rouge", it: "Maglia Roja", nl: "Rode Trui" } },
    { key: "points", color: "green", label: { en: "Green Jersey", es: "Maillot Verde", ca: "Mallot Verd", fr: "Maillot Vert", it: "Maglia Verde", nl: "Groene Trui" } },
    { key: "mountains", color: "polka", label: { en: "Polka Dot Jersey", es: "Maillot de Lunares", ca: "Mallot de Pics", fr: "Maillot à Pois", it: "Maglia a Pois", nl: "Bolletjestrui" } },
    { key: "youth", color: "white", label: { en: "White Jersey", es: "Maillot Blanco", ca: "Mallot Blanc", fr: "Maillot Blanc", it: "Maglia Bianca", nl: "Witte Trui" } },
  ],
  // Jersey predictions stay open until 1 hour before this stage starts.
  jerseyLockStage: 5,
  // Youth classification: riders born on or after this year are eligible.
  youthBornFrom: 2001,

  weeks: [
    { key: "week1", stages: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
    { key: "week2", stages: [10, 11, 12, 13, 14, 15] },
    { key: "week3", stages: [16, 17, 18, 19, 20, 21] },
  ],

  stages: [
    {
      n: 1, date: "2026-08-22", startTime: "16:30",
      from: "Monaco", to: "Monaco", km: 9, type: "itt", elevationGain: null,
      preview: "La Vuelta opens where no Spanish Grand Tour has started before: the streets of Monaco. At just 9 km, this individual time trial is short but technical, winding past the Casino and through the tight corners of the principality. Expect small gaps — but in a race this hard, even ten seconds gained on day one can matter three weeks later.",
      previewEs: "La Vuelta arranca donde ninguna gran vuelta española lo había hecho antes: las calles de Mónaco. Con solo 9 km, esta contrarreloj individual es corta pero técnica, pasando junto al Casino y encadenando las curvas cerradas del principado. Las diferencias serán pequeñas, pero en una carrera tan dura, diez segundos ganados el primer día pueden pesar tres semanas después.",
    },
    {
      n: 2, date: "2026-08-23", startTime: "13:00",
      from: "Monaco", to: "Manosque", km: 215.5, type: "hills", elevationGain: null,
      preview: "The longest stage of the race takes the peloton out of Monaco and north into Provence. At 215 km it is a genuine test of endurance on day two, with enough rolling terrain to tempt a breakaway. Whether it stays together depends entirely on how badly the sprinters' teams want it.",
      previewEs: "La etapa más larga de la carrera saca al pelotón de Mónaco rumbo al norte, hacia la Provenza. Con 215 km es una prueba real de resistencia en el segundo día, con suficiente terreno ondulado como para tentar a una escapada. Que llegue agrupada dependerá por completo de cuánto la quieran los equipos de los esprínters.",
    },
    {
      n: 3, date: "2026-08-24", startTime: "13:15",
      from: "Gruissan", to: "Font Romeu", km: 166.7, type: "hills", elevationGain: null,
      preview: "From the Mediterranean coast at Gruissan the race climbs steadily into the Pyrenees, finishing at the altitude resort of Font Romeu at over 1,800 m. It is a long, grinding ascent rather than a brutal wall, which favours strong climbers who can pace themselves — and gives the general classification its first real shake-up.",
      previewEs: "Desde la costa mediterránea de Gruissan la carrera sube progresivamente hacia los Pirineos, con final en la estación de altura de Font Romeu, a más de 1.800 m. Es una ascensión larga y constante más que un muro brutal, lo que favorece a escaladores capaces de dosificarse, y da a la general su primer movimiento serio.",
    },
    {
      n: 4, date: "2026-08-25", startTime: "13:30",
      from: "Andorra la Vella", to: "Andorra la Vella", km: 104.9, type: "mountains", elevationGain: null,
      preview: "Barely 105 km but almost certainly the hardest day of the opening week. Andorra packs relentless climbing into a short distance, and short mountain stages have a habit of exploding early. There is nowhere to hide here: the general classification contenders will be fully exposed before the first rest day.",
      previewEs: "Apenas 105 km, pero casi con toda seguridad el día más duro de la primera semana. Andorra concentra subidas implacables en poca distancia, y las etapas de montaña cortas tienen la costumbre de explotar pronto. Aquí no hay dónde esconderse: los aspirantes a la general quedarán retratados antes del primer día de descanso.",
    },
    {
      n: 5, date: "2026-08-26", startTime: "13:15",
      from: "Falset", to: "Roquetes", km: 171.1, type: "hills", elevationGain: null,
      preview: "The first stage entirely on Spanish soil runs through the Catalan interior from the wine country of Falset down towards the Ebro delta. A hilly, nervous day where the breakaway has a genuine chance — and the last day to lock in your jersey predictions.",
      previewEs: "La primera etapa íntegramente en suelo español recorre el interior catalán, desde la tierra de vinos de Falset hasta las inmediaciones del delta del Ebro. Un día ondulado y nervioso donde la escapada tiene opciones reales, y el último día para cerrar tus pronósticos de maillots.",
    },
    {
      n: 6, date: "2026-08-27", startTime: "13:00",
      from: "Alcossebre", to: "Castellón", km: 176.8, type: "hills", elevationGain: null,
      preview: "One of the most talked-about days of the route: this medium-mountain stage introduces sterrato, unpaved gravel sectors rarely seen in La Vuelta's history. Gravel adds mechanical chaos and punishes bad positioning, so expect the general classification teams to fight for the front long before the sectors arrive.",
      previewEs: "Uno de los días más comentados del recorrido: esta etapa de media montaña introduce tramos de sterrato, sectores de grava sin asfaltar poco habituales en la historia de La Vuelta. La grava añade caos mecánico y castiga la mala colocación, así que los equipos de la general pelearán por ir delante mucho antes de llegar a los sectores.",
    },
    {
      n: 7, date: "2026-08-28", startTime: "13:15",
      from: "Vall d'Alba", to: "Aramón Valdelinares", km: 149.9, type: "mountains", elevationGain: null,
      preview: "A summit finish at the Aramón Valdelinares ski station in Teruel, at around 1,700 m. After the gravel of the previous day, tired legs meet a long final climb — a combination that historically produces significant time gaps.",
      previewEs: "Final en alto en la estación de Aramón Valdelinares, en Teruel, a unos 1.700 m. Después de la grava del día anterior, las piernas cansadas se encuentran con una subida final larga: una combinación que históricamente produce diferencias importantes.",
    },
    {
      n: 8, date: "2026-08-29", startTime: "13:30",
      from: "Puçol", to: "Xeraco", km: 176.4, type: "flat", elevationGain: null,
      preview: "A rare gift for the sprinters: a flat run down the Valencian coast with a finish at Xeraco. With so few bunch sprints in this edition, the fast men and their lead-out trains will treat this as a stage they cannot afford to lose.",
      previewEs: "Un regalo poco frecuente para los esprínters: recorrido llano por la costa valenciana con final en Xeraco. Con tan pocos esprints masivos en esta edición, los velocistas y sus trenes de lanzamiento tratarán esta etapa como una que no se pueden permitir perder.",
    },
    {
      n: 9, date: "2026-08-30", startTime: "13:00",
      from: "Villajoyosa", to: "Alto de Aitana", km: 187.5, type: "mountains", elevationGain: null,
      preview: "The final day before the first rest, and a serious one: the Alto de Aitana is the highest point in the province of Alicante, a long climb topping out above 1,500 m. Whoever is in red after this stage has earned it.",
      previewEs: "El último día antes del primer descanso, y de los serios: el Alto de Aitana es el techo de la provincia de Alicante, una subida larga que corona por encima de los 1.500 m. Quien vista de rojo después de esta etapa se lo habrá ganado.",
    },
    {
      n: 10, date: "2026-09-01", startTime: "13:15",
      from: "Alcaraz", to: "Elche de la Sierra", km: 184.5, type: "hills", elevationGain: null,
      preview: "Racing resumes in the Sierra de Alcaraz with a hilly stage through Albacete province. The day after a rest day is notoriously unpredictable — legs can be sluggish, and breakaways often get more room than teams intend to give them.",
      previewEs: "La carrera se reanuda en la Sierra de Alcaraz con una etapa ondulada por la provincia de Albacete. El día después de una jornada de descanso es tradicionalmente imprevisible: las piernas van espesas y las escapadas suelen recibir más margen del que los equipos pretendían darles.",
    },
    {
      n: 11, date: "2026-09-02", startTime: "13:30",
      from: "Cartagena", to: "Lorca", km: 156.1, type: "flat", elevationGain: null,
      preview: "A short, flat stage across Murcia from the naval city of Cartagena to Lorca. On paper it is one for the sprinters, though the exposed terrain of the southeast means crosswinds are always a possibility.",
      previewEs: "Etapa corta y llana por Murcia, desde la ciudad naval de Cartagena hasta Lorca. Sobre el papel es para los esprínters, aunque el terreno abierto del sureste hace que el viento lateral sea siempre una posibilidad.",
    },
    {
      n: 12, date: "2026-09-03", startTime: "13:00",
      from: "Vera", to: "Calar Alto", km: 166.5, type: "mountains", elevationGain: null,
      preview: "The Calar Alto observatory sits above 2,100 m in the Sierra de los Filabres, reached by one of the longest climbs in Spain. This is a pure test of sustained climbing power — no tricks, no steep ramps, just a relentless ascent where the strongest rider simply rides away.",
      previewEs: "El observatorio de Calar Alto se sitúa por encima de los 2.100 m en la Sierra de los Filabres, al final de una de las subidas más largas de España. Es una prueba pura de potencia sostenida en ascenso: sin trampas ni rampas explosivas, solo una subida implacable donde el más fuerte se marcha sin más.",
    },
    {
      n: 13, date: "2026-09-04", startTime: "13:15",
      from: "Almuñécar", to: "Loja", km: 193.2, type: "hills", elevationGain: null,
      preview: "From the Costa Tropical the race turns inland and climbs into the hills of Granada province. A medium-mountain stage with constant up and down — ideal terrain for a strong breakaway to go the distance.",
      previewEs: "Desde la Costa Tropical la carrera gira hacia el interior y sube a los montes de la provincia de Granada. Etapa de media montaña con subidas y bajadas constantes: terreno ideal para que una escapada fuerte llegue hasta el final.",
    },
    {
      n: 14, date: "2026-09-05", startTime: "13:00",
      from: "Jaén", to: "Sierra de la Pandera", km: 152.7, type: "mountains", elevationGain: null,
      preview: "La Pandera is one of La Vuelta's cruellest finishes: a narrow, brutally steep road with ramps well into double figures, on a surface that has broken plenty of contenders before. Expect the race for red to be turned upside down here.",
      previewEs: "La Pandera es uno de los finales más crueles de La Vuelta: una carretera estrecha y brutalmente empinada, con rampas muy por encima del diez por ciento y un firme que ya ha roto a más de un aspirante. Aquí la lucha por el rojo puede darse la vuelta por completo.",
    },
    {
      n: 15, date: "2026-09-06", startTime: "13:15",
      from: "Palma del Río", to: "Córdoba", km: 181.2, type: "hills", elevationGain: null,
      preview: "The last day before the second rest, running through the Guadalquivir valley to Córdoba. Andalusian heat in early September is a factor in itself, and the finish near the historic city offers a punchy conclusion rather than a straightforward sprint.",
      previewEs: "El último día antes del segundo descanso, por el valle del Guadalquivir hasta Córdoba. El calor andaluz de principios de septiembre es un factor en sí mismo, y el final junto a la ciudad histórica ofrece una conclusión explosiva más que un esprint puro.",
    },
    {
      n: 16, date: "2026-09-08", startTime: "13:30",
      from: "Cortegana", to: "Palos de la Frontera", km: 186, type: "flat", elevationGain: null,
      preview: "From the Sierra de Aracena down to the Atlantic coast at Palos de la Frontera, the port from which Columbus sailed in 1492. A flat finish and one of the last remaining chances for the sprinters still in the race.",
      previewEs: "Desde la Sierra de Aracena hasta la costa atlántica en Palos de la Frontera, el puerto del que zarpó Colón en 1492. Final llano y una de las últimas oportunidades que les quedan a los esprínters que sigan en carrera.",
    },
    {
      n: 17, date: "2026-09-09", startTime: "13:15",
      from: "Dos Hermanas", to: "Seville", km: 189.2, type: "flat", elevationGain: null,
      preview: "A flat run into Seville, one of the great cities of Andalusia. With the decisive time trial and mountains still to come, the general classification teams will be happy to let the sprinters have their day.",
      previewEs: "Recorrido llano hasta Sevilla, una de las grandes ciudades de Andalucía. Con la contrarreloj decisiva y la montaña aún por llegar, los equipos de la general estarán encantados de dejar que los esprínters tengan su día.",
    },
    {
      n: 18, date: "2026-09-10", startTime: "14:00",
      from: "El Puerto de Santa María", to: "Jerez de la Frontera", km: 32.5, type: "itt", elevationGain: null,
      preview: "The decisive time trial: 32.5 km of largely flat terrain through the sherry country of Cádiz. This is the longest Vuelta time trial in years and the single biggest opportunity for a powerful rouleur to overturn the general classification before the final mountains.",
      previewEs: "La contrarreloj decisiva: 32,5 km de terreno mayoritariamente llano por la tierra del jerez, en Cádiz. Es la crono más larga de La Vuelta en años y la mayor oportunidad para que un rodador potente le dé la vuelta a la general antes de la última montaña.",
    },
    {
      n: 19, date: "2026-09-11", startTime: "13:00",
      from: "Vélez-Málaga", to: "Peñas Blancas", km: 205.1, type: "hills", elevationGain: null,
      preview: "A long day along the Costa del Sol finishing with the climb to Peñas Blancas above Estepona — a steady 19 km ascent. Officially classified as hilly, but with 205 km in the legs and a summit finish, this will race like a mountain stage.",
      previewEs: "Jornada larga por la Costa del Sol con final en la subida a Peñas Blancas, por encima de Estepona: 19 km de ascensión constante. Clasificada oficialmente como ondulada, pero con 205 km en las piernas y final en alto, se correrá como una etapa de montaña.",
    },
    {
      n: 20, date: "2026-09-12", startTime: "13:00",
      from: "La Calahorra", to: "Collado del Alguacil", km: 187, type: "mountains", elevationGain: null,
      preview: "The queen stage and the last chance to change the general classification. Deep in the Sierra Nevada region, this is the day the red jersey is truly won or lost — anyone still within a minute on the morning of this stage has everything to play for.",
      previewEs: "La etapa reina y la última oportunidad de cambiar la general. En pleno entorno de Sierra Nevada, este es el día en que el maillot rojo se gana o se pierde de verdad: quien esté a menos de un minuto la mañana de esta etapa se lo juega todo.",
    },
    {
      n: 21, date: "2026-09-13", startTime: "17:00",
      from: "Granada", to: "Granada", km: 99.4, type: "flat", elevationGain: null,
      preview: "No processional finish this year. La Vuelta ends with four laps of a Granada circuit featuring a climb of roughly one kilometre up to the Alhambra. It is a genuinely competitive final stage in one of the most spectacular settings any Grand Tour has ever used.",
      previewEs: "Este año no hay paseo final. La Vuelta termina con cuatro vueltas a un circuito por Granada que incluye una subida de aproximadamente un kilómetro hasta la Alhambra. Es una etapa final realmente competitiva en uno de los escenarios más espectaculares que jamás haya usado una gran vuelta.",
    },
  ],

  // The 23 teams confirmed on 30 January 2026: 18 UCI WorldTeams plus
  // Tudor, Pinarello-Q36.5, Cofidis, Burgos Burpellet BH and Equipo Kern Pharma.
  teams: [
    "Alpecin Premier Tech",
    "Bahrain Victorious",
    "Burgos Burpellet BH",
    "Cofidis",
    "Decathlon CMA CGM Team",
    "EF Education EasyPost",
    "Equipo Kern Pharma",
    "Groupama FDJ United",
    "Lidl Trek",
    "Lotto Intermarché",
    "Movistar Team",
    "Netcompany INEOS",
    "NSN Cycling Team",
    "Pinarello - Q36.5 Pro Cycling Team",
    "Red Bull - BORA Hansgrohe",
    "Soudal Quick-Step",
    "Team Jayco AlUla",
    "Team Picnic PostNL",
    "Team Visma | Lease a Bike",
    "Tudor Pro Cycling Team",
    "UAE Team Emirates XRG",
    "Uno-X Mobility",
    "XDS Astana Team",
  ],

  // ⚠️ The Vuelta startlist is not published yet — teams normally confirm their
  // eight riders about a week before the Grand Départ. Until then this stays
  // empty and the Riders page shows every team as "TBC", exactly as it did for
  // the Tour before its startlist was announced.
  riders: [],
};
