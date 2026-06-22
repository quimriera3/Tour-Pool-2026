// components/StageTypeIcon.js
export default function StageTypeIcon({ type, size = 16, color = "currentColor" }) {
  const s = size;
  if (type === "mountains") {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M2 19L9 7l3.5 5.5L15 9l7 10H2Z" fill={color} />
      </svg>
    );
  }
  if (type === "hills") {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
        <path d="M2 17c2.5 0 3.5-4 6-4s3 3 5 3 3-5 6-5 3 3 3 3v3H2Z" fill={color} />
      </svg>
    );
  }
  if (type === "itt" || type === "ttt") {
    return (
      <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.8">
        <circle cx="12" cy="13" r="7.5" />
        <path d="M12 13V8.5M9.5 3h5" strokeLinecap="round" />
      </svg>
    );
  }
  // flat
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M5 3v18M5 4h11l-3 3.5L16 11H5" fill={color} stroke={color} strokeLinejoin="round" />
    </svg>
  );
}
