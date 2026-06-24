// lib/previewArticle.js
//
// Single source of truth for the "2026 Tour de France preview & favourites"
// article, in all 6 site languages. Used by:
//   - app/preview/page.js, app/es/preview/page.js, app/ca/preview/page.js,
//     app/fr/preview/page.js, app/it/preview/page.js, app/nl/preview/page.js
//   - the SEO content block on the homepage (app/page.js, app/es/page.js)
//
// To update the article in the future, edit this file only -- every page
// that renders the preview pulls from here, so content always stays in sync
// across languages.

export const PREVIEW_ARTICLE = {
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
          "The Tour isn't only about the overall standings and mass sprints. The medium-mountain stages and the days made for ambushes will be pure theatre for riders with a gift for breaking the race open from a distance. The two great geniuses will obviously be there: **Wout van Aert** and **Mathieu van der Poel** are always good for a show, and they know how to ride on another level once the race breaks apart.",
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
          "El Tour no solo vive de la general y los esprints masivos. Las etapas de media montaña y las jornadas con emboscadas serán terreno de espectáculo puro para ciclistas que tienen el don de romper la carrera desde lejos. Evidentemente, los dos grandes genios no faltarán: **Wout van Aert** y **Mathieu van der Poel** siempre son garantía de show y saben pedalear a otro nivel cuando la carrera se rompe.",
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
          "El Tour no viu només de la general i els esprints massius. Les etapes de mitja muntanya i les jornades amb emboscades seran terreny d'espectacle pur per a ciclistes que tenen el do de trencar la cursa des de lluny. Evidentment, els dos grans genis no hi faltaran: **Wout van Aert** i **Mathieu van der Poel** sempre són garantia d'espectacle i saben pedalar a un altre nivell quan la cursa es trenca.",
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
          "Le Tour ne se résume pas au général et aux sprints massifs. Les étapes de moyenne montagne et les journées à embuscades seront un terrain de spectacle pur pour les coureurs qui ont le don de faire exploser la course à distance. Les deux grands génies seront évidemment au rendez-vous : **Wout van Aert** et **Mathieu van der Poel** sont toujours une garantie de spectacle et savent pédaler à un autre niveau quand la course se brise.",
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
          "Il Tour non vive solo di classifica generale e volate di gruppo. Le tappe di media montagna e le giornate con imboscate saranno terreno di puro spettacolo per i corridori che hanno il dono di spaccare la corsa da lontano. I due grandi geni, ovviamente, non mancheranno: **Wout van Aert** e **Mathieu van der Poel** sono sempre garanzia di show e sanno pedalare su un altro livello quando la corsa si spacca.",
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
          "De Tour draait niet alleen om het klassement en de massasprints. De middelgebergte-etappes en de dagen met hinderlagen worden puur spektakel voor renners met het talent om de koers van ver open te breken. De twee grote genieën ontbreken natuurlijk niet: **Wout van Aert** en **Mathieu van der Poel** staan altijd garant voor een show en weten op een ander niveau te koersen wanneer de wedstrijd uit elkaar valt.",
          "Daarbij komen allround renners als **Tom Pidcock**, die jagen op iconische bergoverwinningen. De lijst wordt afgesloten met strijdlustige en moedige renners als de jonge Fransen **Lenny Martinez** en **Jordan Jegat**, die garanderen dat de ontsnappingen dit jaar een legendarisch niveau halen. Wie wordt de grote verrassing van 2026?",
        ],
      },
    ],
    closingPrefix: "Denk je het door te hebben?",
    closingLinkText: "Kies een winnaar voor elke etappe",
    closingHref: "/predictions",
    closingSuffix: "en kijk hoe jouw voorspellingen het doen tegenover die van iedereen.",
  },
};

export function getPreviewArticle(lang) {
  return PREVIEW_ARTICLE[lang] || PREVIEW_ARTICLE.en;
}
