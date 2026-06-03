"use client";

import { getDailyStepGoal } from "@/lib/stepGoal";

export default function StepGoal() {
  const goal = typeof window !== "undefined" ? getDailyStepGoal() : null;

  return (
    <span suppressHydrationWarning>
      today&apos;s step goal:{" "}
      <strong style={{ fontWeight: 500 }}>
        {goal !== null ? goal.toLocaleString() : "..."}
      </strong>
    </span>
  );
}
