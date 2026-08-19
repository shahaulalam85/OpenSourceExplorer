import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="error-page-container">
      <div className="error-code">404</div>
      <h1 className="error-title">Repository Not Found</h1>
      <p className="error-desc">
        The repository you are trying to view does not exist in our catalog or may
        have been removed. Try exploring other open-source projects.
      </p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link href="/projects" className="btn btn-primary">
          Explore Catalog
        </Link>
        <Link href="/" className="btn btn-outline">
          Go Back Home
        </Link>
      </div>
    </div>
  );
}
