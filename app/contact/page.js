export const metadata = {
  title: "Contact",
  description: "Get in touch with Grand Tour Pool — questions, issues, or feedback.",
};

export default function Contact() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Need help?</span>
        <h1>Contact</h1>
        <p className="subtitle">
          Got a question, found a bug, or want to report an issue with your predictions or the
          leaderboard? Send us an email and we&apos;ll get back to you.
        </p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>Email</h3>
        <a
          href="mailto:info@movement-collective.cc"
          className="btn"
          style={{ marginTop: 14, display: "inline-block" }}
        >
          info@movement-collective.cc
        </a>
        <p className="subtitle" style={{ marginTop: 14 }}>
          We try to reply within a couple of days. For account or login issues, please include
          the name or email you signed up with.
        </p>
      </div>
    </div>
  );
}
