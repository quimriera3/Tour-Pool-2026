import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ffd400",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            fontWeight: 900,
            color: "#111111",
            lineHeight: 1,
          }}
        >
          T
        </div>
      </div>
    ),
    { ...size }
  );
}
