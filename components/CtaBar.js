// components/CtaBar.js
export default function CtaBar() {
  return (
    <div className="cta-bar">
      <div className="container cta-bar-inner">
        <a href="/predictions" className="cta-bar-btn">
          Stage<br className="cta-break" /> predictions →
        </a>
        <a href="/final-classification" className="cta-bar-btn">
          Jersey<br className="cta-break" /> predictions →
        </a>
      </div>
    </div>
  );
}
