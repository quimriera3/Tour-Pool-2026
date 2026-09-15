"use client";

import { useState } from "react";
import { useLang } from "../../lib/i18n";
import { useRace, useRaceBase } from "../../lib/useRace";
import { isChampionship, localised } from "../../lib/races";

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open}>
        <span>{q}</span><span aria-hidden="true">{open ? "−" : "+"}</span>
      </button>
      {open && <p>{a}</p>}
    </div>
  );
}

export default function FAQ() {
  const lang = useLang();
  const race = useRace();
  const base = useRaceBase();
  const es = lang === "es";
  const championship = isChampionship(race);

  const general = es ? [
    ["¿Qué es Grand Tour Pool?", "Un juego gratuito de predicciones de ciclismo. Eliges corredores, sumas puntos según el resultado real y compites en una clasificación común."],
    ["¿Es gratis?", "Sí. No hay cuota de inscripción, suscripción ni compra obligatoria."],
    ["¿Cuándo se cierran los picks?", "Exactamente una hora antes de la hora oficial de salida de cada prueba."],
    ["¿Puedo cambiar un pick?", "Sí, tantas veces como quieras antes del cierre. El último pick guardado correctamente es el que cuenta."],
    ["¿Cómo sé que se ha guardado?", "Después de elegir un corredor verás Guardado ✓. Si aparece un error, vuelve a intentarlo antes del cierre."],
    ["¿Tengo que jugar todas las pruebas?", "No. Las pruebas sin predicción suman cero puntos, pero puedes seguir jugando las demás."],
    ["¿Cómo funcionan los empates?", "Primero se comparan los ganadores acertados y después los podios acertados. Si el empate continúa, se comparte posición y los premios afectados se resuelven mediante sorteo transparente."],
    ["¿Qué puedo ganar?", "Hay premios de material de ciclismo para los tres primeros de la clasificación final."],
  ] : [
    ["What is Grand Tour Pool?", "A free cycling prediction game. Pick riders, score points from the real results and compete on a shared leaderboard."],
    ["Is it free?", "Yes. There is no entry fee, subscription or required purchase."],
    ["When do picks close?", "Exactly one hour before each event's official start time."],
    ["Can I change a pick?", "Yes, as often as you like before the deadline. The last successfully saved pick is the one that counts."],
    ["How do I know my pick saved?", "After choosing a rider you will see Saved ✓. If an error appears, try again before the deadline."],
    ["Do I have to play every event?", "No. Events left blank score zero, but you can keep playing the others."],
    ["How are ties decided?", "More correct winners comes first, then more podium hits. If still tied, players share the rank and affected prizes are decided by a transparent draw."],
    ["What can I win?", "Cycling-gear prizes are awarded to the final top three."],
  ];

  const raceFaq = championship ? (es ? [
    ["¿Qué tengo que predecir en el Mundial?", `En ${localised(race.name, lang)} eliges al ganador de la contrarreloj individual y al ganador de la prueba en ruta de esta categoría.`],
    ["¿Puedo jugar tanto la categoría masculina como la femenina?", "Sí. Son competiciones separadas y puedes hacer picks en ambas."],
    ["¿Qué recorrido tiene la contrarreloj?", "La élite masculina y femenina comparten un recorrido de 39,2 km y 220 m de desnivel por Montreal."],
    ["¿Y la prueba en ruta?", race.category === "women" ? "La prueba femenina tiene 180,4 km y 2.570 m de desnivel, con ocho vueltas finales al circuito del Mont Royal." : "La prueba masculina tiene 273,7 km y 3.803 m de desnivel, con doce vueltas finales al circuito del Mont Royal."],
    ["¿La lista de salida es definitiva?", "La web solo publica corredores cuando hay una base fiable para incluirlos. Si una selección todavía no está completa, lo indicamos en lugar de inventar nombres."],
  ] : [
    ["What do I predict at the Worlds?", `For ${localised(race.name, lang)}, pick the winner of the individual time trial and the winner of the road race in this category.`],
    ["Can I play both the men's and women's pools?", "Yes. They are separate competitions and you can make picks in both."],
    ["What is the time trial course?", "Elite men and women share a 39.2 km course with 220 m of elevation around Montreal."],
    ["What about the road race?", race.category === "women" ? "The women's road race is 180.4 km with 2,570 m of climbing and eight final laps of the Mount Royal circuit." : "The men's road race is 273.7 km with 3,803 m of climbing and twelve final laps of the Mount Royal circuit."],
    ["Is the startlist final?", "The site only publishes riders when there is a reliable basis to include them. If a selection is still incomplete, we say so rather than invent names."],
  ]) : [];

  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">{es ? "Ayuda e información" : "Help & information"}</span>
        <h1>{es ? "Preguntas frecuentes" : "Frequently asked questions"}</h1>
        <p className="subtitle">{es ? `Todo lo que necesitas saber para jugar a ${localised(race.name, lang)}.` : `Everything you need to play ${localised(race.name, lang)}.`}</p>
        {championship && <div className="page-header-actions"><a href={base + "/predictions"} className="btn hero-primary">{es ? "JUGAR AHORA" : "PLAY NOW"} →</a></div>}
      </div>

      <div className="card faq-card"><h2>{es ? "Sobre el juego" : "About the game"}</h2>{general.map(([q,a]) => <FAQItem key={q} q={q} a={a} />)}</div>
      {raceFaq.length > 0 && <div className="card faq-card" style={{ marginTop: 16 }}><h2>{localised(race.shortName || race.name, lang)}</h2>{raceFaq.map(([q,a]) => <FAQItem key={q} q={q} a={a} />)}</div>}
      <div className="card" style={{ marginTop: 16 }}><h2>{es ? "¿Otra duda?" : "Still have a question?"}</h2><p className="subtitle">{es ? "Escríbenos desde la página de contacto." : "Send us a message from the contact page."}</p><a className="text-link" href={(lang === "es" ? "/es" : "") + "/contact"}>{es ? "Contactar" : "Contact us"} →</a></div>
    </div>
  );
}
