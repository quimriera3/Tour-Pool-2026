export const metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for Tour de France Pool: what data we collect, cookies, and ads.",
};

export default function Privacy() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">Legal</span>
        <h1>Privacy Policy</h1>
        <p className="subtitle">Last updated: June 2026</p>
      </div>

      <div className="card">
        <h3 style={{ fontSize: 16 }}>What we collect</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          When you sign up, we store your name and email address (via our authentication
          provider, Supabase) so you can log in and we can save your stage and jersey
          predictions. We don&apos;t sell or share this information with third parties beyond
          what&apos;s described here.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Cookies and analytics</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          We use a small amount of cookies and local storage to keep you logged in and to
          remember your cookie preference. We also use Vercel Analytics, which collects
          anonymous, aggregated visit statistics (no personal identifiers), to understand how
          the site is used.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Advertising</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          This site shows ads served by Google AdSense. Google may use cookies to show you ads
          based on your visits to this and other websites. You can learn more about how Google
          uses this data, and manage your ad personalisation settings, at{" "}
          <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "underline" }}>
            policies.google.com/technologies/partner-sites
          </a>.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Your rights</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          You can ask us to access, correct, or delete your personal data at any time by
          contacting us — see our{" "}
          <a href="/contact" style={{ textDecoration: "underline" }}>contact page</a>.
        </p>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Changes to this policy</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          We may update this policy from time to time. Significant changes will be reflected
          with a new &quot;last updated&quot; date above.
        </p>
      </div>
    </div>
  );
}
