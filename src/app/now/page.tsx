import StepGoal from "@/components/StepGoal";
import Highlight from "@/components/Highlight";
import TiltCard from "@/components/TiltCard";
import { nowData } from "@/data/now";
import { getLatestFilm } from "@/lib/letterboxd";

export const metadata = {
  title: "now — manya pradeep narayan",
  description: "what manya is up to right now: researching agentic browser security at uw, engineering at finmd, and spending the summer in seattle.",
};

const arrowItem: React.CSSProperties = {
  color: "var(--ink)",
  fontSize: "0.95rem",
  lineHeight: "1.75",
  paddingLeft: "1.5em",
  textIndent: "-1.5em",
};

const dotItem: React.CSSProperties = {
  fontSize: "0.95rem",
  lineHeight: "1.75",
  paddingLeft: "1.2em",
  textIndent: "-1.2em",
};

export default async function NowPage() {
  const movie = await getLatestFilm(nowData.fallbackMovie);

  return (
    <>
      <h1 className="home-enter">now</h1>

      <div className="home-enter-delay">
      <p>
        this summer, i&apos;m back in{" "}
        <Highlight variant="blue">seattle</Highlight>!
      </p>

      <p style={{ marginTop: "1.5rem", color: "var(--muted)", fontSize: "0.9rem" }}>
        i&apos;m currently:
      </p>

      <ul
        role="list"
        style={{
          listStyle: "none",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
          marginTop: "0.4rem",
          marginBottom: "2.5rem",
        }}
      >
        {(
          [
            <>researching <Highlight variant="lavender">agentic browser security</Highlight> @ uw security &amp; privacy lab</>,
            <>doing <Highlight variant="blue">full-stack/product engineering</Highlight> @ finmd</>,
            <>upskilling in <Highlight variant="green">ai engineering, ml</Highlight>, etc etc</>,
            <>hoping to attend cool events and meet cool people :)</>,
          ] as React.ReactNode[]
        ).map((item, i) => (
          <li key={i} style={arrowItem}>
            <span
              style={{ fontFamily: "var(--font-mono), monospace", color: "var(--muted)" }}
              aria-hidden="true"
            >
              {"↳ "}
            </span>
            {item}
          </li>
        ))}
      </ul>

      </div>

      {/* Other fun stuff panel */}
      <div className="home-enter-delay-2">
      <TiltCard
        role="region"
        aria-label="other fun stuff"
        className="fun-stuff-box"
        style={{
          background: "rgba(201, 176, 109, 0.09)",
          border: "1px solid rgba(201, 176, 109, 0.28)",
          borderRadius: "8px",
          padding: "1.25rem 1.25rem 1rem",
        }}
      >
        <h2 style={{ marginBottom: "0.9rem" }}>other fun stuff</h2>

        <ul
          role="list"
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: "0.55rem",
          }}
        >
          <li style={dotItem}>
            <span style={{ color: "var(--muted)" }} aria-hidden="true">{"· "}</span>
            reading{" "}
            <Highlight variant="gold">{nowData.reading}</Highlight>
          </li>
          <li style={dotItem}>
            <span style={{ color: "var(--muted)" }} aria-hidden="true">{"· "}</span>
            tracked{" "}
            <a href={nowData.beliUrl} target="_blank" rel="noreferrer">
              {nowData.beliCount} restaurants on beli
            </a>
          </li>
          <li style={dotItem}>
            <span style={{ color: "var(--muted)" }} aria-hidden="true">{"· "}</span>
            last watched: <em>{movie}</em>
          </li>
          <li style={dotItem}>
            <span style={{ color: "var(--muted)" }} aria-hidden="true">{"· "}</span>
            <StepGoal />
          </li>
        </ul>

        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.72rem",
            color: "var(--muted)",
            marginTop: "1.25rem",
            opacity: 0.7,
          }}
        >
          last updated: {nowData.lastUpdated}
        </p>
      </TiltCard>
      </div>
    </>
  );
}
