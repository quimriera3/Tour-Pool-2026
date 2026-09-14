// lib/previewArticle.js
//
// Route preview articles, one per race, in all 6 site languages. Used by the
// /preview pages and by the SEO content block on the homepage.
//
// Keyed by race slug so an archived race keeps its own article: each finished
// race's preview stays live on its (now orphaned but still indexed) pages,
// while the homepage shows whichever race is currently active.
//
// Rider names are wrapped in **markers**; components/PreviewArticleContent.js
// renders them as <strong>, which marks them up as entities for search.

import { ACTIVE_RACE_SLUG } from "./races";

export const PREVIEW_ARTICLES = {
  "worlds-2026-women": {
    en: {
      metaTitle: "Women's Road World Championships 2026 Preview: Route & Favourites",
      metaDescription:
        "Preview of the 2026 elite women's UCI Road World Championships in Montreal: the 180.4 km route, eight laps of the Mount Royal circuit, and the riders who can take the rainbow jersey.",
      eyebrow: "Worlds preview",
      h1: "Women's Road World Championships 2026: Route Preview and Favourites",
      intro:
        "The elite women race for the rainbow jersey in Montreal on Saturday 26 September, the day before the men. At 180.4 km with 2,570 metres of climbing, it is a hard, selective course built on the same Mount Royal circuit the men use — eight laps instead of twelve, but proportionally just as demanding, and with fewer chances to recover from a mistake.",
      sections: [
        {
          heading: "The route: Brossard to eight laps of Mount Royal",
          paragraphs: [
            "The race starts in Brossard alongside the men's course, heading through Carignan, Chambly and Richelieu in the Monteregie before crossing the Samuel De Champlain Bridge into Montreal. The approach is shorter than the men's, which changes the shape of the race: teams reach the circuit fresher, and the selection has to be made on the laps themselves.",
            "The finishing circuit is the 13.4 km Mount Royal loop, ridden eight times for 2,570 metres of total climbing. Most of the peloton knows it from the Grand Prix Cycliste de Montreal. With four fewer laps than the men, a rider who loses contact has far less time to come back — attacks that would be premature in the men's race are viable here.",
          ],
        },
        {
          heading: "The three tests on every lap",
          paragraphs: [
            "The Voie Camillien-Houde is the main climb at 2.3 km averaging 6.2%. Across eight laps it is the grinding, cumulative test that empties legs before the decisive move.",
            "The Chemin de la Polytechnique is short but carries ramps beyond 11%, and it is where the race is most likely to split. It rewards explosive power over sustained climbing.",
            "The finish along Avenue du Parc is a rising false flat — flat on paper, uphill in the legs. A rider arriving alone can hold a small gap here; a group arriving together faces a sprint that punishes anyone who has emptied themselves on the last climb.",
          ],
        },
        {
          heading: "Who can win",
          paragraphs: [
            "The headline is a familiar one: **Lotte Kopecky** of Belgium and **Demi Vollering** of the Netherlands are expected to renew the rivalry that has defined recent women's racing. Their strengths differ in a way this course makes interesting — Kopecky is the more explosive and much the faster finisher, Vollering the stronger pure climber over repeated ascents. Whether the race is decided on the Polytechnique ramps or by attrition across eight laps of Camillien-Houde may determine which of them it suits.",
            "Beyond those two, the start quotas point to where the depth lies. The Netherlands, Italy, Switzerland, France and Poland each have seven riders, the largest selections in the field, and a strong team matters enormously on a circuit where controlling the front before each climb is decisive. Spain, Great Britain, New Zealand, Norway, Canada, Belgium, Germany, the United States and Australia each have six.",
            "National selections are being announced federation by federation, but the complete field is still being finalised. Rather than guess at an incomplete startlist, the pool will only open the women's rider selector once the field is reliable. What the course already tells us is the profile it rewards: a puncher who climbs, comfortable on repeated short steep efforts, and still fast after four and a half hours.",
          ],
        },
        {
          heading: "The time trial",
          paragraphs: [
            "The elite women open the entire championships on Sunday 20 September at 09:00, on exactly the same 39.2 km course the men ride later that day. It is long and nearly flat, at around 220 metres of elevation, running past Old Montreal, along the Saint Lawrence, around the Circuit Gilles Villeneuve and through Parc Jean-Drapeau before returning over the Concorde Bridge.",
            "A flat 39.2 km is an unusually pure test of sustained power, and one of the longer women's world championship time trials in recent years. Expect the specialists rather than the climbers.",
          ],
        },
      ],
      closingPrefix: "Who takes the rainbow jersey in Montreal?",
      closingLinkText: "Make your prediction",
      closingHref: "/women/predictions",
      closingSuffix: "and see how your call compares with everyone else's. The rider list is updated only from confirmed selection information.",
    },

    es: {
      metaTitle: "Previa del Mundial Femenino 2026: Recorrido y Favoritas",
      metaDescription:
        "Previa del Mundial de Ciclismo en Ruta 2026 élite femenino en Montreal: los 180,4 km del recorrido, ocho vueltas al circuito del Mont Royal y las corredoras que pueden llevarse el maillot arcoíris.",
      eyebrow: "Previa del Mundial",
      h1: "Mundial Femenino 2026: Previa del Recorrido y Favoritas",
      intro:
        "La élite femenina se juega el maillot arcoíris en Montreal el sábado 26 de septiembre, un día antes que los hombres. Con 180,4 km y 2.570 metros de desnivel, es un recorrido duro y selectivo construido sobre el mismo circuito del Mont Royal que usan ellos: ocho vueltas en lugar de doce, pero proporcionalmente igual de exigente y con menos margen para recuperarse de un error.",
      sections: [
        {
          heading: "El recorrido: de Brossard a ocho vueltas al Mont Royal",
          paragraphs: [
            "La carrera sale de Brossard, igual que la masculina, y atraviesa Carignan, Chambly y Richelieu en la Montérégie antes de cruzar el puente Samuel De Champlain hacia Montreal. La aproximación es más corta que la de ellos, y eso cambia la forma de la carrera: los equipos llegan al circuito más frescos y la selección hay que hacerla en las propias vueltas.",
            "El circuito final es el bucle de 13,4 km del Mont Royal, recorrido ocho veces para sumar 2.570 metros de desnivel. Buena parte del pelotón lo conoce por el Grand Prix Cycliste de Montreal. Con cuatro vueltas menos que ellos, quien pierde el contacto tiene mucho menos tiempo para volver: ataques que serían prematuros en la carrera masculina aquí son viables.",
          ],
        },
        {
          heading: "Las tres pruebas de cada vuelta",
          paragraphs: [
            "La Voie Camillien-Houde es la subida principal, 2,3 km al 6,2% de media. A lo largo de ocho vueltas es el desgaste acumulado que vacía las piernas antes del movimiento decisivo.",
            "El Chemin de la Polytechnique es corto pero tiene rampas por encima del 11%, y es donde la carrera tiene más probabilidades de romperse. Premia la potencia explosiva más que la escalada sostenida.",
            "El final por la Avenue du Parc es un falso llano ascendente: llano sobre el papel, cuesta arriba en las piernas. Quien llegue sola puede mantener una pequeña ventaja; un grupo que llegue junto se juega un esprint que castiga a quien se haya vaciado en la última subida.",
          ],
        },
        {
          heading: "Quién puede ganar",
          paragraphs: [
            "El titular es conocido: la belga **Lotte Kopecky** y la neerlandesa **Demi Vollering** deberían renovar la rivalidad que ha marcado el ciclismo femenino reciente. Sus virtudes difieren de una manera que este recorrido hace interesante: Kopecky es más explosiva y mucho más rápida al esprint, Vollering mejor escaladora pura en ascensiones repetidas. Que la carrera se decida en las rampas de la Polytechnique o por desgaste en ocho pasos por la Camillien-Houde puede determinar a cuál de las dos le conviene.",
            "Más allá de ellas dos, los cupos de salida señalan dónde está la profundidad. Países Bajos, Italia, Suiza, Francia y Polonia tienen siete corredoras cada una, las selecciones más numerosas, y un equipo fuerte pesa muchísimo en un circuito donde controlar la cabeza antes de cada subida es decisivo. España, Gran Bretaña, Nueva Zelanda, Noruega, Canadá, Bélgica, Alemania, Estados Unidos y Australia disponen de seis.",
            "Las selecciones nacionales se están anunciando federación a federación, pero el pelotón completo todavía se está cerrando. En lugar de adivinar una startlist incompleta, la porra solo abrirá el selector femenino cuando la lista sea fiable. Lo que el recorrido ya nos dice es el perfil que premia: una puncheur que suba bien, cómoda en esfuerzos cortos y empinados repetidos, y todavía rápida después de cuatro horas y media.",
          ],
        },
        {
          heading: "La contrarreloj",
          paragraphs: [
            "La élite femenina abre todo el Mundial el domingo 20 de septiembre a las 09:00, sobre exactamente el mismo recorrido de 39,2 km que harán ellos ese mismo día. Es larga y casi llana, con unos 220 metros de desnivel, y pasa por el Viejo Montreal, la orilla del San Lorenzo, el Circuito Gilles Villeneuve y el Parc Jean-Drapeau antes de volver por el puente de la Concorde.",
            "Una crono llana de 39,2 km es una prueba de potencia sostenida excepcionalmente pura, y una de las contrarrelojes mundialistas femeninas más largas de los últimos años. Esperemos a las especialistas, no a las escaladoras.",
          ],
        },
      ],
      closingPrefix: "¿Quién se lleva el arcoíris en Montreal?",
      closingLinkText: "Haz tu predicción",
      closingHref: "/es/women/predictions",
      closingSuffix: "y comprueba cómo se compara con la del resto. La lista de corredoras solo se actualiza con información de selección confirmada.",
    },
  },


  "worlds-2026": {
    en: {
      metaTitle: "UCI Road World Championships 2026 Preview: Route, Favourites & Mount Royal",
      metaDescription:
        "Full preview of the 2026 UCI Road World Championships in Montreal: the 273.7 km route, the twelve-lap Mount Royal circuit, and an analysis of the ten riders who can win the rainbow jersey.",
      eyebrow: "Worlds preview",
      h1: "UCI Road World Championships 2026: Route Preview and the Ten Riders Who Can Win",
      intro:
        "The rainbow jersey returns to Montreal for the first time since 1974, when Eddy Merckx won the last Worlds held here. The 2026 elite men's road race is a monster: 273.7 kilometres and 3,803 metres of climbing, ending with twelve laps of the Mount Royal circuit. And for the first time in three years there is no clear favourite, because two-time defending champion Tadej Pogacar is absent through injury. This is the most open Worlds in years — here is what the course demands, and who can meet it.",
      sections: [
        {
          heading: "The route: 273 km from Brossard to the Mount Royal circuit",
          paragraphs: [
            "The race starts at Quartier DIX30 in Brossard, on the south shore, and runs through the municipalities of the Monteregie before crossing the Samuel De Champlain Bridge into Montreal. That approach is long and largely flat, which matters: it means the selection will not happen on the road in, but on the circuit, and it means teams arrive at the finishing laps with almost full squads intact.",
            "Everything is then decided on twelve laps of a 13.4 km circuit around Mount Royal — the same circuit used by the Grand Prix Cycliste de Montreal each September, so most of the peloton knows it intimately. Each lap carries 269 metres of climbing. Twelve laps of that is 3,228 metres on the circuit alone, on legs that have already covered 110 kilometres to get there.",
          ],
        },
        {
          heading: "The three tests on every lap",
          paragraphs: [
            "The Voie Camillien-Houde is the main climb: 2.3 km at 6.2% average. Alone it is not severe enough to break a strong rider, but repeated twelve times at world-championship pace it grinds the race down from the inside. Attacks here rarely stick early; they become decisive from lap nine onwards.",
            "The Chemin de la Polytechnique is where the race actually explodes. It is short, but it carries ramps beyond 11% — the kind of gradient that suits explosive punchers rather than sustained climbers. Expect the winning move to go here.",
            "The finish on Avenue du Parc looks flat on a profile and is not: it is a rising false flat, which is a very particular kind of cruel after six hours. A rider arriving with a small gap can hold it. A rider arriving in a group of five has to have something left for a sprint that is uphill in everything but name.",
          ],
        },
        {
          heading: "What kind of rider wins here",
          paragraphs: [
            "This is not a pure climber's course, and it is not a sprinter's course. The winner needs the punch to follow accelerations on the Polytechnique ramps and the endurance to still have that punch after 270 kilometres. That profile describes a classics rider with climbing legs, or a Grand Tour rider with a turn of speed.",
            "History supports this reading. The Montreal circuit has repeatedly produced winners in this mould at the Grand Prix, and the 1974 Worlds on much the same roads went to Merckx. Length is the hidden variable: at 273.7 km this is one of the longest road races on the calendar, and attrition matters as much as explosiveness.",
          ],
        },
        {
          heading: "The ten riders who can win the rainbow jersey",
          paragraphs: [
            "**Remco Evenepoel** (Belgium) is the closest thing to a favourite. World champion in 2022, he has the engine for a 273 km race and one of the strongest teams here, with Belgium able to control the circuit. The question is whether the Polytechnique ramps are punchy enough to isolate him from riders with a faster finish.",
            "**Isaac del Toro** (Mexico) has been the revelation of the season and suits this course as well as anyone: explosive on short steep climbs, strong after long distances, and fearless. His problem is support — Mexico's six-rider squad cannot control a race, so he has to win from a move rather than from a position of strength.",
            "**Mathieu van der Poel** (Netherlands) won the rainbow jersey in Glasgow in 2023 on a circuit not unlike this one. If the race comes down to a small group after twelve hard laps, nobody in that group wants to be there with him. The Dutch squad is thinner than Belgium's, which pushes him towards racing opportunistically.",
            "**Tom Pidcock** (Great Britain) is precisely the puncher-climber this circuit rewards, and Britain brings a genuinely deep team with Adam Yates and Oscar Onley able to make the race hard before the finale.",
            "**Wout van Aert** (Belgium) gives Belgium a second card and a very different one. If a larger group survives to Avenue du Parc, he is the fastest finisher of the contenders. Belgium's strength is also its complication: managing two leaders takes discipline.",
            "**Primoz Roglic** (Slovenia) inherits leadership of a Slovenian team suddenly without Pogacar. At 36 he remains one of the best finishers from a reduced group in the sport, though a 273 km race is a different demand from a Grand Tour summit finish.",
            "**Juan Ayuso** (Spain) leads a strong Spanish selection alongside Enric Mas and time-trial specialist Ivan Romeo. He climbs well enough for the Camillien-Houde and is quick enough to matter at the finish — Spain's tactical options are among the best here.",
            "**Paul Seixas** (France) is 19 and the most exciting prospect in the sport. A Worlds this long is a serious ask at his age, but France has built a versatile team around him, and if the race breaks early he has the class to be there.",
            "**Richard Carapaz** (Ecuador) is the purest climber on this list, which is both his strength and his limit: the Camillien-Houde suits him, the Polytechnique ramps and the uphill sprint do not. Expect him to try from distance.",
            "**Marc Hirschi** (Switzerland) is the classic dark horse — a rider whose entire profile is built for punchy one-day races, on a course that rewards exactly that. Switzerland also has **Mauro Schmid** and time-trial power in **Stefan Kung** to shape the race.",
          ],
        },
        {
          heading: "The time trial: a different race entirely",
          paragraphs: [
            "The championships open on 20 September with a 39.2 km individual time trial, long by modern standards and almost dead flat at around 220 metres of elevation. It runs along the Saint Lawrence River, crosses the Samuel De Champlain Bridge, loops the Circuit Gilles Villeneuve — the Formula 1 track on Ile Notre-Dame — and returns over the Concorde Bridge to the same Avenue du Parc finish.",
            "Flat and long is the purest possible test of sustained power, which narrows the field sharply. **Remco Evenepoel** starts as the strong favourite on this terrain, with **Stefan Kung**, **Brandon McNulty**, **Ivan Romeo** and **Mikkel Bjerg** the most credible challengers. Unlike the road race, the time trial rarely springs surprises.",
          ],
        },
      ],
      closingPrefix: "Who takes the rainbow jersey in Montreal?",
      closingLinkText: "Make your prediction",
      closingHref: "/predictions",
      closingSuffix: "and see how your call compares with everyone else's. National squads are confirmed in the days before each race.",
    },

    es: {
      metaTitle: "Previa del Mundial de Ciclismo 2026: Recorrido, Favoritos y Mont Royal",
      metaDescription:
        "Previa completa del Mundial de Ciclismo en Ruta 2026 en Montreal: los 273,7 km del recorrido, el circuito del Mont Royal a doce vueltas, y análisis de los diez corredores que pueden ganar el maillot arcoíris.",
      eyebrow: "Previa del Mundial",
      h1: "Mundial de Ciclismo 2026: Previa del Recorrido y los Diez Corredores que Pueden Ganar",
      intro:
        "El maillot arcoíris vuelve a Montreal por primera vez desde 1974, cuando Eddy Merckx ganó el último Mundial disputado aquí. La prueba en ruta élite masculina de 2026 es descomunal: 273,7 kilómetros y 3.803 metros de desnivel, con final tras doce vueltas al circuito del Mont Royal. Y por primera vez en tres años no hay un favorito claro, porque el bicampeón defensor Tadej Pogacar está ausente por lesión. Es el Mundial más abierto en años: esto es lo que exige el recorrido, y quién puede responder.",
      sections: [
        {
          heading: "El recorrido: 273 km de Brossard al circuito del Mont Royal",
          paragraphs: [
            "La carrera sale de Quartier DIX30, en Brossard, en la orilla sur, y recorre los municipios de la Montérégie antes de cruzar el puente Samuel De Champlain hacia Montreal. Esa aproximación es larga y mayoritariamente llana, y eso importa: significa que la selección no se hará en la carretera de entrada, sino en el circuito, y que los equipos llegarán a las vueltas finales prácticamente al completo.",
            "Todo se decide entonces en doce vueltas a un circuito de 13,4 km alrededor del Mont Royal, el mismo que usa cada septiembre el Grand Prix Cycliste de Montreal, así que buena parte del pelotón lo conoce al dedillo. Cada vuelta suma 269 metros de desnivel. Doce vueltas son 3.228 metros solo en el circuito, sobre unas piernas que ya han recorrido 110 kilómetros para llegar hasta ahí.",
          ],
        },
        {
          heading: "Las tres pruebas de cada vuelta",
          paragraphs: [
            "La Voie Camillien-Houde es la subida principal: 2,3 km al 6,2% de media. Por sí sola no basta para romper a un corredor fuerte, pero repetida doce veces a ritmo de Mundial desgasta la carrera desde dentro. Los ataques aquí rara vez cuajan pronto; se vuelven decisivos a partir de la novena vuelta.",
            "El Chemin de la Polytechnique es donde la carrera explota de verdad. Es corto, pero tiene rampas por encima del 11%, el tipo de pendiente que favorece a los puncheurs explosivos más que a los escaladores de ritmo sostenido. Ahí es donde saldrá el movimiento bueno.",
            "El final en la Avenue du Parc parece llano en el perfil y no lo es: es un falso llano ascendente, una crueldad muy concreta después de seis horas. Un corredor que llegue con una pequeña ventaja puede mantenerla. Uno que llegue en un grupo de cinco tiene que guardar algo para un esprint que es cuesta arriba en todo menos en el nombre.",
          ],
        },
        {
          heading: "Qué tipo de corredor gana aquí",
          paragraphs: [
            "No es un recorrido de escalador puro, ni de esprínter. El ganador necesita la punta para seguir los acelerones de las rampas de la Polytechnique y el fondo para conservar esa punta después de 270 kilómetros. Ese perfil describe a un clasicómano con piernas de escalador, o a un corredor de grandes vueltas con cambio de ritmo.",
            "La historia respalda esta lectura. El circuito de Montreal ha dado ganadores de ese molde una y otra vez en el Grand Prix, y el Mundial de 1974, sobre carreteras muy parecidas, fue para Merckx. La distancia es la variable oculta: con 273,7 km, esta es una de las pruebas en ruta más largas del calendario, y el desgaste cuenta tanto como la explosividad.",
          ],
        },
        {
          heading: "Los diez corredores que pueden ganar el arcoíris",
          paragraphs: [
            "**Remco Evenepoel** (Bélgica) es lo más parecido a un favorito. Campeón del mundo en 2022, tiene motor para una carrera de 273 km y uno de los equipos más fuertes aquí, con una Bélgica capaz de controlar el circuito. La duda es si las rampas de la Polytechnique son lo bastante explosivas para aislarlo de corredores con mejor remate.",
            "**Isaac del Toro** (México) ha sido la revelación de la temporada y encaja en este recorrido como pocos: explosivo en subidas cortas y empinadas, fuerte tras muchos kilómetros y sin miedo. Su problema es el apoyo: los seis corredores de México no pueden controlar una carrera, así que tendrá que ganar desde un movimiento y no desde una posición de fuerza.",
            "**Mathieu van der Poel** (Países Bajos) ganó el arcoíris en Glasgow en 2023 en un circuito no muy distinto a este. Si la carrera se decide en un grupo reducido tras doce vueltas duras, nadie de ese grupo querrá tenerlo delante. La selección neerlandesa es más floja que la belga, lo que lo empuja a correr de forma oportunista.",
            "**Tom Pidcock** (Gran Bretaña) es exactamente el puncheur-escalador que premia este circuito, y Gran Bretaña trae un equipo realmente profundo, con Adam Yates y Oscar Onley capaces de endurecer la carrera antes del final.",
            "**Wout van Aert** (Bélgica) da a Bélgica una segunda carta, y muy distinta. Si llega un grupo amplio a la Avenue du Parc, es el más rápido de los candidatos. La fuerza belga es también su complicación: gestionar dos líderes exige disciplina.",
            "**Primoz Roglic** (Eslovenia) hereda el liderazgo de una Eslovenia de repente sin Pogacar. A sus 36 años sigue siendo uno de los mejores rematadores desde grupo reducido del pelotón, aunque una carrera de 273 km es una exigencia distinta a un final en alto de gran vuelta.",
            "**Juan Ayuso** (España) lidera una selección española fuerte junto a Enric Mas y el especialista contra el crono Ivan Romeo. Sube lo suficiente para la Camillien-Houde y es rápido lo bastante para contar en la meta: las opciones tácticas de España están entre las mejores aquí.",
            "**Paul Seixas** (Francia) tiene 19 años y es el proyecto más ilusionante del ciclismo. Un Mundial tan largo es mucho pedir a su edad, pero Francia ha montado un equipo versátil a su alrededor y, si la carrera se rompe pronto, tiene clase para estar ahí.",
            "**Richard Carapaz** (Ecuador) es el escalador más puro de esta lista, lo que es a la vez su fuerza y su límite: la Camillien-Houde le va bien, las rampas de la Polytechnique y el esprint en cuesta no. Es de esperar que lo intente desde lejos.",
            "**Marc Hirschi** (Suiza) es el tapado clásico: un corredor cuyo perfil entero está hecho para las clásicas explosivas, en un recorrido que premia justo eso. Suiza cuenta además con **Mauro Schmid** y con la potencia contra el crono de **Stefan Kung** para dar forma a la carrera.",
          ],
        },
        {
          heading: "La contrarreloj: una carrera completamente distinta",
          paragraphs: [
            "El Mundial arranca el 20 de septiembre con una contrarreloj individual de 39,2 km, larga para los estándares actuales y prácticamente llana, con unos 220 metros de desnivel. Bordea el río San Lorenzo, cruza el puente Samuel De Champlain, da la vuelta al Circuito Gilles Villeneuve (el trazado de Fórmula 1 de la isla de Notre-Dame) y regresa por el puente de la Concorde hasta la misma meta de la Avenue du Parc.",
            "Llana y larga es la prueba más pura posible de potencia sostenida, lo que estrecha mucho el abanico. **Remco Evenepoel** parte como gran favorito en este terreno, con **Stefan Kung**, **Brandon McNulty**, **Ivan Romeo** y **Mikkel Bjerg** como aspirantes más creíbles. A diferencia de la prueba en ruta, la contrarreloj rara vez da sorpresas.",
          ],
        },
      ],
      closingPrefix: "¿Quién se lleva el arcoíris en Montreal?",
      closingLinkText: "Haz tu predicción",
      closingHref: "/es/predictions",
      closingSuffix: "y comprueba cómo se compara con la del resto. La lista de corredoras solo se actualiza con información de selección confirmada.",
    },
  },

  "vuelta-2026": {
  en: {
    metaTitle: "La Vuelta a España 2026 Route Preview: Monaco to Granada",
    metaDescription:
      "La Vuelta 2026 preview: a 21-stage route from Monaco to Granada across four countries, with seven mountain stages, a gravel sector, a 32.1 km time trial and a summit finish at the Alhambra.",
    eyebrow: "Route preview",
    h1: "La Vuelta a España 2026 Route Preview: Monaco to Granada",
    intro:
      "The 81st edition of La Vuelta a España is one of the most unusual — and most demanding — in the race's history. For the first time it starts in Monaco, crosses France and Andorra before reaching Spanish soil, and ends not in Madrid but on a climb to the Alhambra in Granada. Across 21 stages and 3,298 kilometres the peloton faces seven mountain stages, a gravel sector, and two time trials. Here is what the route tells us about how this race will be won.",
    sections: [
      {
        heading: "A Grand Départ in Monaco, and a race across four countries",
        paragraphs: [
          "La Vuelta opens on 22 August with a 9 km individual time trial through the streets of Monaco — short, technical, and the first time the principality has hosted a Vuelta start. That makes Monaco the first country to have hosted the opening stage of all three Grand Tours. The gaps will be small, but on a route this hard even a handful of seconds shapes the early days in red.",
          "From there the race heads north into Provence for the longest stage of the whole Vuelta, 215 km to Manosque, before turning towards the Pyrenees. Stage 3 finishes at the altitude resort of Font Romeu and Stage 4 is a brutally compact 105 km loop around Andorra la Vella. Short mountain stages tend to explode early, and this one arrives before anyone has found their rhythm. Spain is only reached on Stage 5.",
        ],
      },
      {
        heading: "Gravel, summit finishes and a decisive time trial",
        paragraphs: [
          "The route's most talked-about novelty comes on Stage 6 to Castellón, which introduces sterrato — unpaved gravel sectors rarely seen in this race. Gravel punishes bad positioning and invites mechanical chaos, so expect the general classification teams to fight for the front long before the sectors arrive. The following day climbs to Aramón Valdelinares on tired legs.",
          "The second and third weeks are where the race is decided. Calar Alto on Stage 12 is one of the longest climbs in Spain, topping out above 2,100 m — a pure test of sustained power with nowhere to hide. Stage 14 finishes on the Sierra de la Pandera, historically one of La Vuelta's cruellest ascents, narrow and savagely steep. Then comes the 32.1 km time trial from El Puerto de Santa María to Jerez, the longest Vuelta time trial in years and the single biggest chance for a powerful rouleur to overturn the standings.",
        ],
      },
      {
        heading: "Andalusia, and a finish at the Alhambra",
        paragraphs: [
          "The last ten stages take place entirely in Andalusia, visiting all eight of its provinces for only the second time. September heat in the south is a factor in itself, and the sprinters get their remaining chances at Palos de la Frontera and Seville before the mountains return.",
          "Stage 20 from La Calahorra to Collado del Alguacil, deep in the Sierra Nevada region, is the queen stage and the final opportunity to change the general classification. And unlike most Grand Tours, the last day is not a procession: four laps of a Granada circuit climbing roughly a kilometre to the Alhambra mean the race stays live until the very end, in one of the most spectacular settings any Grand Tour has used.",
        ],
      },
    ],
    closingPrefix: "Think you can call it?",
    closingLinkText: "Pick a winner for every stage",
    closingHref: "/predictions",
    closingSuffix: "and see how your predictions stack up against everyone else's. Team line-ups are confirmed in the week before the start.",
  },

  es: {
    metaTitle: "Previa del Recorrido de La Vuelta 2026: de Mónaco a Granada",
    metaDescription:
      "Previa de La Vuelta 2026: 21 etapas de Mónaco a Granada por cuatro países, con siete etapas de montaña, un sector de grava, una crono de 32,5 km y final en alto en la Alhambra.",
    eyebrow: "Previa del recorrido",
    h1: "Previa del Recorrido de La Vuelta 2026: de Mónaco a Granada",
    intro:
      "La 81.ª edición de La Vuelta a España es una de las más atípicas —y más exigentes— de su historia. Por primera vez arranca en Mónaco, atraviesa Francia y Andorra antes de pisar suelo español, y no termina en Madrid sino en una subida a la Alhambra de Granada. En 21 etapas y 3.298 kilómetros el pelotón afronta siete etapas de montaña, un sector de grava y dos contrarrelojes. Esto es lo que el recorrido nos dice sobre cómo se ganará esta carrera.",
    sections: [
      {
        heading: "Salida en Mónaco y una carrera por cuatro países",
        paragraphs: [
          "La Vuelta arranca el 22 de agosto con una contrarreloj individual de 9 km por las calles de Mónaco: corta, técnica, y la primera vez que el principado acoge una salida de La Vuelta. Eso convierte a Mónaco en el primer país que ha albergado la etapa inaugural de las tres grandes vueltas. Las diferencias serán pequeñas, pero en un recorrido tan duro incluso unos pocos segundos condicionan los primeros días de rojo.",
          "Desde ahí la carrera sube hacia la Provenza para afrontar la etapa más larga de toda La Vuelta, 215 km hasta Manosque, antes de girar hacia los Pirineos. La etapa 3 acaba en la estación de altura de Font Romeu y la 4 es un durísimo bucle de apenas 105 km alrededor de Andorra la Vella. Las etapas de montaña cortas suelen explotar pronto, y esta llega antes de que nadie haya encontrado su ritmo. España no se pisa hasta la etapa 5.",
        ],
      },
      {
        heading: "Grava, finales en alto y una crono decisiva",
        paragraphs: [
          "La novedad más comentada del recorrido llega en la etapa 6, hasta Castellón, que introduce sterrato: sectores de grava sin asfaltar poco habituales en esta carrera. La grava castiga la mala colocación e invita al caos mecánico, así que los equipos de la general pelearán por ir delante mucho antes de llegar a los tramos. Al día siguiente se sube a Aramón Valdelinares con las piernas ya cansadas.",
          "La segunda y la tercera semana son donde se decide la carrera. Calar Alto, en la etapa 12, es una de las subidas más largas de España y corona por encima de los 2.100 m: una prueba pura de potencia sostenida donde no hay dónde esconderse. La etapa 14 termina en la Sierra de la Pandera, históricamente uno de los finales más crueles de La Vuelta, estrecho y brutalmente empinado. Después llega la crono de 32,1 km entre El Puerto de Santa María y Jerez, la más larga de La Vuelta en años y la mayor oportunidad para que un rodador potente le dé la vuelta a la clasificación.",
        ],
      },
      {
        heading: "Andalucía y un final en la Alhambra",
        paragraphs: [
          "Las diez últimas etapas se disputan íntegramente en Andalucía, visitando sus ocho provincias por segunda vez en la historia. El calor del sur en septiembre es un factor en sí mismo, y los esprínters tienen sus últimas oportunidades en Palos de la Frontera y Sevilla antes de que vuelva la montaña.",
          "La etapa 20, de La Calahorra al Collado del Alguacil, en pleno entorno de Sierra Nevada, es la etapa reina y la última ocasión de cambiar la general. Y a diferencia de la mayoría de grandes vueltas, el último día no es un paseo: cuatro vueltas a un circuito por Granada con una subida de aproximadamente un kilómetro hasta la Alhambra mantienen la carrera viva hasta el final, en uno de los escenarios más espectaculares que jamás haya usado una gran vuelta.",
        ],
      },
    ],
    closingPrefix: "¿Crees que lo tienes claro?",
    closingLinkText: "Elige un ganador para cada etapa",
    closingHref: "/es/predictions",
    closingSuffix: "y comprueba cómo se comparan tus pronósticos con los de los demás. Las alineaciones se confirman la semana previa a la salida.",
  },

  ca: {
    metaTitle: "Previsió del Recorregut de La Vuelta 2026: de Mònaco a Granada",
    metaDescription:
      "Previsió de La Vuelta 2026: 21 etapes de Mònaco a Granada per quatre països, amb set etapes de muntanya, un sector de grava, una contrarellotge de 32,5 km i final en alt a l'Alhambra.",
    eyebrow: "Previsió del recorregut",
    h1: "Previsió del Recorregut de La Vuelta 2026: de Mònaco a Granada",
    intro:
      "La 81a edició de La Vuelta a Espanya és una de les més atípiques —i més exigents— de la seva història. Per primera vegada arrenca a Mònaco, travessa França i Andorra abans de trepitjar sòl espanyol, i no acaba a Madrid sinó en una pujada a l'Alhambra de Granada. En 21 etapes i 3.298 quilòmetres el pilot afronta set etapes de muntanya, un sector de grava i dues contrarellotges. Això és el que el recorregut ens diu sobre com es guanyarà aquesta cursa.",
    sections: [
      {
        heading: "Sortida a Mònaco i una cursa per quatre països",
        paragraphs: [
          "La Vuelta arrenca el 22 d'agost amb una contrarellotge individual de 9 km pels carrers de Mònaco: curta, tècnica, i la primera vegada que el principat acull una sortida de La Vuelta. Això converteix Mònaco en el primer país que ha acollit l'etapa inaugural de les tres grans voltes. Les diferències seran petites, però en un recorregut tan dur fins i tot uns pocs segons condicionen els primers dies de vermell.",
          "Des d'allà la cursa puja cap a la Provença per afrontar l'etapa més llarga de tota La Vuelta, 215 km fins a Manosque, abans de girar cap als Pirineus. L'etapa 3 acaba a l'estació d'altura de Font-romeu i la 4 és un duríssim circuit de tot just 105 km al voltant d'Andorra la Vella. Les etapes de muntanya curtes solen esclatar aviat, i aquesta arriba abans que ningú hagi trobat el seu ritme. Espanya no es trepitja fins a l'etapa 5.",
        ],
      },
      {
        heading: "Grava, finals en alt i una contrarellotge decisiva",
        paragraphs: [
          "La novetat més comentada del recorregut arriba a l'etapa 6, fins a Castelló, que introdueix sterrato: sectors de grava sense asfaltar poc habituals en aquesta cursa. La grava castiga la mala col·locació i convida al caos mecànic, així que els equips de la general lluitaran per anar davant molt abans d'arribar als trams. L'endemà es puja a Aramón Valdelinares amb les cames ja cansades.",
          "La segona i la tercera setmana són on es decideix la cursa. Calar Alto, a l'etapa 12, és una de les pujades més llargues d'Espanya i corona per damunt dels 2.100 m: una prova pura de potència sostinguda on no hi ha on amagar-se. L'etapa 14 acaba a la Sierra de la Pandera, històricament un dels finals més cruels de La Vuelta, estret i brutalment costerut. Després arriba la contrarellotge de 32,1 km entre El Puerto de Santa María i Jerez, la més llarga de La Vuelta en anys i la millor oportunitat perquè un rodador potent capgiri la classificació.",
        ],
      },
      {
        heading: "Andalusia i un final a l'Alhambra",
        paragraphs: [
          "Les deu últimes etapes es disputen íntegrament a Andalusia, visitant les seves vuit províncies per segona vegada en la història. La calor del sud al setembre és un factor en si mateix, i els esprintadors tenen les seves darreres oportunitats a Palos de la Frontera i Sevilla abans que torni la muntanya.",
          "L'etapa 20, de La Calahorra al Collado del Alguacil, en ple entorn de Sierra Nevada, és l'etapa reina i l'última ocasió de canviar la general. I a diferència de la majoria de grans voltes, l'últim dia no és un passeig: quatre voltes a un circuit per Granada amb una pujada d'aproximadament un quilòmetre fins a l'Alhambra mantenen la cursa viva fins al final, en un dels escenaris més espectaculars que mai hagi fet servir una gran volta.",
        ],
      },
    ],
    closingPrefix: "Creus que ho tens clar?",
    closingLinkText: "Tria un guanyador per a cada etapa",
    closingHref: "/predictions",
    closingSuffix: "i comprova com es comparen els teus pronòstics amb els de tothom. Les alineacions es confirmen la setmana prèvia a la sortida.",
  },

  fr: {
    metaTitle: "Aperçu du Parcours de La Vuelta 2026 : de Monaco à Grenade",
    metaDescription:
      "Aperçu de La Vuelta 2026 : 21 étapes de Monaco à Grenade à travers quatre pays, avec sept étapes de montagne, un secteur de gravel, un contre-la-montre de 32,5 km et une arrivée à l'Alhambra.",
    eyebrow: "Aperçu du parcours",
    h1: "Aperçu du Parcours de La Vuelta 2026 : de Monaco à Grenade",
    intro:
      "La 81e édition du Tour d'Espagne est l'une des plus atypiques — et des plus exigeantes — de son histoire. Pour la première fois elle part de Monaco, traverse la France et l'Andorre avant d'atteindre le sol espagnol, et se termine non pas à Madrid mais sur une montée vers l'Alhambra de Grenade. En 21 étapes et 3 298 kilomètres, le peloton affronte sept étapes de montagne, un secteur de gravel et deux contre-la-montre. Voici ce que le parcours nous dit de la manière dont cette course se gagnera.",
    sections: [
      {
        heading: "Un Grand Départ à Monaco et une course à travers quatre pays",
        paragraphs: [
          "La Vuelta s'ouvre le 22 août par un contre-la-montre individuel de 9 km dans les rues de Monaco : court, technique, et la première fois que la principauté accueille un départ de La Vuelta. Monaco devient ainsi le premier pays à avoir accueilli l'étape inaugurale des trois grands tours. Les écarts seront minimes, mais sur un parcours aussi dur, même quelques secondes façonnent les premiers jours en rouge.",
          "La course remonte ensuite vers la Provence pour l'étape la plus longue de toute La Vuelta, 215 km jusqu'à Manosque, avant de bifurquer vers les Pyrénées. L'étape 3 se termine à la station d'altitude de Font-Romeu et l'étape 4 est une boucle terriblement compacte de 105 km autour d'Andorre-la-Vieille. Les étapes de montagne courtes explosent souvent tôt, et celle-ci arrive avant que quiconque ait trouvé son rythme. L'Espagne n'est atteinte qu'à l'étape 5.",
        ],
      },
      {
        heading: "Gravel, arrivées au sommet et un chrono décisif",
        paragraphs: [
          "La nouveauté la plus commentée du parcours arrive à l'étape 6, vers Castellón, qui introduit le sterrato : des secteurs de gravier non revêtus, rares dans cette course. Le gravel punit le mauvais placement et invite au chaos mécanique ; les équipes du général se battront donc pour l'avant bien avant d'atteindre les secteurs. Le lendemain grimpe vers Aramón Valdelinares sur des jambes déjà fatiguées.",
          "Les deuxième et troisième semaines décident de la course. Calar Alto, à l'étape 12, est l'une des plus longues ascensions d'Espagne et culmine au-dessus de 2 100 m : un test pur de puissance soutenue où l'on ne peut pas se cacher. L'étape 14 se termine sur la Sierra de la Pandera, historiquement l'une des montées les plus cruelles de La Vuelta, étroite et sauvagement raide. Vient ensuite le contre-la-montre de 32,1 km entre El Puerto de Santa María et Jerez, le plus long de La Vuelta depuis des années et la meilleure occasion pour un rouleur puissant de renverser le classement.",
        ],
      },
      {
        heading: "L'Andalousie et une arrivée à l'Alhambra",
        paragraphs: [
          "Les dix dernières étapes se déroulent entièrement en Andalousie, visitant ses huit provinces pour la deuxième fois seulement. La chaleur du sud en septembre est un facteur en soi, et les sprinteurs auront leurs dernières chances à Palos de la Frontera et Séville avant le retour de la montagne.",
          "L'étape 20, de La Calahorra au Collado del Alguacil, au cœur de la Sierra Nevada, est l'étape reine et la dernière occasion de changer le général. Et contrairement à la plupart des grands tours, le dernier jour n'est pas une parade : quatre tours d'un circuit à Grenade avec une montée d'environ un kilomètre vers l'Alhambra maintiennent la course ouverte jusqu'au bout, dans l'un des cadres les plus spectaculaires jamais utilisés par un grand tour.",
        ],
      },
    ],
    closingPrefix: "Vous pensez pouvoir le prédire ?",
    closingLinkText: "Choisissez un vainqueur pour chaque étape",
    closingHref: "/predictions",
    closingSuffix: "et comparez vos pronostics à ceux de tout le monde. Les compositions d'équipes sont confirmées la semaine précédant le départ.",
  },

  it: {
    metaTitle: "Anteprima del Percorso della Vuelta 2026: da Monaco a Granada",
    metaDescription:
      "Anteprima della Vuelta 2026: 21 tappe da Monaco a Granada attraverso quattro paesi, con sette tappe di montagna, un settore di sterrato, una cronometro di 32,5 km e arrivo in salita all'Alhambra.",
    eyebrow: "Anteprima del percorso",
    h1: "Anteprima del Percorso della Vuelta 2026: da Monaco a Granada",
    intro:
      "L'81ª edizione della Vuelta di Spagna è una delle più atipiche — e più impegnative — della sua storia. Per la prima volta parte da Monaco, attraversa Francia e Andorra prima di toccare il suolo spagnolo, e non finisce a Madrid ma su una salita verso l'Alhambra di Granada. In 21 tappe e 3.298 chilometri il gruppo affronta sette tappe di montagna, un settore di sterrato e due cronometro. Ecco cosa ci dice il percorso su come si vincerà questa corsa.",
    sections: [
      {
        heading: "Grande Partenza a Monaco e una corsa in quattro paesi",
        paragraphs: [
          "La Vuelta si apre il 22 agosto con una cronometro individuale di 9 km per le strade di Monaco: corta, tecnica, e la prima volta che il principato ospita una partenza della Vuelta. Monaco diventa così il primo paese ad aver ospitato la tappa inaugurale di tutti e tre i grandi giri. I distacchi saranno minimi, ma su un percorso così duro anche pochi secondi condizionano i primi giorni in rosso.",
          "Da lì la corsa risale verso la Provenza per la tappa più lunga dell'intera Vuelta, 215 km fino a Manosque, prima di piegare verso i Pirenei. La tappa 3 finisce nella stazione d'altura di Font Romeu e la 4 è un durissimo circuito di appena 105 km attorno ad Andorra la Vella. Le tappe di montagna corte tendono a esplodere presto, e questa arriva prima che qualcuno abbia trovato il ritmo. La Spagna si tocca solo alla tappa 5.",
        ],
      },
      {
        heading: "Sterrato, arrivi in salita e una cronometro decisiva",
        paragraphs: [
          "La novità più discussa del percorso arriva alla tappa 6, verso Castellón, che introduce lo sterrato: settori di ghiaia non asfaltati, rari in questa corsa. Lo sterrato punisce il cattivo posizionamento e invita al caos meccanico, quindi le squadre della generale lotteranno per stare davanti molto prima di arrivare ai settori. Il giorno dopo si sale ad Aramón Valdelinares con le gambe già stanche.",
          "La seconda e la terza settimana decidono la corsa. Calar Alto, alla tappa 12, è una delle salite più lunghe di Spagna e scollina oltre i 2.100 m: una prova pura di potenza prolungata dove non ci si può nascondere. La tappa 14 finisce sulla Sierra de la Pandera, storicamente uno degli arrivi più crudeli della Vuelta, stretto e brutalmente ripido. Poi arriva la cronometro di 32,1 km tra El Puerto de Santa María e Jerez, la più lunga della Vuelta da anni e la maggiore occasione per un passista potente di ribaltare la classifica.",
        ],
      },
      {
        heading: "Andalusia e un finale all'Alhambra",
        paragraphs: [
          "Le ultime dieci tappe si svolgono interamente in Andalusia, visitandone tutte e otto le province per la seconda volta nella storia. Il caldo del sud a settembre è di per sé un fattore, e i velocisti avranno le ultime occasioni a Palos de la Frontera e Siviglia prima del ritorno della montagna.",
          "La tappa 20, da La Calahorra al Collado del Alguacil, nel cuore della Sierra Nevada, è la tappa regina e l'ultima possibilità di cambiare la generale. E a differenza della maggior parte dei grandi giri, l'ultimo giorno non è una passerella: quattro giri di un circuito a Granada con una salita di circa un chilometro verso l'Alhambra tengono la corsa aperta fino alla fine, in una delle cornici più spettacolari mai usate da un grande giro.",
        ],
      },
    ],
    closingPrefix: "Pensi di saperlo prevedere?",
    closingLinkText: "Scegli un vincitore per ogni tappa",
    closingHref: "/predictions",
    closingSuffix: "e scopri come si confrontano i tuoi pronostici con quelli di tutti gli altri. Le formazioni sono confermate nella settimana precedente la partenza.",
  },

  nl: {
    metaTitle: "Parcours Preview Vuelta 2026: van Monaco naar Granada",
    metaDescription:
      "Vuelta 2026 preview: 21 etappes van Monaco naar Granada door vier landen, met zeven bergetappes, een gravelsector, een tijdrit van 32,5 km en een aankomst bergop bij het Alhambra.",
    eyebrow: "Parcours preview",
    h1: "Parcours Preview Vuelta 2026: van Monaco naar Granada",
    intro:
      "De 81e editie van de Ronde van Spanje is een van de meest bijzondere — en zwaarste — uit de geschiedenis van de koers. Voor het eerst start hij in Monaco, doorkruist Frankrijk en Andorra voordat Spaanse bodem wordt bereikt, en eindigt niet in Madrid maar op een klim naar het Alhambra in Granada. Over 21 etappes en 3.298 kilometer wachten het peloton zeven bergetappes, een gravelsector en twee tijdritten. Dit is wat het parcours zegt over hoe deze koers gewonnen wordt.",
    sections: [
      {
        heading: "Grand Départ in Monaco en een koers door vier landen",
        paragraphs: [
          "De Vuelta begint op 22 augustus met een individuele tijdrit van 9 km door de straten van Monaco: kort, technisch, en de eerste keer dat het prinsdom een Vueltastart organiseert. Daarmee is Monaco het eerste land dat de openingsetappe van alle drie de grote rondes heeft gehuisvest. De verschillen blijven klein, maar op zo'n zwaar parcours bepalen zelfs enkele seconden de eerste dagen in het rood.",
          "Vanaf daar trekt de koers noordwaarts naar de Provence voor de langste etappe van de hele Vuelta, 215 km naar Manosque, om daarna af te buigen richting de Pyreneeën. Etappe 3 eindigt in het hooggelegen Font Romeu en etappe 4 is een loodzware lus van amper 105 km rond Andorra la Vella. Korte bergetappes ontploffen doorgaans vroeg, en deze komt voordat iemand zijn ritme heeft gevonden. Spanje wordt pas in etappe 5 bereikt.",
        ],
      },
      {
        heading: "Gravel, aankomsten bergop en een beslissende tijdrit",
        paragraphs: [
          "De meest besproken noviteit van het parcours komt in etappe 6 naar Castellón, met sterrato: onverharde gravelsectoren die zelden in deze koers voorkomen. Gravel straft slechte positionering af en nodigt uit tot mechanische chaos, dus de klassementsploegen zullen ver voor de sectoren al om de kop strijden. De dag erna gaat het omhoog naar Aramón Valdelinares op vermoeide benen.",
          "De tweede en derde week beslissen de koers. Calar Alto in etappe 12 is een van de langste klimmen van Spanje en gaat tot boven de 2.100 m: een pure test van aanhoudend vermogen waar niemand zich kan verstoppen. Etappe 14 eindigt op de Sierra de la Pandera, historisch een van de wreedste aankomsten van de Vuelta, smal en meedogenloos steil. Daarna volgt de tijdrit van 32,5 km tussen El Puerto de Santa María en Jerez, de langste Vueltatijdrit in jaren en de grootste kans voor een krachtige rouleur om het klassement om te gooien.",
        ],
      },
      {
        heading: "Andalusië en een finish bij het Alhambra",
        paragraphs: [
          "De laatste tien etappes vinden volledig in Andalusië plaats, met een bezoek aan alle acht provincies voor pas de tweede keer. De zuidelijke hitte in september is op zichzelf al een factor, en de sprinters krijgen hun laatste kansen in Palos de la Frontera en Sevilla voordat de bergen terugkeren.",
          "Etappe 20, van La Calahorra naar de Collado del Alguacil, midden in de Sierra Nevada, is de koninginnenrit en de laatste kans om het klassement te veranderen. En anders dan in de meeste grote rondes is de slotdag geen parade: vier ronden op een parcours door Granada met een klim van ongeveer een kilometer naar het Alhambra houden de koers tot het einde open, in een van de spectaculairste decors die ooit door een grote ronde is gebruikt.",
        ],
      },
    ],
    closingPrefix: "Denk je het te kunnen voorspellen?",
    closingLinkText: "Kies een winnaar voor elke etappe",
    closingHref: "/predictions",
    closingSuffix: "en kijk hoe jouw voorspellingen het doen tegenover die van iedereen. De ploegsamenstellingen worden bevestigd in de week voor de start.",
  },
  },

  "tour-de-france-2026": {
  en: {
    metaTitle: "2026 Tour de France Preview & Favourites: The Ultimate Show",
    metaDescription:
      "Tour de France 2026 preview: Pogačar vs Vingegaard vs Evenepoel for yellow, Jonathan Milan and Jasper Philipsen in the sprints, and Paul Seixas among the rising stars to watch.",
    eyebrow: "Pre-Tour analysis",
    h1: "2026 Tour de France Preview & Favourites: The Ultimate Show",
    intro:
      "The 2026 Tour de France promises to be one of the most epic and demanding editions of the decade. From the historic opening team time trial through the streets of Barcelona to the brutal double climb up Alpe d'Huez in the final week, the peloton will be pushed to its limits over 3,321 kilometres. We break down the 25 riders who will shape the race, from the general classification favourites to the kings of the sprint and the great stage hunters.",
    sections: [
      {
        heading: "The Battle for Yellow: Kings of the General Classification",
        paragraphs: [
          "The fight for glory in Paris has one clear favourite arriving off a dominant spring: **Tadej Pogačar** (UAE Team Emirates-XRG), chasing his fifth Tour title. Standing in his way is his great historic rival **Jonas Vingegaard** (Visma-Lease a Bike), along with a **Remco Evenepoel** (Red Bull-BORA-hansgrohe) arriving more mature than ever.",
          "But the real revolution of 2026 is the new generation already poised to storm the podium. All eyes are on 19-year-old Frenchman **Paul Seixas** (Decathlon CMA CGM), the great home hope, alongside talents such as **Isaac del Toro** and **Florian Lipowitz**. Keep a close watch too on key figures like the tireless **Sepp Kuss** and the versatility of **Matteo Jorgenson** at Visma, the consistency of **Kévin Vauquelin** (Ineos Grenadiers), **David Gaudu** (Groupama-FDJ United), **João Almeida** and **Mattias Skjelmose** as they battle for places of honour in the high mountains.",
        ],
      },
      {
        heading: "Pure Speed: The Contenders for Green",
        paragraphs: [
          "When the road flattens out, the peloton shifts gear and the strategy changes completely. This year **Jonathan Milan** (Lidl-Trek) starts as the big favourite to impose his immense power in the bunch sprints, but **Jasper Philipsen** (Alpecin-Premier Tech) will lean on his vast Tour experience to try to dethrone him. The other big name in pure speed is **Tim Merlier** (Soudal Quick-Step).",
          "The list of riders capable of sprinting at over 70 km/h is rounded out by fearsome names such as the explosive **Biniam Girmay**, Belgian idol **Arnaud De Lie**, the pinpoint positioning of **Olav Kooij**, and fast, resilient profiles like **Jordi Meeus** and **Bryan Coquard**. None of them will give up a single metre in the fight for the prized green jersey.",
        ],
      },
      {
        heading: "The Outsiders and Stage Hunters",
        paragraphs: [
          "The Tour isn't only about the overall standings and mass sprints. The medium-mountain stages and the days made for ambushes will be pure theatre for riders with a gift for breaking the race open from a distance. The two great geniuses will obviously be there: **Julian Alaphilippe** and **Mathieu van der Poel** are always good for a show, and they know how to ride on another level once the race breaks apart.",
          "Add to that all-terrain riders like **Tom Pidcock**, who will be chasing iconic mountain wins. Rounding out the list are combative, gutsy riders such as young Frenchmen **Lenny Martinez** and **Jordan Jegat**, who promise breakaways worthy of legend this year. Who will be the big surprise of 2026?",
        ],
      },
    ],
    closingPrefix: "Think you've got it figured out?",
    closingLinkText: "Pick a winner for every stage",
    closingHref: "/predictions",
    closingSuffix: "and see how your predictions stack up against everyone else's.",
  },

  es: {
    metaTitle: "Previa y Favoritos del Tour de Francia 2026: El espectáculo definitivo",
    metaDescription:
      "Previa del Tour de Francia 2026: Pogačar contra Vingegaard contra Evenepoel por el amarillo, Jonathan Milan y Jasper Philipsen en los sprints, y Paul Seixas entre las jóvenes promesas a seguir.",
    eyebrow: "Análisis previo",
    h1: "Previa y Favoritos del Tour de Francia 2026: El espectáculo definitivo",
    intro:
      "El Tour de Francia 2026 promete ser una de las ediciones más épicas y exigentes de la década. Desde la histórica contrarreloj por equipos inicial por las calles de Barcelona, hasta el demoledor doble ascenso al Alpe d'Huez en la última semana, los corredores tendrán que pedalear al límite de sus fuerzas durante 3.321 kilómetros. Analizamos a los 25 ciclistas que marcarán la carrera, divididos entre los favoritos a la clasificación general, los reyes del esprint y los grandes cazadores de etapas.",
    sections: [
      {
        heading: "La Lucha por el Maillot Amarillo: Los reyes de la General",
        paragraphs: [
          "La batalla por la gloria en París tiene un favorito clarísimo que llega de arrasar en la primavera: **Tadej Pogačar** (UAE Team Emirates-XRG), que busca su quinto Tour. Enfrente tendrá a su gran rival histórico, **Jonas Vingegaard** (Visma-Lease a Bike), y a un **Remco Evenepoel** (Red Bull-BORA-hansgrohe) que llega más maduro que nunca.",
          "Pero la gran revolución de este 2026 es la nueva generación que ya está preparada para asaltar el podio. Todas las miradas están puestas en el joven francés de 19 años **Paul Seixas** (Decathlon CMA CGM), la gran esperanza local, junto con talentos como **Isaac del Toro** y **Florian Lipowitz**. Habrá que seguir muy de cerca a figuras clave como el incombustible **Sepp Kuss** y la versatilidad de **Matteo Jorgenson** por parte del Visma, la solidez de **Kévin Vauquelin** (Ineos Grenadiers), **David Gaudu** (Groupama-FDJ United), **João Almeida** y **Mattias Skjelmose** en la lucha por los puestos de honor en la alta montaña.",
        ],
      },
      {
        heading: "Velocidad Pura: Los aspirantes al Maillot Verde",
        paragraphs: [
          "Cuando la carretera se aplana, el pelotón cambia de ritmo y la estrategia se transforma. Este año, **Jonathan Milan** (Lidl-Trek) parte como el gran favorito para imponer su potencia descomunal en las llegadas masivas, pero **Jasper Philipsen** (Alpecin-Premier Tech) hará valer su enorme experiencia en el Tour para destronarlo. El otro gran nombre propio de la velocidad pura es **Tim Merlier** (Soudal Quick-Step).",
          "La lista de aspirantes a esprintar a más de 70 km/h la completan nombres temibles como el explosivo **Biniam Girmay**, el ídolo belga **Arnaud De Lie**, la colocación milimétrica de **Olav Kooij**, y perfiles rápidos y resistentes como **Jordi Meeus** y **Bryan Coquard**. Ninguno de ellos regalará un solo metro para conseguir el preciado maillot verde.",
        ],
      },
      {
        heading: "Los Outsiders y Cazadores de Etapas",
        paragraphs: [
          "El Tour no solo vive de la general y los esprints masivos. Las etapas de media montaña y las jornadas con emboscadas serán terreno de espectáculo puro para ciclistas que tienen el don de romper la carrera desde lejos. Evidentemente, los dos grandes genios no faltarán: **Julian Alaphilippe** y **Mathieu van der Poel** siempre son garantía de show y saben pedalear a otro nivel cuando la carrera se rompe.",
          "Además, perfiles todoterreno como **Tom Pidcock** buscarán triunfos icónicos en la montaña. La lista la cierran corredores combativos y valientes como los jóvenes franceses **Lenny Martinez** y **Jordan Jegat**, que garantizan que las escapadas de este año tengan un nivel digno de leyenda. ¿Quién será la gran sorpresa de este 2026?",
        ],
      },
    ],
    closingPrefix: "¿Crees que lo tienes claro?",
    closingLinkText: "Elige un ganador para cada etapa",
    closingHref: "/es/predictions",
    closingSuffix: "y comprueba cómo se comparan tus pronósticos con los de los demás.",
  },

  ca: {
    metaTitle: "Previsió i Favorits del Tour de França 2026: L'espectacle definitiu",
    metaDescription:
      "Previsió del Tour de França 2026: Pogačar contra Vingegaard contra Evenepoel pel mallot groc, Jonathan Milan i Jasper Philipsen als esprints, i Paul Seixas entre les joves promeses a seguir.",
    eyebrow: "Anàlisi prèvia",
    h1: "Previsió i Favorits del Tour de França 2026: L'espectacle definitiu",
    intro:
      "El Tour de França 2026 promet ser una de les edicions més èpiques i exigents de la dècada. Des de la històrica contrarellotge per equips inicial pels carrers de Barcelona, fins al demolidor doble ascens a l'Alpe d'Huez en l'última setmana, els corredors hauran de pedalar al límit de les seves forces durant 3.321 quilòmetres. Analitzem els 25 ciclistes que marcaran la cursa, dividits entre els favorits a la classificació general, els reis de l'esprint i els grans caçadors d'etapes.",
    sections: [
      {
        heading: "La lluita pel mallot groc: els reis de la general",
        paragraphs: [
          "La batalla per la glòria a París té un favorit claríssim que arriba d'arrasar a la primavera: **Tadej Pogačar** (UAE Team Emirates-XRG), que busca el seu cinquè Tour. Davant tindrà el seu gran rival històric, **Jonas Vingegaard** (Visma-Lease a Bike), i un **Remco Evenepoel** (Red Bull-BORA-hansgrohe) que arriba més madur que mai.",
          "Però la gran revolució d'aquest 2026 és la nova generació que ja està preparada per assaltar el podi. Totes les mirades estan posades en el jove francès de 19 anys **Paul Seixas** (Decathlon CMA CGM), la gran esperança local, juntament amb talents com **Isaac del Toro** i **Florian Lipowitz**. Caldrà seguir molt de prop figures clau com l'incombustible **Sepp Kuss** i la versatilitat de **Matteo Jorgenson** per part del Visma, la solidesa de **Kévin Vauquelin** (Ineos Grenadiers), **David Gaudu** (Groupama-FDJ United), **João Almeida** i **Mattias Skjelmose** en la lluita pels llocs d'honor a l'alta muntanya.",
        ],
      },
      {
        heading: "Velocitat pura: els aspirants al mallot verd",
        paragraphs: [
          "Quan la carretera s'aplana, el pilot canvia de ritme i l'estratègia es transforma. Aquest any, **Jonathan Milan** (Lidl-Trek) surt com el gran favorit per imposar la seva potència descomunal a les arribades massives, però **Jasper Philipsen** (Alpecin-Premier Tech) farà valer la seva enorme experiència al Tour per intentar destronar-lo. L'altre gran nom propi de la velocitat pura és **Tim Merlier** (Soudal Quick-Step).",
          "La llista d'aspirants a esprintar a més de 70 km/h la completen noms temibles com l'explosiu **Biniam Girmay**, l'ídol belga **Arnaud De Lie**, la col·locació mil·limètrica d'**Olav Kooij**, i perfils ràpids i resistents com **Jordi Meeus** i **Bryan Coquard**. Cap d'ells regalarà ni un metre per aconseguir el preuat mallot verd.",
        ],
      },
      {
        heading: "Els outsiders i caçadors d'etapes",
        paragraphs: [
          "El Tour no viu només de la general i els esprints massius. Les etapes de mitja muntanya i les jornades amb emboscades seran terreny d'espectacle pur per a ciclistes que tenen el do de trencar la cursa des de lluny. Evidentment, els dos grans genis no hi faltaran: **Julian Alaphilippe** i **Mathieu van der Poel** sempre són garantia d'espectacle i saben pedalar a un altre nivell quan la cursa es trenca.",
          "A més, perfils polivalents com **Tom Pidcock** buscaran triomfs icònics a la muntanya. La llista la tanquen corredors combatius i valents com els joves francesos **Lenny Martinez** i **Jordan Jegat**, que garanteixen que les escapades d'aquest any tinguin un nivell digne de llegenda. Qui serà la gran sorpresa d'aquest 2026?",
        ],
      },
    ],
    closingPrefix: "Creus que ho tens clar?",
    closingLinkText: "Tria un guanyador per a cada etapa",
    closingHref: "/predictions",
    closingSuffix: "i comprova com es comparen els teus pronòstics amb els de tothom.",
  },

  fr: {
    metaTitle: "Aperçu et Favoris du Tour de France 2026 : Le spectacle ultime",
    metaDescription:
      "Aperçu du Tour de France 2026 : Pogačar contre Vingegaard contre Evenepoel pour le maillot jaune, Jonathan Milan et Jasper Philipsen dans les sprints, et Paul Seixas parmi les jeunes talents à suivre.",
    eyebrow: "Analyse d'avant-Tour",
    h1: "Aperçu et Favoris du Tour de France 2026 : Le spectacle ultime",
    intro:
      "Le Tour de France 2026 promet d'être l'une des éditions les plus épiques et exigeantes de la décennie. Du contre-la-montre par équipes inaugural dans les rues de Barcelone à la redoutable double ascension de l'Alpe d'Huez lors de la dernière semaine, les coureurs devront pédaler à la limite de leurs forces sur 3 321 kilomètres. Nous passons en revue les 25 cyclistes qui marqueront la course, entre les favoris au classement général, les rois du sprint et les grands chasseurs d'étapes.",
    sections: [
      {
        heading: "La lutte pour le maillot jaune : les rois du général",
        paragraphs: [
          "La bataille pour la gloire à Paris a un favori très clair qui arrive après avoir dominé le printemps : **Tadej Pogačar** (UAE Team Emirates-XRG), en quête de son cinquième Tour. Face à lui, son grand rival historique **Jonas Vingegaard** (Visma-Lease a Bike), ainsi qu'un **Remco Evenepoel** (Red Bull-BORA-hansgrohe) plus mature que jamais.",
          "Mais la grande révolution de cette édition 2026, c'est la nouvelle génération déjà prête à assaillir le podium. Tous les regards se tournent vers le jeune Français de 19 ans **Paul Seixas** (Decathlon CMA CGM), grand espoir local, ainsi que des talents comme **Isaac del Toro** et **Florian Lipowitz**. Il faudra aussi suivre de près des figures clés comme l'infatigable **Sepp Kuss** et la polyvalence de **Matteo Jorgenson** chez Visma, la solidité de **Kévin Vauquelin** (Ineos Grenadiers), **David Gaudu** (Groupama-FDJ United), **João Almeida** et **Mattias Skjelmose** dans la lutte pour les places d'honneur en haute montagne.",
        ],
      },
      {
        heading: "Vitesse pure : les prétendants au maillot vert",
        paragraphs: [
          "Quand la route s'aplatit, le peloton change de rythme et la stratégie se transforme. Cette année, **Jonathan Milan** (Lidl-Trek) part grand favori pour imposer sa puissance phénoménale dans les arrivées massives, mais **Jasper Philipsen** (Alpecin-Premier Tech) fera valoir sa grande expérience du Tour pour tenter de le détrôner. L'autre grand nom de la vitesse pure est **Tim Merlier** (Soudal Quick-Step).",
          "La liste des prétendants capables de sprinter à plus de 70 km/h se complète avec des noms redoutables comme l'explosif **Biniam Girmay**, l'idole belge **Arnaud De Lie**, le placement millimétré d'**Olav Kooij**, et des profils rapides et résistants comme **Jordi Meeus** et **Bryan Coquard**. Aucun d'eux ne cédera le moindre mètre pour décrocher le précieux maillot vert.",
        ],
      },
      {
        heading: "Les outsiders et chasseurs d'étapes",
        paragraphs: [
          "Le Tour ne se résume pas au général et aux sprints massifs. Les étapes de moyenne montagne et les journées à embuscades seront un terrain de spectacle pur pour les coureurs qui ont le don de faire exploser la course à distance. Les deux grands génies seront évidemment au rendez-vous : **Julian Alaphilippe** et **Mathieu van der Poel** sont toujours une garantie de spectacle et savent pédaler à un autre niveau quand la course se brise.",
          "À cela s'ajoutent des profils polyvalents comme **Tom Pidcock**, qui viseront des victoires emblématiques en montagne. La liste se termine avec des coureurs combatifs et courageux comme les jeunes Français **Lenny Martinez** et **Jordan Jegat**, qui promettent des échappées dignes d'une légende cette année. Qui sera la grande surprise de 2026 ?",
        ],
      },
    ],
    closingPrefix: "Vous pensez avoir tout compris ?",
    closingLinkText: "Choisissez un vainqueur pour chaque étape",
    closingHref: "/predictions",
    closingSuffix: "et comparez vos pronostics à ceux de tout le monde.",
  },

  it: {
    metaTitle: "Anteprima e Favoriti del Tour de France 2026: Lo spettacolo definitivo",
    metaDescription:
      "Anteprima del Tour de France 2026: Pogačar contro Vingegaard contro Evenepoel per la maglia gialla, Jonathan Milan e Jasper Philipsen negli sprint, e Paul Seixas tra i giovani da seguire.",
    eyebrow: "Analisi pre-Tour",
    h1: "Anteprima e Favoriti del Tour de France 2026: Lo spettacolo definitivo",
    intro:
      "Il Tour de France 2026 promette di essere una delle edizioni più epiche ed esigenti del decennio. Dalla storica cronometro a squadre iniziale per le strade di Barcellona, alla durissima doppia ascesa all'Alpe d'Huez nell'ultima settimana, i corridori dovranno pedalare al limite delle loro forze per 3.321 chilometri. Analizziamo i 25 ciclisti che segneranno la corsa, divisi tra i favoriti per la classifica generale, i re della volata e i grandi cacciatori di tappe.",
    sections: [
      {
        heading: "La lotta per la maglia gialla: i re della generale",
        paragraphs: [
          "La battaglia per la gloria a Parigi ha un favorito chiarissimo, reduce da una primavera dominante: **Tadej Pogačar** (UAE Team Emirates-XRG), a caccia del suo quinto Tour. Di fronte avrà il suo grande rivale storico, **Jonas Vingegaard** (Visma-Lease a Bike), e un **Remco Evenepoel** (Red Bull-BORA-hansgrohe) più maturo che mai.",
          "Ma la grande rivoluzione di questo 2026 è la nuova generazione già pronta ad assalire il podio. Tutti gli occhi sono puntati sul giovane francese di 19 anni **Paul Seixas** (Decathlon CMA CGM), la grande speranza di casa, insieme a talenti come **Isaac del Toro** e **Florian Lipowitz**. Bisognerà seguire molto da vicino figure chiave come l'infaticabile **Sepp Kuss** e la versatilità di **Matteo Jorgenson** in casa Visma, la solidità di **Kévin Vauquelin** (Ineos Grenadiers), **David Gaudu** (Groupama-FDJ United), **João Almeida** e **Mattias Skjelmose** nella lotta per i posti d'onore in alta montagna.",
        ],
      },
      {
        heading: "Velocità pura: i pretendenti alla maglia verde",
        paragraphs: [
          "Quando la strada si appiana, il gruppo cambia ritmo e la strategia si trasforma. Quest'anno **Jonathan Milan** (Lidl-Trek) parte come grande favorito per imporre la sua potenza straordinaria negli arrivi in volata, ma **Jasper Philipsen** (Alpecin-Premier Tech) farà valere la sua enorme esperienza al Tour per provare a detronizzarlo. L'altro grande nome della velocità pura è **Tim Merlier** (Soudal Quick-Step).",
          "La lista dei pretendenti capaci di volare a più di 70 km/h si completa con nomi temibili come l'esplosivo **Biniam Girmay**, l'idolo belga **Arnaud De Lie**, il posizionamento millimetrico di **Olav Kooij**, e profili veloci e resistenti come **Jordi Meeus** e **Bryan Coquard**. Nessuno di loro regalerà un solo metro per conquistare la preziosa maglia verde.",
        ],
      },
      {
        heading: "Gli outsider e i cacciatori di tappe",
        paragraphs: [
          "Il Tour non vive solo di classifica generale e volate di gruppo. Le tappe di media montagna e le giornate con imboscate saranno terreno di puro spettacolo per i corridori che hanno il dono di spaccare la corsa da lontano. I due grandi geni, ovviamente, non mancheranno: **Julian Alaphilippe** e **Mathieu van der Poel** sono sempre garanzia di show e sanno pedalare su un altro livello quando la corsa si spacca.",
          "A questi si aggiungono profili completi come **Tom Pidcock**, a caccia di vittorie iconiche in montagna. La lista si chiude con corridori combattivi e coraggiosi come i giovani francesi **Lenny Martinez** e **Jordan Jegat**, che garantiscono fughe di livello leggendario quest'anno. Chi sarà la grande sorpresa di questo 2026?",
        ],
      },
    ],
    closingPrefix: "Pensi di averci capito qualcosa?",
    closingLinkText: "Scegli un vincitore per ogni tappa",
    closingHref: "/predictions",
    closingSuffix: "e scopri come si confrontano i tuoi pronostici con quelli di tutti gli altri.",
  },

  nl: {
    metaTitle: "Preview en Favorieten Tour de France 2026: Het ultieme spektakel",
    metaDescription:
      "Preview van de Tour de France 2026: Pogačar tegen Vingegaard tegen Evenepoel om geel, Jonathan Milan en Jasper Philipsen in de sprints, en Paul Seixas tussen de namen om in de gaten te houden.",
    eyebrow: "Analyse vooraf",
    h1: "Preview en Favorieten Tour de France 2026: Het ultieme spektakel",
    intro:
      "De Tour de France 2026 belooft een van de meest epische en zware edities van het decennium te worden. Van de historische openingsploegentijdrit door de straten van Barcelona tot de verwoestende dubbele beklimming van de Alpe d'Huez in de laatste week, de renners zullen tot het uiterste moeten gaan over 3.321 kilometer. We bespreken de 25 renners die de koers zullen bepalen, verdeeld over de favorieten voor het algemeen klassement, de koningen van de sprint en de grote etappejagers.",
    sections: [
      {
        heading: "De strijd om geel: de koningen van het klassement",
        paragraphs: [
          "De strijd om de roem in Parijs heeft één duidelijke favoriet, fris van een dominante voorjaarscampagne: **Tadej Pogačar** (UAE Team Emirates-XRG), op jacht naar zijn vijfde Tourzege. Tegenover hem staat zijn grote historische rivaal **Jonas Vingegaard** (Visma-Lease a Bike), plus een **Remco Evenepoel** (Red Bull-BORA-hansgrohe) die rijper aankomt dan ooit.",
          "Maar de echte revolutie van 2026 is de nieuwe generatie die al klaarstaat om het podium te bestormen. Alle ogen zijn gericht op de 19-jarige Fransman **Paul Seixas** (Decathlon CMA CGM), de grote thuishoop, samen met talenten als **Isaac del Toro** en **Florian Lipowitz**. Houd ook sleutelfiguren als de onvermoeibare **Sepp Kuss** en de veelzijdigheid van **Matteo Jorgenson** bij Visma goed in de gaten, net als de degelijkheid van **Kévin Vauquelin** (Ineos Grenadiers), **David Gaudu** (Groupama-FDJ United), **João Almeida** en **Mattias Skjelmose** in de strijd om de eerplaatsen in het hooggebergte.",
        ],
      },
      {
        heading: "Pure snelheid: de kandidaten voor groen",
        paragraphs: [
          "Wanneer de weg vlak wordt, verandert het peloton van tempo en verandert ook de strategie volledig. Dit jaar start **Jonathan Milan** (Lidl-Trek) als grote favoriet om zijn enorme kracht in de massasprints op te leggen, maar **Jasper Philipsen** (Alpecin-Premier Tech) zal zijn grote Tour-ervaring inzetten om hem te onttronen. De andere grote naam van de pure snelheid is **Tim Merlier** (Soudal Quick-Step).",
          "De lijst van renners die met meer dan 70 km/u kunnen sprinten wordt aangevuld met gevaarlijke namen als de explosieve **Biniam Girmay**, het Belgische idool **Arnaud De Lie**, de millimeterprecisie van **Olav Kooij**, en snelle, sterke profielen als **Jordi Meeus** en **Bryan Coquard**. Niemand van hen zal een meter weggeven in de strijd om de felbegeerde groene trui.",
        ],
      },
      {
        heading: "De outsiders en etappejagers",
        paragraphs: [
          "De Tour draait niet alleen om het klassement en de massasprints. De middelgebergte-etappes en de dagen met hinderlagen worden puur spektakel voor renners met het talent om de koers van ver open te breken. De twee grote genieën ontbreken natuurlijk niet: **Julian Alaphilippe** en **Mathieu van der Poel** staan altijd garant voor een show en weten op een ander niveau te koersen wanneer de wedstrijd uit elkaar valt.",
          "Daarbij komen allround renners als **Tom Pidcock**, die jagen op iconische bergoverwinningen. De lijst wordt afgesloten met strijdlustige en moedige renners als de jonge Fransen **Lenny Martinez** en **Jordan Jegat**, die garanderen dat de ontsnappingen dit jaar een legendarisch niveau halen. Wie wordt de grote verrassing van 2026?",
        ],
      },
    ],
    closingPrefix: "Denk je het door te hebben?",
    closingLinkText: "Kies een winnaar voor elke etappe",
    closingHref: "/predictions",
    closingSuffix: "en kijk hoe jouw voorspellingen het doen tegenover die van iedereen.",
  },
},
};

// Backwards-compatible alias: the active race's article set.
export const PREVIEW_ARTICLE = PREVIEW_ARTICLES[ACTIVE_RACE_SLUG];

export function getPreviewArticle(lang, raceSlug) {
  const set = PREVIEW_ARTICLES[raceSlug || ACTIVE_RACE_SLUG] || PREVIEW_ARTICLES[ACTIVE_RACE_SLUG];
  return set[lang] || set.en;
}
