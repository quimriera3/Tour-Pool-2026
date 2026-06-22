export const metadata = {
  title: "Previsió del Tour de França 2026: Pogačar, Vingegaard i els Favorits",
  description:
    "Previsió del Tour de França 2026: Pogačar contra Vingegaard contra Evenepoel pel mallot groc, Philipsen i Merlier als esprints, i Paul Seixas i Isaac del Toro entre les joves promeses a seguir.",
};

export default function Preview() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Anàlisi prèvia</span>
        <h1>Previsió del Tour de França 2026</h1>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 18 }}>La lluita pel mallot groc</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Un altre any, la classificació general apunta a un duel directe entre Tadej Pogačar i
          Jonas Vingegaard, els dos corredors que han marcat el Tour les últimes edicions.
          Pogačar arriba com a favorit sobre el paper, amb João Almeida com una autèntica
          amenaça pel podi al seu costat a l&apos;UAE. Vingegaard ha construït tota la temporada
          per arribar al seu millor nivell al juliol, amb un Visma | Lease a Bike on Matteo
          Jorgenson i Sepp Kuss són peces clau. La cursa no trigarà a plantejar les primeres
          preguntes: la contrarellotge per equips inicial a Barcelona és una prova més traïdora
          del que sembla, capaç d&apos;obrir diferències entre els equips de la general fins i
          tot abans d&apos;arribar a la muntanya, on caldrà pedalar fort des del primer dia.
          Remco Evenepoel afegeix un tercer nom a la lluita pel podi, amb Florian Lipowitz en
          gran forma just al darrere seu, capaç de donar la sorpresa pel seu compte.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>Els esprínters</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Lluny de la lluita per la general, les etapes planes prometen un esprint massiu de
          primer nivell. Jasper Philipsen torna com l&apos;home a batre en una arribada en
          grup, amb Tim Merlier, Biniam Girmay i Mads Pedersen capaços de guanyar etapes i
          pedalar pel mallot verd durant les tres setmanes de cursa. Mathieu van der Poel hi
          afegeix una capa ben diferent: capaç de guanyar a l&apos;esprint, des d&apos;una
          escapada o en una arribada amb repunts, qualsevol dia de la cursa. La classificació
          per punts hauria de mantenir-se oberta fins a París.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>Els outsiders i les joves promeses</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Darrere dels noms més sonats, alguns corredors podrien condicionar com es desenvolupa
          realment la cursa. Ben Healy és capaç de guanyar una etapa i firmar un top-10,
          Mattias Skjelmose té la punta de velocitat necessària per a les etapes de mitja
          muntanya, i Tom Pidcock continua sent un comodí allà on la carretera pugi. Vigila
          Isaac del Toro, el jove escalador de l&apos;UAE que ja pedala a l&apos;alçada dels
          millors, i sobretot Paul Seixas, el noi de dinou anys els resultats del qual aquesta
          temporada l&apos;han convertit en un dels noms més comentats de tot el pilot. Carlos
          Rodríguez, en canvi, arriba lluny de la forma que un dia el comparava amb Pogačar i
          Vingegaard, i pocs esperen que sigui un factor al capdavant de la general aquesta
          vegada. Cap d&apos;ells és favorit, però qualsevol podria marcar la diferència entre
          encertar el podi o només encertar el guanyador.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <p className="subtitle">
          Creus que ho tens clar? <a href="/predictions" style={{ textDecoration: "underline", color: "var(--black)" }}>Tria un guanyador per a cada etapa</a>{" "}
          i comprova com es comparen els teus pronòstics amb els de tothom.
        </p>
      </div>
    </div>
  );
}
