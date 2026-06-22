// components/Podium.js
// Generic top-3 podium visual. items = [{ label, value, sub }], in 1st/2nd/3rd order.

const HEIGHTS = [86, 64, 46]; // 1st, 2nd, 3rd
const ORDER = [1, 0, 2]; // visual order left-to-right: 2nd, 1st, 3rd

export default function Podium({ items, valueSuffix = "" }) {
  if (!items || items.length === 0) return null;

  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 10, justifyContent: "center", padding: "10px 0 0" }}>
      {ORDER.map((idx) => {
        const item = items[idx];
        if (!item) return <div key={idx} style={{ flex: 1 }} />;
        const place = idx + 1;
        return (
          <div key={idx} style={{ flex: 1, textAlign: "center", maxWidth: 130 }}>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{item.label}</div>
            {item.sub && <div style={{ fontSize: 11, color: "var(--grey)", marginBottom: 6 }}>{item.sub}</div>}
            <div
              style={{
                height: HEIGHTS[idx],
                background: place === 1 ? "var(--yellow)" : "var(--black)",
                borderRadius: "8px 8px 0 0",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingTop: 8,
              }}
            >
              <span
                style={{
                  fontFamily: "Anton, sans-serif",
                  fontSize: 22,
                  color: place === 1 ? "var(--black)" : "var(--yellow)",
                }}
              >
                {place}
              </span>
            </div>
            {item.value !== undefined && (
              <div style={{ fontSize: 12, fontWeight: 800, marginTop: 6 }}>
                {item.value}
                {valueSuffix}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
