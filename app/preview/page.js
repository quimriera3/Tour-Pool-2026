export const metadata = {
  title: "2026 Tour de France Preview: Pogačar, Vingegaard & the Favourites",
  description:
    "Tour de France 2026 preview: Pogačar vs Vingegaard vs Evenepoel for yellow, Philipsen and Merlier in the sprints, Paul Seixas and Isaac del Toro among the young guns to watch.",
};

export default function Preview() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Pre-Tour analysis</span>
        <h1>2026 Tour de France Preview</h1>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 18 }}>The battle for yellow</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Once again, the general classification looks set to come down to a straight fight
          between Tadej Pogačar and Jonas Vingegaard, the two riders who have defined the Tour
          for several editions running. Pogačar arrives as the rider to beat on paper, with
          João Almeida as a genuine podium threat riding alongside him at UAE. Vingegaard has
          built his entire season around peaking in July, backed by a Visma | Lease a Bike
          squad built around Matteo Jorgenson and Sepp Kuss. The race won&apos;t wait to start
          asking questions: the opening team time trial in Barcelona is a deceptively important
          test, capable of opening gaps between the GC teams before the race has even reached
          the mountains. Remco Evenepoel adds a third name to the podium conversation, with
          Florian Lipowitz coming in as the form rider behind him capable of springing a
          surprise of his own.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>The sprinters</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Away from the GC fight, the flat stages promise a stacked sprint field. Jasper
          Philipsen returns as the rider to beat in a bunch finish, with Tim Merlier, Biniam
          Girmay and Mads Pedersen all capable of taking stage wins and pushing for the green
          jersey across three weeks of racing. Mathieu van der Poel adds another layer entirely
          — capable of winning from a sprint, a breakaway, or a hilly finish on any given day.
          Expect the points classification to stay open until Paris.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 18 }}>The outsiders and the rising stars</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Behind the headline names, a handful of riders could shape how the race actually
          unfolds. Ben Healy is capable of a stage win and a top-ten finish, Mattias Skjelmose
          has the puncher&apos;s edge for the medium-mountain stages, and Tom Pidcock remains a
          wildcard anywhere the road tilts uphill. Keep an eye on Isaac del Toro, UAE&apos;s
          young climber already mixing it with the best, and especially on Paul Seixas — the
          teenager whose results this season have made him one of the most talked-about names
          in the entire peloton. Carlos Rodríguez, by contrast, arrives well short of the form
          that once had him compared to Pogačar and Vingegaard, and few expect him to be a
          factor for the top of the general classification this time. None of these riders are
          favourites — but any of them could be the difference between predicting the podium
          and just predicting the winner.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <p className="subtitle">
          Think you&apos;ve got it figured out? <a href="/predictions" style={{ textDecoration: "underline", color: "var(--black)" }}>Pick a winner for every stage</a>{" "}
          and see how your predictions stack up against everyone else&apos;s.
        </p>
      </div>
    </div>
  );
}
