import { projects } from "@/lib/projects";
import ProjectExplorer from "@/components/ProjectExplorer";

export default async function ProjectsPage({ searchParams }) {
  // Await searchParams in Next.js 15+
  const resolvedParams = await searchParams;
  const initialDomain = resolvedParams?.domain || "All";
  const initialQuery = resolvedParams?.query || "";

  // Generate a key from searchParams to force re-render/reset state
  // when navigating via URL queries (e.g. clicking different categories)
  const explorerKey = `${initialDomain}-${initialQuery}`;

  return (
    <div>
      <section style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Project Catalog
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Find active repositories, explore technology tags, and select suitable difficulty levels.
        </p>
      </section>

      <ProjectExplorer
        key={explorerKey}
        projects={projects}
        initialDomain={initialDomain}
        initialQuery={initialQuery}
      />
    </div>
  );
}
