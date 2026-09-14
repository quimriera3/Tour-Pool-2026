"use client";
// app/es/faq/page.js
import { useState } from "react";

const FAQS = [
  {
    section: "Sobre Grand Tour Pool",
    items: [
      {
        q: "¿Qué es Grand Tour Pool?",
        a: "Grand Tour Pool es un juego de predicciones gratuito para las grandes carreras del ciclismo — actualmente La Vuelta a España 2026. Antes de que comience cada etapa, eliges al corredor que crees que va a ganar. Al final de la carrera, quien tenga más puntos gana. No hay cuotas de inscripción: solo crea una cuenta y empieza a jugar.",
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
        a: "Las predicciones de maillots (Rojo, Verde, de Topos y Blanco) cierran una hora antes de la salida de la Etapa 5, el miércoles 26 de agosto de 2026 a las 12:15 CEST. Después de eso, los picks de maillots quedan cerrados para el resto de la carrera.",
      },
      {
        q: "¿Es gratuita la porra?",
        a: "Completamente gratuita. No hay cuota de inscripción, ni suscripción ni pago de ningún tipo. Solo crea una cuenta —tarda unos 30 segundos— y empieza a predecir.",
      },
      {
        q: "¿Qué se puede ganar?",
        a: "Hay premios de material de ciclismo para los tres primeros de la clasificación final. Los premios exactos se confirmarán antes de que acabe la carrera. Todos los detalles están en la página de normas.",
      },
    ],
  },
  {
    section: "Sobre La Vuelta a España 2026",
    items: [
      {
        q: "¿Cuándo y dónde se celebra La Vuelta a España 2026?",
        a: "La Vuelta a España 2026 se celebra del 22 de agosto al 13 de septiembre de 2026. Comienza con una contrarreloj individual de 9 km por las calles de Mónaco —la primera vez que el principado acoge una salida de La Vuelta, lo que lo convierte en el primer país en albergar la etapa inaugural de las tres grandes vueltas— y termina en Granada con un circuito que sube a la Alhambra.",
      },
      {
        q: "¿Cuántas etapas tiene?",
        a: "La Vuelta 2026 tiene 21 etapas que suman 3.298 kilómetros por cuatro países: Mónaco, Francia, Andorra y España. El recorrido incluye siete etapas de montaña, un sector de grava en la etapa 6, dos contrarrelojes individuales, y unas diez últimas etapas disputadas íntegramente en Andalucía.",
      },
      {
        q: "¿Cuáles son los cuatro maillots de La Vuelta?",
        a: "El Maillot Rojo lo lleva el líder de la clasificación general, el corredor con el menor tiempo acumulado; es el equivalente en La Vuelta al amarillo del Tour. El Maillot Verde distingue al líder de la clasificación por puntos, generalmente un esprínter. El Maillot de Lunares premia al mejor escalador, con puntos que se suman en los altos catalogados. El Maillot Blanco es para el mejor joven, el líder de la general entre los corredores de 25 años o menos.",
      },
      {
        q: "¿Quiénes son los favoritos de La Vuelta 2026?",
        a: "Las alineaciones se confirman normalmente la semana previa a la salida, así que todavía no hay ninguna lista oficial de corredores. Lo que sí nos dice el recorrido es que esta edición premia al corredor completo: siete etapas de montaña y finales en alto en Calar Alto y la Sierra de la Pandera favorecen a los escaladores puros, pero la crono de 32,5 km hasta Jerez implica que un escalador que no ruede bien lo tendrá difícil para mantener el rojo hasta Granada.",
      },
      {
        q: "¿Qué es la etapa de grava?",
        a: "La etapa 6, con final en Castellón, introduce sterrato: sectores de grava sin asfaltar, muy poco habituales en la historia de La Vuelta. La grava castiga la mala colocación e introduce el riesgo de pinchazos y averías, por eso los equipos de la general se toman estos días tan en serio como una etapa de montaña pese al desnivel modesto.",
      },
      {
        q: "¿Por qué La Vuelta termina en Granada y no en Madrid?",
        a: "La edición de 2026 no pasa por Madrid debido a un solapamiento de fechas con la Fórmula 1 en la capital. En su lugar, la carrera termina en Granada con cuatro vueltas a un circuito que incluye una subida de aproximadamente un kilómetro hasta la Alhambra. A diferencia de la habitual etapa final de trámite, esta es realmente competitiva y todavía puede afectar a la clasificación.",
      },
      {
        q: "¿Cuántas contrarrelojes hay y de qué distancia?",
        a: "Hay dos. La etapa 1 es una contrarreloj individual de 9 km en Mónaco: corta y técnica, con diferencias pequeñas. La etapa 18 es una contrarreloj individual de 32,1 km entre El Puerto de Santa María y Jerez de la Frontera, por terreno mayoritariamente llano. Es la crono más larga de La Vuelta en años y la mayor oportunidad individual para dar la vuelta a la clasificación general.",
      },
      {
        q: "¿Cuántos corredores toman la salida?",
        a: "184 corredores de 23 equipos toman la salida de La Vuelta a España 2026: los 18 UCI WorldTeams más cinco ProTeams invitados. Cada equipo presenta ocho corredores. No todos llegan al final: la dureza de la carrera, las caídas y las enfermedades hacen que habitualmente unos 150 corredores completen las 21 etapas.",
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
        <p className="subtitle">Todo lo que necesitas saber sobre Grand Tour Pool y La Vuelta a España 2026.</p>
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
