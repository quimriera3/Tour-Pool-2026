"use client";
// app/faq/page.js
import { useState } from "react";

const FAQS = [
  {
    section: "About Grand Tour Pool",
    items: [
      {
        q: "What is Grand Tour Pool?",
        a: "Grand Tour Pool is a free online prediction game for cycling's biggest races — currently La Vuelta a España 2026. Before each stage starts, you pick the rider you think will win. At the end of the race, the person with the most points wins. There are no entry fees — just sign up and start predicting.",
      },
      {
        q: "How do I earn points?",
        a: "You earn 10 points if your predicted rider wins the stage, 5 points if they finish second, and 2 points if they finish third. If your rider doesn't make the podium, you score zero for that stage. For the jersey predictions, you earn 10 points for each jersey winner you correctly predict at the end of the race.",
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
        a: "Jersey predictions (Red, Green, Polka Dot and White) close one hour before Stage 5 starts on Wednesday 26 August 2026 at 12:15 CEST. After that, jersey picks are locked for the rest of the race.",
      },
      {
        q: "Is the pool free to enter?",
        a: "Completely free. There is no entry fee, no subscription, and no payment of any kind required. Just create an account — it takes about 30 seconds — and start predicting.",
      },
      {
        q: "What can I win?",
        a: "There are cycling gear prizes for the top three finishers on the leaderboard. The exact prizes will be confirmed before the end of the race. The full details are on the Rules page.",
      },
    ],
  },
  {
    section: "About La Vuelta a España 2026",
    items: [
      {
        q: "When and where does La Vuelta a España 2026 take place?",
        a: "La Vuelta a España 2026 runs from 22 August to 13 September 2026. It starts with a 9 km individual time trial through the streets of Monaco — the first time the principality has hosted a Vuelta start, making it the first country to host the opening stage of all three Grand Tours — and finishes in Granada with a circuit climbing to the Alhambra.",
      },
      {
        q: "How many stages are there?",
        a: "There are 21 stages in total, covering 3,298 kilometres across four countries: Monaco, France, Andorra and Spain. The route features seven mountain stages, a gravel sector on Stage 6, two individual time trials, and a final ten stages held entirely in Andalusia.",
      },
      {
        q: "What are the four jerseys in La Vuelta?",
        a: "The Red Jersey (Maillot Rojo) is worn by the leader of the general classification — the rider with the lowest cumulative time. It is La Vuelta's equivalent of the Tour's yellow jersey. The Green Jersey goes to the points classification leader, typically a sprinter. The Polka Dot Jersey rewards the best climber, based on points earned at the top of categorised climbs. The White Jersey is the best young rider's jersey, awarded to the leading GC rider aged 25 or under.",
      },
      {
        q: "Who are the favourites for La Vuelta 2026?",
        a: "Team line-ups are normally confirmed in the week before the start, so no rider list is official yet. What the route tells us is that this edition rewards a complete rider: seven mountain stages and summit finishes at Calar Alto and the Sierra de la Pandera favour pure climbers, but the 32.1 km time trial to Jerez means a strong climber who cannot time trial will struggle to hold red all the way to Granada.",
      },
      {
        q: "What is the gravel stage?",
        a: "Stage 6 to Castellón introduces sterrato — unpaved gravel sectors, rarely used in La Vuelta's history. Gravel punishes poor positioning and introduces the risk of punctures and mechanical problems, which is why general classification teams treat these days as seriously as a mountain stage despite the modest climbing.",
      },
      {
        q: "Why does La Vuelta finish in Granada instead of Madrid?",
        a: "The 2026 edition skips Madrid because of a scheduling clash with Formula 1 in the capital. Instead the race finishes in Granada with four laps of a circuit featuring a climb of roughly one kilometre up to the Alhambra. Unlike the usual processional final stage, this one is genuinely competitive and could still affect the standings.",
      },
      {
        q: "How long are the time trials?",
        a: "There are two. Stage 1 is a 9 km individual time trial in Monaco — short and technical, producing only small gaps. Stage 18 is a 32.5 km individual time trial from El Puerto de Santa María to Jerez de la Frontera over largely flat terrain. It is the longest Vuelta time trial in years and the biggest single opportunity to overturn the general classification.",
      },
      {
        q: "How many riders start La Vuelta?",
        a: "184 riders from 23 teams start La Vuelta a España 2026: the 18 UCI WorldTeams plus five invited ProTeams. Each team nominates eight riders. Not all of them finish — attrition from crashes, illness and fatigue typically means around 150 riders make it to the final stage.",
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
        <p className="subtitle">Everything you need to know about Grand Tour Pool and La Vuelta a España 2026.</p>
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
