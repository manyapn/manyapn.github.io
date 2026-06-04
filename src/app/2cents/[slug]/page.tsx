import Link from "next/link";
import { posts } from "@/data/posts";
import { getChaptersForPost } from "@/data/chapters";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  return {
    title: post ? `${post.title} | manya pradeep narayan` : "2 cents",
    description: post?.description,
  };
}

export default async function PostOverviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  const chs = getChaptersForPost(slug);

  if (!post) {
    return <p style={{ color: "var(--muted)" }}>post not found.</p>;
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
        <Link href="/2cents" style={{ color: "var(--muted)" }}>
          ← 2cents
        </Link>
      </p>

      {/* Post header */}
      <header className="home-enter-delay" style={{ marginBottom: "0.75rem" }}>
        <h1 className="hero-h1" style={{ marginBottom: "0.5rem" }}>{post.title}</h1>
        <p
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.75rem",
            color: "var(--muted)",
            marginBottom: 0,
          }}
        >
          {post.tags.join(", ")} · {post.date}
        </p>
      </header>

      {/* Post intro */}
      <p className="home-enter-delay" style={{ marginBottom: "1rem" }}>
        I started my college apps on July 17th, 2024. I&apos;m writing this on March 31, 2025,
        and I just received my final decision. My process is officially done (well, mostly; I do
        have some waitlists...). Here&apos;s everything I wish I&apos;d known.
      </p>

      {/* Source note */}
      <p
        className="home-enter-delay"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.75rem",
          color: "var(--muted)",
          marginBottom: "2.5rem",
        }}
      >
        originally a google doc:{" "}
        <a
          href="https://docs.google.com/document/d/1Yv_rJcpkVpOfpRSluLj3vYUa9_RiVFql5RZREyUksSY/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--link)" }}
        >
          read it there if you prefer
        </a>
        . content reformatted for the web. some links here may be broken, but they all work in the doc.
      </p>

      {/* Chapter list */}
      <div className="home-enter-delay">
        {chs.map((ch) => (
          <Link
            key={ch.slug}
            href={`/2cents/${slug}/${ch.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <div className="chapter-card">
              <span className="ch-num">ch.{ch.number}</span>
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "1.05rem",
                  color: "var(--link)",
                  marginBottom: "0.2rem",
                }}
              >
                {ch.title}
              </p>
              <p
                style={{
                  fontSize: "0.95rem",
                  color: "var(--ink)",
                  marginBottom: "0.3rem",
                }}
              >
                {ch.description}
              </p>
              <span className="ch-time">{ch.readTime}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
