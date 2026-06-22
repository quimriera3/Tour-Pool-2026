export const metadata = {
  title: "Contacto",
  description: "Ponte en contacto con Grand Tour Pool — preguntas, problemas o comentarios.",
};

export default function ContactEs() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">¿Necesitas ayuda?</span>
        <h1>Contacto</h1>
        <p className="subtitle">
          ¿Tienes una pregunta, has encontrado un error, o quieres avisar de un problema con tus
          predicciones o la clasificación? Envíanos un correo y te responderemos.
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>Correo electrónico</h3>
        <a
          href="mailto:info@movement-collective.cc"
          className="btn"
          style={{ marginTop: 14, display: "inline-block" }}
        >
          info@movement-collective.cc
        </a>
        <p className="subtitle" style={{ marginTop: 14 }}>
          Intentamos responder en un par de días. Para problemas de cuenta o inicio de sesión,
          incluye por favor el nombre o correo con el que te registraste.
        </p>
      </div>
    </div>
  );
}
