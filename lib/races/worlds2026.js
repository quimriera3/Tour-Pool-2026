// lib/races/worlds2026.js
//
// 2026 UCI Road World Championships — Montreal, Canada, 20–27 September 2026.
// The 99th edition, and the first Worlds in Montreal since 1974.
//
// This race is structurally different from a Grand Tour, which is why the
// registry was built to be shape-agnostic:
//
//   - Riders race for NATIONAL teams, not trade teams. `teams` holds countries.
//   - There is no general classification and no jerseys to predict. The rainbow
//     jersey IS the win, so `jerseys` is empty and the jersey pages disappear.
//   - "Stages" here are separate championship events, not consecutive days of
//     one race. Each is predicted independently.
//
// All schedule data is official (UCI Sport Competition Schedule, 28 Apr 2026,
// via the event's technical guide). Start times are local Montreal time,
// EDT / UTC−04:00 — the first race in this project where the start times are
// confirmed rather than estimated, so pick locking is exact.

import { MEN_ROAD_STARTLIST, MEN_ITT_STARTLIST, WOMEN_ROAD_STARTLIST, WOMEN_ITT_STARTLIST } from "./worlds2026startlists.js";

export const WORLDS_2026_MEN = {
  slug: "worlds-2026",
  type: "championship",
  year: 2026,
  edition: 99,

  name: {
    en: "UCI Road World Championships 2026",
    es: "Mundial de Ciclismo en Ruta 2026",
    ca: "Mundial de Ciclisme en Ruta 2026",
    fr: "Championnats du Monde Route UCI 2026",
    it: "Mondiali di Ciclismo su Strada 2026",
    nl: "WK Wielrennen op de Weg 2026",
  },
  shortName: {
    en: "Worlds 2026",
    es: "Mundial 2026",
    ca: "Mundial 2026",
    fr: "Mondiaux 2026",
    it: "Mondiali 2026",
    nl: "WK 2026",
  },
  brandName: {
    en: "THE WORLDS", es: "EL MUNDIAL", ca: "EL MUNDIAL",
    fr: "LES MONDIAUX", it: "I MONDIALI", nl: "HET WK",
  },
  poolBrandName: {
    en: "THE WORLDS POOL",
    es: "PORRA DEL MUNDIAL",
    ca: "PORRA DEL MUNDIAL",
    fr: "PRONOS MONDIAUX",
    it: "PRONOSTICI MONDIALI",
    nl: "WK POOL",
  },

  status: "upcoming",

  // Startlists are tracked per EVENT: the road race and ITT do not share the
  // same field. ProCyclingStats is used as a live cross-check, while federation
  // announcements take precedence when a national selection is published.
  startlistUpdated: "2026-09-15",
  startlistStatus: "provisional",
  startlistSources: [
    { label: "Road race — current startlist cross-check", href: "https://cyclingfantasy.cc/en/race/uci-road-world-championships-irr/2026/startlist" },
    { label: "ITT — current startlist cross-check", href: "https://cyclingfantasy.cc/en/race/uci-road-world-championships-itt/2026/startlist" },
    { label: "Road race — ProCyclingStats", href: "https://www.procyclingstats.com/race/world-championship/2026/startlist" },
    { label: "ITT — ProCyclingStats", href: "https://www.procyclingstats.com/race/world-championship-itt/2026/startlist" },
    { label: "Official event hub — UCI", href: "https://www.uci.org/competition-hub/2026-uci-road-world-championships/14QBdFX8GqbCHUPE234D0Q" },
  ],

  // The rainbow jersey has no single colour. UCI blue leads the bands, so it
  // anchors the theme; components that want the full rainbow use the gradient.
  category: "men",
  urlPrefix: "",

  // The Worlds is the one race on the calendar with a light identity: the
  // rainbow bands need a white background to read at all. `surface` lets a
  // race opt out of the site's default dark styling.
  surface: "light",

  theme: {
    accent: "#0B4EA2",
    accentDark: "#063168",
    accentInk: "#ffffff",
    accentSoft: "#eef4fc",
    rainbow: "linear-gradient(90deg,#0B4EA2 0%,#0B4EA2 20%,#D7241E 20%,#D7241E 40%,#111111 40%,#111111 60%,#F2C200 60%,#F2C200 80%,#1E9E4A 80%,#1E9E4A 100%)",
  },

  startDate: "2026-09-20",
  endDate: "2026-09-27",
  // Montreal is on EDT for the whole championship week.
  utcOffset: "-04:00",
  timeZone: "America/Toronto",

  host: { city: "Montreal", country: "Canada" },
  countries: ["Canada"],
  restDays: [],

  // No general classification, so nothing to predict at the end.
  jerseys: [],

  // The elite men's events, which are what this pool's startlist covers.
  // `n` is kept as the identifier because picks are stored against it.
  weeks: [{ key: "week1", stages: [1, 2] }],

  stages: [
    {
      n: 1,
      date: "2026-09-20",
      startTime: "12:45",
      from: "Montreal",
      to: "Montreal",
      km: 39.2,
      type: "itt",
      elevationGain: 220,
      startlistKind: "itt",
      // Latest indexable PCS field plus riders explicitly announced for the ITT
      // by their national federations. PCS blocks direct automated fetching,
      // so the list is kept deliberately provisional and reviewed manually.
      eligibleRiderIds: [
        "evenepoel", "herregodts", "segaert", "ganna", "cattaneo", "sobrero", "seixas",
        "armirail", "hoole", "tratnik", "sutterlin", "walscheid", "mcnulty", "shmidt",
        "kung", "soderqvist", "geewest", "mleonard", "amayer", "bmunton", "kwiatkowski",
        "mullen"
      ],
      eventName: {
        en: "Elite Men — Individual Time Trial",
        es: "Élite Masculina — Contrarreloj Individual",
      },
      preview:
        "The Worlds open with a 39.2 km individual time trial through Montreal — long by modern standards, and almost entirely flat with only around 220 m of elevation. The route runs along the Saint Lawrence River, crosses the Samuel De Champlain Bridge, takes in the Circuit Gilles Villeneuve motor-racing track on Île Notre-Dame, and returns over the Concorde Bridge to finish on Avenue du Parc. Long, flat and fast suits the specialists: this is a course for raw sustained power rather than for climbers who time trial well.",
      previewEs:
        "El Mundial arranca con una contrarreloj individual de 39,2 km por Montreal, larga para los estándares actuales y prácticamente llana, con unos 220 m de desnivel. El recorrido bordea el río San Lorenzo, cruza el puente Samuel De Champlain, entra en el Circuito Gilles Villeneuve de Fórmula 1 en la isla de Notre-Dame y regresa por el puente de la Concorde para terminar en la Avenue du Parc. Larga, llana y rápida: un trazado para especialistas de potencia sostenida más que para escaladores que se defienden contra el crono.",
    },
    {
      n: 2,
      date: "2026-09-27",
      startTime: "09:00",
      from: "Brossard",
      to: "Montreal",
      km: 273.7,
      type: "hills",
      elevationGain: 3803,
      startlistKind: "road",
      // Provisional road field: latest indexable PCS startlist cross-checked
      // against newly published federation selections (France + Slovenia).
      eligibleRiderIds: [
        "bettiol", "ciccone", "cattaneo", "lmfinn", "scaroni", "pellizzari", "piganzoli", "trentin",
        "benoot", "evenepoel", "qhermans", "nys", "segaert", "vanaert", "vangils", "gvermeersch",
        "asgreen", "bjerg", "honore", "skandersen", "kron", "mpedersen", "skjelmose", "valgren",
        "armirail", "lbarre", "baudin", "labrosse", "vparetpeintre", "prodhomme", "seixas", "sivakov",
        "donovan", "onley", "pickering", "pidcock", "jshaw", "thornley", "fwright", "ayates",
        "eenkhoorn", "hoole", "huizing", "lemmen", "mollema", "paasschens", "vanderpoel", "vandijke",
        "finkst", "glivar", "govekar", "mezgec", "mohoric", "omrzel", "roglic", "tratnik",
        "arrieta", "ayuso", "beloki", "camprubi", "rgarciapierna", "enricmas", "iromeo", "verona",
        "jorgenson", "mcnulty", "powless", "squinn", "shmidt", "simmons", "vermaerke", "warbasse",
        "haig", "hindley", "matthews", "oconnor", "storer", "tuckwell", "pacote", "geewest",
        "houle", "mleonard", "mwoods", "zukowsky", "buitrago", "higuita", "wparedes", "quintana",
        "brivera", "tejada", "brenner", "denz", "engelhardt", "lipowitz", "schachmann", "zimmermann",
        "tfoss", "thjohannessen", "leknessund", "nordhagen", "skaarseth", "svestadbardseng", "taguirre", "cadena",
        "ucastillo", "deltoro", "escarcega", "frayre", "cagarcia", "bissegger", "fchristen", "jchristen",
        "hirschi", "kung", "mschmid", "healy", "meehan", "mullen", "rafferty", "gall",
        "grossschartner", "konrad"
      ],
      eventName: {
        en: "Elite Men — Road Race",
        es: "Élite Masculina — Prueba en Ruta",
      },
      preview:
        "The rainbow jersey race: 273.7 km and 3,803 m of climbing, starting at Quartier DIX30 in Brossard, crossing the Samuel De Champlain Bridge into the city, and finishing with twelve laps of the 13.4 km Mount Royal circuit. Each lap carries 269 m of climbing across three distinct tests — the Voie Camillien-Houde (2.3 km at 6.2%), the Chemin de la Polytechnique with ramps beyond 11%, and a deceptive false flat rising along Avenue du Parc to the line. It is the circuit of the Grand Prix Cycliste de Montréal, and it rewards punchy riders who can still climb after six hours of racing.",
      previewEs:
        "La carrera del maillot arcoíris: 273,7 km y 3.803 m de desnivel, con salida en Quartier DIX30 (Brossard), cruce del puente Samuel De Champlain hacia la ciudad y final tras doce vueltas al circuito de 13,4 km del Mont Royal. Cada vuelta suma 269 m de desnivel repartidos en tres pruebas distintas: la Voie Camillien-Houde (2,3 km al 6,2%), el Chemin de la Polytechnique con rampas por encima del 11%, y un falso llano traicionero que sube por la Avenue du Parc hasta la meta. Es el circuito del Grand Prix Cycliste de Montréal, y premia a los corredores explosivos capaces de seguir subiendo después de seis horas de carrera.",
    },
  ],

  // The full championship programme, for the schedule page. Not predictable
  // here (this pool's startlist only covers the elite men), but real and
  // useful content in its own right.
  fullProgramme: [
    { date: "2026-09-20", time: "09:00", event: { en: "Elite Women — ITT", es: "Élite Femenina — CRI" }, km: 39.2 },
    { date: "2026-09-20", time: "12:45", event: { en: "Elite Men — ITT", es: "Élite Masculina — CRI" }, km: 39.2, main: true },
    { date: "2026-09-21", time: "09:00", event: { en: "U23 Women — ITT", es: "Sub-23 Femenina — CRI" }, km: 20.3 },
    { date: "2026-09-21", time: "12:00", event: { en: "U23 Men — ITT", es: "Sub-23 Masculina — CRI" }, km: 31.3 },
    { date: "2026-09-22", time: "08:30", event: { en: "Mixed Team Relay", es: "Relevo Mixto por Equipos" }, km: 40.6 },
    { date: "2026-09-22", time: "12:15", event: { en: "Junior Men — ITT", es: "Júnior Masculina — CRI" }, km: 20.3 },
    { date: "2026-09-22", time: "15:15", event: { en: "Junior Women — ITT", es: "Júnior Femenina — CRI" }, km: 10.7 },
    { date: "2026-09-24", time: "09:00", event: { en: "U23 Women — Road Race", es: "Sub-23 Femenina — Ruta" }, km: 134 },
    { date: "2026-09-24", time: "13:30", event: { en: "Junior Men — Road Race", es: "Júnior Masculina — Ruta" }, km: 134 },
    { date: "2026-09-25", time: "09:00", event: { en: "U23 Men — Road Race", es: "Sub-23 Masculina — Ruta" }, km: 174.2 },
    { date: "2026-09-25", time: "14:15", event: { en: "Junior Women — Road Race", es: "Júnior Femenina — Ruta" }, km: 80.4 },
    { date: "2026-09-26", time: "09:00", event: { en: "Elite Women — Road Race", es: "Élite Femenina — Ruta" }, km: 180.4 },
    { date: "2026-09-27", time: "09:00", event: { en: "Elite Men — Road Race", es: "Élite Masculina — Ruta" }, km: 273.7, main: true },
  ],

  // The Mount Royal finishing circuit, used by every one of the 13 events.
  circuit: {
    name: "Mount Royal",
    lapKm: 13.4,
    lapElevation: 269,
    eliteMenLaps: 12,
    sectors: [
      {
        name: "Voie Camillien-Houde",
        detail: { en: "2.3 km at 6.2% average", es: "2,3 km al 6,2% de media" },
      },
      {
        name: "Chemin de la Polytechnique",
        detail: { en: "Short, with ramps over 11%", es: "Corta, con rampas de más del 11%" },
      },
      {
        name: "Avenue du Parc",
        detail: { en: "Rising false flat to the finish line", es: "Falso llano ascendente hasta la meta" },
      },
    ],
  },

  // National teams, not trade teams. Ordered by squad size (the nations with
  // full eight-rider selections are the ones with real tactical options).
  teams: [
    "Belgium", "Denmark", "France", "Great Britain", "Italy", "Netherlands",
    "Slovenia", "Spain", "United States", "Australia", "Canada", "Colombia",
    "Germany", "Mexico", "Norway", "Switzerland", "Eritrea", "New Zealand",
    "Portugal", "Ecuador", "Ireland", "Latvia", "Poland", "Austria",
    "Czech Republic", "Sweden", "Hungary", "Costa Rica", "Mauritius", "South Africa",
  ],

  officialTeams: [
    "Australia", "Austria", "Belgium", "Canada", "Colombia", "Czech Republic",
    "Denmark", "France", "Germany", "Italy", "Netherlands", "New Zealand",
    "Norway", "Poland", "Slovenia", "Spain", "Switzerland", "United States"
  ],

  // Provisional elite men's startlist. Nations confirm final selections in the
  // days before the race, so this will still move.
  //
  // `scores` drive the "who suits this course" ranking. For a championship the
  // relevant axes are `hills` (the punchy Mount Royal circuit) and `itt`.
  riders: [
    // Belgium
    { id: "evenepoel", birthYear: 2000, name: "Remco Evenepoel", team: "Belgium", confirmed: true, pcsSlug: "remco-evenepoel", scores: { mountains: 70, hills: 88, itt: 95, ttt: 80, flat: 20 } },
    { id: "vanaert", birthYear: 1994, name: "Wout van Aert", team: "Belgium", confirmed: true, pcsSlug: "wout-van-aert", scores: { mountains: 45, hills: 90, itt: 80, ttt: 75, flat: 70 } },
    { id: "benoot", birthYear: 1994, name: "Tiesj Benoot", team: "Belgium", confirmed: true, pcsSlug: "tiesj-benoot", scores: { mountains: 35, hills: 65, itt: 45, ttt: 55, flat: 25 } },
    { id: "qhermans", birthYear: 1995, name: "Quinten Hermans", team: "Belgium", confirmed: true, pcsSlug: "quinten-hermans", scores: { mountains: 30, hills: 70, itt: 35, ttt: 45, flat: 25 } },
    { id: "nys", birthYear: 2002, name: "Thibau Nys", team: "Belgium", confirmed: true, pcsSlug: "thibau-nys", scores: { mountains: 40, hills: 85, itt: 40, ttt: 45, flat: 40 } },
    { id: "segaert", birthYear: 2002, name: "Alec Segaert", team: "Belgium", confirmed: true, pcsSlug: "alec-segaert", scores: { mountains: 20, hills: 45, itt: 75, ttt: 65, flat: 30 } },
    { id: "herregodts", name: "Rune Herregodts", team: "Belgium", confirmed: true, pcsSlug: "rune-herregodts", scores: { mountains: 25, hills: 50, itt: 78, ttt: 70, flat: 30 } },
    { id: "vangils", birthYear: 1999, name: "Maxim Van Gils", team: "Belgium", confirmed: true, pcsSlug: "maxim-van-gils", scores: { mountains: 45, hills: 75, itt: 40, ttt: 45, flat: 30 } },
    { id: "gvermeersch", birthYear: 1993, name: "Gianni Vermeersch", team: "Belgium", confirmed: true, pcsSlug: "gianni-vermeersch", scores: { mountains: 20, hills: 55, itt: 40, ttt: 50, flat: 35 } },

    // Netherlands
    { id: "vanderpoel", birthYear: 1995, name: "Mathieu van der Poel", team: "Netherlands", confirmed: true, pcsSlug: "mathieu-van-der-poel", scores: { mountains: 35, hills: 95, itt: 60, ttt: 60, flat: 70 } },
    { id: "hoole", birthYear: 1999, name: "Daan Hoole", team: "Netherlands", confirmed: true, pcsSlug: "daan-hoole", scores: { mountains: 10, hills: 30, itt: 70, ttt: 70, flat: 25 } },
    { id: "lemmen", birthYear: 1996, name: "Bart Lemmen", team: "Netherlands", confirmed: true, pcsSlug: "bart-lemmen", scores: { mountains: 45, hills: 55, itt: 50, ttt: 50, flat: 15 } },
    { id: "vandijke", birthYear: 2000, name: "Tim van Dijke", team: "Netherlands", confirmed: true, pcsSlug: "tim-van-dijke", scores: { mountains: 30, hills: 50, itt: 45, ttt: 55, flat: 25 } },
    { id: "mollema", birthYear: 1986, name: "Bauke Mollema", team: "Netherlands", confirmed: true, pcsSlug: "bauke-mollema", scores: { mountains: 50, hills: 65, itt: 40, ttt: 40, flat: 15 } },
    { id: "eenkhoorn", birthYear: 1997, name: "Pascal Eenkhoorn", team: "Netherlands", confirmed: true, pcsSlug: "pascal-eenkhoorn", scores: { mountains: 20, hills: 55, itt: 45, ttt: 50, flat: 35 } },
    { id: "huizing", birthYear: 2001, name: "Menno Huising", team: "Netherlands", confirmed: true, pcsSlug: "menno-huising", scores: { mountains: 25, hills: 45, itt: 45, ttt: 45, flat: 25 } },
    { id: "paasschens", birthYear: 1996, name: "Mathijs Paasschens", team: "Netherlands", confirmed: true, pcsSlug: "mathijs-paasschens", scores: { mountains: 35, hills: 50, itt: 35, ttt: 40, flat: 20 } },

    // France
    { id: "seixas", birthYear: 2006, name: "Paul Seixas", team: "France", confirmed: true, pcsSlug: "paul-seixas", scores: { mountains: 75, hills: 85, itt: 70, ttt: 60, flat: 15 } },
    { id: "sivakov", birthYear: 1997, name: "Pavel Sivakov", team: "France", confirmed: true, pcsSlug: "pavel-sivakov", scores: { mountains: 65, hills: 60, itt: 55, ttt: 55, flat: 10 } },
    { id: "armirail", birthYear: 1994, name: "Bruno Armirail", team: "France", confirmed: true, pcsSlug: "bruno-armirail", scores: { mountains: 30, hills: 40, itt: 75, ttt: 70, flat: 20 } },
    { id: "labrosse", birthYear: 2003, name: "Jordan Labrosse", team: "France", confirmed: true, pcsSlug: "jordan-labrosse", scores: { mountains: 40, hills: 60, itt: 40, ttt: 45, flat: 20 } },
    { id: "vparetpeintre", birthYear: 1996, name: "Valentin Paret-Peintre", team: "France", confirmed: true, pcsSlug: "valentin-paret-peintre", scores: { mountains: 70, hills: 60, itt: 40, ttt: 45, flat: 10 } },
    { id: "prodhomme", birthYear: 1996, name: "Nicolas Prodhomme", team: "France", confirmed: true, pcsSlug: "nicolas-prodhomme", scores: { mountains: 65, hills: 55, itt: 40, ttt: 45, flat: 10 } },
    { id: "baudin", birthYear: 2001, name: "Alex Baudin", team: "France", confirmed: true, pcsSlug: "alex-baudin", scores: { mountains: 60, hills: 65, itt: 45, ttt: 45, flat: 15 } },
    { id: "lbarre", name: "Louis Barré", team: "France", confirmed: true, pcsSlug: "louis-barre", scores: { mountains: 45, hills: 66, itt: 42, ttt: 45, flat: 25 } },
    { id: "jegat", birthYear: 1998, name: "Jordan Jegat", team: "France", confirmed: true, pcsSlug: "jordan-jegat", scores: { mountains: 60, hills: 55, itt: 45, ttt: 45, flat: 10 } },

    // Great Britain
    { id: "pidcock", birthYear: 1999, name: "Tom Pidcock", team: "Great Britain", confirmed: true, pcsSlug: "thomas-pidcock", scores: { mountains: 60, hills: 88, itt: 60, ttt: 55, flat: 30 } },
    { id: "donovan", birthYear: 1999, name: "Mark Donovan", team: "Great Britain", confirmed: true, pcsSlug: "mark-donovan", scores: { mountains: 50, hills: 50, itt: 45, ttt: 45, flat: 15 } },
    { id: "onley", birthYear: 2002, name: "Oscar Onley", team: "Great Britain", confirmed: true, pcsSlug: "oscar-onley", scores: { mountains: 70, hills: 70, itt: 50, ttt: 50, flat: 15 } },
    { id: "pickering", birthYear: 2003, name: "Finlay Pickering", team: "Great Britain", confirmed: true, pcsSlug: "finlay-pickering", scores: { mountains: 45, hills: 50, itt: 45, ttt: 45, flat: 20 } },
    { id: "jshaw", birthYear: 1996, name: "James Shaw", team: "Great Britain", confirmed: true, pcsSlug: "james-shaw", scores: { mountains: 35, hills: 60, itt: 40, ttt: 45, flat: 25 } },
    { id: "thornley", birthYear: 2003, name: "Callum Thornley", team: "Great Britain", confirmed: true, pcsSlug: "callum-thornley", scores: { mountains: 30, hills: 50, itt: 45, ttt: 45, flat: 25 } },
    { id: "fwright", birthYear: 1999, name: "Fred Wright", team: "Great Britain", confirmed: true, pcsSlug: "fred-wright", scores: { mountains: 30, hills: 70, itt: 50, ttt: 55, flat: 45 } },
    { id: "ayates", birthYear: 1992, name: "Adam Yates", team: "Great Britain", confirmed: true, pcsSlug: "adam-yates", scores: { mountains: 75, hills: 65, itt: 50, ttt: 50, flat: 10 } },

    // Italy
    { id: "bettiol", birthYear: 1993, name: "Alberto Bettiol", team: "Italy", confirmed: true, pcsSlug: "alberto-bettiol", scores: { mountains: 30, hills: 75, itt: 55, ttt: 55, flat: 30 } },
    { id: "cattaneo", birthYear: 1990, name: "Mattia Cattaneo", team: "Italy", confirmed: true, pcsSlug: "mattia-cattaneo", scores: { mountains: 45, hills: 50, itt: 70, ttt: 65, flat: 20 } },
    { id: "ganna", name: "Filippo Ganna", team: "Italy", confirmed: true, pcsSlug: "filippo-ganna", scores: { mountains: 15, hills: 45, itt: 94, ttt: 88, flat: 55 } },
    { id: "sobrero", name: "Matteo Sobrero", team: "Italy", confirmed: true, pcsSlug: "matteo-sobrero", scores: { mountains: 45, hills: 55, itt: 78, ttt: 72, flat: 25 } },
    { id: "ciccone", birthYear: 1994, name: "Giulio Ciccone", team: "Italy", confirmed: true, pcsSlug: "giulio-ciccone", scores: { mountains: 75, hills: 70, itt: 45, ttt: 45, flat: 15 } },
    { id: "lmfinn", birthYear: 2006, name: "Lorenzo Mark Finn", team: "Italy", confirmed: true, pcsSlug: "lorenzo-mark-finn", scores: { mountains: 60, hills: 70, itt: 50, ttt: 45, flat: 20 } },
    { id: "pellizzari", birthYear: 2003, name: "Giulio Pellizzari", team: "Italy", confirmed: true, pcsSlug: "giulio-pellizzari", scores: { mountains: 75, hills: 70, itt: 45, ttt: 45, flat: 10 } },
    { id: "piganzoli", birthYear: 2002, name: "Davide Piganzoli", team: "Italy", confirmed: true, pcsSlug: "davide-piganzoli", scores: { mountains: 60, hills: 55, itt: 45, ttt: 45, flat: 15 } },
    { id: "scaroni", birthYear: 1997, name: "Christian Scaroni", team: "Italy", confirmed: true, pcsSlug: "christian-scaroni", scores: { mountains: 55, hills: 60, itt: 40, ttt: 45, flat: 15 } },
    { id: "trentin", birthYear: 1989, name: "Matteo Trentin", team: "Italy", confirmed: true, pcsSlug: "matteo-trentin", scores: { mountains: 20, hills: 65, itt: 45, ttt: 55, flat: 50 } },

    // Spain
    { id: "ayuso", birthYear: 2002, name: "Juan Ayuso", team: "Spain", confirmed: true, pcsSlug: "juan-ayuso", scores: { mountains: 80, hills: 75, itt: 70, ttt: 60, flat: 15 } },
    { id: "iromeo", birthYear: 2003, name: "Iván Romeo", team: "Spain", confirmed: true, pcsSlug: "ivan-romeo", scores: { mountains: 30, hills: 60, itt: 80, ttt: 70, flat: 30 } },
    { id: "castrillo", name: "Pablo Castrillo", team: "Spain", confirmed: true, pcsSlug: "pablo-castrillo", scores: { mountains: 55, hills: 65, itt: 76, ttt: 64, flat: 20 } },
    { id: "rgarciapierna", birthYear: 2001, name: "Raúl García Pierna", team: "Spain", confirmed: true, pcsSlug: "raul-garcia-pierna", scores: { mountains: 55, hills: 60, itt: 55, ttt: 50, flat: 20 } },
    { id: "verona", birthYear: 1993, name: "Carlos Verona", team: "Spain", confirmed: true, pcsSlug: "carlos-verona", scores: { mountains: 55, hills: 55, itt: 45, ttt: 50, flat: 15 } },
    { id: "arrieta", birthYear: 2002, name: "Igor Arrieta", team: "Spain", confirmed: true, pcsSlug: "igor-arrieta", scores: { mountains: 55, hills: 60, itt: 45, ttt: 45, flat: 20 } },
    { id: "beloki", birthYear: 2005, name: "Markel Beloki", team: "Spain", confirmed: true, pcsSlug: "markel-beloki", scores: { mountains: 55, hills: 55, itt: 50, ttt: 45, flat: 15 } },
    { id: "enricmas", birthYear: 1995, name: "Enric Mas", team: "Spain", confirmed: true, pcsSlug: "enric-mas", scores: { mountains: 75, hills: 65, itt: 45, ttt: 45, flat: 10 } },
    { id: "camprubi", birthYear: 2001, name: "Marcel Camprubí", team: "Spain", confirmed: true, pcsSlug: "marcel-camprubi", scores: { mountains: 45, hills: 50, itt: 45, ttt: 45, flat: 20 } },

    // Slovenia
    { id: "roglic", birthYear: 1989, name: "Primož Roglič", team: "Slovenia", confirmed: true, pcsSlug: "primoz-roglic", scores: { mountains: 80, hills: 80, itt: 75, ttt: 65, flat: 20 } },
    { id: "mohoric", birthYear: 1994, name: "Matej Mohorič", team: "Slovenia", confirmed: true, pcsSlug: "matej-mohoric", scores: { mountains: 35, hills: 75, itt: 50, ttt: 55, flat: 40 } },
    { id: "tratnik", birthYear: 1990, name: "Jan Tratnik", team: "Slovenia", confirmed: true, pcsSlug: "jan-tratnik", scores: { mountains: 25, hills: 55, itt: 65, ttt: 65, flat: 25 } },
    { id: "finkst", birthYear: 2001, name: "Tilen Finkšt", team: "Slovenia", confirmed: true, pcsSlug: "tilen-finkst", scores: { mountains: 40, hills: 50, itt: 40, ttt: 45, flat: 20 } },
    { id: "glivar", birthYear: 2004, name: "Gal Glivar", team: "Slovenia", confirmed: true, pcsSlug: "gal-glivar", scores: { mountains: 30, hills: 55, itt: 40, ttt: 45, flat: 35 } },
    { id: "govekar", birthYear: 1997, name: "Matevž Govekar", team: "Slovenia", confirmed: true, pcsSlug: "matevz-govekar", scores: { mountains: 10, hills: 45, itt: 35, ttt: 45, flat: 55 } },
    { id: "mezgec", birthYear: 1988, name: "Luka Mezgec", team: "Slovenia", confirmed: true, pcsSlug: "luka-mezgec", scores: { mountains: 5, hills: 35, itt: 35, ttt: 50, flat: 60 } },
    { id: "omrzel", birthYear: 2004, name: "Jakob Omrzel", team: "Slovenia", confirmed: true, pcsSlug: "jakob-omrzel", scores: { mountains: 55, hills: 55, itt: 40, ttt: 45, flat: 15 } },

    // Denmark
    { id: "mpedersen", birthYear: 1995, name: "Mads Pedersen", team: "Denmark", confirmed: true, pcsSlug: "mads-pedersen", scores: { mountains: 25, hills: 80, itt: 60, ttt: 60, flat: 75 } },
    { id: "asgreen", birthYear: 1995, name: "Kasper Asgreen", team: "Denmark", confirmed: true, pcsSlug: "kasper-asgreen", scores: { mountains: 20, hills: 65, itt: 65, ttt: 65, flat: 35 } },
    { id: "bjerg", birthYear: 1998, name: "Mikkel Bjerg", team: "Denmark", confirmed: true, pcsSlug: "mikkel-bjerg", scores: { mountains: 20, hills: 40, itt: 75, ttt: 70, flat: 20 } },
    { id: "honore", birthYear: 1996, name: "Mikkel Frølich Honoré", team: "Denmark", confirmed: true, pcsSlug: "mikkel-frolich-honore", scores: { mountains: 35, hills: 55, itt: 50, ttt: 55, flat: 20 } },
    { id: "kron", birthYear: 1994, name: "Andreas Kron", team: "Denmark", confirmed: true, pcsSlug: "andreas-kron", scores: { mountains: 35, hills: 65, itt: 40, ttt: 50, flat: 30 } },
    { id: "valgren", birthYear: 1992, name: "Michael Valgren", team: "Denmark", confirmed: true, pcsSlug: "michael-valgren", scores: { mountains: 30, hills: 65, itt: 45, ttt: 50, flat: 25 } },
    { id: "skandersen", birthYear: 1990, name: "Søren Kragh Andersen", team: "Denmark", confirmed: true, pcsSlug: "soren-kragh-andersen", scores: { mountains: 20, hills: 60, itt: 55, ttt: 60, flat: 35 } },
    { id: "skjelmose", birthYear: 2000, name: "Mattias Skjelmose", team: "Denmark", confirmed: true, pcsSlug: "mattias-skjelmose", scores: { mountains: 70, hills: 84, itt: 65, ttt: 60, flat: 20 } },

    // United States
    { id: "jorgenson", birthYear: 1999, name: "Matteo Jorgenson", team: "United States", confirmed: true, pcsSlug: "matteo-jorgenson", scores: { mountains: 65, hills: 75, itt: 70, ttt: 65, flat: 20 } },
    { id: "mcnulty", birthYear: 1998, name: "Brandon McNulty", team: "United States", confirmed: true, pcsSlug: "brandon-mcnulty", scores: { mountains: 60, hills: 60, itt: 80, ttt: 70, flat: 15 } },
    { id: "simmons", birthYear: 2001, name: "Quinn Simmons", team: "United States", confirmed: true, pcsSlug: "quinn-simmons", scores: { mountains: 30, hills: 70, itt: 50, ttt: 55, flat: 45 } },
    { id: "powless", birthYear: 1996, name: "Neilson Powless", team: "United States", confirmed: true, pcsSlug: "neilson-powless", scores: { mountains: 50, hills: 75, itt: 50, ttt: 50, flat: 25 } },
    { id: "squinn", birthYear: 2000, name: "Sean Quinn", team: "United States", confirmed: true, pcsSlug: "sean-quinn", scores: { mountains: 55, hills: 55, itt: 45, ttt: 45, flat: 15 } },
    { id: "shmidt", birthYear: 2003, name: "Artem Shmidt", team: "United States", confirmed: true, pcsSlug: "artem-shmidt", scores: { mountains: 50, hills: 50, itt: 50, ttt: 45, flat: 15 } },
    { id: "vermaerke", birthYear: 2000, name: "Kevin Vermaerke", team: "United States", confirmed: true, pcsSlug: "kevin-vermaerke", scores: { mountains: 45, hills: 55, itt: 45, ttt: 45, flat: 25 } },
    { id: "warbasse", birthYear: 1990, name: "Larry Warbasse", team: "United States", confirmed: true, pcsSlug: "larry-warbasse", scores: { mountains: 50, hills: 50, itt: 40, ttt: 45, flat: 15 } },

    { id: "wvargas", name: "Wálter Vargas", team: "Colombia", confirmed: true, pcsSlug: "walter-vargas", scores: { mountains: 25, hills: 45, itt: 70, ttt: 65, flat: 20 } },

    // Mexico
    { id: "deltoro", birthYear: 2003, name: "Isaac del Toro", team: "Mexico", confirmed: true, pcsSlug: "isaac-del-toro", scores: { mountains: 75, hills: 90, itt: 60, ttt: 55, flat: 25 } },
    { id: "taguirre", name: "Tomás Aguirre", team: "Mexico", confirmed: true, pcsSlug: "tomas-aguirre", scores: { mountains: 45, hills: 48, itt: 40, ttt: 42, flat: 20 } },
    { id: "frayre", birthYear: 1991, name: "Eder Frayre", team: "Mexico", confirmed: true, pcsSlug: "eder-frayre", scores: { mountains: 40, hills: 45, itt: 40, ttt: 40, flat: 20 } },
    { id: "cadena", birthYear: 1998, name: "Edgar David Cadena", team: "Mexico", confirmed: true, pcsSlug: "edgar-cadena", scores: { mountains: 35, hills: 45, itt: 35, ttt: 40, flat: 20 } },
    { id: "ucastillo", birthYear: 1990, name: "Ulises Alfredo Castillo", team: "Mexico", confirmed: true, pcsSlug: "ulises-castillo", scores: { mountains: 30, hills: 45, itt: 40, ttt: 40, flat: 30 } },
    { id: "escarcega", birthYear: 1997, name: "José Antonio Escárcega", team: "Mexico", confirmed: true, pcsSlug: "jose-antonio-escarcega", scores: { mountains: 35, hills: 45, itt: 35, ttt: 40, flat: 25 } },
    { id: "cagarcia", birthYear: 1999, name: "Carlos Alfonso García", team: "Mexico", confirmed: true, pcsSlug: "carlos-alfonso-garcia", scores: { mountains: 35, hills: 45, itt: 35, ttt: 40, flat: 20 } },

    // Norway
    { id: "thjohannessen", birthYear: 1999, name: "Tobias Halland Johannessen", team: "Norway", confirmed: true, pcsSlug: "tobias-halland-johannessen", scores: { mountains: 70, hills: 75, itt: 55, ttt: 50, flat: 15 } },
    { id: "tfoss", birthYear: 1997, name: "Tobias Foss", team: "Norway", confirmed: true, pcsSlug: "tobias-foss", scores: { mountains: 40, hills: 55, itt: 75, ttt: 70, flat: 15 } },
    { id: "svestadbardseng", birthYear: 2001, name: "Embret Svestad-Bårdseng", team: "Norway", confirmed: true, pcsSlug: "embret-svestad-bardseng", scores: { mountains: 50, hills: 55, itt: 45, ttt: 45, flat: 15 } },
    { id: "nordhagen", birthYear: 2004, name: "Jørgen Nordhagen", team: "Norway", confirmed: true, pcsSlug: "jorgen-nordhagen", scores: { mountains: 60, hills: 55, itt: 45, ttt: 45, flat: 15 } },
    { id: "leknessund", birthYear: 1999, name: "Andreas Leknessund", team: "Norway", confirmed: true, pcsSlug: "andreas-leknessund", scores: { mountains: 45, hills: 60, itt: 60, ttt: 55, flat: 20 } },
    { id: "skaarseth", birthYear: 1995, name: "Anders Skaarseth", team: "Norway", confirmed: true, pcsSlug: "anders-skaarseth", scores: { mountains: 40, hills: 55, itt: 45, ttt: 50, flat: 25 } },

    // Switzerland
    { id: "hirschi", birthYear: 1998, name: "Marc Hirschi", team: "Switzerland", confirmed: true, pcsSlug: "marc-hirschi", scores: { mountains: 45, hills: 85, itt: 50, ttt: 50, flat: 25 } },
    { id: "mschmid", birthYear: 1999, name: "Mauro Schmid", team: "Switzerland", confirmed: true, pcsSlug: "mauro-schmid", scores: { mountains: 40, hills: 75, itt: 60, ttt: 60, flat: 30 } },
    { id: "kung", birthYear: 1993, name: "Stefan Küng", team: "Switzerland", confirmed: true, pcsSlug: "stefan-kung", scores: { mountains: 20, hills: 60, itt: 85, ttt: 75, flat: 30 } },
    { id: "bissegger", birthYear: 1998, name: "Stefan Bissegger", team: "Switzerland", confirmed: true, pcsSlug: "stefan-bissegger", scores: { mountains: 10, hills: 45, itt: 75, ttt: 70, flat: 30 } },
    { id: "jchristen", birthYear: 2004, name: "Jan Christen", team: "Switzerland", confirmed: true, pcsSlug: "jan-christen", scores: { mountains: 55, hills: 80, itt: 55, ttt: 55, flat: 25 } },
    { id: "fchristen", birthYear: 2002, name: "Fabio Christen", team: "Switzerland", confirmed: true, pcsSlug: "fabio-christen", scores: { mountains: 25, hills: 55, itt: 50, ttt: 50, flat: 35 } },

    // Germany
    { id: "lipowitz", birthYear: 2000, name: "Florian Lipowitz", team: "Germany", confirmed: true, pcsSlug: "florian-lipowitz", scores: { mountains: 75, hills: 70, itt: 65, ttt: 60, flat: 15 } },
    { id: "brenner", birthYear: 2003, name: "Marco Brenner", team: "Germany", confirmed: true, pcsSlug: "marco-brenner", scores: { mountains: 35, hills: 55, itt: 55, ttt: 55, flat: 25 } },
    { id: "zimmermann", birthYear: 1997, name: "Georg Zimmermann", team: "Germany", confirmed: true, pcsSlug: "georg-zimmermann", scores: { mountains: 50, hills: 70, itt: 45, ttt: 50, flat: 20 } },
    { id: "engelhardt", birthYear: 2001, name: "Felix Engelhardt", team: "Germany", confirmed: true, pcsSlug: "felix-engelhardt", scores: { mountains: 45, hills: 50, itt: 45, ttt: 45, flat: 15 } },
    { id: "denz", birthYear: 1994, name: "Nico Denz", team: "Germany", confirmed: true, pcsSlug: "nico-denz", scores: { mountains: 40, hills: 55, itt: 50, ttt: 55, flat: 25 } },
    { id: "schachmann", birthYear: 1994, name: "Maximilian Schachmann", team: "Germany", confirmed: true, pcsSlug: "maximilian-schachmann", scores: { mountains: 45, hills: 70, itt: 60, ttt: 55, flat: 20 } },
    { id: "sutterlin", birthYear: 1992, name: "Jasha Sütterlin", team: "Germany", confirmed: true, pcsSlug: "jasha-sutterlin", scores: { mountains: 20, hills: 45, itt: 68, ttt: 66, flat: 28 } },
    { id: "walscheid", birthYear: 1993, name: "Maximilian Walscheid", team: "Germany", confirmed: true, pcsSlug: "max-walscheid", scores: { mountains: 10, hills: 38, itt: 70, ttt: 68, flat: 55 } },

    // Ecuador
    { id: "carapaz", birthYear: 1993, name: "Richard Carapaz", team: "Ecuador", confirmed: true, pcsSlug: "richard-carapaz", scores: { mountains: 85, hills: 75, itt: 45, ttt: 45, flat: 10 } },
    { id: "narvaez", birthYear: 1997, name: "Jhonatan Narváez", team: "Ecuador", confirmed: true, pcsSlug: "jhonatan-narvaez", scores: { mountains: 55, hills: 80, itt: 55, ttt: 55, flat: 30 } },
    { id: "hlopez", name: "Harold Martín López", team: "Ecuador", confirmed: true, pcsSlug: "harold-martin-lopez", scores: { mountains: 62, hills: 62, itt: 45, ttt: 45, flat: 15 } },
    { id: "jacepeda", birthYear: 1996, name: "Jefferson Alveiro Cepeda", team: "Ecuador", confirmed: true, pcsSlug: "jefferson-cepeda", scores: { mountains: 65, hills: 55, itt: 40, ttt: 45, flat: 10 } },
    { id: "jalexcepeda", birthYear: 1996, name: "Jefferson Alexander Cepeda", team: "Ecuador", confirmed: true, pcsSlug: "jefferson-alexander-cepeda", scores: { mountains: 60, hills: 55, itt: 40, ttt: 45, flat: 10 } },

    // Australia
    { id: "matthews", birthYear: 1990, name: "Michael Matthews", team: "Australia", confirmed: true, pcsSlug: "michael-matthews", scores: { mountains: 25, hills: 80, itt: 50, ttt: 55, flat: 65 } },
    { id: "oconnor", birthYear: 1995, name: "Ben O'Connor", team: "Australia", confirmed: true, pcsSlug: "ben-oconnor", scores: { mountains: 75, hills: 60, itt: 55, ttt: 50, flat: 10 } },
    { id: "hindley", birthYear: 1996, name: "Jai Hindley", team: "Australia", confirmed: true, pcsSlug: "jai-hindley", scores: { mountains: 70, hills: 55, itt: 50, ttt: 50, flat: 10 } },
    { id: "haig", birthYear: 1993, name: "Jack Haig", team: "Australia", confirmed: true, pcsSlug: "jack-haig", scores: { mountains: 65, hills: 55, itt: 45, ttt: 45, flat: 10 } },
    { id: "storer", birthYear: 1996, name: "Michael Storer", team: "Australia", confirmed: true, pcsSlug: "michael-storer", scores: { mountains: 70, hills: 55, itt: 50, ttt: 50, flat: 10 } },
    { id: "tuckwell", birthYear: 2003, name: "Luke Tuckwell", team: "Australia", confirmed: true, pcsSlug: "luke-tuckwell", scores: { mountains: 40, hills: 50, itt: 45, ttt: 45, flat: 20 } },

    // Canada (host nation)
    { id: "geewest", birthYear: 1997, name: "Derek Gee-West", team: "Canada", confirmed: true, pcsSlug: "derek-gee", scores: { mountains: 65, hills: 70, itt: 70, ttt: 60, flat: 20 } },
    { id: "houle", birthYear: 1990, name: "Hugo Houle", team: "Canada", confirmed: true, pcsSlug: "hugo-houle", scores: { mountains: 45, hills: 55, itt: 50, ttt: 50, flat: 20 } },
    { id: "mleonard", birthYear: 2004, name: "Michael Leonard", team: "Canada", confirmed: true, pcsSlug: "michael-leonard", scores: { mountains: 45, hills: 55, itt: 50, ttt: 45, flat: 20 } },
    { id: "mwoods", birthYear: 1986, name: "Michael Woods", team: "Canada", confirmed: true, pcsSlug: "michael-woods", scores: { mountains: 75, hills: 75, itt: 40, ttt: 40, flat: 10 } },
    { id: "zukowsky", birthYear: 1997, name: "Nickolas Zukowsky", team: "Canada", confirmed: true, pcsSlug: "nickolas-zukowsky", scores: { mountains: 40, hills: 55, itt: 45, ttt: 45, flat: 25 } },
    { id: "pacote", birthYear: 1993, name: "Pier-André Côté", team: "Canada", confirmed: true, pcsSlug: "pier-andre-cote", scores: { mountains: 15, hills: 55, itt: 40, ttt: 45, flat: 45 } },

    // Colombia
    { id: "buitrago", birthYear: 1999, name: "Santiago Buitrago", team: "Colombia", confirmed: true, pcsSlug: "santiago-buitrago", scores: { mountains: 75, hills: 65, itt: 50, ttt: 45, flat: 10 } },
    { id: "higuita", birthYear: 1997, name: "Sergio Higuita", team: "Colombia", confirmed: true, pcsSlug: "sergio-higuita", scores: { mountains: 65, hills: 70, itt: 45, ttt: 45, flat: 15 } },
    { id: "quintana", birthYear: 1990, name: "Nairo Quintana", team: "Colombia", confirmed: true, pcsSlug: "nairo-quintana", scores: { mountains: 70, hills: 55, itt: 40, ttt: 40, flat: 10 } },
    { id: "brivera", birthYear: 1996, name: "Brandon Smith Rivera", team: "Colombia", confirmed: true, pcsSlug: "brandon-rivera", scores: { mountains: 45, hills: 50, itt: 45, ttt: 50, flat: 15 } },
    { id: "tejada", birthYear: 1997, name: "Harold Tejada", team: "Colombia", confirmed: true, pcsSlug: "harold-tejada", scores: { mountains: 65, hills: 55, itt: 45, ttt: 45, flat: 10 } },
    { id: "wparedes", birthYear: 1999, name: "Wilmar Andrés Paredes", team: "Colombia", confirmed: true, pcsSlug: "wilmar-paredes", scores: { mountains: 55, hills: 50, itt: 40, ttt: 45, flat: 15 } },

    // Eritrea
    { id: "girmay", birthYear: 2000, name: "Biniam Girmay", team: "Eritrea", confirmed: true, pcsSlug: "biniam-girmay", scores: { mountains: 20, hills: 70, itt: 40, ttt: 50, flat: 75 } },
    { id: "ghebreigzabhier", birthYear: 1994, name: "Amanuel Ghebreigzabhier", team: "Eritrea", confirmed: true, pcsSlug: "amanuel-ghebreigzabhier", scores: { mountains: 50, hills: 50, itt: 45, ttt: 45, flat: 20 } },
    { id: "kudus", birthYear: 1994, name: "Merhawi Kudus", team: "Eritrea", confirmed: true, pcsSlug: "merhawi-kudus", scores: { mountains: 55, hills: 50, itt: 40, ttt: 45, flat: 15 } },
    { id: "mulubrhan", birthYear: 2000, name: "Henok Mulubrhan", team: "Eritrea", confirmed: true, pcsSlug: "henok-mulubrhan", scores: { mountains: 60, hills: 55, itt: 45, ttt: 45, flat: 15 } },
    { id: "tesfatsion", birthYear: 1994, name: "Natnael Tesfatsion", team: "Eritrea", confirmed: true, pcsSlug: "natnael-tesfatsion", scores: { mountains: 55, hills: 60, itt: 45, ttt: 45, flat: 20 } },

    // Ireland
    { id: "healy", birthYear: 2000, name: "Ben Healy", team: "Ireland", confirmed: true, pcsSlug: "ben-healy", scores: { mountains: 55, hills: 85, itt: 55, ttt: 50, flat: 20 } },
    { id: "rafferty", birthYear: 2003, name: "Darren Rafferty", team: "Ireland", confirmed: true, pcsSlug: "darren-rafferty", scores: { mountains: 55, hills: 60, itt: 50, ttt: 45, flat: 15 } },
    { id: "meehan", birthYear: 2003, name: "Jamie Meehan", team: "Ireland", confirmed: true, pcsSlug: "jamie-meehan", scores: { mountains: 40, hills: 50, itt: 45, ttt: 45, flat: 20 } },
    { id: "mullen", birthYear: 1994, name: "Ryan Mullen", team: "Ireland", confirmed: true, pcsSlug: "ryan-mullen", scores: { mountains: 15, hills: 45, itt: 70, ttt: 65, flat: 25 } },

    // New Zealand
    { id: "fisherblack", birthYear: 2001, name: "Finn Fisher-Black", team: "New Zealand", confirmed: true, pcsSlug: "finn-fisher-black", scores: { mountains: 65, hills: 65, itt: 55, ttt: 50, flat: 15 } },
    { id: "pithie", birthYear: 2002, name: "Laurence Pithie", team: "New Zealand", confirmed: true, pcsSlug: "laurence-pithie", scores: { mountains: 25, hills: 70, itt: 50, ttt: 55, flat: 45 } },
    { id: "cstrong", birthYear: 1999, name: "Corbin Strong", team: "New Zealand", confirmed: true, pcsSlug: "corbin-strong", scores: { mountains: 25, hills: 65, itt: 45, ttt: 50, flat: 55 } },
    { id: "gbennett", birthYear: 1990, name: "George Bennett", team: "New Zealand", confirmed: true, pcsSlug: "george-bennett", scores: { mountains: 60, hills: 50, itt: 45, ttt: 45, flat: 10 } },
    { id: "boliver", birthYear: 2000, name: "Ben Oliver", team: "New Zealand", confirmed: true, pcsSlug: "ben-oliver", scores: { mountains: 45, hills: 50, itt: 45, ttt: 45, flat: 15 } },
    { id: "kench", name: "Josh Kench", team: "New Zealand", confirmed: true, pcsSlug: "josh-kench", scores: { mountains: 45, hills: 52, itt: 48, ttt: 48, flat: 20 } },

    // Portugal
    { id: "morgado", birthYear: 2003, name: "António Morgado", team: "Portugal", confirmed: true, pcsSlug: "antonio-morgado", scores: { mountains: 30, hills: 75, itt: 50, ttt: 55, flat: 45 } },
    { id: "noliveira", birthYear: 1989, name: "Nelson Oliveira", team: "Portugal", confirmed: true, pcsSlug: "nelson-oliveira", scores: { mountains: 35, hills: 50, itt: 65, ttt: 60, flat: 20 } },
    { id: "ioliveira", birthYear: 1994, name: "Ivo Oliveira", team: "Portugal", confirmed: true, pcsSlug: "ivo-oliveira", scores: { mountains: 20, hills: 45, itt: 60, ttt: 60, flat: 30 } },
    { id: "eulalio", birthYear: 2001, name: "Afonso Eulálio", team: "Portugal", confirmed: true, pcsSlug: "afonso-eulalio", scores: { mountains: 50, hills: 50, itt: 45, ttt: 45, flat: 15 } },
    { id: "tantunes", birthYear: 2002, name: "Tiago Antunes", team: "Portugal", confirmed: true, pcsSlug: "tiago-antunes", scores: { mountains: 40, hills: 50, itt: 45, ttt: 45, flat: 20 } },

    // Austria
    { id: "gall", birthYear: 1998, name: "Felix Gall", team: "Austria", confirmed: true, pcsSlug: "felix-gall", scores: { mountains: 80, hills: 70, itt: 55, ttt: 50, flat: 10 } },
    { id: "grossschartner", birthYear: 1993, name: "Felix Großschartner", team: "Austria", confirmed: true, pcsSlug: "felix-grossschartner", scores: { mountains: 60, hills: 55, itt: 50, ttt: 50, flat: 10 } },
    { id: "konrad", birthYear: 1991, name: "Patrick Konrad", team: "Austria", confirmed: true, pcsSlug: "patrick-konrad", scores: { mountains: 55, hills: 55, itt: 50, ttt: 50, flat: 15 } },

    // Latvia
    { id: "skujins", birthYear: 1991, name: "Toms Skujiņš", team: "Latvia", confirmed: true, pcsSlug: "toms-skujins", scores: { mountains: 45, hills: 75, itt: 50, ttt: 50, flat: 20 } },
    { id: "liepins", birthYear: 1992, name: "Emīls Liepiņš", team: "Latvia", confirmed: true, pcsSlug: "emils-liepins", scores: { mountains: 15, hills: 50, itt: 45, ttt: 50, flat: 50 } },
    { id: "belohvoscik", birthYear: 2002, name: "Kristians Belohvoščiks", team: "Latvia", confirmed: true, pcsSlug: "kristians-belohvoscik", scores: { mountains: 35, hills: 50, itt: 45, ttt: 45, flat: 20 } },
    { id: "pluto", birthYear: 2003, name: "Mārtiņš Pluto", team: "Latvia", confirmed: true, pcsSlug: "martins-pluto", scores: { mountains: 30, hills: 45, itt: 45, ttt: 45, flat: 25 } },

    // Poland
    { id: "kwiatkowski", birthYear: 1990, name: "Michał Kwiatkowski", team: "Poland", confirmed: true, pcsSlug: "michal-kwiatkowski", scores: { mountains: 45, hills: 80, itt: 65, ttt: 60, flat: 25 } },
    { id: "gajdulewicz", birthYear: 2003, name: "Mateusz Gajdulewicz", team: "Poland", confirmed: true, pcsSlug: "mateusz-gajdulewicz", scores: { mountains: 40, hills: 50, itt: 45, ttt: 45, flat: 20 } },
    { id: "kaczmarek", birthYear: 2001, name: "Jakub Kaczmarek", team: "Poland", confirmed: true, pcsSlug: "jakub-kaczmarek", scores: { mountains: 45, hills: 50, itt: 45, ttt: 45, flat: 15 } },
    { id: "pekala", birthYear: 2002, name: "Piotr Pękala", team: "Poland", confirmed: true, pcsSlug: "piotr-pekala", scores: { mountains: 35, hills: 50, itt: 45, ttt: 45, flat: 20 } },

    // Additional confirmed / published selections
    { id: "soderqvist", name: "Jakob Söderqvist", team: "Sweden", confirmed: true, pcsSlug: "jakob-soderqvist", scores: { mountains: 20, hills: 45, itt: 80, ttt: 70, flat: 30 } },
    { id: "valter", name: "Attila Valter", team: "Hungary", confirmed: true, pcsSlug: "attila-valter", scores: { mountains: 60, hills: 70, itt: 55, ttt: 50, flat: 15 } },
    { id: "oses", name: "Luis Daniel Oses", team: "Costa Rica", confirmed: true, pcsSlug: "luis-daniel-oses", scores: { mountains: 45, hills: 50, itt: 45, ttt: 40, flat: 20 } },
    { id: "amayer", name: "Alexandre Mayer", team: "Mauritius", confirmed: true, pcsSlug: "alexandre-mayer", scores: { mountains: 20, hills: 45, itt: 62, ttt: 55, flat: 25 } },
    { id: "bmunton", name: "Byron Munton", team: "South Africa", confirmed: true, pcsSlug: "byron-munton", scores: { mountains: 35, hills: 48, itt: 60, ttt: 52, flat: 20 } },

    // Czech Republic
    { id: "vacek", birthYear: 2002, name: "Mathias Vacek", team: "Czech Republic", confirmed: true, pcsSlug: "mathias-vacek", scores: { mountains: 30, hills: 70, itt: 60, ttt: 60, flat: 35 } },
    { id: "otruba", birthYear: 1995, name: "Jakub Otruba", team: "Czech Republic", confirmed: true, pcsSlug: "jakub-otruba", scores: { mountains: 30, hills: 45, itt: 55, ttt: 55, flat: 20 } },
    { id: "pnovak", birthYear: 1996, name: "Pavel Novák", team: "Czech Republic", confirmed: true, pcsSlug: "pavel-novak", scores: { mountains: 40, hills: 50, itt: 45, ttt: 45, flat: 20 } },
  ],
};


