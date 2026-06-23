"use client";
// components/SimpleBarChart.js
//
// A small, dependency-free bar chart. data: [{ label, value }]. No charting
// library needed for something this simple -- one less thing that can break.
export default function SimpleBarChart({ data, height = 140, barColor = "#ffd400" }) {
  const W = 300;
  const padTop = 22; // room for the value label printed above each bar
  const padBottom = 4;
  const chartH = height - padTop - padBottom;
  const max = Math.max(1, ...data.map((d) => d.value));
  const barW = W / data.length;

  return (
    <div>
      <svg viewBox={"0 0 " + W + " " + height} width="100%" height={height} preserveAspectRatio="none">
        {/* baseline */}
        <line x1={0} y1={height - padBottom} x2={W} y2={height - padBottom} stroke="#e5e5e3" strokeWidth={1} />
        {data.map((d, i) => {
          const barH = max > 0 ? (d.value / max) * chartH : 0;
          const x = i * barW + barW * 0.2;
          const w = barW * 0.6;
          const y = height - padBottom - barH;
          return (
            <g key={i}>
              <rect x={x} y={y} width={w} height={Math.max(barH, 1)} fill={barColor} rx={2} />
              <text
                x={x + w / 2}
                y={y - 6}
                fontSize={12}
                textAnchor="middle"
                fill="#111"
                fontWeight="700"
              >
                {d.value}
              </text>
            </g>
          );
        })}
      </svg>
      <div style={{ display: "flex", marginTop: 4 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "var(--grey)" }}>
            {d.label}
          </div>
        ))}
      </div>
    </div>
  );
}
