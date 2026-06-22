// app/rules/page.js
export const metadata = {
  title: "Rules & Scoring",
  description: "How Tour de France Pool scoring works: 10 points for the stage winner, 5 for 2nd, 2 for 3rd, plus 3 cycling-gear prizes.",
};

export default function Rules() {
  return (
    <div>
      <div className="page-header">
        <span className="eyebrow">How it works</span>
        <h1>Rules</h1>
      </div>

      <div className="grid grid-2">
        <div className="card">
          <h3 style={{ fontSize: 16 }}>Stage predictions</h3>
          <p className="subtitle" style={{ marginTop: 10 }}>
            For each of the 21 stages, you pick one rider: the one you think will win. Riders
            are shown from most to least favourite based on the stage type (mountain, hilly,
            flat, or time trial).
          </p>
          <div className="points-podium">
            <div className="step">
              <div className="bar" style={{ height: 68, background: "var(--black)" }}>5</div>
              <p className="jpick" style={{ marginTop: 6 }}>2nd place</p>
            </div>
            <div className="step">
              <div className="bar" style={{ height: 86, background: "var(--yellow)", color: "var(--black)" }}>10</div>
              <p className="jpick" style={{ marginTop: 6 }}>Winner</p>
            </div>
            <div className="step">
              <div className="bar" style={{ height: 50, background: "var(--black)" }}>2</div>
              <p className="jpick" style={{ marginTop: 6 }}>3rd place</p>
            </div>
          </div>
          <p className="subtitle" style={{ marginTop: 14, textAlign: "center" }}>
            0 points if your rider finishes outside the podium.
          </p>
        </div>

        <div className="card">
          <h3 style={{ fontSize: 16 }}>Locking predictions</h3>
          <p className="subtitle" style={{ marginTop: 10 }}>
            Each stage locks the moment the race starts: from then on you can no longer change
            that stage&apos;s prediction, but you can always predict the stages that haven&apos;t
            started yet.
          </p>
          <h3 style={{ fontSize: 16, marginTop: 18 }}>Jersey Predictions</h3>
          <p className="subtitle" style={{ marginTop: 10 }}>
            Besides the stages, you can predict who wins the Yellow, Green, Polka Dot, and
            White jerseys. These predictions lock on the day the Tour starts. <strong>Each
            jersey you predict correctly adds 20 points to your leaderboard total</strong> —
            up to 80 points if you get all four right, on top of whatever you score from your
            21 stage picks.
          </p>
        </div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>Prizes</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          There will be <strong>3 prizes</strong> at the end of the Tour, all cycling gear
          (exact items to be confirmed). Standings are based on total points from the stage
          predictions.
        </p>
        <ul style={{ marginTop: 14, paddingLeft: 18, fontSize: 14, lineHeight: 1.7 }}>
          <li><strong>1st place</strong> — cycling gear prize (TBD)</li>
          <li><strong>2nd place</strong> — cycling gear prize (TBD)</li>
          <li><strong>3rd place</strong> — cycling gear prize (TBD)</li>
        </ul>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h3 style={{ fontSize: 16 }}>How the favourite order is decided</h3>
        <p className="subtitle" style={{ marginTop: 10 }}>
          The rider order for each stage is based on their profile (sprinter, climber, puncher,
          time triallist) and, ideally, on bookmaker odds for that specific stage. In this
          prototype the data is illustrative; before the real Tour it needs updating with the
          official rider list and current odds.
        </p>
      </div>
    </div>
  );
}
