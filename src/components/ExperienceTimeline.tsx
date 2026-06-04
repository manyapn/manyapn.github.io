"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Experience } from "@/data/experiences";

type Props = {
  entries: Experience[];
};

const dotColor: Record<Experience["category"], string> = {
  research: "var(--research)",
  internship: "var(--internship)",
  club: "var(--club)",
};

function TimelineEntry({ entry, isFirst, index }: { entry: Experience; isFirst: boolean; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.35,
        delay: 0.18 + index * 0.04,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        borderTop: isFirst ? "1px solid var(--line)" : undefined,
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div style={{ padding: "1rem 0" }}>
        <button
          className="timeline-entry-btn"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls={`desc-${entry.id}`}
          style={{
            cursor: "pointer",
            display: "grid",
            gridTemplateColumns: "8px 1fr auto",
            alignItems: "start",
            gap: "0.75rem",
            background: "none",
            border: "none",
            padding: 0,
            width: "100%",
            textAlign: "left",
            userSelect: "none",
            fontFamily: "inherit",
          }}
        >
          {/* Category dot */}
          <span
            className="entry-dot"
            data-cat={entry.category}
            style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background: dotColor[entry.category],
              marginTop: "0.55rem",
              flexShrink: 0,
            }}
            aria-hidden="true"
          />

          {/* Role + org */}
          <span>
            <span
              style={{
                display: "block",
                fontWeight: entry.current ? "500" : "400",
                color: entry.current ? "var(--ink)" : "var(--muted)",
                fontSize: "1rem",
              }}
            >
              {entry.role}{" "}
              {entry.orgUrl ? (
                <a
                  href={entry.orgUrl}
                  target="_blank"
                  rel="noreferrer"
                  style={{ color: "var(--muted)", fontWeight: "400" }}
                >
                  @ {entry.org}
                </a>
              ) : (
                <span style={{ color: "var(--muted)", fontWeight: "400" }}>
                  @ {entry.org}
                </span>
              )}
            </span>
            <span
              style={{
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.72rem",
                color: "var(--muted)",
                display: "block",
                marginTop: "0.15rem",
              }}
            >
              {entry.period}
            </span>
          </span>

          {/* Expand indicator — animates between + and − */}
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
                marginTop: "0.35rem",
                display: "inline-block",
              }}
              aria-hidden="true"
            >
              {open ? "−" : "+"}
            </motion.span>
          </AnimatePresence>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="body"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                id={`desc-${entry.id}`}
                style={{
                  paddingTop: "0.75rem",
                  paddingLeft: "1.5rem",
                  paddingBottom: "0.25rem",
                  fontSize: "0.95rem",
                  color: "var(--muted)",
                  lineHeight: "1.65",
                }}
              >
                {entry.description}
                {entry.collaborator && (
                  <> assisting{" "}
                    <a
                      href={entry.collaborator.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {entry.collaborator.name}
                    </a>
                    .
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

export default function ExperienceTimeline({ entries }: Props) {
  return (
    <ul role="list" style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0" }}>
      {entries.map((entry, i) => (
        <TimelineEntry key={entry.id} entry={entry} isFirst={i === 0} index={i} />
      ))}
    </ul>
  );
}
