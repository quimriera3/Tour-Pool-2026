// components/JerseyIcon.js
// Generic, non-trademarked jersey silhouette, just tinted/patterned by category.
// Not a reproduction of any official ASO/UCI jersey graphic.

const FILL = {
  yellow: "#ffd400",
  green: "#1f8a4c",
  white: "#ffffff",
  polka: "#ffffff",
};

const STROKE = {
  yellow: "#9a7d00",
  green: "#155c33",
  white: "#999999",
  polka: "#d6432f",
};

function JerseyBody({ id, fill, stroke }) {
  return (
    <path
      d="M18 4 L26 4 L34 10 L30 16 L26 13 L26 44 L10 44 L10 13 L6 16 L2 10 L10 4 Z"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  );
}

export default function JerseyIcon({ kind = "yellow", size = 36 }) {
  const fill = FILL[kind] || FILL.yellow;
  const stroke = STROKE[kind] || STROKE.yellow;

  return (
    <svg width={size} height={size} viewBox="0 0 36 48">
      <JerseyBody fill={fill} stroke={stroke} />
      {kind === "polka" && (
        <g fill="#d6432f">
          <circle cx="14" cy="20" r="2.4" />
          <circle cx="22" cy="22" r="2.4" />
          <circle cx="17" cy="28" r="2.4" />
          <circle cx="23" cy="34" r="2.4" />
          <circle cx="13" cy="36" r="2.4" />
          <circle cx="20" cy="14" r="2" />
        </g>
      )}
    </svg>
  );
}
