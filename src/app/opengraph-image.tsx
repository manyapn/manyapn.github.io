import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "manya pradeep narayan";

const CAT = `  ╱|、\n(˚ˎ 。7\n |、˜〵\n じしˍ,)ノ`;

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#eef2f4",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px 60px",
        }}
      >
        {/* Name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "80px",
              fontWeight: 700,
              color: "#2d5a73",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            manya pradeep narayan
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "#585f5d",
              lineHeight: 1.6,
            }}
          >
            cs + ai @ cornell · agentic systems · human-ai interaction
          </div>
        </div>

        {/* Cat + URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontSize: "22px",
              color: "#3d6a7e",
              whiteSpace: "pre",
              lineHeight: 1.15,
              fontFamily: "monospace",
            }}
          >
            {CAT}
          </div>
          <div
            style={{
              fontSize: "22px",
              color: "#7a8e91",
              letterSpacing: "0.02em",
            }}
          >
            manyapn.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
