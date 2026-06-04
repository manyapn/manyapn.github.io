"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { projectGroups } from "@/data/projects";

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

      {/* Project groups — AnimatePresence swaps content on filter change */}
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
              {group.projects.map((project) => {
                const primaryLink    = project.links[0];
                const secondaryLinks = project.links.slice(1);

                return (
                  <div
                    key={project.id}
                    className="project-row"
                    style={{ borderTop: "1px solid var(--line)" }}
                  >
                    {/* Title */}
                    <p style={{ fontWeight: "500", fontSize: "1rem", marginBottom: "0.25rem" }}>
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

                    {/* Description */}
                    <p
                      style={{
                        color: "var(--ink)",
                        fontSize: "0.95rem",
                        marginBottom: "0.4rem",
                        maxWidth: "55ch",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* Tech + secondary links */}
                    <p
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.72rem",
                        color: "var(--muted)",
                        marginBottom: 0,
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
                  </div>
                );
              })}
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
