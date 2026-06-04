import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "manya pradeep narayan";

export default async function Image() {
  const delaGothic = await fetch(
    "https://fonts.gstatic.com/s/delagothicone/v16/hESp6XxvMDKFwft33muYpMJFNwBXe9M.woff"
  ).then((r) => r.arrayBuffer());

  const mplusRounded = await fetch(
    "https://fonts.gstatic.com/s/mplusrounded1c/v15/VdGEAYIAV6gnpUpoWwAPe9TpXnER8dlEMw.woff"
  ).then((r) => r.arrayBuffer());

  const CAT = `  ╱|、\n(˚ˎ 。7\n |、˜〵\n じしˍ,)ノ`;

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
        {/* Top: name + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontFamily: "Dela Gothic One",
              fontSize: "72px",
              color: "#2d5a73",
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
            }}
          >
            manya pradeep narayan
          </div>
          <div
            style={{
              fontFamily: "M PLUS Rounded 1c",
              fontSize: "28px",
              color: "#585f5d",
              lineHeight: 1.6,
            }}
          >
            cs + ai @ cornell · agentic systems · human-ai interaction
          </div>
        </div>

        {/* Bottom row: cat + url */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div
            style={{
              fontFamily: "monospace",
              fontSize: "22px",
              color: "#3d6a7e",
              whiteSpace: "pre",
              lineHeight: 1.15,
            }}
          >
            {CAT}
          </div>
          <div
            style={{
              fontFamily: "M PLUS Rounded 1c",
              fontSize: "22px",
              color: "#7a9290",
              letterSpacing: "0.02em",
            }}
          >
            manyapn.com
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Dela Gothic One", data: delaGothic, weight: 400 },
        { name: "M PLUS Rounded 1c", data: mplusRounded, weight: 400 },
      ],
    }
  );
}
