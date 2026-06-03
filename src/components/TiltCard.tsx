"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  role?: string;
  "aria-label"?: string;
};

export default function TiltCard({ children, className, style, role, "aria-label": ariaLabel }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(700px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    ref.current.style.transition = "transform 0.1s ease";
  };

  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(700px) rotateX(0deg) rotateY(0deg)";
    ref.current.style.transition = "transform 0.55s cubic-bezier(0.16, 1, 0.3, 1)";
  };

  return (
    <div
      ref={ref}
      className={className}
      role={role}
      aria-label={ariaLabel}
      style={{ ...style, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </div>
  );
}
