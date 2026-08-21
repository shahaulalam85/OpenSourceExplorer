"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { playSynthClick, playSynthChimeUp } from "@/lib/audio";
import { projects } from "@/lib/projects";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("default");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [weeklyGoal, setWeeklyGoal] = useState(3);
  const [savedCount, setSavedCount] = useState(0);
  const [recentlyViewed, setRecentlyViewed] = useState([]);

  useEffect(() => {
    // Load initial values from localStorage
    const savedTheme = localStorage.getItem("prefTheme") || "default";
    const savedSound = localStorage.getItem("prefSound") !== "false";
    const savedGoal = Number(localStorage.getItem("prefGoal")) || 3;
    const savedSkills = localStorage.getItem("userSkills");
    setTheme(savedTheme);
    setSoundEnabled(savedSound);
    setWeeklyGoal(savedGoal);
    if (!savedSkills) {
      const defaultSkills = ["Java", "React", "Spring Boot"];
      localStorage.setItem("userSkills", JSON.stringify(defaultSkills));
    }

    // Apply theme
    if (savedTheme !== "default") {
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    // Sync saved project counts
    const updateSavedCount = () => {
      try {
        const saved = localStorage.getItem("savedProjects");
        const list = saved ? JSON.parse(saved) : [];
        setSavedCount(list.length);
      } catch (e) {
        setSavedCount(0);
      }
    };

    // Sync recently viewed projects
    const updateRecentlyViewed = () => {
      try {
        const saved = localStorage.getItem("recentlyViewed");
        const list = saved ? JSON.parse(saved) : [];
        const resolved = list.map(id => projects.find(p => p.id === id)).filter(Boolean);
        setRecentlyViewed(resolved);
      } catch (e) {
        setRecentlyViewed([]);
      }
    };

    const handleOpenDrawer = () => {
      setIsOpen(true);
    };

    updateSavedCount();
    updateRecentlyViewed();
    window.addEventListener("savedProjectsChanged", updateSavedCount);
    window.addEventListener("recentlyViewedChanged", updateRecentlyViewed);
    window.addEventListener("openPreferencesDrawer", handleOpenDrawer);
    return () => {
      window.removeEventListener("savedProjectsChanged", updateSavedCount);
      window.removeEventListener("recentlyViewedChanged", updateRecentlyViewed);
      window.removeEventListener("openPreferencesDrawer", handleOpenDrawer);
    };
  }, []);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("prefTheme", newTheme);
    if (newTheme !== "default") {
      document.documentElement.setAttribute("data-theme", newTheme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    playSynthClick();
  };

  const handleSoundToggle = (e) => {
    const val = e.target.checked;
    setSoundEnabled(val);
    localStorage.setItem("prefSound", val ? "true" : "false");
    // Play test click if turned on
    if (val) {
      setTimeout(playSynthClick, 50);
    }
  };

  const handleGoalChange = (e) => {
    const val = Number(e.target.value);
    setWeeklyGoal(val);
    localStorage.setItem("prefGoal", val);
    playSynthClick();
  };



  const toggleDrawer = () => {
    setIsOpen(!isOpen);
    playSynthClick();
  };

  const testAudio = () => {
    playSynthChimeUp();
  };

  const percentage = Math.min(Math.round((savedCount / weeklyGoal) * 100), 100);

  return (
    <>
      <header className="navbar-header">
        <nav className="navbar-container">
          <Link href="/" className="navbar-logo" onClick={playSynthClick}>
            <svg
              className="logo-icon"
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "var(--primary)" }}
            >
              <path d="M12 2L2 7l10 5 10-5-10-5z" />
              <path d="M2 17l10 5 10-5" />
              <path d="M2 12l10 5 10-5" />
            </svg>
            <span>OpenSource Explorer</span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <ul className="navbar-links">
              <li>
                <Link
                  href="/"
                  className={`navbar-link ${pathname === "/" ? "active" : ""}`}
                  onClick={playSynthClick}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className={`navbar-link ${pathname.startsWith("/projects") ? "active" : ""}`}
                  onClick={playSynthClick}
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className={`navbar-link ${pathname === "/saved" ? "active" : ""}`}
                  onClick={playSynthClick}
                >
                  Saved Projects
                </Link>
              </li>
              <li className="nav-dropdown-item">
                <button
                  className="navbar-link"
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "inherit",
                    fontSize: "inherit",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: 0
                  }}
                >
                  Recently Viewed
                  <svg viewBox="0 0 24 24" width="12" height="12" stroke="currentColor" strokeWidth="2.5" fill="none">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
                <div className="nav-dropdown-menu">
                  {recentlyViewed.length === 0 ? (
                    <div style={{ padding: "0.75rem 1rem", fontSize: "0.8rem", color: "var(--text-muted)", whiteSpace: "nowrap" }}>
                      No recently viewed projects
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", minWidth: "200px" }}>
                      {recentlyViewed.map((proj) => (
                        <Link
                          key={proj.id}
                          href={`/projects/${proj.id}`}
                          className="nav-dropdown-link"
                          onClick={playSynthClick}
                        >
                          <div style={{ fontWeight: "600" }}>{proj.name}</div>
                          <div style={{ fontSize: "0.7rem", color: "var(--text-secondary)" }}>{proj.domain}</div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Preferences Slide-over Drawer Backdrop */}
      <div
        className={`settings-drawer-backdrop ${isOpen ? "active" : ""}`}
        onClick={toggleDrawer}
      ></div>

      {/* Preferences Slide-over Drawer */}
      <div className={`settings-drawer ${isOpen ? "active" : ""}`}>
        <div className="settings-drawer-header" style={{ justifyContent: "flex-end" }}>
          <button onClick={toggleDrawer} className="settings-close-btn" aria-label="Close Preferences">
            <svg
              viewBox="0 0 24 24"
              width="20"
              height="20"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="settings-drawer-content">
          {/* Theme selection */}
          <div className="setting-group">
            <span className="setting-label">Interface Theme</span>
            <div className="theme-options">
              <button
                onClick={() => handleThemeChange("default")}
                className={`theme-opt-btn ${theme === "default" ? "active" : ""}`}
              >
                <div className="theme-opt-color-dots">
                  <div className="theme-dot" style={{ backgroundColor: "#10b981" }}></div>
                  <div className="theme-dot" style={{ backgroundColor: "#151c2c" }}></div>
                </div>
                <span className="theme-opt-name">Classic Emerald</span>
              </button>

              <button
                onClick={() => handleThemeChange("cyberpunk")}
                className={`theme-opt-btn ${theme === "cyberpunk" ? "active" : ""}`}
              >
                <div className="theme-opt-color-dots">
                  <div className="theme-dot" style={{ backgroundColor: "#ec4899" }}></div>
                  <div className="theme-dot" style={{ backgroundColor: "#150325" }}></div>
                </div>
                <span className="theme-opt-name">Cyberpunk Neon</span>
              </button>

              <button
                onClick={() => handleThemeChange("oceanic")}
                className={`theme-opt-btn ${theme === "oceanic" ? "active" : ""}`}
              >
                <div className="theme-opt-color-dots">
                  <div className="theme-dot" style={{ backgroundColor: "#0284c7" }}></div>
                  <div className="theme-dot" style={{ backgroundColor: "#071529" }}></div>
                </div>
                <span className="theme-opt-name">Oceanic Deep</span>
              </button>

              <button
                onClick={() => handleThemeChange("light")}
                className={`theme-opt-btn ${theme === "light" ? "active" : ""}`}
              >
                <div className="theme-opt-color-dots">
                  <div className="theme-dot" style={{ backgroundColor: "#059669" }}></div>
                  <div className="theme-dot" style={{ backgroundColor: "#ffffff" }}></div>
                </div>
                <span className="theme-opt-name">Minimalist Light</span>
              </button>

              <button
                onClick={() => handleThemeChange("dark")}
                className={`theme-opt-btn ${theme === "dark" ? "active" : ""}`}
              >
                <div className="theme-opt-color-dots">
                  <div className="theme-dot" style={{ backgroundColor: "#10b981" }}></div>
                  <div className="theme-dot" style={{ backgroundColor: "#0b0f19" }}></div>
                </div>
                <span className="theme-opt-name">Classic Dark</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
