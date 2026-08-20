import Link from "next/link";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function HomePage() {
  // Calculate statistics from the local dataset dynamically
  const totalProjects = projects.length;
  
  const uniqueDomains = new Set(projects.map((p) => p.domain));
  const totalDomains = uniqueDomains.size;

  const totalStars = projects.reduce((acc, p) => acc + p.stars, 0);
  const formattedTotalStars = (totalStars / 1000).toFixed(0) + "k+";

  const beginnerFriendlyCount = projects.filter((p) => p.beginnerFriendly).length;
  const pctBeginnerFriendly = Math.round((beginnerFriendlyCount / totalProjects) * 100);

  // Filter top 3 featured projects by star count
  const featuredProjects = [...projects]
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 3);

  // Domain configuration with descriptions, counts, and styles
  const domainsList = [
    {
      id: "web",
      name: "Web Development",
      description: "Frontend compilers, rich components, reactive systems, and single-page application frames.",
      icon: "🌐",
      className: "web"
    },
    {
      id: "aiml",
      name: "AI/ML",
      description: "Machine learning architectures, GPU acceleration computation, and advanced data processing.",
      icon: "🧠",
      className: "aiml"
    },
    {
      id: "backend",
      name: "Backend",
      description: "Fast web frameworks, runtime compilers, microservices, and database interaction libraries.",
      icon: "⚙️",
      className: "backend"
    },
    {
      id: "devops",
      name: "DevOps",
      description: "Automation frameworks, infrastructure builders, package tools, and virtualization setups.",
      icon: "🚀",
      className: "devops"
    },
    {
      id: "mobile",
      name: "Mobile Development",
      description: "Cross-platform framework toolkits, mobile runtime engines, native integrations, and application SDKs.",
      icon: "📱",
      className: "mobile"
    },
    {
      id: "systems",
      name: "Systems & Security",
      description: "High-performance engines, low-level runtimes, compiler design, security systems, and cryptography libraries.",
      icon: "🛡️",
      className: "systems"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <span className="hero-badge">Discover your next contribution</span>
        <h1 className="hero-title">Open Source Project Explorer</h1>
        <p className="hero-subtitle">
          Jumpstart your developer journey by exploring curated open-source repositories.
          Filter by difficulty, domain, or technology stack, and shortlist items for later.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Link href="/projects" className="btn btn-primary">
            Explore All Projects
          </Link>
          <Link href="/saved" className="btn btn-outline">
            View Shortlist
          </Link>
        </div>
      </section>

      {/* Dynamic Statistics Panel */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{totalProjects}</div>
          <div className="stat-label">Total Repositories</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalDomains}</div>
          <div className="stat-label">Tech Domains</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formattedTotalStars}</div>
          <div className="stat-label">Combined Stars</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{pctBeginnerFriendly}%</div>
          <div className="stat-label">Beginner Friendly</div>
        </div>
      </section>

      {/* Domains Section */}
      <section style={{ marginBottom: "4.5rem" }}>
        <div className="section-header">
          <h2 className="section-title">Browse by Category</h2>
          <Link href="/projects" className="section-link">
            See all categories &rarr;
          </Link>
        </div>
        <div className="domains-grid">
          {domainsList.map((dom) => {
            const count = projects.filter((p) => p.domain === dom.name).length;
            return (
              <Link
                key={dom.id}
                href={`/projects?domain=${encodeURIComponent(dom.name)}`}
                className={`domain-card ${dom.className}`}
              >
                <div className="domain-icon">{dom.icon}</div>
                <div className="domain-info">
                  <h3>{dom.name}</h3>
                  <p style={{ color: "var(--text-secondary)", fontSize: "0.85rem", marginBottom: "0.5rem" }}>
                    {dom.description}
                  </p>
                  <div className="domain-count">
                    {count} {count === 1 ? "project" : "projects"} available
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Projects Grid */}
      <section style={{ marginBottom: "2rem" }}>
        <div className="section-header">
          <h2 className="section-title">Curated Trending Repositories</h2>
          <Link href="/projects?sort=stars" className="section-link">
            View full list &rarr;
          </Link>
        </div>
        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
}
