"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { posts, allTags, type TagFilter } from "@/data/posts";

const tagColor: Record<string, string> = {
  all: "var(--ink)",
  college: "var(--research)",
  advice: "var(--internship)",
};

export default function PostsArchive() {
  const [active, setActive] = useState<TagFilter>("all");

  const visible =
    active === "all" ? posts : posts.filter((p) => p.tags.includes(active));

  const byYear = visible.reduce<Record<number, typeof posts>>((acc, p) => {
    if (!acc[p.year]) acc[p.year] = [];
    acc[p.year].push(p);
    return acc;
  }, {});

  const years = Object.keys(byYear)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <>
      <h1 className="home-enter">2cents</h1>
      <p
        className="home-enter-delay"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8rem",
          color: "var(--muted)",
          marginTop: "-1rem",
          marginBottom: "2rem",
        }}
      >
        my thoughts &amp; writing
      </p>

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
          marginBottom: "2.5rem",
        }}
      >
        {allTags.map((tag, i) => (
          <span key={tag} style={{ display: "inline-flex", alignItems: "center" }}>
            <button
              className="filter-btn"
              onClick={() => setActive(tag)}
              aria-pressed={active === tag}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "inherit",
                fontSize: "inherit",
                padding: "0.35rem 0",
                color: active === tag ? tagColor[tag] : "var(--muted)",
                textDecoration: active === tag ? "underline" : "none",
                textUnderlineOffset: "3px",
              }}
            >
              {tag}
            </button>
            {i < allTags.length - 1 && (
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

      {/* Posts grouped by year */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
        >
          {years.map((year) => (
            <section key={year} style={{ marginBottom: "2.5rem" }}>
              <h2
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "1.3rem",
                  color: "var(--ink)",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.75rem",
                }}
              >
                {year}
              </h2>

              {byYear[year].map((post) => (
                <div key={post.slug} className="post-entry">
                  <p style={{ fontWeight: "500", fontSize: "1.1rem", marginBottom: "0.2rem" }}>
                    <Link href={`/2cents/${post.slug}`} style={{ color: "var(--link)", fontWeight: "500" }}>
                      {post.title}
                    </Link>
                  </p>
                  <p
                    style={{
                      fontFamily: "var(--font-mono), monospace",
                      fontSize: "0.72rem",
                      color: "var(--muted)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {post.tags.join(", ")} · {post.readTime}
                  </p>
                  <p style={{ fontSize: "0.95rem", color: "var(--ink)", marginBottom: 0 }}>
                    {post.description}
                  </p>
                </div>
              ))}
            </section>
          ))}

          {visible.length === 0 && (
            <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
              nothing here yet.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </>
  );
}
