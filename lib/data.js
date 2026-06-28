// lib/data.js
// Real route data for the 2026 Tour de France (source: letour.fr / specialist press).
// Elevation gain (elevationGain): stages 3, 9, 14, 18, 19 and 20 use figures explicitly
// stated by specialist route-guide sites that say they cross-referenced ASO's official
// technical guide. The rest are reasonable estimates based on stage type and the named
// climbs -- still worth confirming against letour.fr's own stage pages once you have
// a moment (I could not fetch letour.fr directly in this session; cyclingstage.com below
// is the closest verified, detailed substitute).
// startTime (local 24h time at the stage location) is mostly an ESTIMATE based on typical
// Tour de France start times for each stage type -- only stage 1 (confirmed: first team
// rolls off at 17:05) is exact. ASO publishes the real hour-by-hour schedule ("horaires")
// roughly a month before the race; update these once that's out. Predictions lock 1 hour
// before this time.
// officialUrl points to a detailed third-party stage page (cyclingstage.com) which is
// reliably reachable; swap it for the official letour.fr stage URL once you've
// confirmed that page works for every stage.
// The rider list is a SAMPLE: replace it with the official squad list and real
// bookmaker odds once confirmed, a few days before the Grand Depart (4 July 2026).
// pcsSlug is a best-effort guess at the rider's ProCyclingStats URL slug -- double
// check each one, PCS slugs sometimes differ (middle names, accents, etc.).

