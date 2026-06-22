export const metadata = {
  title: "Anteprima Tour de France 2026: Pogačar, Vingegaard e i Favoriti",
  description:
    "Anteprima Tour de France 2026: Pogačar contro Vingegaard contro Evenepoel per la maglia gialla, Philipsen e Merlier negli sprint, e Paul Seixas e Isaac del Toro tra i giovani da seguire.",
};

export default function Preview() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Analisi pre-corsa</span>
        <h1>Anteprima Tour de France 2026</h1>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 18 }}>La lotta per la maglia gialla</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Anche quest&apos;anno la classifica generale si annuncia come un duello diretto tra
          Tadej Pogačar e Jonas Vingegaard, i due corridori che hanno dominato il Tour nelle
          ultime edizioni. Pogačar parte favorito sulla carta, con João Almeida come vera
          minaccia per il podio al suo fianco in UAE. Vingegaard ha costruito l&apos;intera
          stagione per arrivare al top a luglio, supportato da una squadra Visma | Lease a Bike
          con Matteo Jorgenson e Sepp Kuss come uomini chiave. La corsa non aspetterà a porre le
          prime domande: la cronosquadre d&apos;apertura a Barcellona è un&apos;insidia più
          importante di quanto sembri, capace di creare distacchi tra le squadre di classifica
          ancora prima di affrontare la montagna. Remco Evenepoel aggiunge un terzo nome alla
          lotta per il podio, con Florian Lipowitz in gran forma proprio dietro di lui, capace
          di regalare una sorpresa tutta sua.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>Gli sprinter</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Lontano dalla lotta per la generale, le tappe pianeggianti promettono volate di
          altissimo livello. Jasper Philipsen torna come l&apos;uomo da battere in un arrivo di
          gruppo, con Tim Merlier, Biniam Girmay e Mads Pedersen tutti in grado di vincere
          tappe e puntare alla maglia verde nelle tre settimane di corsa. Mathieu van der Poel
          aggiunge un livello completamente diverso: capace di vincere in volata, da una fuga o
          in un arrivo con strappi, in qualsiasi giorno di corsa. La classifica a punti dovrebbe
          restare aperta fino a Parigi.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>Gli outsider e le giovani promesse</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Dietro ai nomi più attesi, alcuni corridori potrebbero condizionare davvero
          l&apos;andamento della corsa. Ben Healy è in grado di vincere una tappa e ottenere un
          piazzamento tra i primi dieci, Mattias Skjelmose ha lo scatto giusto per le tappe di
          media montagna, e Tom Pidcock resta un&apos;incognita ovunque la strada salga. Tenete
          d&apos;occhio Isaac del Toro, il giovane scalatore dell&apos;UAE che già se la gioca
          con i migliori, e soprattutto Paul Seixas, il diciannovenne i cui risultati in questa
          stagione lo hanno reso uno dei nomi più discussi di tutto il gruppo. Carlos Rodríguez,
          al contrario, arriva lontano dalla forma che un tempo lo paragonava a Pogačar e
          Vingegaard, e pochi si aspettano che possa incidere sulla testa della generale questa
          volta. Nessuno di loro è favorito — ma ognuno di loro potrebbe fare la differenza tra
          indovinare il podio e indovinare semplicemente il vincitore.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <p className="subtitle">
          Pensi di averci capito qualcosa? <a href="/predictions" style={{ textDecoration: "underline", color: "var(--black)" }}>Scegli un vincitore per ogni tappa</a>{" "}
          e scopri come si confrontano i tuoi pronostici con quelli di tutti gli altri.
        </p>
      </div>
    </div>
  );
}
