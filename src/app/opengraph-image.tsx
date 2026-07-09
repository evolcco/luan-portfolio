import { ImageResponse } from "next/og";

export const alt = "Luan Andrade — Diretor de Arte & Brand Specialist";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0b0c0e",
          color: "#f5f4f1",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: 4,
            color: "#8a8c90",
            textTransform: "uppercase",
          }}
        >
          <span>Luan Andrade</span>
          <span>Diretor de Arte</span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 148,
            fontWeight: 800,
            lineHeight: 0.9,
            letterSpacing: -4,
          }}
        >
          <span>Luan</span>
          <span>Andrade</span>
        </div>

        <div style={{ display: "flex", fontSize: 26, color: "#8a8c90", letterSpacing: 2 }}>
          Direção de arte · Marca · Sistemas visuais
        </div>
      </div>
    ),
    { ...size },
  );
}
