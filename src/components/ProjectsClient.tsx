"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectGroups, type Project } from "@/data/projects";

type FilterId = "everything" | "personal" | "team" | "data";

const filters: { id: FilterId; label: string; color: string }[] = [
  { id: "everything", label: "everything", color: "var(--ink)" },
  { id: "personal",   label: "personal",   color: "var(--research)" },
  { id: "team",       label: "team",        color: "var(--internship)" },
  { id: "data",       label: "data",        color: "var(--club)" },
];

const groupDot: Record<string, string> = {
  personal: "var(--research)",
  team:     "var(--internship)",
  data:     "var(--club)",
};

const groupTint: Record<string, string> = {
  personal: "rgba(168, 175, 211, 0.08)",
  team:     "rgba(139, 182, 199, 0.08)",
  data:     "rgba(201, 176, 109, 0.09)",
};

const groupBorder: Record<string, string> = {
  personal: "rgba(168, 175, 211, 0.28)",
  team:     "rgba(139, 182, 199, 0.28)",
  data:     "rgba(201, 176, 109, 0.32)",
};

function ProjectRow({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const primaryLink    = project.links[0];
  const secondaryLinks = project.links.slice(1);

  return (
    <div
      className="project-row"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      {/* Title row + expand toggle */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: "1rem",
          paddingTop: "0.05rem",
        }}
      >
        <p style={{ fontWeight: "500", fontSize: "1rem", marginBottom: "0.2rem", flex: 1 }}>
          {primaryLink ? (
            <a
              href={primaryLink.url}
              target="_blank"
              rel="noreferrer"
              style={{ color: "var(--link)", fontWeight: "500" }}
            >
              {project.title}
              <span
                className="arrow-icon"
                style={{ fontSize: "0.8em", marginLeft: "0.25em", opacity: 0.7 }}
                aria-hidden="true"
              >
                ↗
              </span>
            </a>
          ) : (
            <span style={{ color: "var(--ink)" }}>{project.title}</span>
          )}
        </p>

        {/* Expand indicator */}
        <button
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label={open ? `Collapse ${project.title}` : `Expand ${project.title}`}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            flexShrink: 0,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={open ? "minus" : "plus"}
              initial={{ opacity: 0, y: open ? -4 : 4 }}
              animate={{ opacity: open ? 0.5 : 1, y: 0 }}
              exit={{ opacity: 0, y: open ? 4 : -4 }}
              transition={{ duration: 0.12, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.75rem",
                color: "var(--muted)",
                display: "inline-block",
                lineHeight: 1,
              }}
              aria-hidden="true"
            >
              {open ? "−" : "+"}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      {/* Tech line — always visible */}
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.72rem",
          color: "var(--muted)",
          marginBottom: open ? "0.35rem" : 0,
          transition: "margin 0.15s ease",
        }}
      >
        {project.tech}
        {secondaryLinks.map((link) => (
          <span key={link.url}>
            {" · "}
            <a
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              {link.label}{" "}
              <span className="arrow-icon" aria-hidden="true">↗</span>
            </a>
          </span>
        ))}
      </p>

      {/* Description — animated reveal */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="desc"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p
              style={{
                color: "var(--muted)",
                fontSize: "0.9rem",
                marginBottom: "0.25rem",
                maxWidth: "55ch",
                paddingBottom: "0.1rem",
              }}
            >
              {project.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProjectsClient() {
  const [active, setActive] = useState<FilterId>("everything");

  const visible = active === "everything"
    ? projectGroups
    : projectGroups.filter((g) => g.id === active);

  const isFiltered = active !== "everything";

  return (
    <>
      <h1 className="home-enter">projects</h1>

      {/* Filter bar */}
      <div
        className="home-enter-delay"
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: 0,
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8rem",
          marginBottom: "2rem",
        }}
      >
        {filters.map((f, i) => (
          <span key={f.id} style={{ display: "inline-flex", alignItems: "center" }}>
            <button
              className="filter-btn"
              onClick={() => setActive(f.id)}
              aria-pressed={active === f.id}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                padding: "0.35rem 0",
                color: active === f.id ? f.color : "var(--muted)",
                textDecoration: active === f.id ? "underline" : "none",
                textUnderlineOffset: "3px",
              }}
            >
              {f.label}
            </button>
            {i < filters.length - 1 && (
              <span
                style={{ color: "var(--line)", padding: "0 0.45rem" }}
                aria-hidden="true"
              >
                ·
              </span>
            )}
          </span>
        ))}
      </div>

      {/* Project groups */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {visible.map((group, gi) => {
            const dot    = groupDot[group.id]    ?? "var(--muted)";
            const tint   = groupTint[group.id]   ?? "transparent";
            const border = groupBorder[group.id] ?? "var(--line)";

            return (
              <section
                key={group.id}
                style={{
                  marginTop: gi > 0 ? "2rem" : 0,
                  padding: isFiltered ? "1.25rem 1.25rem 1rem" : 0,
                  background: isFiltered ? tint : "transparent",
                  border: isFiltered ? `1px solid ${border}` : "none",
                  borderRadius: isFiltered ? "8px" : 0,
                  transition: "background 0.2s ease, border-color 0.2s ease",
                }}
              >
                {/* Group label */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    marginBottom: "0.25rem",
                  }}
                >
                  <span
                    style={{
                      width: "7px",
                      height: "7px",
                      borderRadius: "50%",
                      background: dot,
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  />
                  <h2 style={{ marginBottom: 0 }}>{group.label}</h2>
                </div>

                {/* Project rows */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {group.projects.map((project) => (
                    <ProjectRow key={project.id} project={project} />
                  ))}
                </div>
              </section>
            );
          })}

          {/* More */}
          {active === "everything" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginTop: "2rem",
              }}
            >
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  background: "var(--muted)",
                  opacity: 0.4,
                  flexShrink: 0,
                }}
                aria-hidden="true"
              />
              <p
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.72rem",
                  color: "var(--muted)",
                  marginBottom: 0,
                }}
              >
                <a
                  className="more-link"
                  href="https://github.com/manyapn"
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--muted)" }}
                >
                  more <span className="more-arrow" aria-hidden="true">→</span> github.com/manyapn
                </a>
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