// ---------------------------------------------------------------------------
// Elite women's championship
// ---------------------------------------------------------------------------
// Same host, same week, same Mount Royal circuit — a separate race in the
// registry so its picks, leaderboard and results are kept completely apart
// from the men's, exactly as the Tour and Vuelta are.
//
// Route data is official: the women share the men's 39.2 km time-trial course,
// and their road race covers 180.4 km with 2,570 m of climbing over eight laps
// of the same circuit.
//
// Women's selections are now being published by national federations. This
// roster only contains named selections we have been able to verify; the ITT
// and road race fields are tracked independently because they are not the same.
export const WORLDS_2026_WOMEN = {
  slug: "worlds-2026-women",
  type: "championship",
  category: "women",
  urlPrefix: "/women",
  surface: "light",
  year: 2026,
  edition: 99,

  name: {
    en: "UCI Road World Championships 2026 — Women",
    es: "Mundial de Ciclismo en Ruta 2026 — Femenino",
    ca: "Mundial de Ciclisme en Ruta 2026 — Femení",
    fr: "Championnats du Monde Route UCI 2026 — Femmes",
    it: "Mondiali di Ciclismo su Strada 2026 — Donne",
    nl: "WK Wielrennen op de Weg 2026 — Vrouwen",
  },
  shortName: {
    en: "Worlds 2026 — Women", es: "Mundial 2026 — Femenino",
    ca: "Mundial 2026 — Femení", fr: "Mondiaux 2026 — Femmes",
    it: "Mondiali 2026 — Donne", nl: "WK 2026 — Vrouwen",
  },
  brandName: {
    en: "THE WORLDS", es: "EL MUNDIAL", ca: "EL MUNDIAL",
    fr: "LES MONDIAUX", it: "I MONDIALI", nl: "HET WK",
  },
  poolBrandName: {
    en: "THE WORLDS POOL",
    es: "PORRA DEL MUNDIAL",
    ca: "PORRA DEL MUNDIAL",
    fr: "PRONOS MONDIAUX",
    it: "PRONOSTICI MONDIALI",
    nl: "WK POOL",
  },

  status: "upcoming",
  startlistUpdated: "2026-09-15",
  startlistStatus: "confirmed-selections-in-progress",
  startlistSources: [
    { label: "Road race — current startlist cross-check", href: "https://cyclingfantasy.cc/en/race/uci-road-world-championships-women-irr/2026/startlist" },
    { label: "ITT — current startlist cross-check", href: "https://cyclingfantasy.cc/en/race/uci-road-world-championships-women-itt/2026/startlist" },
    { label: "Official event hub — UCI", href: "https://www.uci.org/competition-hub/2026-uci-road-world-championships/14QBdFX8GqbCHUPE234D0Q" },
  ],

  theme: {
    accent: "#0B4EA2",
    accentDark: "#063168",
    accentInk: "#ffffff",
    accentSoft: "#eef4fc",
    rainbow: "linear-gradient(90deg,#0B4EA2 0%,#0B4EA2 20%,#D7241E 20%,#D7241E 40%,#111111 40%,#111111 60%,#F2C200 60%,#F2C200 80%,#1E9E4A 80%,#1E9E4A 100%)",
  },

  startDate: "2026-09-20",
  endDate: "2026-09-27",
  utcOffset: "-04:00",
  timeZone: "America/Toronto",

  host: { city: "Montreal", country: "Canada" },
  countries: ["Canada"],
  restDays: [],
  jerseys: [],

  weeks: [{ key: "week1", stages: [1, 2] }],

  stages: [
    {
      n: 1,
      date: "2026-09-20",
      startTime: "09:00",
      from: "Montreal",
      to: "Montreal",
      km: 39.2,
      type: "itt",
      elevationGain: 220,
      startlistKind: "itt",
      eligibleRiderIds: [
        "vollering", "nooijen",
        "guazzini", "longoborghini",
        "berthet", "kerbaol",
        "blasi", "mbenito",
        "faulkner", "knibb",
        "gontova",
        "lclaes", "kopecky",
        "bobnar"
      ],
      eventName: {
        en: "Elite Women — Individual Time Trial",
        es: "Élite Femenina — Contrarreloj Individual",
      },
      preview:
        "The elite women open the championships, riding exactly the same 39.2 km course as the men later the same day. It is long and almost flat — around 220 m of elevation — running past Old Montreal, along the new cycle paths beside the Saint Lawrence, around the Circuit Gilles Villeneuve and through Parc Jean-Drapeau before crossing the Concorde Bridge back to Avenue du Parc. Fast, technical in places, and a pure test of sustained power rather than climbing.",
      previewEs:
        "La élite femenina abre el Mundial sobre exactamente el mismo recorrido de 39,2 km que harán los hombres horas después. Es larga y casi llana —unos 220 m de desnivel— y pasa por el Viejo Montreal, los nuevos carriles bici junto al río San Lorenzo, el Circuito Gilles Villeneuve y el Parc Jean-Drapeau antes de cruzar el puente de la Concorde de vuelta a la Avenue du Parc. Rápida, técnica por tramos, y una prueba pura de potencia sostenida más que de escalada.",
    },
    {
      n: 2,
      date: "2026-09-26",
      startTime: "09:00",
      from: "Brossard",
      to: "Montreal",
      km: 180.4,
      type: "hills",
      elevationGain: 2570,
      startlistKind: "road",
      eligibleRiderIds: [
        "vollering", "rmarkus", "pieterse", "swinkels", "fdevries", "kraak", "nooijen", "barale", "casasola", "egasparrini", "longoborghini", "magnaldi", "persico", "trincolonel", "gery", "berthet", "curinier", "lenet", "muzic", "kerbaol", "squiban", "mavigarcia", "blasi", "mbenito", "smartin", "ostolaza", "salonso", "arlandson", "kcourtney", "faulkner", "magner", "nquinn", "lstephens", "anormand", "ajackson", "vallieres", "coleslyster", "gontova", "obaril", "svandam", "bossuyt", "lclaes", "kopecky", "stas", "vandervelde", "vanpachtenbeke", "zigart", "bobnar", "gigante", "spratt", "gbaker", "hanson", "macgregor", "wyllie", "christie", "nfisherblack"
      ],
      eventName: {
        en: "Elite Women — Road Race",
        es: "Élite Femenina — Prueba en Ruta",
      },
      preview:
        "180.4 km and 2,570 m of climbing, starting alongside the men in Brossard and passing through Carignan, Chambly and Richelieu before crossing the Samuel De Champlain Bridge into Montreal. The finale is eight laps of the same 13.4 km Mount Royal circuit the men ride twelve times — the Voie Camillien-Houde, the steep ramps of the Chemin de la Polytechnique, and the rising false flat of Avenue du Parc. Shorter than the men's race but proportionally just as selective, and with fewer laps to recover from a mistake.",
      previewEs:
        "180,4 km y 2.570 m de desnivel, con salida junto a los hombres en Brossard y paso por Carignan, Chambly y Richelieu antes de cruzar el puente Samuel De Champlain hacia Montreal. El final son ocho vueltas al mismo circuito de 13,4 km del Mont Royal que los hombres recorren doce veces: la Voie Camillien-Houde, las rampas del Chemin de la Polytechnique y el falso llano ascendente de la Avenue du Parc. Más corta que la masculina pero proporcionalmente igual de selectiva, y con menos vueltas para recuperarse de un error.",
    },
  ],

  circuit: {
    name: "Mount Royal",
    lapKm: 13.4,
    lapElevation: 269,
    eliteWomenLaps: 8,
    sectors: [
      { name: "Voie Camillien-Houde", detail: { en: "2.3 km at 6.2% average", es: "2,3 km al 6,2% de media" } },
      { name: "Chemin de la Polytechnique", detail: { en: "Short, with ramps over 11%", es: "Corta, con rampas de más del 11%" } },
      { name: "Avenue du Parc", detail: { en: "Rising false flat to the finish line", es: "Falso llano ascendente hasta la meta" } },
    ],
  },

  // Published elite selections we have verified so far. Nations are added as
  // soon as their federation announces names; we never fill gaps with guesses.
  teams: [
    "Netherlands", "Italy", "France", "Spain", "United States", "Canada",
    "Belgium", "Slovenia", "Australia", "New Zealand"
  ],
  officialTeams: [
    "Netherlands", "Italy", "France", "Spain", "United States", "Canada",
    "Belgium", "Slovenia", "Australia", "New Zealand"
  ],
  riders: [
    // Netherlands
    { id: "vollering", name: "Demi Vollering", team: "Netherlands", confirmed: true, pcsSlug: "demi-vollering", scores: { mountains: 90, hills: 92, itt: 87, ttt: 75, flat: 35 } },
    { id: "nooijen", name: "Lieke Nooijen", team: "Netherlands", confirmed: true, pcsSlug: "lieke-nooijen", scores: { mountains: 45, hills: 65, itt: 76, ttt: 65, flat: 35 } },
    { id: "rmarkus", name: "Riejanne Markus", team: "Netherlands", confirmed: true, pcsSlug: "riejanne-markus", scores: { mountains: 68, hills: 78, itt: 70, ttt: 66, flat: 30 } },
    { id: "pieterse", name: "Puck Pieterse", team: "Netherlands", confirmed: true, pcsSlug: "puck-pieterse", scores: { mountains: 72, hills: 90, itt: 60, ttt: 55, flat: 50 } },
    { id: "swinkels", name: "Karlijn Swinkels", team: "Netherlands", confirmed: true, pcsSlug: "karlijn-swinkels", scores: { mountains: 45, hills: 68, itt: 55, ttt: 55, flat: 55 } },
    { id: "fdevries", name: "Femke de Vries", team: "Netherlands", confirmed: true, pcsSlug: "femke-de-vries", scores: { mountains: 42, hills: 62, itt: 66, ttt: 60, flat: 45 } },
    { id: "kraak", name: "Amber Kraak", team: "Netherlands", confirmed: true, pcsSlug: "amber-kraak", scores: { mountains: 55, hills: 68, itt: 58, ttt: 56, flat: 35 } },

    // Italy
    { id: "barale", name: "Francesca Barale", team: "Italy", confirmed: true, pcsSlug: "francesca-barale", scores: { mountains: 55, hills: 68, itt: 52, ttt: 50, flat: 35 } },
    { id: "casasola", name: "Sara Casasola", team: "Italy", confirmed: true, pcsSlug: "sara-casasola", scores: { mountains: 65, hills: 72, itt: 45, ttt: 45, flat: 25 } },
    { id: "egasparrini", name: "Eleonora Gasparrini", team: "Italy", confirmed: true, pcsSlug: "eleonora-gasparrini", scores: { mountains: 40, hills: 70, itt: 45, ttt: 50, flat: 68 } },
    { id: "longoborghini", name: "Elisa Longo Borghini", team: "Italy", confirmed: true, pcsSlug: "elisa-longo-borghini", scores: { mountains: 82, hills: 90, itt: 82, ttt: 72, flat: 35 } },
    { id: "magnaldi", name: "Erica Magnaldi", team: "Italy", confirmed: true, pcsSlug: "erica-magnaldi", scores: { mountains: 75, hills: 68, itt: 48, ttt: 48, flat: 20 } },
    { id: "persico", name: "Silvia Persico", team: "Italy", confirmed: true, pcsSlug: "silvia-persico", scores: { mountains: 70, hills: 84, itt: 55, ttt: 52, flat: 45 } },
    { id: "trincolonel", name: "Monica Trinca Colonel", team: "Italy", confirmed: true, pcsSlug: "monica-trinca-colonel", scores: { mountains: 62, hills: 70, itt: 58, ttt: 56, flat: 30 } },
    { id: "guazzini", name: "Vittoria Guazzini", team: "Italy", confirmed: true, pcsSlug: "vittoria-guazzini", scores: { mountains: 35, hills: 62, itt: 82, ttt: 78, flat: 60 } },

    // France
    { id: "gery", name: "Célia Géry", team: "France", confirmed: true, pcsSlug: "celia-gery", scores: { mountains: 55, hills: 73, itt: 48, ttt: 48, flat: 35 } },
    { id: "berthet", name: "Juliette Berthet", team: "France", confirmed: true, pcsSlug: "juliette-berthet", scores: { mountains: 65, hills: 72, itt: 68, ttt: 60, flat: 25 } },
    { id: "curinier", name: "Léa Curinier", team: "France", confirmed: true, pcsSlug: "lea-curinier", scores: { mountains: 50, hills: 66, itt: 46, ttt: 48, flat: 35 } },
    { id: "lenet", name: "Marie Le Net", team: "France", confirmed: true, pcsSlug: "marie-le-net", scores: { mountains: 40, hills: 65, itt: 55, ttt: 58, flat: 55 } },
    { id: "muzic", name: "Evita Muzic", team: "France", confirmed: true, pcsSlug: "evita-muzic", scores: { mountains: 82, hills: 80, itt: 50, ttt: 50, flat: 20 } },
    { id: "kerbaol", name: "Cédrine Kerbaol", team: "France", confirmed: true, pcsSlug: "cedrine-kerbaol", scores: { mountains: 72, hills: 82, itt: 78, ttt: 68, flat: 28 } },
    { id: "squiban", name: "Maëva Squiban", team: "France", confirmed: true, pcsSlug: "maeva-squiban", scores: { mountains: 78, hills: 80, itt: 58, ttt: 55, flat: 22 } },

    // Spain
    { id: "mavigarcia", name: "Mavi García", team: "Spain", confirmed: true, pcsSlug: "mavi-garcia", scores: { mountains: 84, hills: 85, itt: 58, ttt: 55, flat: 20 } },
    { id: "blasi", name: "Paula Blasi", team: "Spain", confirmed: true, pcsSlug: "paula-blasi", scores: { mountains: 55, hills: 66, itt: 73, ttt: 64, flat: 30 } },
    { id: "mbenito", name: "Mireia Benito", team: "Spain", confirmed: true, pcsSlug: "mireia-benito", scores: { mountains: 48, hills: 62, itt: 72, ttt: 64, flat: 32 } },
    { id: "smartin", name: "Sara Martín", team: "Spain", confirmed: true, pcsSlug: "sara-martin", scores: { mountains: 65, hills: 72, itt: 52, ttt: 52, flat: 30 } },
    { id: "ostolaza", name: "Usoa Ostolaza", team: "Spain", confirmed: true, pcsSlug: "usoa-ostolaza", scores: { mountains: 70, hills: 70, itt: 48, ttt: 48, flat: 22 } },
    { id: "salonso", name: "Sandra Alonso", team: "Spain", confirmed: true, pcsSlug: "sandra-alonso", scores: { mountains: 48, hills: 65, itt: 55, ttt: 54, flat: 48 } },

    // United States
    { id: "arlandson", name: "Grace Arlandson", team: "United States", confirmed: true, pcsSlug: "grace-arlandson", scores: { mountains: 55, hills: 66, itt: 45, ttt: 45, flat: 35 } },
    { id: "kcourtney", name: "Kate Courtney", team: "United States", confirmed: true, pcsSlug: "kate-courtney", scores: { mountains: 70, hills: 78, itt: 48, ttt: 45, flat: 25 } },
    { id: "faulkner", name: "Kristen Faulkner", team: "United States", confirmed: true, pcsSlug: "kristen-faulkner", scores: { mountains: 60, hills: 82, itt: 86, ttt: 75, flat: 65 } },
    { id: "knibb", name: "Taylor Knibb", team: "United States", confirmed: true, pcsSlug: "taylor-knibb", scores: { mountains: 45, hills: 55, itt: 83, ttt: 70, flat: 35 } },
    { id: "magner", name: "Alexis Magner", team: "United States", confirmed: true, pcsSlug: "alexis-magner", scores: { mountains: 40, hills: 62, itt: 48, ttt: 50, flat: 55 } },
    { id: "nquinn", name: "Natalie Quinn", team: "United States", confirmed: true, pcsSlug: "natalie-quinn", scores: { mountains: 58, hills: 68, itt: 48, ttt: 48, flat: 32 } },
    { id: "lstephens", name: "Lauren Stephens", team: "United States", confirmed: true, pcsSlug: "lauren-stephens", scores: { mountains: 55, hills: 72, itt: 58, ttt: 55, flat: 42 } },

    // Canada
    { id: "anormand", name: "Adèle Normand", team: "Canada", confirmed: true, pcsSlug: "adele-normand", scores: { mountains: 55, hills: 68, itt: 48, ttt: 48, flat: 35 } },
    { id: "ajackson", name: "Alison Jackson", team: "Canada", confirmed: true, pcsSlug: "alison-jackson", scores: { mountains: 35, hills: 68, itt: 48, ttt: 52, flat: 70 } },
    { id: "vallieres", name: "Magdeleine Vallières Mill", team: "Canada", confirmed: true, pcsSlug: "magdeleine-vallieres", scores: { mountains: 68, hills: 78, itt: 52, ttt: 52, flat: 35 } },
    { id: "coleslyster", name: "Maggie Coles-Lyster", team: "Canada", confirmed: true, pcsSlug: "maggie-coles-lyster", scores: { mountains: 30, hills: 58, itt: 45, ttt: 48, flat: 72 } },
    { id: "gontova", name: "Nadia Gontova", team: "Canada", confirmed: true, pcsSlug: "nadia-gontova", scores: { mountains: 62, hills: 70, itt: 68, ttt: 60, flat: 30 } },
    { id: "obaril", name: "Olivia Baril", team: "Canada", confirmed: true, pcsSlug: "olivia-baril", scores: { mountains: 72, hills: 78, itt: 52, ttt: 50, flat: 28 } },
    { id: "svandam", name: "Sarah Van Dam", team: "Canada", confirmed: true, pcsSlug: "sarah-van-dam", scores: { mountains: 42, hills: 64, itt: 50, ttt: 55, flat: 60 } },

    // Belgium
    { id: "bossuyt", name: "Shari Bossuyt", team: "Belgium", confirmed: true, pcsSlug: "shari-bossuyt", scores: { mountains: 35, hills: 70, itt: 48, ttt: 52, flat: 75 } },
    { id: "lclaes", name: "Lotte Claes", team: "Belgium", confirmed: true, pcsSlug: "lotte-claes", scores: { mountains: 58, hills: 68, itt: 70, ttt: 62, flat: 35 } },
    { id: "kopecky", name: "Lotte Kopecky", team: "Belgium", confirmed: true, pcsSlug: "lotte-kopecky", scores: { mountains: 62, hills: 94, itt: 80, ttt: 72, flat: 88 } },
    { id: "stas", name: "Sandrine Tas", team: "Belgium", confirmed: true, pcsSlug: "sandrine-tas", scores: { mountains: 35, hills: 62, itt: 48, ttt: 50, flat: 62 } },
    { id: "vandervelde", name: "Julie Van de Velde", team: "Belgium", confirmed: true, pcsSlug: "julie-van-de-velde", scores: { mountains: 60, hills: 70, itt: 52, ttt: 52, flat: 30 } },
    { id: "vanpachtenbeke", name: "Margot Vanpachtenbeke", team: "Belgium", confirmed: true, pcsSlug: "margot-vanpachtenbeke", scores: { mountains: 58, hills: 69, itt: 48, ttt: 48, flat: 32 } },

    // Slovenia
    { id: "zigart", name: "Urška Žigart", team: "Slovenia", confirmed: true, pcsSlug: "urska-zigart", scores: { mountains: 75, hills: 73, itt: 62, ttt: 56, flat: 22 } },
    { id: "bobnar", name: "Nika Bobnar", team: "Slovenia", confirmed: true, pcsSlug: "nika-bobnar", scores: { mountains: 50, hills: 62, itt: 66, ttt: 58, flat: 30 } },

    // Australia
    { id: "gigante", name: "Sarah Gigante", team: "Australia", confirmed: true, pcsSlug: "sarah-gigante", scores: { mountains: 90, hills: 84, itt: 82, ttt: 70, flat: 20 } },
    { id: "spratt", name: "Amanda Spratt", team: "Australia", confirmed: true, pcsSlug: "amanda-spratt", scores: { mountains: 76, hills: 82, itt: 48, ttt: 48, flat: 28 } },
    { id: "gbaker", name: "Georgia Baker", team: "Australia", confirmed: true, pcsSlug: "georgia-baker", scores: { mountains: 35, hills: 65, itt: 55, ttt: 60, flat: 72 } },
    { id: "hanson", name: "Lauretta Hanson", team: "Australia", confirmed: true, pcsSlug: "lauretta-hanson", scores: { mountains: 42, hills: 65, itt: 48, ttt: 52, flat: 56 } },

    // New Zealand
    { id: "macgregor", name: "Bronwyn MacGregor", team: "New Zealand", confirmed: true, pcsSlug: "bronwyn-macgregor", scores: { mountains: 48, hills: 62, itt: 48, ttt: 48, flat: 40 } },
    { id: "wyllie", name: "Ella Wyllie", team: "New Zealand", confirmed: true, pcsSlug: "ella-wyllie", scores: { mountains: 72, hills: 76, itt: 58, ttt: 55, flat: 28 } },
    { id: "christie", name: "Henrietta Christie", team: "New Zealand", confirmed: true, pcsSlug: "henrietta-christie", scores: { mountains: 68, hills: 70, itt: 55, ttt: 54, flat: 25 } },
    { id: "nfisherblack", name: "Niamh Fisher-Black", team: "New Zealand", confirmed: true, pcsSlug: "niamh-fisher-black", scores: { mountains: 84, hills: 82, itt: 58, ttt: 55, flat: 22 } },
  ],
};


