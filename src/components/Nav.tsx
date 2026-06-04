"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "@/components/ThemeToggle";

const links = [
  { href: "/", label: "/" },
  { href: "/now", label: "/now" },
  { href: "/experiences", label: "/experiences" },
  { href: "/projects", label: "/projects" },
  { href: "/2cents", label: "/2 cents" },
];

export default function Nav() {
  const pathname = usePathname();

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

  return (
    <nav
      className="nav-enter"
      style={{ maxWidth: "720px", margin: "0 auto", padding: "32px 24px 0" }}
      aria-label="Main navigation"
    >
      <div
        style={{
          display: "flex",
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
                <span
                  style={{ padding: "0 0.4rem", color: "var(--line)" }}
                  aria-hidden="true"
                >
                  ·
                </span>
              )}
            </span>
          );
        })}

        {/* Theme toggle — right side */}
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center" }}>
          <span style={{ padding: "0 0.4rem", color: "var(--line)" }} aria-hidden="true">·</span>
          <ThemeToggle />
        </span>
      </div>
    </nav>
  );
}
