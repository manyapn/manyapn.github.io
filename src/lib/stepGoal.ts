export function getDailyStepGoal(): number | null {
  const today = new Date().toISOString().slice(0, 10);

  if (typeof window === "undefined") {
    return null;
  }

  const saved = JSON.parse(localStorage.getItem("dailyStepGoal") || "null");

  if (saved?.date === today && saved?.goal) {
    return saved.goal;
  }

  const goal = Math.floor(Math.random() * (15000 - 6000 + 1)) + 6000;

  localStorage.setItem(
    "dailyStepGoal",
    JSON.stringify({ date: today, goal })
  );

  return goal;
}
