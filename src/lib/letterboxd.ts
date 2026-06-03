export async function getLatestFilm(fallback: string): Promise<string> {
  try {
    const res = await fetch("https://letterboxd.com/manyapn/rss/");
    if (!res.ok) return fallback;
    const xml = await res.text();
    // Use <letterboxd:filmTitle> — plain title, no year or rating appended
    const match = xml.match(/<letterboxd:filmTitle>(.*?)<\/letterboxd:filmTitle>/);
    return match?.[1]?.trim() ?? fallback;
  } catch {
    return fallback;
  }
}
