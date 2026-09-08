import { ImageResponse } from "next/og";

import { colors } from "@/shared/theme";

export const alt = "Studio Patron";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: colors.paper,
          color: colors.ink,
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            border: `2px solid ${colors.ink}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 32,
          }}
        >
          <div style={{ width: 36, height: 36, border: `2px solid ${colors.bronze}` }} />
        </div>
        <div style={{ fontSize: 72, letterSpacing: -1 }}>Studio Patron</div>
        <div style={{ marginTop: 16, fontSize: 28, color: colors.inkMuted }}>
          Interior design, services, and commerce
        </div>
      </div>
    ),
    size,
  );
}
