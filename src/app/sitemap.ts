import type { MetadataRoute } from "next";

export const dynamic = "force-static";

import { posts } from "@/data/posts";
import { chapters } from "@/data/chapters";

const BASE = "https://manyapn.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const static_pages: MetadataRoute.Sitemap = [
    { url: BASE, priority: 1 },
    { url: `${BASE}/now`, priority: 0.9 },
    { url: `${BASE}/experiences`, priority: 0.8 },
    { url: `${BASE}/projects`, priority: 0.8 },
    { url: `${BASE}/2cents`, priority: 0.8 },
  ];

  const post_pages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE}/2cents/${p.slug}`,
    priority: 0.7,
  }));

  const chapter_pages: MetadataRoute.Sitemap = chapters
    .filter((c) => chapters.filter((s) => s.postSlug === c.postSlug).length > 1)
    .map((c) => ({
      url: `${BASE}/2cents/${c.postSlug}/${c.slug}`,
      priority: 0.6,
    }));

  return [...static_pages, ...post_pages, ...chapter_pages];
}
