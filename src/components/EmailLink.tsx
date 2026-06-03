"use client";

import { useState } from "react";

export default function EmailLink({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleClick = () => {
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }).catch(() => {
      // mailto: still opens — silent fallback
    });
  };

  return (
    <a href={`mailto:${email}`} onClick={handleClick}>
      {email}
      {copied && (
        <span
          aria-live="polite"
          style={{
            marginLeft: "0.5rem",
            fontSize: "0.75rem",
            fontFamily: "var(--font-mono), monospace",
            color: "var(--current)",
            animation: "fadeUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) both",
            display: "inline-block",
          }}
        >
          copied!
        </span>
      )}
    </a>
  );
}
