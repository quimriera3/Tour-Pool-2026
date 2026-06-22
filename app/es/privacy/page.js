export const metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Tour de France Pool: qué datos recogemos, cookies y anuncios.",
};

export default function PrivacyEs() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Legal</span>
        <h1>Política de Privacidad</h1>
        <p className="subtitle">Última actualización: junio de 2026</p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>Qué datos recogemos</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Cuando te registras, guardamos tu nombre y correo electrónico (a través de nuestro
          proveedor de autenticación, Supabase) para que puedas iniciar sesión y para guardar
          tus predicciones de etapas y maillots. No vendemos ni compartimos esta información con
          terceros más allá de lo descrito aquí.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Cookies y analítica</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Usamos una pequeña cantidad de cookies y almacenamiento local para mantener tu sesión
          iniciada y recordar tu preferencia sobre cookies. También usamos Vercel Analytics, que
          recoge estadísticas de visitas anónimas y agregadas (sin identificadores personales)
          para entender cómo se usa el sitio.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Publicidad</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Este sitio muestra anuncios servidos por Google AdSense. Google puede usar cookies
          para mostrarte anuncios basados en tus visitas a este y otros sitios web. Puedes
          aprender más sobre cómo Google usa estos datos, y gestionar tus preferencias de
          personalización de anuncios, en{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
            policies.google.com/technologies/partner-sites
          </a>.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Tus derechos</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Puedes pedirnos acceder, corregir o eliminar tus datos personales en cualquier momento
          contactándonos — consulta nuestra{" "}
          <a href="/es/contact" style={{ textDecoration: "underline" }}>página de contacto</a>.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Cambios en esta política</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          Podemos actualizar esta política de vez en cuando. Los cambios importantes se
          reflejarán con una nueva fecha de &quot;última actualización&quot; arriba.
        </p>
      </div>
    </div>
  );
}
