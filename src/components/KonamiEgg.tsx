"use client";

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
  "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight",
  "b","a",
];

export default function KonamiEgg() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let pos = 0;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === SEQUENCE[pos]) {
        pos++;
        if (pos === SEQUENCE.length) {
          setVisible(true);
          setTimeout(() => setVisible(false), 3500);
          pos = 0;
        }
      } else {
        pos = e.key === SEQUENCE[0] ? 1 : 0;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed",
        bottom: "2rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "var(--cat)",
        color: "#eef2f4",
        fontFamily: "var(--font-mono), monospace",
        fontSize: "0.82rem",
        lineHeight: 1.3,
        padding: "0.75rem 1.25rem",
        borderRadius: "8px",
        zIndex: 200,
        animation: "fadeUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) both",
        whiteSpace: "pre",
        boxShadow: "0 4px 24px rgba(61, 106, 126, 0.25)",
        pointerEvents: "none",
      }}
    >
      {"  ╱|、\n(˚ˎ 。7  you found the secret!\n |、˜〵\n じしˍ,)ノ"}
    </div>
  );
}
