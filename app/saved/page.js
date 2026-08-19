"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { projects } from "@/lib/projects";
import ProjectCard from "@/components/ProjectCard";

export default function SavedPage() {
  const [savedList, setSavedList] = useState([]);
  const [hasMounted, setHasMounted] = useState(false);

  const syncList = () => {
    try {
      const saved = localStorage.getItem("savedProjects");
      const ids = saved ? JSON.parse(saved) : [];
      // Cross-reference saved IDs with our projects list
      const matched = projects.filter((p) => ids.includes(p.id));
      setSavedList(matched);
    } catch (e) {
      console.error("Could not sync saved list", e);
      setSavedList([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasMounted(true);
      syncList();
    }, 0);

    // Event listener for changes emitted by other components (e.g. BookmarkButton)
    window.addEventListener("savedProjectsChanged", syncList);
    window.addEventListener("storage", syncList);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("savedProjectsChanged", syncList);
      window.removeEventListener("storage", syncList);
    };
  }, []);

  if (!hasMounted) {
    return (
      <div>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Saved Projects
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Loading your bookmarked repositories...
        </p>
      </div>
    );
  }

  return (
    <div>
      <section style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          Saved Projects
        </h1>
        <p style={{ color: "var(--text-secondary)" }}>
          Keep track of open-source repositories you want to review or contribute to.
        </p>
      </section>

      {savedList.length > 0 ? (
        <div className="projects-grid">
          {savedList.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showSavedActions={true}
            />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <div className="empty-icon">⭐</div>
          <h3 className="empty-title">No Saved Projects</h3>
          <p className="empty-text">
            You haven&apos;t bookmarked any open-source repositories yet. Browse the catalog
            and save projects you are interested in.
          </p>
          <Link href="/projects" className="btn btn-primary">
            Explore Projects
          </Link>
        </div>
      )}
    </div>
  );
}
