"use client";

import Link from "next/link";
import BookmarkButton from "@/components/BookmarkButton";
import { formatStars } from "@/lib/projects";
import { playSynthClick } from "@/lib/audio";

export default function ProjectCard({
  project,
  showSavedActions = false,
  onTagClick
}) {
  const {
    id,
    name,
    description,
    domain,
    technologies,
    difficulty,
    stars,
    beginnerFriendly,
    language
  } = project;

  const handleRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const saved = localStorage.getItem("savedProjects");
      if (saved) {
        const list = JSON.parse(saved);
        const nextList = list.filter((savedId) => savedId !== Number(id));
        localStorage.setItem("savedProjects", JSON.stringify(nextList));
        window.dispatchEvent(new Event("savedProjectsChanged"));
      }
    } catch (err) {
      console.error("Could not remove saved project", err);
    }
  };

  const handleTagClick = (e, tag) => {
    e.preventDefault();
    e.stopPropagation();
    playSynthClick();
    if (onTagClick) {
      onTagClick(tag);
    }
  };

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
    <div className="project-card">
      {!showSavedActions && <BookmarkButton projectId={id} />}

      <div>
        <div className="project-card-header">
          <Link href={`/projects/${id}`} className="stretched-link">
            <h3 className="project-title">{name}</h3>
          </Link>
        </div>

        <div style={{ marginBottom: "0.75rem", display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
          <span className={`badge ${getDifficultyClass()}`}>
            {difficulty}
          </span>
          {beginnerFriendly && (
            <span className="badge badge-bf" title="Good First Issues Available">
              Beginner Friendly
            </span>
          )}
        </div>

        <p className="project-description">{description}</p>

        <div className="project-tags">
          {technologies.map((tech) => (
            <span
              key={tech}
              onClick={(e) => handleTagClick(e, tech)}
              className="tag"
              title={`Click to filter by ${tech}`}
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="project-meta">
          <div className="project-stat" title="GitHub Stars">
            <svg
              className="star-icon"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="currentColor"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
            <span>{formatStars(stars)}</span>
          </div>

          <div className="project-stat">
            <span
              style={{
                display: "inline-block",
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor:
                  language === "TypeScript"
                    ? "#3178c6"
                    : language === "JavaScript"
                    ? "#f1e05a"
                    : language === "Python"
                    ? "#3572A5"
                    : language === "Rust"
                    ? "#dea584"
                    : language === "Go"
                    ? "#00ADD8"
                    : "#64748b"
              }}
            ></span>
            <span>{language}</span>
          </div>

          <div className="project-stat">
            <span>{domain}</span>
          </div>
        </div>

        {showSavedActions && (
          <div className="saved-actions-panel">
            <Link href={`/projects/${id}`} className="btn btn-outline btn-sm">
              View Details
            </Link>
            <button
              onClick={handleRemove}
              className="btn btn-danger-outline btn-sm"
            >
              Remove
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
