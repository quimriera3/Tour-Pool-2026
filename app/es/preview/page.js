export const metadata = {
  title: "Previa del Tour de Francia 2026: Pogacar, Vingegaard y los Favoritos",
  description:
    "Previa del Tour de Francia 2026: Pogacar contra Vingegaard contra Evenepoel por el amarillo, Philipsen y Merlier en los sprints, y Paul Seixas e Isaac del Toro entre las jóvenes promesas a seguir.",
};

export default function Preview() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Análisis previo</span>
        <h1>Previa del Tour de Francia 2026</h1>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 18 }}>La lucha por el maillot amarillo</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Una vez más, la clasificación general apunta a un duelo directo entre Tadej Pogacar y
          Jonas Vingegaard, los dos corredores que han marcado el Tour en las últimas ediciones.
          Pogacar llega como favorito sobre el papel, con João Almeida como una auténtica
          amenaza para el podio a su lado en UAE. Vingegaard ha construido toda su temporada
          para llegar a su mejor nivel en julio, respaldado por un Visma | Lease a Bike con
          Matteo Jorgenson y Sepp Kuss como piezas clave. La carrera no esperará para plantear
          las primeras preguntas: la contrarreloj por equipos inicial en Barcelona es una
          prueba engañosamente importante, capaz de abrir diferencias entre los equipos de la
          general antes incluso de llegar a la montaña. Remco Evenepoel añade un tercer nombre
          a la lucha por el podio, con Florian Lipowitz como el corredor en mejor forma justo
          detrás de él, capaz de dar la sorpresa por su cuenta.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>Los sprinters</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Más allá de la pelea por la general, las etapas llanas prometen un sprint masivo de
          altísimo nivel. Jasper Philipsen vuelve como el hombre a batir en una llegada en
          grupo, con Tim Merlier, Biniam Girmay y Mads Pedersen capaces de ganar etapas y
          pelear por el maillot verde durante las tres semanas de carrera. Mathieu van der Poel
          añade una capa completamente distinta: capaz de ganar al sprint, desde una escapada o
          en un final con repechos, cualquier día de la carrera. La clasificación por puntos
          debería mantenerse abierta hasta París.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>Los outsiders y las jóvenes promesas</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Detrás de los nombres más sonados, varios corredores pueden condicionar cómo se
          desarrolla realmente la carrera. Ben Healy es capaz de ganar una etapa y firmar un
          top-10, Mattias Skjelmose tiene el punch necesario para las etapas de media montaña,
          y Tom Pidcock sigue siendo un comodín en cualquier terreno que se empine. Vigila a
          Isaac del Toro, el joven escalador de UAE que ya compite con los mejores, y
          especialmente a Paul Seixas, el adolescente cuyos resultados esta temporada lo han
          convertido en uno de los nombres más comentados de todo el pelotón. Carlos Rodríguez,
          en cambio, llega lejos de la forma que en su día lo comparaba con Pogacar y
          Vingegaard, y pocos esperan que sea un factor en la cabeza de la general esta vez.
          Ninguno de ellos es favorito, pero cualquiera podría marcar la diferencia entre
          acertar el podio o simplemente acertar al ganador.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <p className="subtitle">
          ¿Crees que lo tienes claro? <a href="/predictions" style={{ textDecoration: "underline", color: "var(--black)" }}>Elige un ganador para cada etapa</a>{" "}
          y comprueba cómo se comparan tus pronósticos con los de los demás.
        </p>
      </div>
    </div>
  );
}
