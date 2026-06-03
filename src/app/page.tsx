import AsciiCat from "@/components/AsciiCat";
import EmailLink from "@/components/EmailLink";
import Highlight from "@/components/Highlight";
import { personal } from "@/data/personal";

export const metadata = {
  title: "manya pradeep narayan",
};

export default function Home() {
  return (
    <>
      <div className="home-enter"><AsciiCat /></div>
      <h1 className="hero-h1 home-enter-delay">hi, i&apos;m manya!</h1>

      <p className="home-enter-delay">
        i&apos;m from{" "}
        <Highlight variant="blue">seattle</Highlight>, and i&apos;m studying{" "}
        <Highlight variant="blue">cs + ai</Highlight>{" "}at cornell university.
        lately, i&apos;ve been interested in{" "}
        <Highlight variant="lavender">agentic systems</Highlight>,{" "}
        <Highlight variant="green">human-ai interaction</Highlight>, and what
        makes software feel{" "}
        <Highlight variant="gold">reliable, useful, and personal</Highlight>.
      </p>

      <p className="home-enter-delay">
        outside of work, some things that make me happy are trying new cafes and
        restaurants, <Highlight variant="blue">68°F weather</Highlight>, social
        logging apps &amp; micro-communities{" "}
        <em>(loving retro rn)</em>, reading, collecting ikea paint chips,
        traveling, trip planning, watching movies, and spending lots of time
        with friends and family.
      </p>

      <p className="home-enter-delay">
        i&apos;d love to chat! reach me at{" "}
        <EmailLink email={personal.email} />.
      </p>

      <p
        className="home-enter-delay"
        style={{
          marginTop: "2rem",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8rem",
          color: "var(--muted)",
          display: "flex",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <a
          href={personal.githubUrl}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--muted)" }}
        >
          {personal.github}
        </a>
        <a
          href={personal.linkedinUrl}
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--muted)" }}
        >
          {personal.linkedin}
        </a>
      </p>
    </>
  );
}
