"use client";
// components/SimpleBarChart.js
//
// A small, dependency-free bar chart. data: [{ label, value }]. No charting
// library needed for something this simple -- one less thing that can break.
export default function SimpleBarChart({ data, height = 140, barColor = "#ffd400" }) {
  const max = Math.max(1, ...data.map((d) => d.value));
  const w = 100 / data.length;
  const vbHeight = height / 10;

  return (
    <div>
      <svg viewBox={"0 0 100 " + vbHeight} width="100%" height={height} preserveAspectRatio="none">
        {data.map((d, i) => {
          const barHeight = (d.value / max) * (vbHeight - 14);
          return (
            <g key={i}>
              <rect
                x={i * w + w * 0.15}
                y={vbHeight - 14 - barHeight}
                width={w * 0.7}
                height={Math.max(barHeight, 0.5)}
                fill={barColor}
                rx={0.6}
              />
              <text
                x={i * w + w / 2}
                y={vbHeight - 14 - barHeight - 1.5}
                fontSize={3.4}
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