export const STAGES = [
  { n: 1, date: "2026-07-04", startTime: "17:05", from: "Barcelona", to: "Barcelona", km: 19.6, type: "ttt", label: "Team time trial", elevationGain: 231, profileScore: 20, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-1-tdf-2026/" , preview: "Stage 1 opens with a team time trial along Barcelona's seafront, passing right by the Sagrada Familia on flat, fast avenues. The calm won't last: the final stretch climbs twice up to the Olympic Stadium at Montjuic, forcing the overall favourites to show their hand on day one." , previewEs: "La etapa 1 empieza con una contrarreloj por equipos junto al mar en Barcelona, pasando justo al lado de la Sagrada Familia por avenidas llanas y rapidas. La calma no durara: el tramo final sube dos veces hasta el Estadio Olimpico de Montjuic, obligando a los favoritos a la general a mostrar sus cartas el primer dia." },
  { n: 2, date: "2026-07-05", startTime: "13:00", from: "Tarragona", to: "Barcelona", km: 168.5, type: "hills", label: "Hilly", elevationGain: 2391, profileScore: 134, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-2-tdf-2026/" , preview: "From Tarragona, a UNESCO World Heritage city, the route hugs the coast past Sitges before turning inland and tougher from Begues onward. The finish is a Barcelona circuit with three climbs of Montjuic castle (1.6 km at 13%) -- the same uphill finish as the day before." , previewEs: "Desde Tarragona, ciudad Patrimonio de la Humanidad, la ruta sigue la costa pasando por Sitges antes de girar hacia el interior y endurecerse desde Begues. La llegada es un circuito en Barcelona con tres subidas al castillo de Montjuic (1,6 km al 13%) -- la misma llegada en alto que el dia anterior." },
  { n: 3, date: "2026-07-06", startTime: "12:15", from: "Granollers", to: "Les Angles", km: 195.9, type: "mountains", label: "Mountain", elevationGain: 3906, profileScore: 151, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-3-tdf-2026/" , preview: "Granollers sends the riders north toward the French border for one last big Catalan crowd. Despite nearly 3,900 m of climbing and the Col de Toses, the plateau near Font-Romeu and the short climb into Les Angles (1.7 km at 7%) could open the door for a breakaway surprise." , previewEs: "Desde Granollers, los corredores se dirigen hacia el norte, a la frontera francesa, para la ultima gran multitud catalana. A pesar de casi 3.900 m de desnivel y el Col de Toses, la meseta cerca de Font-Romeu y la corta subida hasta Les Angles (1,7 km al 7%) podrian abrir la puerta a una sorpresa desde la fuga." },
  { n: 4, date: "2026-07-07", startTime: "12:45", from: "Carcassonne", to: "Foix", km: 181.9, type: "hills", label: "Hilly", elevationGain: 3259, profileScore: 187, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-4-tdf-2026/" , preview: "The route crosses Cathar country into the Ariege hills, setting up a likely tug-of-war between breakaway riders and the toughest sprinters. The Col de Montsegur, 34 km from the line, should already separate the contenders before the finish at the foot of Foix castle." , previewEs: "La ruta cruza el pais cataro hacia las colinas del Ariege, preparando un probable tira y afloja entre los fugados y los esprinters mas resistentes. El Col de Montsegur, a 34 km de la meta, ya deberia separar a los aspirantes antes de la llegada a los pies del castillo de Foix." },
  { n: 5, date: "2026-07-08", startTime: "13:15", from: "Lannemezan", to: "Pau", km: 158.3, type: "flat", label: "Flat / sprint", elevationGain: 1883, profileScore: 44, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-5-tdf-2026/" , preview: "A rare event this deep into a Tour: a stage with no major climbs at all, giving the fast men their first real shot at a bunch sprint in Place de Verdun. Expect the GC teams to keep any breakaway on a tight leash." , previewEs: "Un hecho raro tan avanzado el Tour: una etapa sin ninguna subida importante, dando a los rapidos su primera oportunidad real de un esprint masivo en la Place de Verdun. Los equipos de la general deberian mantener controlada cualquier fuga." },
  { n: 6, date: "2026-07-09", startTime: "12:00", from: "Pau", to: "Gavarnie-Gedre", km: 186.2, type: "mountains", label: "Mountain", elevationGain: 3978, profileScore: 384, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-6-tdf-2026/" , preview: "The most selective Pyrenean stage of the race mixes the classic with the new. If the favourites attack early on the Col d'Aspin and the Tourmalet, this is where real time could be lost. If not, it's down to the climbers in the breakaway on the long, gentle run-in (18.7 km at 4%) to the Cirque de Gavarnie." , previewEs: "La etapa pirenaica mas selectiva de la carrera combina lo clasico con lo nuevo. Si los favoritos atacan pronto en el Col d'Aspin y el Tourmalet, aqui es donde se podria perder tiempo de verdad. Si no, todo se decidira entre los escaladores de la fuga en la larga pero suave subida final (18,7 km al 4%) hasta el Cirque de Gavarnie." },
  { n: 7, date: "2026-07-10", startTime: "13:15", from: "Hagetmau", to: "Bordeaux", km: 175.1, type: "flat", label: "Flat / sprint", elevationGain: 2053, profileScore: 21, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-7-tdf-2026/" , preview: "Crossing the Landes forest leaves little room for a breakaway to survive against the sprint trains. Expect a fast, clean finish on the banks of the Garonne at Place des Quinconces -- a Bordeaux classic." , previewEs: "Cruzar el bosque de las Landas deja poco margen para que una fuga aguante contra los trenes de esprint. Se espera una llegada rapida y limpia a orillas del Garona, en la Place des Quinconces -- una clasica de Burdeos." },
  { n: 8, date: "2026-07-11", startTime: "13:15", from: "Perigueux", to: "Bergerac", km: 180.4, type: "flat", label: "Flat / sprint", elevationGain: 1346, profileScore: 65, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-8-tdf-2026/" , preview: "A detour through the Dordogne, past the Lascaux caves and the town of Sarlat, without changing the day's character much. With only 1,150 m of climbing, this is another shot for the sprinters beaten in Bordeaux, and another day in the fight for green." , previewEs: "Un desvio por el Dordoña, pasando por las cuevas de Lascaux y la localidad de Sarlat, sin cambiar mucho el caracter del dia. Con solo 1.150 m de desnivel, es otra oportunidad para los esprinters batidos en Burdeos, y otro dia en la lucha por el maillot verde." },
  { n: 9, date: "2026-07-12", startTime: "12:45", from: "Malemort", to: "Ussel", km: 185.5, type: "hills", label: "Hilly", elevationGain: 2427, profileScore: 121, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-9-tdf-2026/" , preview: "Getting into a breakaway here will come at a price: 3,300 m of climbing through the Correze. The irregular ascent to Suc-au-May and the attack on Mont Bessou should do the sorting, leaving 25 rolling kilometres into Ussel for whoever survives." , previewEs: "Meterse en la fuga aqui tendra un precio: 3.300 m de desnivel por la Correze. La irregular subida hasta Suc-au-May y el ataque en el Mont Bessou haran la seleccion, dejando 25 km ondulados hasta Ussel para quien sobreviva." },
  { n: 10, date: "2026-07-14", startTime: "12:15", from: "Aurillac", to: "Le Lioran", km: 166.6, type: "mountains", label: "Mountain (summit finish)", elevationGain: 2990, profileScore: 246, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-10-tdf-2026/" , preview: "Climbers have history in the Cantal, and this year's route adds the new Col de la Griffoul before the Pas de Peyrol, approached from Murat. The Col de Pertus is steep enough to shed the rest of the field, setting up a tight finish at the Le Lioran ski station." , previewEs: "Los escaladores tienen historia en el Cantal, y la ruta de este año añade la nueva subida del Col de la Griffoul antes del Pas de Peyrol, abordado desde Murat. El Col de Pertus es lo bastante duro para deshacerse del resto del peloton, preparando una llegada ajustada en la estacion de esqui de Le Lioran." },
  { n: 11, date: "2026-07-15", startTime: "13:15", from: "Vichy", to: "Nevers", km: 161.3, type: "flat", label: "Flat / sprint", elevationGain: 653, profileScore: 12, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-11-tdf-2026/" , preview: "The sprinters get their day back, even if breakaway riders rarely have the numbers on their side over this kind of terrain crossing the Allier and Nievre rivers. A lucky combination heading into Nevers is still worth trying." , previewEs: "Los esprinters recuperan su dia, aunque los fugados rara vez tienen los numeros a favor en un terreno asi, cruzando los rios Allier y Nievre. Una combinacion de suerte de cara a Nevers todavia vale la pena intentarla." },
  { n: 12, date: "2026-07-16", startTime: "13:15", from: "Magny-Cours", to: "Chalon-sur-Saone", km: 179.1, type: "flat", label: "Flat / sprint", elevationGain: 1555, profileScore: 39, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-12-tdf-2026/" , preview: "Past Decize, Montceau-les-Mines and the southern Morvan, the short climb at Montagny-les-Buxy (2.6 km at 4.3%) is unlikely to be enough for any escapees to survive the sprint teams' chase into the vineyards around Chalon." , previewEs: "Tras pasar Decize, Montceau-les-Mines y el sur del Morvan, la corta subida de Montagny-les-Buxy (2,6 km al 4,3%) probablemente no baste para que ningun escapado sobreviva a la persecucion de los equipos esprinter entre los viñedos de Chalon." },
  { n: 13, date: "2026-07-17", startTime: "12:00", from: "Dole", to: "Belfort", km: 205.8, type: "hills", label: "Hilly", elevationGain: 2373, profileScore: 58, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-13-tdf-2026/" , preview: "The longest stage of the race at just over 200 km, with an unusual profile that should favour adventurous riders -- though the breakaway may take a while to form. The real finish line drama plays out on the Ballon d'Alsace into Belfort." , previewEs: "La etapa mas larga de la carrera, con poco mas de 200 km, y un perfil atipico que deberia favorecer a los aventureros, aunque la fuga puede tardar en formarse. El verdadero drama de la llegada se juega en el Ballon d'Alsace, camino de Belfort." },
  { n: 14, date: "2026-07-18", startTime: "12:30", from: "Mulhouse", to: "Le Markstein", km: 155.3, type: "mountains", label: "Mountain", elevationGain: 4602, profileScore: 313, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-14-tdf-2026/" , preview: "Out of Mulhouse and straight up the Grand Ballon, this stage's real secret is the new climb to La Hoye -- a converted forest cycle path, 11.2 km at an irregular 7.3% -- with six kilometres still to go to Le Markstein after that." , previewEs: "Saliendo de Mulhouse y subiendo directamente el Grand Ballon, el verdadero secreto de esta etapa es la nueva subida hasta La Hoye -- un antiguo camino forestal reconvertido, 11,2 km a un irregular 7,3% -- con seis kilometros todavia por delante hasta Le Markstein." },
  { n: 15, date: "2026-07-19", startTime: "12:00", from: "Champagnole", to: "Plateau de Solaison", km: 183.9, type: "mountains", label: "Mountain (summit finish)", elevationGain: 4701, profileScore: 428, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-15-tdf-2026/" , preview: "A genuine GC-shaping mountain stage. It opens with the brutal Col de la Croisette on the Saleve (nearly 5 km at 11.2%) and finishes on a narrow road through the villages of the Bornes massif up to the Plateau de Solaison (11.3 km at 9.1%) -- a real launchpad for the overall standings." , previewEs: "Una autentica etapa de montaña que puede marcar la general. Empieza con la brutal subida del Col de la Croisette en el Saleve (casi 5 km al 11,2%) y termina por una carretera estrecha entre los pueblos del macizo de Bornes hasta el Plateau de Solaison (11,3 km al 9,1%) -- un verdadero trampolin hacia la clasificacion general." },
  { n: 16, date: "2026-07-21", startTime: "12:30", from: "Evian-les-Bains", to: "Thonon-les-Bains", km: 26.1, type: "itt", label: "Individual time trial", elevationGain: 465, profileScore: 40, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-16-tdf-2026/" , preview: "The Tour's only individual time trial, looping around Lake Geneva between Evian and Thonon. The profile is roughly a third climbing, a third descending and a third flat -- a tricky mix that rewards only the most complete riders." , previewEs: "La unica contrarreloj individual del Tour, dando la vuelta al lago Leman entre Evian y Thonon. El perfil es aproximadamente un tercio de subida, un tercio de bajada y un tercio llano -- una mezcla complicada que solo recompensa a los corredores mas completos." },
  { n: 17, date: "2026-07-22", startTime: "13:15", from: "Chambery", to: "Voiron", km: 174.7, type: "flat", label: "Flat / sprint", elevationGain: 2361, profileScore: 67, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-17-tdf-2026/" , preview: "Third-week sprinters need to survive the modest but persistent climbs through the Bauges massif and the Chartreuse before they can show what they've got left in Voiron." , previewEs: "Los esprinters de la tercera semana necesitan sobrevivir a las modestas pero constantes subidas por el macizo de Bauges y la Chartreuse antes de poder demostrar lo que les queda en Voiron." },
  { n: 18, date: "2026-07-23", startTime: "12:15", from: "Voiron", to: "Orcieres-Merlette", km: 185.2, type: "mountains", label: "Mountain (summit finish)", elevationGain: 3950, profileScore: 234, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-18-tdf-2026/" , preview: "With the final standings still far from settled, this is a day for climbers who've lost time but kept their legs, looking for the stage win that's eluded them so far on the climb to Orcieres-Merlette." , previewEs: "Con la clasificacion final todavia lejos de decidirse, es un dia para los escaladores que han perdido tiempo pero conservan piernas, buscando la victoria de etapa que se les ha escapado hasta ahora en la subida a Orcieres-Merlette." },
  { n: 19, date: "2026-07-24", startTime: "13:00", from: "Gap", to: "Alpe d'Huez", km: 127.9, type: "mountains", label: "Mountain (summit finish)", elevationGain: 3605, profileScore: 341, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-19-tdf-2026/" , preview: "Alpe d'Huez shows a side nobody has seen before. An explosive early move over the Col Bayard could set the tone, before the Col du Noyer and Col d'Ornon test who can hold their position ahead of the legendary 21 hairpin bends." , previewEs: "Alpe d'Huez muestra una cara que nadie ha visto antes. Un movimiento explosivo y temprano en el Col Bayard podria marcar el tono, antes de que el Col du Noyer y el Col d'Ornon comprueben quien puede mantener su posicion ante las legendarias 21 curvas." },
  { n: 20, date: "2026-07-25", startTime: "12:00", from: "Bourg-d'Oisans", to: "Alpe d'Huez", km: 170.9, type: "mountains", label: "Mountain (Queen stage)", elevationGain: 5601, profileScore: 416, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-20-tdf-2026/" , preview: "The biggest mountain stage of this Tour, with 5,600 m of climbing across the Col de la Croix de Fer, the Telegraphe and the Galibier -- the roof of the Tour -- before a final climb to Alpe d'Huez via the Col de Sarenne, a road barely used by the race before now." , previewEs: "La mayor etapa de montaña de este Tour, con 5.600 m de desnivel repartidos entre el Col de la Croix de Fer, el Telegraphe y el Galibier -- el techo del Tour -- antes de una subida final a Alpe d'Huez por el Col de Sarenne, una carretera apenas utilizada por la carrera hasta ahora." },
  { n: 21, date: "2026-07-26", startTime: "16:00", from: "Thoiry", to: "Paris", km: 133.0, type: "flat", label: "Flat / sprint (Paris)", elevationGain: 1978, profileScore: 72, officialUrl: "https://www.cyclingstage.com/tour-de-france-2026-route/stage-21-tdf-2026/" , preview: "The finish that decided the 2025 Tour returns for an encore: three laps of the Butte Montmartre before the Champs-Elysees, this time finishing 15 km on from the Sacre-Coeur. The strongest sprinters will still fancy their chances." , previewEs: "La llegada que decidio el Tour de 2025 vuelve para repetir: tres vueltas a la Butte Montmartre antes de los Campos Eliseos, esta vez terminando 15 km mas adelante del Sacre-Coeur. Los esprinters mas fuertes todavia tendran su oportunidad." },
];

export const REST_DAYS = ["2026-07-13", "2026-07-20"];

// Single source of truth for stage-type colours and labels -- used by
// StageProfile, StageTypeIcon callers, RouteTrack, TeamRiderPicker and the
// predictions page, so they never drift out of sync with each other.
export const TYPE_COLOR = {
  mountains: "#d6432f",
  hills: "#b8860b",
  flat: "#1f8a4c",
  itt: "#3a3fae",
  ttt: "#3a3fae",
};

export const TYPE_LABEL = {
  mountains: "Mountain",
  hills: "Hilly",
  flat: "Flat / sprint",
  itt: "Individual TT",
  ttt: "Team TT",
};

export const WEEKS = [
  { from: 1, to: 9, title: "Week 1 — Spain & the Pyrenees", subtitle: "Barcelona Grand Depart through the first mountain test" },
  { from: 10, to: 15, title: "Week 2 — Massif Central, Jura & Vosges", subtitle: "Bastille Day summit, the longest stage, and a brand new Alpine finish" },
  { from: 16, to: 21, title: "Week 3 — The Alps & Paris", subtitle: "One time trial, three Alpine summits, and the Montmartre finale" },
];

// Riders for the 2026 Tour de France. Sourced from:
// 1) The 23 official confirmed TEAMS (Wikipedia "List of teams and cyclists in the
//    2026 Tour de France", citing ASO's 30 Jan 2026 announcement) -- these team names
//    are accurate.
// 2) Individual riders marked confirmed: true appeared by name on ProCyclingStats'
//    2026 Tour startlist / "top competitors" pages at the time of writing.
// 3) Individual riders marked confirmed: false are NOT yet confirmed for the 2026 Tour
//    specifically -- they're included because they rode for that same team in 2025 and
//    are plausible picks, but you should double check closer to race day (ASO/teams
//    usually confirm full 8-rider rosters 1-2 weeks before the start).
// "scores" (0-100 favouritism per stage type) are still estimates -- swap for real
// bookmaker odds per stage once available. pcsSlug is a best-effort guess, verify it.
export const RIDERS = [
  { id: "benoot", birthYear: 1992, name: "Tiesj Benoot", team: "Decathlon CMA CGM Team", confirmed: true, pcsSlug: "tiesj-benoot", scores: { mountains: 15, hills: 60, itt: 30, ttt: 50, flat: 20 } },
  { id: "bissegger", birthYear: 1998, name: "Stefan Bissegger", team: "Decathlon CMA CGM Team", confirmed: true, pcsSlug: "stefan-bissegger", scores: { mountains: 5, hills: 20, itt: 75, ttt: 70, flat: 10 } },
  { id: "hoole", birthYear: 1999, name: "Daan Hoole", team: "Decathlon CMA CGM Team", confirmed: true, pcsSlug: "daan-hoole", scores: { mountains: 30, hills: 30, itt: 55, ttt: 55, flat: 5 } },
  { id: "aparetpeintre", birthYear: 1998, name: "Aurelien Paret-Peintre", team: "Decathlon CMA CGM Team", confirmed: true, pcsSlug: "aurelien-paret-peintre", scores: { mountains: 50, hills: 40, itt: 25, ttt: 40, flat: 2 } },
  { id: "prodhomme", birthYear: 1995, name: "Nicolas Prodhomme", team: "Decathlon CMA CGM Team", confirmed: true, pcsSlug: "nicolas-prodhomme", scores: { mountains: 35, hills: 30, itt: 20, ttt: 40, flat: 2 } },
  { id: "riccitello", birthYear: 2002, name: "Matthew Riccitello", team: "Decathlon CMA CGM Team", confirmed: true, pcsSlug: "matthew-riccitello", scores: { mountains: 40, hills: 30, itt: 25, ttt: 40, flat: 2 } },
  { id: "seixas", birthYear: 2006, name: "Paul Seixas", team: "Decathlon CMA CGM Team", confirmed: true, pcsSlug: "paul-seixas", scores: { mountains: 55, hills: 60, itt: 40, ttt: 45, flat: 5 } },
  { id: "cattaneo", birthYear: 1993, name: "Mattia Cattaneo", team: "Red Bull - BORA Hansgrohe", confirmed: true, pcsSlug: "mattia-cattaneo", scores: { mountains: 10, hills: 25, itt: 55, ttt: 55, flat: 8 } },
  { id: "evenepoel", birthYear: 1999, name: "Remco Evenepoel", team: "Red Bull - BORA Hansgrohe", confirmed: true, pcsSlug: "remco-evenepoel", scores: { mountains: 75, hills: 78, itt: 96, ttt: 80, flat: 5 } },
  { id: "vangils", birthYear: 1999, name: "Maxim Van Gils", team: "Red Bull - BORA Hansgrohe", confirmed: true, pcsSlug: "maxim-van-gils", scores: { mountains: 10, hills: 55, itt: 25, ttt: 45, flat: 25 } },
  { id: "hindley", birthYear: 1996, name: "Jai Hindley", team: "Red Bull - BORA Hansgrohe", confirmed: true, pcsSlug: "jai-hindley", scores: { mountains: 70, hills: 45, itt: 35, ttt: 40, flat: 2 } },
  { id: "lipowitz", birthYear: 2000, name: "Florian Lipowitz", team: "Red Bull - BORA Hansgrohe", confirmed: true, pcsSlug: "florian-lipowitz", scores: { mountains: 74, hills: 50, itt: 55, ttt: 55, flat: 2 } },
  { id: "lmartinez", birthYear: 2003, name: "Lenny Martinez", team: "Bahrain Victorious", confirmed: true, pcsSlug: "lenny-martinez", scores: { mountains: 50, hills: 40, itt: 25, ttt: 35, flat: 2 } },
  { id: "mohoric", birthYear: 1994, name: "Matej Mohoric", team: "Bahrain Victorious", confirmed: true, pcsSlug: "matej-mohoric", scores: { mountains: 20, hills: 58, itt: 35, ttt: 45, flat: 25 } },
  { id: "tiberi", birthYear: 2001, name: "Antonio Tiberi", team: "Bahrain Victorious", confirmed: true, pcsSlug: "antonio-tiberi", scores: { mountains: 54, hills: 35, itt: 45, ttt: 40, flat: 2 } },
  { id: "abrahamsen", birthYear: 1999, name: "Jonas Abrahamsen", team: "Uno-X Mobility", confirmed: true, pcsSlug: "jonas-abrahamsen", scores: { mountains: 1, hills: 20, itt: 8, ttt: 35, flat: 60 } },
  { id: "charmig", birthYear: 2001, name: "Anthon Charmig", team: "Uno-X Mobility", confirmed: true, pcsSlug: "anthon-charmig", scores: { mountains: 10, hills: 25, itt: 15, ttt: 35, flat: 15 } },
  { id: "cort", birthYear: 1993, name: "Magnus Cort", team: "Uno-X Mobility", confirmed: true, pcsSlug: "magnus-cort", scores: { mountains: 2, hills: 30, itt: 10, ttt: 40, flat: 55 } },
  { id: "johannessen", birthYear: 1999, name: "Tobias Johannessen", team: "Uno-X Mobility", confirmed: true, pcsSlug: "tobias-johannessen", scores: { mountains: 40, hills: 35, itt: 20, ttt: 40, flat: 5 } },
  { id: "skaarseth", birthYear: 2000, name: "Anders Skaarseth", team: "Uno-X Mobility", confirmed: true, pcsSlug: "anders-skaarseth", scores: { mountains: 25, hills: 25, itt: 15, ttt: 35, flat: 5 } },
  { id: "traen", birthYear: 1995, name: "Torstein Traeen", team: "Uno-X Mobility", confirmed: true, pcsSlug: "torstein-traeen", scores: { mountains: 10, hills: 20, itt: 40, ttt: 45, flat: 10 } },
  { id: "warenskjold", birthYear: 2000, name: "Soren Waerenskjold", team: "Uno-X Mobility", confirmed: true, pcsSlug: "soren-waerenskjold", scores: { mountains: 2, hills: 25, itt: 15, ttt: 40, flat: 50 } },
  { id: "askey", birthYear: 1996, name: "Lewis Askey", team: "NSN Cycling Team", confirmed: true, pcsSlug: "lewis-askey", scores: { mountains: 2, hills: 20, itt: 10, ttt: 30, flat: 30 } },
  { id: "gbennett", birthYear: 1990, name: "George Bennett", team: "NSN Cycling Team", confirmed: true, pcsSlug: "george-bennett", scores: { mountains: 35, hills: 25, itt: 20, ttt: 35, flat: 2 } },
  { id: "girmay", birthYear: 1998, name: "Biniam Girmay", team: "NSN Cycling Team", confirmed: true, pcsSlug: "biniam-girmay", scores: { mountains: 5, hills: 35, itt: 15, ttt: 45, flat: 78 } },
  { id: "jstewart", birthYear: 1999, name: "Jake Stewart", team: "NSN Cycling Team", confirmed: true, pcsSlug: "jake-stewart", scores: { mountains: 2, hills: 25, itt: 10, ttt: 35, flat: 50 } },
  { id: "azparren", birthYear: 2001, name: "Xabier Mikel Azparren", team: "Pinarello - Q36.5 Pro Cycling Team", confirmed: true, pcsSlug: "xabier-mikel-azparren", scores: { mountains: 10, hills: 25, itt: 15, ttt: 30, flat: 10 } },
  { id: "vanmoer", birthYear: 1998, name: "Brent Van Moer", team: "Pinarello - Q36.5 Pro Cycling Team", confirmed: true, pcsSlug: "brent-van-moer", scores: { mountains: 2, hills: 25, itt: 12, ttt: 30, flat: 30 } },
  { id: "pidcock", birthYear: 1999, name: "Tom Pidcock", team: "Pinarello - Q36.5 Pro Cycling Team", confirmed: true, pcsSlug: "tom-pidcock", scores: { mountains: 45, hills: 75, itt: 50, ttt: 55, flat: 30 } },
  { id: "fwright", birthYear: 1999, name: "Fred Wright", team: "Pinarello - Q36.5 Pro Cycling Team", confirmed: true, pcsSlug: "fred-wright", scores: { mountains: 10, hills: 45, itt: 20, ttt: 35, flat: 15 } },
  { id: "skandersen", birthYear: 1990, name: "Soren Kragh Andersen", team: "Lidl Trek", confirmed: true, pcsSlug: "soren-kragh-andersen", scores: { mountains: 5, hills: 30, itt: 25, ttt: 40, flat: 20 } },
  { id: "ayuso", birthYear: 2003, name: "Juan Ayuso", team: "Lidl Trek", confirmed: true, pcsSlug: "juan-ayuso", scores: { mountains: 65, hills: 45, itt: 45, ttt: 45, flat: 2 } },
  { id: "ciccone", birthYear: 1994, name: "Giulio Ciccone", team: "Lidl Trek", confirmed: true, pcsSlug: "giulio-ciccone", scores: { mountains: 56, hills: 45, itt: 30, ttt: 40, flat: 2 } },
  { id: "pedersen", birthYear: 1995, name: "Mads Pedersen", team: "Lidl Trek", confirmed: true, pcsSlug: "mads-pedersen", scores: { mountains: 5, hills: 55, itt: 35, ttt: 65, flat: 80 } },
  { id: "qsimmons", birthYear: 2001, name: "Quinn Simmons", team: "Lidl Trek", confirmed: true, pcsSlug: "quinn-simmons", scores: { mountains: 10, hills: 35, itt: 15, ttt: 35, flat: 15 } },
  { id: "skjelmose", birthYear: 2001, name: "Mattias Skjelmose", team: "Lidl Trek", confirmed: true, pcsSlug: "mattias-skjelmose", scores: { mountains: 58, hills: 65, itt: 50, ttt: 55, flat: 5 } },
  { id: "vacek", birthYear: 2002, name: "Mathias Vacek", team: "Lidl Trek", confirmed: true, pcsSlug: "mathias-vacek", scores: { mountains: 15, hills: 30, itt: 20, ttt: 35, flat: 10 } },
  { id: "cverona", birthYear: 1991, name: "Carlos Verona", team: "Lidl Trek", confirmed: true, pcsSlug: "carlos-verona", scores: { mountains: 40, hills: 35, itt: 20, ttt: 35, flat: 2 } },
  { id: "groves", birthYear: 1998, name: "Kaden Groves", team: "Alpecin Premier Tech", confirmed: true, pcsSlug: "kaden-groves", scores: { mountains: 2, hills: 18, itt: 10, ttt: 40, flat: 55 } },
  { id: "philipsen", birthYear: 1998, name: "Jasper Philipsen", team: "Alpecin Premier Tech", confirmed: true, pcsSlug: "jasper-philipsen", scores: { mountains: 1, hills: 20, itt: 10, ttt: 60, flat: 92 } },
  { id: "vanderpoel", birthYear: 1995, name: "Mathieu van der Poel", team: "Alpecin Premier Tech", confirmed: true, pcsSlug: "mathieu-van-der-poel", scores: { mountains: 10, hills: 88, itt: 55, ttt: 75, flat: 60 } },
  { id: "rickaert", birthYear: 1994, name: "Jonas Rickaert", team: "Alpecin Premier Tech", confirmed: true, pcsSlug: "jonas-rickaert", scores: { mountains: 2, hills: 15, itt: 8, ttt: 30, flat: 30 } },
  { id: "verstrynge", birthYear: 2001, name: "Emiel Verstrynge", team: "Alpecin Premier Tech", confirmed: true, pcsSlug: "emiel-verstrynge", scores: { mountains: 2, hills: 30, itt: 15, ttt: 40, flat: 35 } },
  { id: "ackermann", birthYear: 1994, name: "Pascal Ackermann", team: "Team Jayco AlUla", confirmed: true, pcsSlug: "pascal-ackermann", scores: { mountains: 1, hills: 15, itt: 10, ttt: 35, flat: 60 } },
  { id: "mmatthews", birthYear: 1990, name: "Michael Matthews", team: "Team Jayco AlUla", confirmed: true, pcsSlug: "michael-matthews", scores: { mountains: 2, hills: 35, itt: 15, ttt: 40, flat: 50 } },
  { id: "boconnor", birthYear: 1995, name: "Ben O'Connor", team: "Team Jayco AlUla", confirmed: true, pcsSlug: "ben-oconnor", scores: { mountains: 60, hills: 35, itt: 30, ttt: 40, flat: 2 } },
  { id: "plapp", birthYear: 2000, name: "Luke Plapp", team: "Team Jayco AlUla", confirmed: true, pcsSlug: "luke-plapp", scores: { mountains: 25, hills: 25, itt: 50, ttt: 45, flat: 10 } },
  { id: "mschmid", birthYear: 1999, name: "Mauro Schmid", team: "Team Jayco AlUla", confirmed: true, pcsSlug: "mauro-schmid", scores: { mountains: 2, hills: 25, itt: 20, ttt: 35, flat: 35 } },
  { id: "amolenaar", birthYear: 2003, name: "Alex Molenaar", team: "Caja Rural Seguros RGA", confirmed: true, pcsSlug: "alex-molenaar", scores: { mountains: 25, hills: 20, itt: 15, ttt: 30, flat: 5 } },
  { id: "jnicolau", birthYear: 1999, name: "Joel Nicolau", team: "Caja Rural Seguros RGA", confirmed: true, pcsSlug: "joel-nicolau", scores: { mountains: 10, hills: 15, itt: 10, ttt: 25, flat: 10 } },
  { id: "arensman", birthYear: 1999, name: "Thymen Arensman", team: "INEOS Grenadiers", confirmed: true, pcsSlug: "thymen-arensman", scores: { mountains: 62, hills: 40, itt: 45, ttt: 50, flat: 2 } },
  { id: "ganna", birthYear: 1996, name: "Filippo Ganna", team: "INEOS Grenadiers", confirmed: true, pcsSlug: "filippo-ganna", scores: { mountains: 5, hills: 20, itt: 90, ttt: 85, flat: 15 } },
  { id: "godon", birthYear: 1997, name: "Dorian Godon", team: "INEOS Grenadiers", confirmed: true, pcsSlug: "dorian-godon", scores: { mountains: 15, hills: 35, itt: 20, ttt: 35, flat: 15 } },
  { id: "kwiatkowski", birthYear: 1990, name: "Michal Kwiatkowski", team: "INEOS Grenadiers", confirmed: true, pcsSlug: "michal-kwiatkowski", scores: { mountains: 25, hills: 50, itt: 30, ttt: 45, flat: 15 } },
  { id: "onley", birthYear: 2003, name: "Oscar Onley", team: "INEOS Grenadiers", confirmed: true, pcsSlug: "oscar-onley", scores: { mountains: 50, hills: 35, itt: 30, ttt: 40, flat: 2 } },
  { id: "rodriguez", birthYear: 2001, name: "Carlos Rodriguez", team: "INEOS Grenadiers", confirmed: true, pcsSlug: "carlos-rodriguez", scores: { mountains: 50, hills: 48, itt: 42, ttt: 50, flat: 2 } },
  { id: "vauquelin", birthYear: 2001, name: "Kevin Vauquelin", team: "INEOS Grenadiers", confirmed: true, pcsSlug: "kevin-vauquelin", scores: { mountains: 30, hills: 45, itt: 25, ttt: 40, flat: 10 } },
  { id: "asgreen", birthYear: 1995, name: "Kasper Asgreen", team: "EF Education EasyPost", confirmed: true, pcsSlug: "kasper-asgreen", scores: { mountains: 5, hills: 50, itt: 35, ttt: 55, flat: 25 } },
  { id: "abaudin", birthYear: 2001, name: "Alex Baudin", team: "EF Education EasyPost", confirmed: true, pcsSlug: "alex-baudin", scores: { mountains: 35, hills: 35, itt: 25, ttt: 40, flat: 2 } },
  { id: "carapaz", birthYear: 1992, name: "Richard Carapaz", team: "EF Education EasyPost", confirmed: true, pcsSlug: "richard-carapaz", scores: { mountains: 62, hills: 50, itt: 40, ttt: 45, flat: 2 } },
  { id: "healy", birthYear: 1999, name: "Ben Healy", team: "EF Education EasyPost", confirmed: true, pcsSlug: "ben-healy", scores: { mountains: 40, hills: 65, itt: 35, ttt: 50, flat: 15 } },
  { id: "champoussin", birthYear: 1999, name: "Clement Champoussin", team: "XDS Astana Team", confirmed: true, pcsSlug: "clement-champoussin", scores: { mountains: 35, hills: 30, itt: 20, ttt: 35, flat: 2 } },
  { id: "fortunato", birthYear: 1995, name: "Lorenzo Fortunato", team: "XDS Astana Team", confirmed: true, pcsSlug: "lorenzo-fortunato", scores: { mountains: 40, hills: 30, itt: 20, ttt: 35, flat: 2 } },
  { id: "shiguita", birthYear: 1997, name: "Sergio Higuita", team: "XDS Astana Team", confirmed: true, pcsSlug: "sergio-higuita", scores: { mountains: 45, hills: 35, itt: 20, ttt: 35, flat: 5 } },
  { id: "tejada", birthYear: 1998, name: "Harold Tejada", team: "XDS Astana Team", confirmed: true, pcsSlug: "harold-tejada", scores: { mountains: 35, hills: 25, itt: 15, ttt: 30, flat: 2 } },
  { id: "teunissen", birthYear: 1992, name: "Mike Teunissen", team: "XDS Astana Team", confirmed: true, pcsSlug: "mike-teunissen", scores: { mountains: 2, hills: 20, itt: 15, ttt: 35, flat: 35 } },
  { id: "barguil", birthYear: 1991, name: "Warren Barguil", team: "Team Picnic PostNL", confirmed: true, pcsSlug: "warren-barguil", scores: { mountains: 45, hills: 40, itt: 25, ttt: 35, flat: 2 } },
  { id: "vandenbergj", birthYear: 1996, name: "Julius van den Berg", team: "Team Picnic PostNL", confirmed: true, pcsSlug: "julius-van-den-berg", scores: { mountains: 10, hills: 20, itt: 15, ttt: 35, flat: 10 } },
  { id: "bittner", birthYear: 2001, name: "Pavel Bittner", team: "Team Picnic PostNL", confirmed: true, pcsSlug: "pavel-bittner", scores: { mountains: 2, hills: 20, itt: 10, ttt: 30, flat: 40 } },
  { id: "vandenbroek", birthYear: 1999, name: "Frank van den Broek", team: "Team Picnic PostNL", confirmed: true, pcsSlug: "frank-van-den-broek", scores: { mountains: 30, hills: 25, itt: 15, ttt: 35, flat: 5 } },
  { id: "berckmoes", birthYear: 1998, name: "Jenno Berckmoes", team: "Lotto Intermarché", confirmed: true, pcsSlug: "jenno-berckmoes", scores: { mountains: 10, hills: 25, itt: 12, ttt: 30, flat: 15 } },
  { id: "vaneetvelt", birthYear: 2001, name: "Lennert Van Eetvelt", team: "Lotto Intermarché", confirmed: true, pcsSlug: "lennert-van-eetvelt", scores: { mountains: 45, hills: 35, itt: 25, ttt: 35, flat: 2 } },
  { id: "delie", birthYear: 2001, name: "Arnaud De Lie", team: "Lotto Intermarché", confirmed: true, pcsSlug: "arnaud-de-lie", scores: { mountains: 3, hills: 30, itt: 10, ttt: 35, flat: 65 } },
  { id: "veistroffer", birthYear: 2001, name: "Baptiste Veistroffer", team: "Lotto Intermarché", confirmed: true, pcsSlug: "baptiste-veistroffer", scores: { mountains: 2, hills: 15, itt: 8, ttt: 25, flat: 25 } },
  { id: "zimmermann", birthYear: 1997, name: "Georg Zimmermann", team: "Lotto Intermarché", confirmed: true, pcsSlug: "georg-zimmermann", scores: { mountains: 30, hills: 50, itt: 25, ttt: 35, flat: 20 } },
  { id: "affini", birthYear: 1996, name: "Edoardo Affini", team: "Team Visma | Lease a Bike", confirmed: true, pcsSlug: "edoardo-affini", scores: { mountains: 3, hills: 15, itt: 70, ttt: 75, flat: 10 } },
  { id: "armirail", birthYear: 1993, name: "Bruno Armirail", team: "Team Visma | Lease a Bike", confirmed: true, pcsSlug: "bruno-armirail", scores: { mountains: 5, hills: 20, itt: 55, ttt: 65, flat: 10 } },
  { id: "campenaerts", birthYear: 1991, name: "Victor Campenaerts", team: "Team Visma | Lease a Bike", confirmed: true, pcsSlug: "victor-campenaerts", scores: { mountains: 2, hills: 15, itt: 60, ttt: 70, flat: 10 } },
  { id: "hagenes", birthYear: 2003, name: "Per Strand Hagenes", team: "Team Visma | Lease a Bike", confirmed: true, pcsSlug: "per-strand-hagenes", scores: { mountains: 25, hills: 35, itt: 30, ttt: 45, flat: 15 } },
  { id: "jorgenson", birthYear: 2000, name: "Matteo Jorgenson", team: "Team Visma | Lease a Bike", confirmed: true, pcsSlug: "matteo-jorgenson", scores: { mountains: 45, hills: 50, itt: 40, ttt: 55, flat: 10 } },
  { id: "kuss", birthYear: 1995, name: "Sepp Kuss", team: "Team Visma | Lease a Bike", confirmed: true, pcsSlug: "sepp-kuss", scores: { mountains: 58, hills: 40, itt: 35, ttt: 60, flat: 2 } },
  { id: "vingegaard", birthYear: 1996, name: "Jonas Vingegaard", team: "Team Visma | Lease a Bike", confirmed: true, pcsSlug: "jonas-vingegaard", scores: { mountains: 95, hills: 70, itt: 70, ttt: 65, flat: 3 } },
  { id: "vanbaarle", birthYear: 1992, name: "Dylan van Baarle", team: "Soudal Quick-Step", confirmed: true, pcsSlug: "dylan-van-baarle", scores: { mountains: 5, hills: 40, itt: 35, ttt: 60, flat: 30 } },
  { id: "landa", birthYear: 1989, name: "Mikel Landa", team: "Soudal Quick-Step", confirmed: true, pcsSlug: "mikel-landa", scores: { mountains: 55, hills: 35, itt: 30, ttt: 40, flat: 2 } },
  { id: "vanlerberghe", birthYear: 1996, name: "Bert Van Lerberghe", team: "Soudal Quick-Step", confirmed: true, pcsSlug: "bert-van-lerberghe", scores: { mountains: 1, hills: 10, itt: 8, ttt: 40, flat: 45 } },
  { id: "merlier", birthYear: 1992, name: "Tim Merlier", team: "Soudal Quick-Step", confirmed: true, pcsSlug: "tim-merlier", scores: { mountains: 1, hills: 15, itt: 8, ttt: 50, flat: 88 } },
  { id: "vparetpeintre", birthYear: 1999, name: "Valentin Paret-Peintre", team: "Soudal Quick-Step", confirmed: true, pcsSlug: "valentin-paret-peintre", scores: { mountains: 40, hills: 45, itt: 25, ttt: 40, flat: 5 } },
  { id: "stuyven", birthYear: 1992, name: "Jasper Stuyven", team: "Soudal Quick-Step", confirmed: true, pcsSlug: "jasper-stuyven", scores: { mountains: 5, hills: 35, itt: 25, ttt: 50, flat: 55 } },
  { id: "vervaeke", birthYear: 1991, name: "Louis Vervaeke", team: "Soudal Quick-Step", confirmed: true, pcsSlug: "louis-vervaeke", scores: { mountains: 30, hills: 30, itt: 25, ttt: 40, flat: 10 } },
  { id: "vanwilder", birthYear: 1999, name: "Ilan Van Wilder", team: "Soudal Quick-Step", confirmed: true, pcsSlug: "ilan-van-wilder", scores: { mountains: 30, hills: 35, itt: 35, ttt: 45, flat: 10 } },
  { id: "deltoro", birthYear: 2003, name: "Isaac del Toro", team: "UAE Team Emirates XRG", confirmed: true, pcsSlug: "isaac-del-toro", scores: { mountains: 68, hills: 50, itt: 45, ttt: 55, flat: 2 } },
  { id: "mcnulty", birthYear: 1999, name: "Brandon McNulty", team: "UAE Team Emirates XRG", confirmed: true, pcsSlug: "brandon-mcnulty", scores: { mountains: 30, hills: 35, itt: 65, ttt: 60, flat: 5 } },
  { id: "pogacar", birthYear: 1998, name: "Tadej Pogacar", team: "UAE Team Emirates XRG", confirmed: true, pcsSlug: "tadej-pogacar", scores: { mountains: 98, hills: 92, itt: 80, ttt: 70, flat: 5 } },
  { id: "politt", birthYear: 1994, name: "Nils Politt", team: "UAE Team Emirates XRG", confirmed: true, pcsSlug: "nils-politt", scores: { mountains: 2, hills: 35, itt: 30, ttt: 55, flat: 30 } },
  { id: "vermeersch", birthYear: 1999, name: "Florian Vermeersch", team: "UAE Team Emirates XRG", confirmed: true, pcsSlug: "florian-vermeersch", scores: { mountains: 2, hills: 30, itt: 20, ttt: 50, flat: 25 } },
  { id: "wellens", birthYear: 1991, name: "Tim Wellens", team: "UAE Team Emirates XRG", confirmed: true, pcsSlug: "tim-wellens", scores: { mountains: 15, hills: 50, itt: 20, ttt: 45, flat: 20 } },
  { id: "ayates", birthYear: 1992, name: "Adam Yates", team: "UAE Team Emirates XRG", confirmed: true, pcsSlug: "adam-yates", scores: { mountains: 60, hills: 40, itt: 30, ttt: 45, flat: 2 } },
  { id: "gaudu", birthYear: 1996, name: "David Gaudu", team: "Groupama FDJ United", confirmed: true, pcsSlug: "david-gaudu", scores: { mountains: 50, hills: 40, itt: 30, ttt: 45, flat: 2 } },
  { id: "gregoire", birthYear: 2002, name: "Romain Gregoire", team: "Groupama FDJ United", confirmed: true, pcsSlug: "romain-gregoire", scores: { mountains: 30, hills: 45, itt: 25, ttt: 40, flat: 10 } },
  { id: "madouas", birthYear: 1997, name: "Valentin Madouas", team: "Groupama FDJ United", confirmed: true, pcsSlug: "valentin-madouas", scores: { mountains: 25, hills: 40, itt: 25, ttt: 40, flat: 10 } },
  { id: "martinguyonnet", birthYear: 2000, name: "Guillaume Martin-Guyonnet", team: "Groupama FDJ United", confirmed: true, pcsSlug: "guillaume-martin-guyonnet", scores: { mountains: 10, hills: 20, itt: 15, ttt: 30, flat: 10 } },
  { id: "aranburu", birthYear: 1996, name: "Alex Aranburu", team: "Cofidis", confirmed: true, pcsSlug: "alex-aranburu", scores: { mountains: 5, hills: 45, itt: 20, ttt: 40, flat: 30 } },
  { id: "buchmann", birthYear: 1992, name: "Emanuel Buchmann", team: "Cofidis", confirmed: true, pcsSlug: "emanuel-buchmann", scores: { mountains: 45, hills: 30, itt: 25, ttt: 35, flat: 2 } },
  { id: "fretin", birthYear: 2001, name: "Milan Fretin", team: "Cofidis", confirmed: true, pcsSlug: "milan-fretin", scores: { mountains: 2, hills: 20, itt: 10, ttt: 30, flat: 35 } },
  { id: "izagirre", birthYear: 1990, name: "Ion Izagirre", team: "Cofidis", confirmed: true, pcsSlug: "ion-izagirre", scores: { mountains: 35, hills: 30, itt: 20, ttt: 35, flat: 5 } },
  { id: "akirsch", birthYear: 1992, name: "Alex Kirsch", team: "Cofidis", confirmed: true, pcsSlug: "alex-kirsch", scores: { mountains: 2, hills: 15, itt: 10, ttt: 30, flat: 25 } },
  { id: "page", birthYear: 1999, name: "Hugo Page", team: "Cofidis", confirmed: true, pcsSlug: "hugo-page", scores: { mountains: 10, hills: 20, itt: 12, ttt: 30, flat: 15 } },
  { id: "adria", birthYear: 1998, name: "Roger Adria", team: "Movistar Team", confirmed: true, pcsSlug: "roger-adria", scores: { mountains: 15, hills: 20, itt: 30, ttt: 35, flat: 10 } },
  { id: "castrillo", birthYear: 2001, name: "Pablo Castrillo", team: "Movistar Team", confirmed: true, pcsSlug: "pablo-castrillo", scores: { mountains: 30, hills: 25, itt: 15, ttt: 30, flat: 5 } },
  { id: "hessmann", birthYear: 2001, name: "Michel Hessmann", team: "Movistar Team", confirmed: true, pcsSlug: "michel-hessmann", scores: { mountains: 35, hills: 30, itt: 20, ttt: 35, flat: 5 } },
  { id: "romeo", birthYear: 2003, name: "Ivan Romeo", team: "Movistar Team", confirmed: true, pcsSlug: "ivan-romeo", scores: { mountains: 40, hills: 30, itt: 25, ttt: 40, flat: 2 } },
  { id: "erubio", birthYear: 1999, name: "Einer Rubio", team: "Movistar Team", confirmed: true, pcsSlug: "einer-rubio", scores: { mountains: 45, hills: 30, itt: 20, ttt: 35, flat: 2 } },
  { id: "uijtdebroeks", birthYear: 2003, name: "Cian Uijtdebroeks", team: "Movistar Team", confirmed: true, pcsSlug: "cian-uijtdebroeks", scores: { mountains: 56, hills: 35, itt: 35, ttt: 40, flat: 2 } },
  { id: "breuillard", birthYear: 2000, name: "Nicolas Breuillard", team: "TotalEnergies", confirmed: true, pcsSlug: "nicolas-breuillard", scores: { mountains: 10, hills: 20, itt: 12, ttt: 30, flat: 10 } },
  { id: "burgaudeau", birthYear: 1998, name: "Mathieu Burgaudeau", team: "TotalEnergies", confirmed: true, pcsSlug: "mathieu-burgaudeau", scores: { mountains: 15, hills: 30, itt: 20, ttt: 35, flat: 15 } },
  { id: "delbove", birthYear: 1995, name: "Joris Delbove", team: "TotalEnergies", confirmed: true, pcsSlug: "joris-delbove", scores: { mountains: 10, hills: 18, itt: 10, ttt: 25, flat: 10 } },
  { id: "jegat", birthYear: 2000, name: "Jordan Jegat", team: "TotalEnergies", confirmed: true, pcsSlug: "jordan-jegat", scores: { mountains: 2, hills: 15, itt: 10, ttt: 25, flat: 25 } },
  { id: "turgis", birthYear: 1996, name: "Anthony Turgis", team: "TotalEnergies", confirmed: true, pcsSlug: "anthony-turgis", scores: { mountains: 2, hills: 30, itt: 15, ttt: 35, flat: 45 } },
  { id: "alaphilippe", birthYear: 1992, name: "Julian Alaphilippe", team: "Tudor Pro Cycling Team", confirmed: true, pcsSlug: "julian-alaphilippe", scores: { mountains: 20, hills: 72, itt: 35, ttt: 45, flat: 25 } },
  { id: "kung", birthYear: 1993, name: "Stefan Kung", team: "Tudor Pro Cycling Team", confirmed: true, pcsSlug: "stefan-kung", scores: { mountains: 8, hills: 25, itt: 75, ttt: 70, flat: 18 } },
  { id: "pluimers", birthYear: 1999, name: "Rick Pluimers", team: "Tudor Pro Cycling Team", confirmed: true, pcsSlug: "rick-pluimers", scores: { mountains: 2, hills: 18, itt: 10, ttt: 30, flat: 30 } },
  { id: "storer", birthYear: 1998, name: "Michael Storer", team: "Tudor Pro Cycling Team", confirmed: true, pcsSlug: "michael-storer", scores: { mountains: 50, hills: 35, itt: 25, ttt: 35, flat: 2 } },
  { id: "trentin", birthYear: 1989, name: "Matteo Trentin", team: "Tudor Pro Cycling Team", confirmed: true, pcsSlug: "matteo-trentin", scores: { mountains: 5, hills: 35, itt: 20, ttt: 40, flat: 50 } },
  { id: "neilands", birthYear: 1991, name: "Krists Neilands", team: "NSN Cycling Team", confirmed: true, pcsSlug: "krists-neilands", scores: { mountains: 35, hills: 25, itt: 25, ttt: 35, flat: 2 } },
  { id: "mfrigo", birthYear: 1999, name: "Marco Frigo", team: "NSN Cycling Team", confirmed: true, pcsSlug: "marco-frigo", scores: { mountains: 20, hills: 45, itt: 20, ttt: 35, flat: 15 } },
  { id: "louvel", birthYear: 2000, name: "Matis Louvel", team: "NSN Cycling Team", confirmed: true, pcsSlug: "matis-louvel", scores: { mountains: 2, hills: 20, itt: 10, ttt: 30, flat: 40 } },
  { id: "vanasbroeck", birthYear: 1991, name: "Tom Van Asbroeck", team: "NSN Cycling Team", confirmed: true, pcsSlug: "tom-van-asbroeck", scores: { mountains: 1, hills: 20, itt: 10, ttt: 35, flat: 50 } },
  { id: "ahjohannessen", birthYear: 2001, name: "Anders Halland Johannessen", team: "Uno-X Mobility", confirmed: true, pcsSlug: "anders-halland-johannessen", scores: { mountains: 30, hills: 30, itt: 20, ttt: 35, flat: 5 } },
  { id: "vandijke", birthYear: 2000, name: "Tim van Dijke", team: "Red Bull - BORA Hansgrohe", confirmed: true, pcsSlug: "tim-van-dijke", scores: { mountains: 10, hills: 35, itt: 25, ttt: 45, flat: 20 } },
  { id: "denz", birthYear: 1992, name: "Nico Denz", team: "Red Bull - BORA Hansgrohe", confirmed: true, pcsSlug: "nico-denz", scores: { mountains: 35, hills: 35, itt: 20, ttt: 35, flat: 5 } },
  { id: "tratnik", birthYear: 1991, name: "Jan Tratnik", team: "Red Bull - BORA Hansgrohe", confirmed: true, pcsSlug: "jan-tratnik", scores: { mountains: 15, hills: 30, itt: 40, ttt: 60, flat: 20 } },
  { id: "bauhaus", birthYear: 1994, name: "Phil Bauhaus", team: "Bahrain Victorious", confirmed: true, pcsSlug: "phil-bauhaus", scores: { mountains: 1, hills: 20, itt: 10, ttt: 45, flat: 70 } },
  { id: "dcaruso", birthYear: 1985, name: "Damiano Caruso", team: "Bahrain Victorious", confirmed: true, pcsSlug: "damiano-caruso", scores: { mountains: 55, hills: 35, itt: 30, ttt: 40, flat: 2 } },
  { id: "gradek", birthYear: 1994, name: "Kamil Gradek", team: "Bahrain Victorious", confirmed: true, pcsSlug: "kamil-gradek", scores: { mountains: 30, hills: 25, itt: 15, ttt: 30, flat: 5 } },
  { id: "stannard", birthYear: 1996, name: "Robert Stannard", team: "Bahrain Victorious", confirmed: true, pcsSlug: "robert-stannard", scores: { mountains: 20, hills: 30, itt: 20, ttt: 35, flat: 10 } },
  { id: "vanmechelen", birthYear: 2000, name: "Vlad Van Mechelen", team: "Bahrain Victorious", confirmed: true, pcsSlug: "vlad-van-mechelen", scores: { mountains: 10, hills: 25, itt: 15, ttt: 30, flat: 15 } },
  { id: "piganzoli", birthYear: 2003, name: "Davide Piganzoli", team: "Team Visma | Lease a Bike", confirmed: true, pcsSlug: "davide-piganzoli", scores: { mountains: 20, hills: 35, itt: 20, ttt: 40, flat: 15 } },
  { id: "kooij", birthYear: 2001, name: "Olav Kooij", team: "Decathlon CMA CGM Team", confirmed: true, pcsSlug: "olav-kooij", scores: { mountains: 1, hills: 25, itt: 15, ttt: 50, flat: 90 } },
  { id: "hartz", birthYear: 2002, name: "Huub Artz", team: "Lotto Intermarché", confirmed: true, pcsSlug: "huub-artz", scores: { mountains: 10, hills: 30, itt: 35, ttt: 40, flat: 15 } },
  { id: "kobrien", birthYear: 1998, name: "Kelland O'Brien", team: "Team Jayco AlUla", confirmed: true, pcsSlug: "kelland-obrien", scores: { mountains: 2, hills: 15, itt: 45, ttt: 60, flat: 15 } },
  { id: "engelhardt", birthYear: 2001, name: "Felix Engelhardt", team: "Team Jayco AlUla", confirmed: true, pcsSlug: "felix-engelhardt", scores: { mountains: 15, hills: 25, itt: 20, ttt: 35, flat: 10 } },
  { id: "durbridge", birthYear: 1991, name: "Luke Durbridge", team: "Team Jayco AlUla", confirmed: true, pcsSlug: "luke-durbridge", scores: { mountains: 2, hills: 15, itt: 55, ttt: 70, flat: 15 } },
  { id: "mkanter", birthYear: 1998, name: "Max Kanter", team: "XDS Astana Team", confirmed: true, pcsSlug: "max-kanter", scores: { mountains: 1, hills: 20, itt: 10, ttt: 40, flat: 55 } },
  { id: "vinokurov", birthYear: 2001, name: "Nicolas Vinokurov", team: "XDS Astana Team", confirmed: true, pcsSlug: "nicolas-vinokurov", scores: { mountains: 25, hills: 25, itt: 15, ttt: 30, flat: 5 } },
  { id: "allegaert", birthYear: 1994, name: "Piet Allegaert", team: "Cofidis", confirmed: true, pcsSlug: "piet-allegaert", scores: { mountains: 10, hills: 35, itt: 20, ttt: 35, flat: 25 } },
  { id: "biermans", birthYear: 1996, name: "Jenthe Biermans", team: "Cofidis", confirmed: true, pcsSlug: "jenthe-biermans", scores: { mountains: 2, hills: 20, itt: 35, ttt: 50, flat: 20 } },
  { id: "bthomas", birthYear: 1995, name: "Benjamin Thomas", team: "Cofidis", confirmed: true, pcsSlug: "benjamin-thomas", scores: { mountains: 5, hills: 20, itt: 45, ttt: 55, flat: 15 } },
  { id: "qhermans", birthYear: 1996, name: "Quinten Hermans", team: "Pinarello - Q36.5 Pro Cycling Team", confirmed: true, pcsSlug: "quinten-hermans", scores: { mountains: 10, hills: 40, itt: 20, ttt: 35, flat: 20 } },
];

const SPECIALTY_LABELS = {
  mountains: "Climber",
  hills: "Puncheur",
  flat: "Sprinter",
  itt: "Time triallist",
  ttt: "Time triallist",
};

export function riderSpecialty(rider) {
  const entries = Object.entries(rider.scores).filter(([k]) => k !== "ttt");
  entries.sort((a, b) => b[1] - a[1]);
  return SPECIALTY_LABELS[entries[0][0]] || "All-rounder";
}

const SPECIALTY_TO_TYPE = {
  Climber: "mountains",
  Puncheur: "hills",
  Sprinter: "flat",
  "Time triallist": "itt",
};

export function specialtyToType(specialty) {
  return SPECIALTY_TO_TYPE[specialty] || "flat";
}

// White Jersey (best young rider) eligibility: born on or after Jan 1 of
// (Tour year - 25) -- the standard "25 or younger" rule. For the 2026 Tour
// that means born in 2001 or later. birthYear is a best-effort real value
// for these real riders; update if you spot one that's off.
const WHITE_JERSEY_CUTOFF_YEAR = 2001;

export function isWhiteJerseyEligible(rider) {
  return (rider.birthYear || 0) >= WHITE_JERSEY_CUTOFF_YEAR;
}

// Real, hand-picked team colours (not a generic palette) so each team is
// instantly recognisable -- no two teams share the same colour. Some are a
// single colour, others are a two-colour "ball" (split swatch) when one colour
// alone wouldn't capture the team's identity.
const TEAM_COLORS = {
  "UAE Team Emirates XRG": ["#ffffff", "#111111"],
  "Team Visma | Lease a Bike": "#f4e300",
  "Movistar Team": "#0f52ba",
  "Soudal Quick-Step": "#0093d0",
  "Red Bull - BORA Hansgrohe": ["#0a1a3c", "#d6001c"],
  "INEOS Grenadiers": "#5bc2e7",
  "Alpecin Premier Tech": ["#0b1f33", "#00c2de"],
  "Lidl Trek": "#c8102e",
  "Lotto Intermarché": "#ff6a00",
  "Team Jayco AlUla": ["#0b6e4f", "#ffc72c"],
  "Decathlon CMA CGM Team": "#0086a8",
  "EF Education EasyPost": "#ff1d8e",
  "Groupama FDJ United": "#7a1f2b",
  "Bahrain Victorious": ["#a6192e", "#c9a227"],
  "Pinarello - Q36.5 Pro Cycling Team": "#2b2b2b",
  "Tudor Pro Cycling Team": ["#1a1a1a", "#c5a572"],
  "NSN Cycling Team": "#00a86b",
  "Team Picnic PostNL": ["#f5821f", "#003da5"],
  "Uno-X Mobility": "#e2001a",
  "XDS Astana Team": ["#00b4d8", "#ffda4d"],
  "Caja Rural Seguros RGA": "#1b5e20",
  "Cofidis": "#b8002e",
  "TotalEnergies": "#1c3f94",
};

// Returns a CSS background value: a solid colour, or a left/right split
// gradient for two-colour teams.
export function teamColor(teamName) {
  const c = TEAM_COLORS[teamName];
  if (!c) return "#999999";
  if (Array.isArray(c)) {
    return "linear-gradient(90deg, " + c[0] + " 50%, " + c[1] + " 50%)";
  }
  return c;
}

function hexToRgba(hex, alpha) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
}

// A soft, low-opacity tint of the team's own colour, for card backgrounds.
export function teamPastelBg(teamName) {
  const c = TEAM_COLORS[teamName];
  if (!c) return "rgba(150, 150, 150, 0.08)";
  const base = Array.isArray(c) ? c[0] : c;
  return hexToRgba(base, 0.1);
}

// All 23 official confirmed 2026 Tour de France teams (18 WorldTeams + 5
// ProTeams). Individual riders are only listed for 16 of them so far -- the
// other 7 still show up here (with their colour) but with an empty roster
// until their squads get confirmed.
export const ALL_TEAMS = [
  "Alpecin Premier Tech",
  "Bahrain Victorious",
  "Caja Rural Seguros RGA",
  "Cofidis",
  "Decathlon CMA CGM Team",
  "EF Education EasyPost",
  "Groupama FDJ United",
  "INEOS Grenadiers",
  "Lidl Trek",
  "Lotto Intermarché",
  "Movistar Team",
  "NSN Cycling Team",
  "Pinarello - Q36.5 Pro Cycling Team",
  "Red Bull - BORA Hansgrohe",
  "Soudal Quick-Step",
  "Team Jayco AlUla",
  "Team Picnic PostNL",
  "Team Visma | Lease a Bike",
  "TotalEnergies",
  "Tudor Pro Cycling Team",
  "UAE Team Emirates XRG",
  "Uno-X Mobility",
  "XDS Astana Team",
];

export function teamsList() {
  const map = {};
  ALL_TEAMS.forEach((team) => {
    map[team] = [];
  });
  RIDERS.forEach((r) => {
    if (!map[r.team]) map[r.team] = [];
    map[r.team].push(r);
  });
  return Object.entries(map)
    .map(([team, riders]) => ({ team, riders: riders.sort((a, b) => a.name.localeCompare(b.name)) }))
    .sort((a, b) => a.team.localeCompare(b.team));
}

// Teams whose full, final Tour 2026 lineup has been officially announced --
// no more riders will be added or swapped for these (barring a late
// withdrawal/injury). Everyone else's roster is still being filled in as
// teams confirm their selections; see each rider's `confirmed` flag for
// individual-level confirmation in the meantime.
//
// Source: official team announcements as relayed via cyclingfantasy.cc,
// cross-checked one by one (last checked: late June 2026).
export const OFFICIAL_TEAMS = new Set([
  "NSN Cycling Team",
  "UAE Team Emirates XRG",
  "Uno-X Mobility",
  "Red Bull - BORA Hansgrohe",
  "Bahrain Victorious",
  "Team Visma | Lease a Bike",
  "Soudal Quick-Step",
  "Team Jayco AlUla",
]);

export function isTeamOfficial(team) {
  return OFFICIAL_TEAMS.has(team);
}

export function pcsUrl(rider) {
  return "https://www.procyclingstats.com/rider/" + rider.pcsSlug;
}

// Returns riders sorted from most to least favourite for a given stage type
export function favoritesForType(type) {
  return [...RIDERS].sort((a, b) => (b.scores[type] ?? 0) - (a.scores[type] ?? 0));
}

export function riderById(id) {
  return RIDERS.find((r) => r.id === id);
}

// Scoring rules:
// Correctly pick the stage winner (1st) = 10 points
// Your pick finishes 2nd = 5 points
// Your pick finishes 3rd = 2 points
// Otherwise = 0 points
export function pointsForPick(pickId, result) {
  if (!result || !pickId) return 0;
  if (pickId === result.first) return 10;
  if (pickId === result.second) return 5;
  if (pickId === result.third) return 2;
  return 0;
}

// All Tour de France 2026 stages fall within CEST (UTC+2, no DST changes during
// 4-26 July), so a fixed offset is correct and safe here. Without this, "new
// Date(stage.date + 'T' + stage.startTime)" would be parsed in each VISITOR'S
// OWN local timezone instead of French local time -- meaning the countdown and
// lock times would silently be wrong (off by several hours) for anyone outside
// Central European time. This is the single place that builds a stage's real
// start instant; every lock/countdown calculation goes through it.
export function stageStartDate(stage) {
  return new Date(stage.date + "T" + stage.startTime + ":00+02:00");
}

export function stageIsLocked(stage, now) {
  var current = now || new Date();
  var start = stageStartDate(stage);
  var lockTime = new Date(start.getTime() - 60 * 60 * 1000); // locks 1h before the real start
  return current >= lockTime;
}

// Jersey predictions lock at the exact same moment Stage 1 locks: 1h before
// Stage 1's real start. Computed from the real Stage 1 data so it can never
// drift out of sync if the start time ever changes.
export function jerseyLockDate() {
  var start = stageStartDate(STAGES[0]);
  return new Date(start.getTime() - 60 * 60 * 1000);
}

export function jerseyPredictionsLocked(now) {
  var current = now || new Date();
  return current >= jerseyLockDate();
}

export function totalKm() {
  return Math.round(STAGES.reduce((sum, s) => sum + s.km, 0));
}

export function kmCompleted(now) {
  const prev = previousStage(now);
  if (!prev) return 0;
  return Math.round(STAGES.filter((s) => s.n <= prev.n).reduce((sum, s) => sum + s.km, 0));
}

export function nextStage(now) {
  var current = now || new Date();
  return STAGES.find((s) => stageStartDate(s) > current) || null;
}

export function previousStage(now) {
  var current = now || new Date();
  var started = STAGES.filter((s) => stageStartDate(s) <= current);
  return started.length ? started[started.length - 1] : null;
}
