"use client";

import { useState, useMemo, useEffect } from "react";
import ProjectCard from "@/components/ProjectCard";

const DOMAINS = [
  { label: "All", value: "All" },
  { label: "Web", value: "Web Development" },
  { label: "AI/ML", value: "AI/ML" },
  { label: "Backend", value: "Backend" },
  { label: "DevOps", value: "DevOps" },
  { label: "Mobile", value: "Mobile Development" },
  { label: "Systems", value: "Systems & Security" }
];

export default function ProjectExplorer({
  projects,
  initialDomain = "All",
  initialQuery = ""
}) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedDomain, setSelectedDomain] = useState(() => {
    const found = DOMAINS.find(
      (d) =>
        d.value.toLowerCase() === initialDomain.toLowerCase() ||
        d.label.toLowerCase() === initialDomain.toLowerCase()
    );
    return found ? found.value : "All";
  });
  const [difficulty, setDifficulty] = useState("All");
  const [beginnerOnly, setBeginnerOnly] = useState(false);
  const [sortBy, setSortBy] = useState("stars");

  // Compute filtered & sorted projects list using useMemo
  const processedProjects = useMemo(() => {
    let result = [...projects];

    // 1. Text Search Filter (name, description, language, technologies)
    if (query.trim() !== "") {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.language.toLowerCase().includes(q) ||
          p.technologies.some((tech) => tech.toLowerCase().includes(q))
      );
    }

    // 2. Domain Filter
    if (selectedDomain !== "All") {
      result = result.filter((p) => p.domain === selectedDomain);
    }

    // 3. Difficulty Filter
    if (difficulty !== "All") {
      result = result.filter((p) => p.difficulty === difficulty);
    }

    // 4. Beginner Friendly Toggle
    if (beginnerOnly) {
      result = result.filter((p) => p.beginnerFriendly === true);
    }

    // 5. Sorting
    if (sortBy === "stars") {
      result.sort((a, b) => b.stars - a.stars);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [projects, query, selectedDomain, difficulty, beginnerOnly, sortBy]);

  // Reset helper
  const handleResetFilters = () => {
    setQuery("");
    setSelectedDomain("All");
    setDifficulty("All");
    setBeginnerOnly(false);
    setSortBy("stars");
  };

  // Support click-to-search from tags
  const handleTagClick = (tag) => {
    setQuery(tag);
  };

  return (
    <div className="explorer-container">
      {/* Sidebar Controls */}
      <aside className="sidebar-filters">
        {/* Search */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="search-input">Search Repositories</label>
          <div className="search-input-wrapper">
            <svg
              className="search-icon-svg"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              id="search-input"
              type="text"
              className="search-input"
              placeholder="Search title, tech, language..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Domain Tabs */}
        <div className="filter-group">
          <label className="filter-label">Domains</label>
          <div className="domain-tabs">
            {DOMAINS.map((dom) => {
              const count =
                dom.value === "All"
                  ? projects.length
                  : projects.filter((p) => p.domain === dom.value).length;
              return (
                <button
                  key={dom.label}
                  onClick={() => setSelectedDomain(dom.value)}
                  className={`domain-tab-btn ${
                    selectedDomain === dom.value ? "active" : ""
                  }`}
                >
                  <span>{dom.label}</span>
                  <span className="tab-badge">{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Difficulty Dropdown */}
        <div className="filter-group">
          <label className="filter-label" htmlFor="difficulty-select">Difficulty Level</label>
          <select
            id="difficulty-select"
            className="select-dropdown"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="All">All Levels</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        {/* Beginner Friendly Checkbox */}
        <div className="filter-group">
          <label className="checkbox-container">
            <input
              type="checkbox"
              checked={beginnerOnly}
              onChange={(e) => setBeginnerOnly(e.target.checked)}
            />
            <span className="checkbox-custom">
              <svg
                className="checkbox-check-icon"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="4"
              >
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </span>
            <span>Beginner Friendly Only</span>
          </label>
        </div>
      </aside>

      {/* Main Content Area */}
      <section className="explorer-main">
        {/* Results Info & Sorter Header */}
        <div className="explorer-header-actions">
          <div className="results-count">
            Found{" "}
            <span className="results-count-number">
              {processedProjects.length}
            </span>{" "}
            {processedProjects.length === 1 ? "repository" : "repositories"}
          </div>

          <div className="sort-wrapper">
            <span className="sort-label">Sort by:</span>
            <select
              aria-label="Sort repositories"
              className="select-dropdown"
              style={{ width: "150px", padding: "0.5rem 0.75rem" }}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="stars">GitHub Stars</option>
              <option value="name">Project Name</option>
            </select>
          </div>
        </div>

        {/* Catalog List */}
        {processedProjects.length > 0 ? (
          <div className="projects-grid">
            {processedProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onTagClick={handleTagClick}
              />
            ))}
          </div>
        ) : (
          /* Custom Empty State */
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h3 className="empty-title">No Projects Found</h3>
            <p className="empty-text">
              We couldn&apos;t find any repositories matching your search query or
              active filter preferences. Try resetting filters to start over.
            </p>
            <button onClick={handleResetFilters} className="btn btn-primary">
              Reset Filters
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
