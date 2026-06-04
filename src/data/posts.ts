export type Post = {
  slug: string;
  title: string;
  subtitle: string;
  date: string;
  year: number;
  tags: string[];
  description: string;
  readTime: string;
};

export const posts: Post[] = [
  {
    slug: "255-days-later",
    title: "255 Days Later...",
    subtitle: "A College Application Journey",
    date: "2025-03-31",
    year: 2025,
    tags: ["college", "advice"],
    description: "I started my college apps on July 17th, 2024. I'm writing this on March 31, 2025, and I just received my final decision. Here's everything I wish I'd known.",
    readTime: "6 chapters",
  },
];

export const allTags = ["all", "college", "advice"] as const;
export type TagFilter = (typeof allTags)[number];
