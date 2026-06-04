import Link from "next/link";
import { posts } from "@/data/posts";
import { getChaptersForPost } from "@/data/chapters";
import { contentMap } from "@/lib/contentMap";

function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  return `${months[month - 1]} ${day}, ${year}`;
}

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

  const isSingle = chs.length === 1;
  const FlatContent = isSingle ? contentMap[`${slug}/${chs[0].slug}`] : null;

  const backLink = (
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
  );

  const postHeader = (
    <header className="home-enter-delay" style={{ marginBottom: "1.75rem" }}>
      <h1 className="hero-h1" style={{ marginBottom: "0.5rem" }}>{post.title}</h1>
      <p
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.75rem",
          color: "var(--muted)",
          marginBottom: 0,
        }}
      >
        {post.tags.join(", ")} · {formatDate(post.date)}
      </p>
    </header>
  );

  /* ── Flat blog post (single chapter) ── */
  if (isSingle && FlatContent) {
    return (
      <>
        {backLink}
        {postHeader}
        <article className="post-content home-enter-delay">
          <FlatContent />
        </article>
      </>
    );
  }

  /* ── Multi-chapter ToC ── */
  return (
    <>
      {backLink}
      {postHeader}

      {/* Post intro */}
      <p className="home-enter-delay" style={{ marginBottom: "2.5rem" }}>
        {post.description}
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
              <p
                style={{
                  fontWeight: "500",
                  fontSize: "1.05rem",
                  color: "var(--link)",
                  marginBottom: "0.25rem",
                }}
              >
                {ch.title}
              </p>
              <span className="ch-time">ch.{ch.number} · {ch.readTime}</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Source note — specific to the college apps post (originally a Google Doc) */}
      {slug === "255-days-later" && <p
        className="home-enter-delay"
        style={{
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.72rem",
          color: "var(--muted)",
          marginTop: "2rem",
          opacity: 0.7,
        }}
      >
        originally a google doc:{" "}
        <a
          href="https://docs.google.com/document/d/1Yv_rJcpkVpOfpRSluLj3vYUa9_RiVFql5RZREyUksSY/edit?usp=sharing"
          target="_blank"
          rel="noreferrer"
          style={{ color: "var(--muted)" }}
        >
          read it there if you prefer
        </a>
        . some links here may be broken, but they all work in the doc.
      </p>}
    </>
  );
}
