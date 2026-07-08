"use client";
// app/es/faq/page.js
import { useState } from "react";

const FAQS = [
  {
    section: "Sobre Grand Tour Pool",
    items: [
      {
        q: "¿Qué es Grand Tour Pool?",
        a: "Grand Tour Pool es un juego de predicciones gratuito para el Tour de Francia. Antes de que comience cada etapa, eliges al corredor que crees que va a ganar. Al final del Tour, quien tenga más puntos gana. No hay cuotas de inscripción ni registro obligatorio: solo crea una cuenta y empieza a jugar.",
      },
      {
        q: "¿Cómo se consiguen puntos?",
        a: "Consigues 10 puntos si tu corredor gana la etapa, 5 puntos si llega segundo y 2 puntos si llega tercero. Si tu corredor no sube al podio, esa etapa puntúa cero. En las predicciones de maillots, ganas 10 puntos por cada maillot cuyo ganador final aciertes.",
      },
      {
        q: "¿Cuándo se cierran los picks?",
        a: "Cada etapa se cierra una hora antes de su hora oficial de salida. Una vez cerrada, tu predicción para esa etapa es definitiva. Puedes cambiarla tantas veces como quieras antes del cierre, ya que cada vez que eliges un corredor tu pick se guarda automáticamente.",
      },
      {
        q: "¿Tengo que predecir todas las etapas?",
        a: "No. Puedes predecir las etapas que quieras. Las que dejes sin rellenar simplemente puntúan cero, pero no te descalifican. Puedes ganar la porra con una buena racha en las etapas en las que sí hayas participado.",
      },
      {
        q: "¿Se guardan los picks automáticamente?",
        a: "Sí. En cuanto tocas o haces clic en el nombre de un corredor, el pick se guarda en el servidor — no existe botón de Enviar. Puedes salir de la página y volver: tu corredor seguirá seleccionado. Puedes cambiarlo todas las veces que quieras antes del cierre.",
      },
      {
        q: "¿Cuándo cierran las predicciones de maillots?",
        a: "Las predicciones de maillots (Amarillo, Verde, de Topos y Blanco) cierran una hora antes de la salida de la Etapa 5, el miércoles 8 de julio de 2026 a las 12:15 CEST. Después de eso, los picks de maillots quedan cerrados para el resto del Tour.",
      },
      {
        q: "¿Es gratuita la porra?",
        a: "Completamente gratuita. No hay cuota de inscripción, ni suscripción ni pago de ningún tipo. Solo crea una cuenta —tarda unos 30 segundos— y empieza a predecir.",
      },
      {
        q: "¿Qué se puede ganar?",
        a: "Hay premios de material de ciclismo para los tres primeros de la clasificación final. Los premios exactos se confirmarán antes de que acabe el Tour. Todos los detalles están en la página de normas.",
      },
    ],
  },
  {
    section: "Sobre el Tour de Francia 2026",
    items: [
      {
        q: "¿Cuándo y dónde se celebra el Tour de Francia 2026?",
        a: "El Tour de Francia 2026 se celebra del 4 al 26 de julio de 2026. Comienza con una contrarreloj por equipos por las calles de Barcelona, España —la primera vez desde 2009 que la Grand Départ se celebra fuera de Francia—, y termina con el tradicional desfile hasta París.",
      },
      {
        q: "¿Cuántas etapas tiene?",
        a: "El Tour 2026 tiene 21 etapas que suman 3.321 kilómetros. El recorrido incluye una contrarreloj por equipos en Barcelona al inicio, una contrarreloj individual al final en Évian-Thonon, un doble ascenso al icónico Alpe d'Huez en la penúltima semana, y varias llegadas importantes en los Pirineos y los Alpes.",
      },
      {
        q: "¿Cuáles son los cuatro maillots del Tour de Francia?",
        a: "El Maillot Amarillo lo lleva el líder de la clasificación general, el corredor con el menor tiempo acumulado. El Maillot Verde distingue al líder de la clasificación por puntos, generalmente un esprínter. El Maillot de Montaña de Lunares Rojos premia al mejor escalador, con puntos que se suman en los altos catalogados. El Maillot Blanco es para el mejor joven, el líder de la general entre los corredores sub-26 a 1 de enero del año de la carrera.",
      },
      {
        q: "¿Quiénes son los favoritos al maillot amarillo?",
        a: "El gran favorito es Tadej Pogačar (UAE Team Emirates-XRG), que busca su quinto Tour de Francia tras una primavera dominante. Sus principales rivales son el dos veces campeón Jonas Vingegaard (Team Visma-Lease a Bike) y Remco Evenepoel (Red Bull-BORA-hansgrohe), cada vez más competitivo en carreras de tres semanas. La gran esperanza francesa es el joven de 19 años Paul Seixas (Decathlon CMA CGM Team).",
      },
      {
        q: "¿Quiénes son los favoritos al maillot verde?",
        a: "Jonathan Milan (Lidl-Trek) parte como principal favorito al maillot verde, combinando potencia de esprín puro con capacidad para superar puertos de media montaña. Jasper Philipsen (Alpecin-Premier Tech) es el campeón defensor y siempre peligroso. Tim Merlier (Soudal Quick-Step), Biniam Girmay (NSN Cycling Team) y Mads Pedersen (Lidl-Trek) completan la lista de aspirantes.",
      },
      {
        q: "¿Qué es el Alpe d'Huez y por qué es tan famoso?",
        a: "El Alpe d'Huez es una estación de esquí de los Alpes franceses a la que se accede por una subida de 14 km con una pendiente media del 8,1% y 21 curvas numeradas. Ha sido meta del Tour de Francia más de 30 veces desde 1952 y es considerado el ascenso más icónico del ciclismo. El recorrido de 2026 incluye un doble ascenso al Alpe en la Etapa 20, uno de los días más duros de toda la carrera.",
      },
      {
        q: "¿Qué es una contrarreloj por equipos?",
        a: "En una contrarreloj por equipos (TTT), los ocho corredores de un equipo salen juntos y compiten contra el cronómetro como unidad. El tiempo oficial del equipo se toma cuando el quinto corredor cruza la línea, así que los equipos deben trabajar al unísono y ningún corredor puede descolgarse hasta el final. El Tour 2026 arranca con una TTT por Barcelona el 4 de julio.",
      },
      {
        q: "¿Cuántos corredores toman la salida?",
        a: "184 corredores de 23 equipos toman la salida del Tour de Francia 2026. Cada equipo presenta ocho corredores. No todos llegan a París: la dureza de la carrera, las caídas y las enfermedades hacen que habitualmente entre 150 y 170 corredores completen las 21 etapas.",
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

export default function FAQEs() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Ayuda e información</span>
        <h1>Preguntas frecuentes</h1>
        <p className="subtitle">Todo lo que necesitas saber sobre Grand Tour Pool y el Tour de Francia 2026.</p>
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
        <h2 style={{ fontSize: 16 }}>¿Tienes alguna otra pregunta?</h2>
        <p className="subtitle" style={{ marginTop: 8 }}>
          Escríbenos a través de nuestra <a href="/es/contact" style={{ color: "var(--red)", fontWeight: 700 }}>página de contacto</a> y te responderemos lo antes posible.
        </p>
      </div>
    </div>
  );
}
