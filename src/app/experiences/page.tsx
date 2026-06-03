import ExperienceTimeline from "@/components/ExperienceTimeline";
import { experiences } from "@/data/experiences";

export const metadata = {
  title: "experiences — manya pradeep narayan",
  description: "manya's experience timeline: reu research at uw security lab, engineering at finmd, cornell research, ewb, and more.",
};

const key = [
  { label: "research", color: "var(--research)" },
  { label: "internship", color: "var(--internship)" },
  { label: "club / leadership", color: "var(--club)" },
];

export default function ExperiencesPage() {
  return (
    <>
      <h1 className="home-enter">experiences</h1>

      {/* Legend */}
      <div className="home-enter-delay"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          marginBottom: "1.75rem",
        }}
      >
        {key.map(({ label, color }) => (
          <span
            key={label}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.72rem",
              color: "var(--muted)",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: color,
                display: "inline-block",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
            {label}
          </span>
        ))}
      </div>

      <ExperienceTimeline entries={experiences} />
    </>
  );
}
