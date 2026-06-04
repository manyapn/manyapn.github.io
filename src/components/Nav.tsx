"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "/" },
  { href: "/now", label: "/now" },
  { href: "/experiences", label: "/experiences" },
  { href: "/projects", label: "/projects" },
  { href: "/2cents", label: "/2cents" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    console.log(
      "%c  ╱|、\n(˚ˎ 。7\n |、˜〵\n じしˍ,)ノ  ",
      "background:#3d6a7e;color:#eef2f4;font-family:monospace;padding:8px 12px;border-radius:6px;line-height:1.3;"
    );
    console.log(
      "%cmade by manya. built with claude code.",
      "color:#585f5d;font-family:monospace;font-size:11px;"
    );
  }, []);

  const activeLabel = links.find((l) => l.href === pathname)?.label ?? pathname;

  return (
    <nav
      ref={navRef}
      className="nav-enter"
      style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px 0" }}
      aria-label="Main navigation"
    >
      {/* ── Desktop: horizontal link bar ─────────────── */}
      <div
        className="nav-desktop"
        style={{
          flexWrap: "wrap",
          gap: 0,
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8rem",
          color: "var(--muted)",
          lineHeight: "1.5",
        }}
      >
        {links.map((link, i) => {
          const active = pathname === link.href;
          return (
            <span key={link.href} style={{ display: "flex", alignItems: "center" }}>
              <Link
                href={link.href}
                style={{
                  position: "relative",
                  color: active ? "var(--ink)" : "var(--muted)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                  padding: "0.5rem 0.25rem",
                  display: "inline-block",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--ink)";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.color = "var(--muted)";
                }}
              >
                {link.label}
                {active && (
                  <motion.span
                    layoutId="nav-indicator"
                    style={{
                      position: "absolute",
                      bottom: "6px",
                      left: "0.25rem",
                      right: "0.25rem",
                      height: "1px",
                      background: "var(--ink)",
                      borderRadius: "1px",
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </Link>
              {i < links.length - 1 && (
                <span style={{ padding: "0 0.4rem", color: "var(--line)" }} aria-hidden="true">·</span>
              )}
            </span>
          );
        })}

        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <span style={{ padding: "0 0.4rem", color: "var(--line)" }} aria-hidden="true">·</span>
          <ThemeToggle />
        </span>
      </div>

      {/* ── Mobile: current page + collapse toggle ────── */}
      <div className="nav-mobile">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.8rem",
          }}
        >
          {/* Current route label */}
          <span
            style={{
              position: "relative",
              color: "var(--ink)",
              padding: "0.5rem 0.25rem",
            }}
          >
            {activeLabel}
            <span
              style={{
                position: "absolute",
                bottom: "6px",
                left: "0.25rem",
                right: "0.25rem",
                height: "1px",
                background: "var(--ink)",
                borderRadius: "1px",
              }}
            />
          </span>

          {/* Right cluster: theme + toggle */}
          <span style={{ display: "flex", alignItems: "center" }}>
            <ThemeToggle />
            <span style={{ padding: "0 0.35rem", color: "var(--line)" }} aria-hidden="true">·</span>
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-label={open ? "Close navigation" : "Open navigation"}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-mono), monospace",
                fontSize: "0.8rem",
                color: open ? "var(--ink)" : "var(--muted)",
                padding: "0.5rem 0.25rem",
                lineHeight: 1,
                transition: "color 0.15s ease",
                minWidth: "1.5rem",
                textAlign: "center",
              }}
            >
              {open ? "×" : "···"}
            </button>
          </span>
        </div>

        {/* Slide-down link list */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              style={{ overflow: "hidden" }}
            >
              <div
                style={{
                  borderTop: "1px solid var(--line)",
                  marginTop: "0.1rem",
                  paddingTop: "0.35rem",
                  paddingBottom: "0.5rem",
                  display: "flex",
                  flexDirection: "column",
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.8rem",
                }}
              >
                {links.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        color: active ? "var(--ink)" : "var(--muted)",
                        textDecoration: "none",
                        padding: "0.4rem 0.25rem",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "color 0.12s ease",
                        fontWeight: active ? "500" : "400",
                      }}
                    >
                      <span
                        style={{
                          width: "0.5rem",
                          color: "var(--muted)",
                          opacity: active ? 1 : 0,
                          fontSize: "0.65rem",
                          transition: "opacity 0.12s ease",
                        }}
                        aria-hidden="true"
                      >
                        ›
                      </span>
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
