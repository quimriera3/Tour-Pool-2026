// components/DisclaimerBanner.js
export default function DisclaimerBanner() {
  return (
    <div className="disclaimer-banner">
      <div className="container disclaimer-inner">
        <span className="disclaimer-icon">⚠️</span>
        <p>
          <strong>Rider squads aren&apos;t official yet.</strong> The Tour de France 2026 has{" "}
          <strong>23 teams</strong>, but full 8-rider rosters are usually only confirmed
          1-2 weeks before the start. The riders you see here are a partial, growing list —
          more will be added as teams confirm them.
        </p>
      </div>
    </div>
  );
}
