"use client";

import { useState } from "react";

const CAT = `  ╱|、
(˚ˎ 。7
 |、˜〵
 じしˍ,)ノ`;

export default function AsciiCat() {
  const [meowing, setMeowing] = useState(false);

  const handleClick = () => {
    if (meowing) return;
    setMeowing(true);
    setTimeout(() => setMeowing(false), 2000);
  };

  return (
    <div className="cat-breathe" style={{ position: "relative" }}>
      <pre
        className="ascii-cat"
        onClick={handleClick}
        aria-hidden="true"
      >
        {CAT}
      </pre>
      {meowing && (
        <span
          style={{
            position: "absolute",
            top: "-1.25rem",
            left: "5rem",
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.8rem",
            color: "var(--research)",
            animation: "fadeUp 0.2s cubic-bezier(0.16, 1, 0.3, 1) both",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          hi! :)
        </span>
      )}
    </div>
  );
}
