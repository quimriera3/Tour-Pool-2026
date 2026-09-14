export const metadata = {
  title: "Política de Privacidad",
  description: "Política de privacidad de Grand Tour Pool: cuenta, predicciones, emails opcionales, analítica y preferencias de cookies.",
  alternates: { canonical: "/es/privacy", languages: { en: "/privacy", es: "/es/privacy" } },
};

export default function PrivacyEs() {
  return <div>
    <div className="page-header"><span className="eyebrow">Legal</span><h1>Política de Privacidad</h1><p className="subtitle">Última actualización: 14 de septiembre de 2026</p></div>
    <div className="legal-stack">
      <section className="card"><h2>Qué guardamos</h2><p className="subtitle">Cuando creas una cuenta, Supabase guarda la información necesaria para autenticarte y Grand Tour Pool guarda tu perfil, tus predicciones por carrera y tus puntos para que el juego funcione. No vendemos tus datos personales.</p></section>
      <section className="card"><h2>Emails opcionales del juego</h2><p className="subtitle">Los recordatorios y avisos de resultados son opcionales. Solo se envían cuando tu perfil ha dado consentimiento explícito. Puedes cambiar esa preferencia desde los controles de tu cuenta o contactar con nosotros si necesitas ayuda.</p></section>
      <section className="card"><h2>Cookies y analítica</h2><p className="subtitle">Usamos almacenamiento esencial para la autenticación y para recordar tu elección de cookies. Vercel Analytics proporciona estadísticas agregadas de uso. Google Tag Manager solo se carga después de pulsar “Aceptar analítica” en el aviso de consentimiento. Rechazar la analítica no impide jugar.</p></section>
      <section className="card"><h2>Publicidad</h2><p className="subtitle">Grand Tour Pool no carga actualmente scripts publicitarios de Google AdSense. Si se activa publicidad en el futuro, actualizaremos esta política y los controles de consentimiento antes de cargar esos scripts para los visitantes que requieran consentimiento.</p></section>
      <section className="card"><h2>Proveedores</h2><p className="subtitle">Usamos Supabase para autenticación y base de datos, Vercel para alojamiento y analítica agregada, y Resend para entregar emails transaccionales o comunicaciones del juego aceptadas por el usuario.</p></section>
      <section className="card"><h2>Tus derechos</h2><p className="subtitle">Puedes pedir acceso, corrección o eliminación de tus datos, o retirar el consentimiento para emails opcionales, desde nuestra <a href="/es/contact">página de contacto</a>.</p></section>
      <section className="card"><h2>Cambios</h2><p className="subtitle">Si esta política cambia de forma relevante, actualizaremos la fecha indicada arriba.</p></section>
    </div>
  </div>;
}
