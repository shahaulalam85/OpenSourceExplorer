"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { playSynthClick, playSynthChimeUp } from "@/lib/audio";

const AVAILABLE_SKILLS = [
  "Java",
  "React",
  "Spring Boot",
  "JavaScript",
  "TypeScript",
  "Python",
  "Go",
  "Rust",
  "C++",
  "Node.js",
  "Next.js",
  "Flutter",
  "Docker",
  "Kubernetes"
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("default");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [weeklyGoal, setWeeklyGoal] = useState(3);
  const [savedCount, setSavedCount] = useState(0);
  const [userSkills, setUserSkills] = useState([]);

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
      setUserSkills(defaultSkills);
    } else {
      setUserSkills(JSON.parse(savedSkills));
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

    const handleOpenDrawer = () => {
      setIsOpen(true);
    };

    updateSavedCount();
    window.addEventListener("savedProjectsChanged", updateSavedCount);
    window.addEventListener("openPreferencesDrawer", handleOpenDrawer);
    return () => {
      window.removeEventListener("savedProjectsChanged", updateSavedCount);
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

  const handleSkillToggle = (skill) => {
    let nextSkills;
    if (userSkills.includes(skill)) {
      nextSkills = userSkills.filter((s) => s !== skill);
    } else {
      nextSkills = [...userSkills, skill];
    }
    setUserSkills(nextSkills);
    localStorage.setItem("userSkills", JSON.stringify(nextSkills));
    window.dispatchEvent(new Event("userSkillsChanged"));
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

          {/* Your Skills settings */}
          <div className="setting-group">
            <span className="setting-label">Your Tech Skills</span>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "0.5rem",
              backgroundColor: "var(--bg-color)",
              border: "1px solid var(--border)",
              padding: "0.75rem",
              borderRadius: "var(--radius-md)",
              maxHeight: "180px",
              overflowY: "auto"
            }}>
              {AVAILABLE_SKILLS.map((skill) => {
                const checked = userSkills.includes(skill);
                return (
                  <label key={skill} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => handleSkillToggle(skill)}
                      style={{ accentColor: "var(--primary)" }}
                    />
                    <span>{skill}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
