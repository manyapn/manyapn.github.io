import Link from "next/link";
import { chapters, getChaptersForPost } from "@/data/chapters";
import { posts } from "@/data/posts";

import { contentMap } from "@/lib/contentMap";

export function generateStaticParams() {
  return chapters.map((ch) => ({
    slug: ch.postSlug,
    chapter: ch.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const { slug, chapter } = await params;
  const post = posts.find((p) => p.slug === slug);
  const ch = chapters.find((c) => c.postSlug === slug && c.slug === chapter);
  return {
    title: ch
      ? `${ch.title} | ${post?.title ?? "2 cents"}`
      : "2 cents",
    description: ch?.description,
  };
}

export default async function ChapterPage({
  params,
}: {
  params: Promise<{ slug: string; chapter: string }>;
}) {
  const { slug, chapter } = await params;
  const post = posts.find((p) => p.slug === slug);
  const allChapters = getChaptersForPost(slug);
  const currentIndex = allChapters.findIndex((c) => c.slug === chapter);
  const currentChapter = allChapters[currentIndex];
  const prevChapter = currentIndex > 0 ? allChapters[currentIndex - 1] : null;
  const nextChapter =
    currentIndex < allChapters.length - 1 ? allChapters[currentIndex + 1] : null;

  const Content = contentMap[`${slug}/${chapter}`];

  if (!post || !currentChapter || !Content) {
    return <p style={{ color: "var(--muted)" }}>chapter not found.</p>;
  }

  return (
    <>
      {/* Back link */}
      <p
        className="home-enter"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.8rem",
          marginBottom: "2rem",
        }}
      >
        <Link href={`/2cents/${slug}`} style={{ color: "var(--muted)" }}>
          ← {post.title}
        </Link>
      </p>

      {/* Chapter header */}
      <header className="home-enter-delay" style={{ marginBottom: "2.5rem" }}>
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.8rem",
            color: "var(--ink)",
            marginBottom: "0.6rem",
            opacity: 0.55,
          }}
        >
          ch.{currentChapter.number} · {currentChapter.readTime}
        </p>
        <h1 style={{ marginBottom: 0 }}>{currentChapter.title}</h1>
      </header>

      {/* Chapter content */}
      <article className="post-content home-enter-delay">
        <Content />
      </article>

      {/* Prev / Next nav */}
      <nav className="chapter-nav home-enter-delay" aria-label="Chapter navigation">
        <span>
          {prevChapter && (
            <Link href={`/2cents/${slug}/${prevChapter.slug}`}>
              ← ch.{prevChapter.number} {prevChapter.title}
            </Link>
          )}
        </span>
        <span>
          {nextChapter && (
            <Link href={`/2cents/${slug}/${nextChapter.slug}`}>
              ch.{nextChapter.number} {nextChapter.title} →
            </Link>
          )}
        </span>
      </nav>
    </>
  );
}
