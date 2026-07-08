"use client";
// app/faq/page.js
import { useState } from "react";

const FAQS = [
  {
    section: "About Grand Tour Pool",
    items: [
      {
        q: "What is Grand Tour Pool?",
        a: "Grand Tour Pool is a free online prediction game for the Tour de France. Before each stage starts, you pick the rider you think will win. At the end of the Tour, the person with the most points wins. There are no entry fees and no mandatory registration — just sign up and start predicting.",
      },
      {
        q: "How do I earn points?",
        a: "You earn 10 points if your predicted rider wins the stage, 5 points if they finish second, and 2 points if they finish third. If your rider doesn't make the podium, you score zero for that stage. For the jersey predictions, you earn 10 points for each jersey winner you correctly predict at the end of the Tour.",
      },
      {
        q: "When do my picks lock?",
        a: "Each stage locks one hour before that stage's official start time. Once locked, your pick for that stage is final and cannot be changed. You can change your pick at any time before the lock — even if you already saved one, just tap a different rider and it saves automatically.",
      },
      {
        q: "Do I need to pick for every stage?",
        a: "No. You can pick for as many or as few stages as you like. Stages you skip simply score zero, but they don't disqualify you from the leaderboard — you can still win the pool with a good run of correct predictions on the stages you did enter.",
      },
      {
        q: "Does my pick save automatically?",
        a: "Yes. As soon as you tap or click a rider's name, your pick is saved to the server — there is no separate Submit button. You can check by navigating away and coming back; your rider will still be selected. You can change it as many times as you like before the stage locks.",
      },
      {
        q: "When do jersey predictions close?",
        a: "Jersey predictions (Yellow, Green, Polka Dot and White) close one hour before Stage 5 starts on Wednesday 8 July 2026 at 12:15 CEST. After that, jersey picks are locked for the rest of the Tour.",
      },
      {
        q: "Is the pool free to enter?",
        a: "Completely free. There is no entry fee, no subscription, and no payment of any kind required. Just create an account — it takes about 30 seconds — and start predicting.",
      },
      {
        q: "What can I win?",
        a: "There are cycling gear prizes for the top three finishers on the leaderboard. The exact prizes will be confirmed before the end of the Tour. The full details are on the Rules page.",
      },
    ],
  },
  {
    section: "About the Tour de France 2026",
    items: [
      {
        q: "When and where does the Tour de France 2026 take place?",
        a: "The 2026 Tour de France runs from 4 to 26 July 2026. It starts with a team time trial through the streets of Barcelona, Spain — the first time since 2009 that the Grand Départ is held outside France — and finishes with the traditional procession into Paris.",
      },
      {
        q: "How many stages are there?",
        a: "There are 21 stages in total, covering 3,321 kilometres. The route includes a team time trial at the start in Barcelona, one individual time trial near the end in Évian-Thonon, a double ascent of the iconic Alpe d'Huez in the penultimate week, and several major Pyrenean and Alpine finishes in between.",
      },
      {
        q: "What are the four jerseys in the Tour de France?",
        a: "The Yellow Jersey (Maillot Jaune) is worn by the leader of the general classification — the rider with the lowest cumulative time. The Green Jersey (Maillot Vert) goes to the points classification leader, typically won by sprinters who accumulate points at stage finishes and intermediate sprints. The Polka Dot Jersey (Maillot à Pois) rewards the best climber, based on points earned at the top of categorised climbs. The White Jersey (Maillot Blanc) is the best young rider's jersey, awarded to the leading GC rider aged 25 or under on 1 January of race year.",
      },
      {
        q: "Who are the favourites for the yellow jersey in 2026?",
        a: "The overwhelming favourite is Tadej Pogačar (UAE Team Emirates-XRG), who is chasing a fifth Tour de France title following dominant spring performances. His main rivals are two-time champion Jonas Vingegaard (Team Visma-Lease a Bike), who returns after injury concerns, and Remco Evenepoel (Red Bull-BORA-hansgrohe), who is increasingly competitive in three-week stage races. French fans are watching 19-year-old Paul Seixas (Decathlon CMA CGM Team) closely as the great domestic hope.",
      },
      {
        q: "Who are the favourites for the green jersey?",
        a: "Jonathan Milan (Lidl-Trek) starts as the leading favourite for the points jersey, combining raw sprinting power with the ability to get over moderate climbs. Jasper Philipsen (Alpecin-Premier Tech) is the defending champion and always dangerous. Tim Merlier (Soudal Quick-Step) is another threat, along with Biniam Girmay (NSN Cycling Team) and Mads Pedersen (Lidl-Trek).",
      },
      {
        q: "What is the Alpe d'Huez and why is it famous?",
        a: "The Alpe d'Huez is a ski resort in the French Alps reached by a climb of 14 km at an average gradient of 8.1%, featuring 21 numbered hairpin bends. It has hosted a Tour de France stage finish more than 30 times since 1952 and is widely considered the most iconic climb in cycling. The 2026 route features a double ascent of the Alpe in Stage 20, one of the hardest days of the whole race.",
      },
      {
        q: "What is a team time trial?",
        a: "A team time trial (TTT) is a stage where all eight riders on a team start together and race the clock as a unit. The team's official finishing time is taken when the fifth rider crosses the line, which means riders must work together and no one can be dropped until late in the stage. The 2026 Tour opens with a TTT through Barcelona on 4 July.",
      },
      {
        q: "How many riders start the Tour de France?",
        a: "184 riders from 23 teams start the 2026 Tour de France. Each team nominates eight riders. Not all of them finish — attrition from crashes, illness and fatigue typically means 150–170 riders make it to Paris.",
      },
    ],
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #ececec" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          padding: "16px 0",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <span style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: 18, color: "#aaa", flexShrink: 0, marginTop: 1 }}>{open ? "−" : "+"}</span>
      </button>
      {open && (
        <p style={{ fontSize: 14, lineHeight: 1.75, color: "#444", paddingBottom: 16 }}>{a}</p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Help & information</span>
        <h1>Frequently asked questions</h1>
        <p className="subtitle">Everything you need to know about Grand Tour Pool and the Tour de France 2026.</p>
      </div>

      {FAQS.map((section) => (
        <div key={section.section} className="card" style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 17, marginBottom: 4 }}>{section.section}</h2>
          {section.items.map((item) => (
            <FAQItem key={item.q} q={item.q} a={item.a} />
          ))}
        </div>
      ))}

      <div className="card" style={{ marginTop: 16 }}>
        <h2 style={{ fontSize: 16 }}>Still have a question?</h2>
        <p className="subtitle" style={{ marginTop: 8 }}>
          Get in touch via our <a href="/contact" style={{ color: "var(--red)", fontWeight: 700 }}>contact page</a> and we'll get back to you as soon as possible.
        </p>
      </div>
    </div>
  );
}
