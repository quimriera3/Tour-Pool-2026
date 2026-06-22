"use client";
// components/StageProfile.js
// Stylised elevation profile -- NOT a literal GPX trace. It gives a quick visual
// read of the stage shape (flat / hilly / mountain / time trial) scaled roughly
// by the elevation gain figure. Swap for a real GPX-based profile once you have
// official altitude data.

import { TYPE_COLOR } from "../lib/data";

const W = 280;
const H = 70;

function buildPoints(type, elevationGain) {
  const amp = Math.min(1, elevationGain / 5000); // 0..1 intensity
  const base = H - 6;
  let pts = [[0, base]];

  if (type === "flat") {
    pts.push([W * 0.3, base - 4 * amp]);
    pts.push([W * 0.55, base - 8 * amp]);
    pts.push([W * 0.8, base - 3 * amp]);
    pts.push([W, base - 6 * amp]);
  } else if (type === "hills") {
    pts.push([W * 0.18, base - 18 * amp]);
    pts.push([W * 0.3, base - 6 * amp]);
    pts.push([W * 0.48, base - 26 * amp]);
    pts.push([W * 0.62, base - 10 * amp]);
    pts.push([W * 0.8, base - 30 * amp]);
    pts.push([W, base - 14 * amp]);
  } else if (type === "mountains") {
    pts.push([W * 0.12, base - 16 * amp]);
    pts.push([W * 0.22, base - 8 * amp]);
    pts.push([W * 0.4, base - 38 * amp]);
    pts.push([W * 0.5, base - 14 * amp]);
    pts.push([W * 0.68, base - 50 * amp]);
    pts.push([W * 0.8, base - 20 * amp]);
    pts.push([W, base - 58 * amp]); // summit finish feel
  } else {
    // itt / ttt: mostly flat with a gentle ramp
    pts.push([W * 0.4, base - 5 * amp]);
    pts.push([W * 0.7, base - 9 * amp]);
    pts.push([W, base - 4 * amp]);
  }
  return pts;
}

export default function StageProfile({ type, elevationGain }) {
  const pts = buildPoints(type, elevationGain);
  const line = pts.map((p) => p[0] + "," + p[1]).join(" ");
  const area = "0," + H + " " + line + " " + W + "," + H;

  const color = TYPE_COLOR[type] || TYPE_COLOR.flat;

  return (
    <svg viewBox={"0 0 " + W + " " + H} width="100%" height={H} preserveAspectRatio="none">
      <polygon points={area} fill={color} opacity="0.15" />
      <polyline points={line} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}
