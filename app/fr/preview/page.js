export const metadata = {
  title: "Avant-Tour de France 2026 : Pogačar, Vingegaard et les Favoris",
  description:
    "Avant-Tour de France 2026 : Pogačar contre Vingegaard contre Evenepoel pour le jaune, Philipsen et Merlier dans les sprints, et Paul Seixas et Isaac del Toro parmi les jeunes pépites à suivre.",
};

export default function Preview() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Analyse avant-course</span>
        <h1>Avant-Tour de France 2026</h1>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 18 }}>La lutte pour le maillot jaune</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Une fois encore, le classement général s&apos;annonce comme un duel direct entre
          Tadej Pogačar et Jonas Vingegaard, les deux coureurs qui dominent le Tour depuis
          plusieurs éditions. Pogačar arrive en favori sur le papier, avec João Almeida comme
          véritable menace pour le podium à ses côtés chez UAE. Vingegaard a construit toute sa
          saison pour être à son meilleur niveau en juillet, épaulé par une équipe Visma | Lease
          a Bike avec Matteo Jorgenson et Sepp Kuss en pièces maîtresses. La course ne tardera
          pas à poser ses premières questions : le chrono par équipes inaugural à Barcelone est
          un piège plus important qu&apos;il n&apos;y paraît, capable de creuser des écarts
          entre les équipes du général avant même d&apos;attaquer la montagne. Remco Evenepoel
          ajoute un troisième nom à la lutte pour le podium, avec Florian Lipowitz en grande
          forme juste derrière lui, capable de créer la surprise à son tour.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>Les sprinteurs</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Loin de la bagarre pour le général, les étapes plates promettent un sprint massif
          d&apos;un excellent niveau. Jasper Philipsen revient en homme à abattre dans une
          arrivée groupée, avec Tim Merlier, Biniam Girmay et Mads Pedersen tous capables de
          gagner des étapes et de viser le maillot vert sur trois semaines de course. Mathieu
          van der Poel ajoute une dimension à part entière : capable de gagner au sprint, depuis
          une échappée ou sur une arrivée vallonnée, n&apos;importe quel jour de course. Le
          classement par points devrait rester ouvert jusqu&apos;à Paris.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>Les outsiders et les jeunes pépites</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Derrière les noms les plus attendus, quelques coureurs pourraient bien influencer le
          déroulement réel de la course. Ben Healy est capable de gagner une étape et de viser
          un top 10, Mattias Skjelmose possède le punch nécessaire pour les étapes de moyenne
          montagne, et Tom Pidcock reste une carte imprévisible dès que la route grimpe.
          Surveillez Isaac del Toro, le jeune grimpeur d&apos;UAE qui rivalise déjà avec les
          meilleurs, et surtout Paul Seixas, l&apos;adolescent dont les résultats cette saison
          en ont fait l&apos;un des noms les plus commentés du peloton. Carlos Rodríguez, lui,
          arrive loin de la forme qui le faisait autrefois comparer à Pogačar et Vingegaard, et
          peu s&apos;attendent à ce qu&apos;il pèse sur la tête du général cette fois-ci. Aucun
          d&apos;entre eux n&apos;est favori — mais n&apos;importe lequel pourrait faire la
          différence entre deviner le podium et simplement deviner le vainqueur.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <p className="subtitle">
          Vous pensez avoir tout compris ? <a href="/predictions" style={{ textDecoration: "underline", color: "var(--black)" }}>Choisissez un vainqueur pour chaque étape</a>{" "}
          et comparez vos pronostics à ceux de tout le monde.
        </p>
      </div>
    </div>
  );
}
