import { getProject, projects, formatStars } from "@/lib/projects";
import BookmarkButton from "@/components/BookmarkButton";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id.toString()
  }));
}

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const project = getProject(resolvedParams.id);

  if (!project) {
    notFound();
  }

  const {
    id,
    name,
    description,
    domain,
    technologies,
    difficulty,
    stars,
    beginnerFriendly,
    githubUrl,
    language,
    issues,
    license
  } = project;

  const getDifficultyClass = () => {
    switch (difficulty.toLowerCase()) {
      case "beginner":
        return "badge-beginner";
      case "intermediate":
        return "badge-intermediate";
      case "advanced":
        return "badge-advanced";
      default:
        return "";
    }
  };

  return (
    <div>
      {/* Back navigation link */}
      <div style={{ marginBottom: "1.5rem" }}>
        <Link
          href="/projects"
          style={{
            color: "var(--text-secondary)",
            fontSize: "0.9rem",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem"
          }}
        >
          <svg
            viewBox="0 0 24 24"
            width="16"
            height="16"
            stroke="currentColor"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Directory
        </Link>
      </div>

      <div className="detail-container">
        {/* Main Column */}
        <div className="detail-main">
          {/* Header */}
          <header className="detail-header">
            <BookmarkButton projectId={id} />
            <div className="detail-project-domain">{domain}</div>
            <h1 className="detail-project-title">{name}</h1>
            <div className="detail-header-badges">
              <span className={`badge ${getDifficultyClass()}`}>
                {difficulty} Level
              </span>
              {beginnerFriendly && (
                <span className="badge badge-bf">Beginner Friendly</span>
              )}
            </div>
          </header>

          {/* Description */}
          <section className="detail-description-card">
            <h2 className="detail-description-title">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                style={{ color: "var(--primary)" }}
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10 9 9 9 8 9" />
              </svg>
              Project Overview
            </h2>
            <p className="detail-description-text">{description}</p>
          </section>

          {/* Tech Stack */}
          <section className="detail-tech-card">
            <h2 className="detail-description-title">
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                stroke="currentColor"
                strokeWidth="2.5"
                fill="none"
                style={{ color: "var(--primary)" }}
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Technologies & Frameworks
            </h2>
            <div className="detail-tech-grid">
              {technologies.map((tech) => (
                <Link
                  key={tech}
                  href={`/projects?query=${encodeURIComponent(tech)}`}
                  className="tag"
                  style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}
                >
                  {tech}
                </Link>
              ))}
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <aside className="detail-sidebar">

          <div className="sidebar-card">
            <h3 style={{ fontSize: "1.1rem", marginBottom: "1.25rem" }}>
              Repository Details
            </h3>
            <div className="sidebar-stats-list">
              <div className="sidebar-stat-item">
                <span className="sidebar-stat-label">⭐ GitHub Stars</span>
                <span className="sidebar-stat-val">{formatStars(stars)}</span>
              </div>
              <div className="sidebar-stat-item">
                <span className="sidebar-stat-label">💻 Main Language</span>
                <span className="sidebar-stat-val">{language}</span>
              </div>
              <div className="sidebar-stat-item">
                <span className="sidebar-stat-label">🐛 Open Issues</span>
                <span className="sidebar-stat-val">{issues}</span>
              </div>
              <div className="sidebar-stat-item">
                <span className="sidebar-stat-label">📄 License Type</span>
                <span className="sidebar-stat-val">{license}</span>
              </div>
            </div>

            <div className="sidebar-actions">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <svg
                  className="github-btn-icon"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View on GitHub
              </a>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