// ---------------------------------------------------------------------------
// v98 startlist reconciliation
// ---------------------------------------------------------------------------
// The race objects above keep the hand-curated rider metadata (stable IDs,
// ProCyclingStats slugs and performance scores).  The current event startlists
// are maintained separately and reconciled here so the road race and ITT can
// have different fields without losing existing user pick IDs.

function normaliseRiderName(value = "") {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function riderIdFromName(name, team, usedIds) {
  const base = name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "rider";
  if (!usedIds.has(base)) return base;
  const country = String(team || "nat")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  let candidate = `${base}-${country || "nat"}`;
  let i = 2;
  while (usedIds.has(candidate)) candidate = `${base}-${country || "nat"}-${i++}`;
  return candidate;
}

function reconcileEventStartlists(race, roadEntries, ittEntries) {
  const byName = new Map(race.riders.map((rider) => [normaliseRiderName(rider.name), rider]));
  const usedIds = new Set(race.riders.map((rider) => String(rider.id)));

  function ensureRider(entry) {
    const key = normaliseRiderName(entry.name);
    let rider = byName.get(key);
    if (!rider) {
      const id = riderIdFromName(entry.name, entry.team, usedIds);
      rider = {
        id,
        name: entry.name,
        team: entry.team,
        confirmed: true,
        scores: {},
      };
      race.riders.push(rider);
      byName.set(key, rider);
      usedIds.add(id);
    } else {
      // Keep the stable ID and rich metadata already used by the game, while
      // refreshing the national team/name spelling from the current startlist.
      rider.name = entry.name;
      rider.team = entry.team;
      rider.confirmed = true;
    }
    return String(rider.id);
  }

  const roadIds = [...new Set(roadEntries.map(ensureRider))];
  const ittIds = [...new Set(ittEntries.map(ensureRider))];
  const roadStage = race.stages.find((stage) => stage.type !== "itt" && stage.type !== "ttt");
  const ittStage = race.stages.find((stage) => stage.type === "itt");
  if (roadStage) roadStage.eligibleRiderIds = roadIds;
  if (ittStage) ittStage.eligibleRiderIds = ittIds;

  const currentTeams = [...new Set([...roadEntries, ...ittEntries].map((entry) => entry.team))]
    .sort((a, b) => a.localeCompare(b));
  race.teams = currentTeams;
  race.officialTeams = currentTeams;
  race.startlistStatus = "provisional";
  race.startlistUpdated = "2026-09-15";
}

reconcileEventStartlists(WORLDS_2026_MEN, MEN_ROAD_STARTLIST, MEN_ITT_STARTLIST);
reconcileEventStartlists(WORLDS_2026_WOMEN, WOMEN_ROAD_STARTLIST, WOMEN_ITT_STARTLIST);
