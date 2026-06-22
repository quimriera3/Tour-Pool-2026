import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(115deg, #0a0a0c 0%, #14161c 45%, #1c2230 100%)",
          position: "relative",
        }}
      >
        {/* Abstract motion light-streaks, evoking night traffic / speed */}
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              right: 60 + i * 90,
              top: 90 + i * 60,
              width: 260 - i * 30,
              height: 5,
              background: "#ffd400",
              opacity: 0.18 + i * 0.05,
              transform: "rotate(-8deg)",
            }}
          />
        ))}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            paddingLeft: 80,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 22,
              fontWeight: 800,
              color: "#ffd400",
              letterSpacing: 3,
              textTransform: "uppercase",
              marginBottom: 18,
            }}
          >
            4 — 26 July 2026
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 86,
              fontWeight: 900,
              letterSpacing: -1,
              lineHeight: 1,
              color: "#ffffff",
            }}
          >
            TOUR DE FRANCE
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 86,
              fontWeight: 900,
              letterSpacing: -1,
              lineHeight: 1,
              color: "#ffd400",
              marginBottom: 30,
            }}
          >
            POOL 2026
          </div>

          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 500,
              color: "#cccccc",
            }}
          >
            Pick a winner for every stage. Beat your friends.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
