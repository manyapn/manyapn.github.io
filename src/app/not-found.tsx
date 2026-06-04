import Link from "next/link";

export const metadata = {
  title: "404 | manya pradeep narayan",
};

export default function NotFound() {
  return (
    <>
      <pre
        className="ascii-cat home-enter"
        aria-hidden="true"
        style={{ marginBottom: "1.75rem" }}
      >
        {"  ╱|、\n(˚ˎ 。7\n |、˜〵\n じしˍ,)ノ"}
      </pre>

      <h1 className="hero-h1 home-enter-delay">404</h1>

      <p className="home-enter-delay">
        nothing here.{" "}
        <Link href="/">go home →</Link>
      </p>
    </>
  );
}
