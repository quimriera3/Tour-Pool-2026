export const metadata = {
  title: "Tour de France 2026 Preview: Pogačar, Vingegaard en de Favorieten",
  description:
    "Tour de France 2026 preview: Pogačar tegen Vingegaard tegen Evenepoel voor het geel, Philipsen en Merlier in de sprints, en Paul Seixas en Isaac del Toro als jonge talenten om in de gaten te houden.",
};

export default function Preview() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Analyse vooraf</span>
        <h1>Tour de France 2026 Preview</h1>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 18 }}>De strijd om het geel</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Opnieuw lijkt het algemeen klassement neer te komen op een rechtstreeks duel tussen
          Tadej Pogačar en Jonas Vingegaard, de twee renners die de Tour van de afgelopen jaren
          hebben bepaald. Pogačar komt op papier als favoriet aan de start, met João Almeida als
          een echte podiumdreiging naast hem bij UAE. Vingegaard heeft zijn hele seizoen
          opgebouwd om in juli op zijn best te zijn, gesteund door een Visma | Lease a
          Bike-ploeg met Matteo Jorgenson en Sepp Kuss als sleutelmannen. De koers wacht niet
          lang met de eerste vragen: de openings-ploegentijdrit in Barcelona is een venijnigere
          test dan ze lijkt, en kan al gaten slaan tussen de klassementsploegen voordat de
          bergen zelfs maar in zicht zijn. Remco Evenepoel voegt een derde naam toe aan de
          strijd om het podium, met Florian Lipowitz in goede vorm net achter hem, die zelf voor
          een verrassing kan zorgen.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>De sprinters</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Los van het klassementsgevecht beloven de vlakke etappes een massasprint van het
          hoogste niveau. Jasper Philipsen is terug als de man om te kloppen in een sprint met
          het peloton, met Tim Merlier, Biniam Girmay en Mads Pedersen die allemaal in staat
          zijn etappes te winnen en mee te strijden om het groen over drie weken koers. Mathieu
          van der Poel voegt een heel andere laag toe: in staat om te winnen vanuit een sprint,
          een ontsnapping, of een heuvelachtige aankomst, op elke dag van de koers. Het
          puntenklassement zou tot Parijs open moeten blijven.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>De outsiders en de opkomende talenten</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Achter de grote namen kunnen een paar renners flink invloed hebben op hoe de koers
          zich echt ontvouwt. Ben Healy is in staat een etappe te winnen en een top-10 te rijden,
          Mattias Skjelmose heeft de punch voor de etappes in de middelgebergte, en Tom Pidcock
          blijft een joker zodra de weg omhoog gaat. Houd Isaac del Toro in de gaten, de jonge
          klimmer van UAE die al meedoet met de besten, en vooral Paul Seixas, de
          negentienjarige wiens resultaten dit seizoen hem tot een van de meest besproken namen
          van het hele peloton hebben gemaakt. Carlos Rodríguez komt daarentegen ver van de vorm
          die hem ooit met Pogačar en Vingegaard deed vergelijken, en weinigen verwachten dat hij
          deze keer een rol speelt aan de top van het klassement. Geen van hen is favoriet — maar
          elk van hen kan het verschil maken tussen het podium juist voorspellen en alleen de
          winnaar raden.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <p className="subtitle">
          Denk je het door te hebben? <a href="/predictions" style={{ textDecoration: "underline", color: "var(--black)" }}>Kies een winnaar voor elke etappe</a>{" "}
          en kijk hoe jouw voorspellingen het doen tegenover die van iedereen.
        </p>
      </div>
    </div>
  );
}
