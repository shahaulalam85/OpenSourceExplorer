"use client";

import { useState, useEffect } from "react";
import { projects } from "@/lib/projects";

const TECH_OPTIONS = [
  "React", "TypeScript", "JavaScript", "Python", "Go", "Rust", 
  "Node.js", "Next.js", "Java", "Spring Boot", "Flutter", "Docker", "Kubernetes", "C++"
];

export default function DevOverlayReplica() {
  const [isProduction, setIsProduction] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("default");

  // Interactive Sitemap Features
  const [activeTool, setActiveTool] = useState(null);
  const [userSkills, setUserSkills] = useState([]);
  const [projA, setProjA] = useState(1);
  const [projB, setProjB] = useState(2);
  const [selectedExplainProj, setSelectedExplainProj] = useState(1);
  const [explainAnswer, setExplainAnswer] = useState("");
  const [selectedSumProj, setSelectedSumProj] = useState(1);
  const [selectedMatchProj, setSelectedMatchProj] = useState(1);
  const [tempSelectedSkills, setTempSelectedSkills] = useState(["React", "TypeScript"]);
  const [expandedFolders, setExpandedFolders] = useState({
    toolkit: true,
    ai: true
  });

  const toggleFolder = (folder) => {
    setExpandedFolders(prev => ({
      ...prev,
      [folder]: !prev[folder]
    }));
  };

  useEffect(() => {
    // Render the mock indicator in both development and production for testing
    setIsProduction(true);

    // Load initial theme choice
    const savedTheme = localStorage.getItem("prefTheme") || "default";
    setTheme(savedTheme);

    // Load skills
    const savedSkills = localStorage.getItem("userSkills");
    if (savedSkills) {
      try {
        setUserSkills(JSON.parse(savedSkills));
      } catch (e) {
        setUserSkills(["Java", "React", "Spring Boot"]);
      }
    } else {
      setUserSkills(["Java", "React", "Spring Boot"]);
    }

    const handleSkillsChange = () => {
      const saved = localStorage.getItem("userSkills");
      if (saved) {
        try {
          setUserSkills(JSON.parse(saved));
        } catch (e) {}
      }
    };
    window.addEventListener("userSkillsChanged", handleSkillsChange);
    return () => {
      window.removeEventListener("userSkillsChanged", handleSkillsChange);
    };
  }, []);

  if (!isProduction) {
    return null;
  }

  const handleThemeChange = (e) => {
    const newTheme = e.target.value;
    setTheme(newTheme);
    localStorage.setItem("prefTheme", newTheme);
    
    // Apply theme globally
    if (newTheme !== "default") {
      document.documentElement.setAttribute("data-theme", newTheme);
    } else {
      document.documentElement.removeAttribute("data-theme");
    }

    // Sync theme state across components (Navbar, etc.)
    window.dispatchEvent(new Event("prefThemeChanged"));
  };

  return (
    <>
      {/* Floating Circle Button (Md Badge) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="dev-overlay-replica-btn"
        style={{
          position: "fixed",
          bottom: "1.25rem",
          left: "1.25rem",
          width: "2.25rem",
          height: "2.25rem",
          backgroundColor: "#0d111c",
          border: "1px solid #1e293b",
          borderRadius: "50%",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          zIndex: 999,
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          transition: "transform 0.2s, background-color 0.2s",
          fontSize: "0.85rem",
          fontWeight: "800",
          fontFamily: "var(--font-sans)"
        }}
        title="Developer Preferences"
        aria-label="Developer Preferences"
      >
        Md
      </button>

      {/* Mock Dev Tools Preferences Dialog Dialog */}
      {isOpen && (
        <div
          className="dev-overlay-replica-dialog"
          style={{
            position: "fixed",
            bottom: "4.5rem",
            left: "1.25rem",
            width: "360px",
            maxWidth: "calc(100vw - 2.5rem)",
            backgroundColor: "#0d0f12",
            border: "1px solid #2d3139",
            borderRadius: "12px",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            color: "#fff",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            animation: "fade-in 0.2s ease-out",
            overflow: "hidden"
          }}
        >
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "1rem 1.25rem",
            borderBottom: "1px solid #1e222b"
          }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "#f8fafc", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              🛠️ DevTools Explorer
            </span>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#94a3b8",
                cursor: "pointer",
                padding: "4px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "color 0.2s"
              }}
              aria-label="Close Preferences"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Main Sitemap Tree View */}
          {true && (
            <div style={{ padding: "1.25rem", borderBottom: "1px solid #1e222b", maxHeight: "380px", overflowY: "auto" }}>
              <div style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "1rem", color: "#10b981", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span>🛠️</span> DevTools Explorer & Toolkit
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                
                {/* Developer Toolkit Dropdown Accordion */}
                <div style={{
                  backgroundColor: "#161b22",
                  border: "1px solid #30363d",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <button onClick={() => toggleFolder('toolkit')} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    background: "none",
                    border: "none",
                    color: "#f8fafc",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    textAlign: "left"
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span>🛠️</span> Developer Toolkit
                    </span>
                    <span style={{ color: "#8b949e", fontSize: "0.75rem" }}>
                      {expandedFolders.toolkit ? "▲" : "▼"}
                    </span>
                  </button>
                  {expandedFolders.toolkit && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#0d1117",
                      padding: "0.5rem 0.75rem",
                      borderTop: "1px solid #30363d",
                      gap: "0.5rem"
                    }}>
                      <button onClick={() => setActiveTool('recently-active')} style={{ background: "none", border: "none", color: "#a855f7", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0", fontSize: "0.8rem", width: "100%" }}>
                        <span>🆕</span> Recently Active
                      </button>
                      <button onClick={() => setActiveTool('is-project-for-me')} style={{ background: "none", border: "none", color: "#a855f7", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0", fontSize: "0.8rem", width: "100%" }}>
                        <span>🤔</span> Is this Project for me
                      </button>
                      <button onClick={() => setActiveTool('compare')} style={{ background: "none", border: "none", color: "#06b6d4", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0", fontSize: "0.8rem", width: "100%" }}>
                        <span>⚔</span> Compare repositories
                      </button>
                    </div>
                  )}
                </div>

                {/* AI Assistant Dropdown Accordion */}
                <div style={{
                  backgroundColor: "#161b22",
                  border: "1px solid #30363d",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <button onClick={() => toggleFolder('ai')} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    background: "none",
                    border: "none",
                    color: "#f8fafc",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    textAlign: "left"
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span>🤖</span> AI Assistant
                    </span>
                    <span style={{ color: "#8b949e", fontSize: "0.75rem" }}>
                      {expandedFolders.ai ? "▲" : "▼"}
                    </span>
                  </button>
                  {expandedFolders.ai && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "#0d1117",
                      padding: "0.5rem 0.75rem",
                      borderTop: "1px solid #30363d",
                      gap: "0.5rem"
                    }}>
                      <button onClick={() => setActiveTool('ai-explain')} style={{ background: "none", border: "none", color: "#3b82f6", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0", fontSize: "0.8rem", width: "100%" }}>
                        <span>📝</span> Explain Repository
                      </button>
                      <button onClick={() => setActiveTool('ai-recommend')} style={{ background: "none", border: "none", color: "#3b82f6", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0", fontSize: "0.8rem", width: "100%" }}>
                        <span>💡</span> Recommend Projects
                      </button>
                      <button onClick={() => setActiveTool('ai-summarize')} style={{ background: "none", border: "none", color: "#3b82f6", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.25rem 0", fontSize: "0.8rem", width: "100%" }}>
                        <span>📊</span> Summarize Repository
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>
          )}

          {/* Theme Selection at the bottom of the Dialog */}
          <div style={{ padding: "1.25rem", backgroundColor: "#0b0c0f" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1.5rem"
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "0.2rem" }}>Theme</div>
                <div style={{ fontSize: "0.8rem", color: "#94a3b8" }}>Select your theme preference.</div>
              </div>
              
              {/* Custom Select dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={theme}
                  onChange={handleThemeChange}
                  style={{
                    appearance: "none",
                    backgroundColor: "#161b22",
                    border: "1px solid #30363d",
                    borderRadius: "6px",
                    color: "#fff",
                    fontSize: "0.85rem",
                    padding: "0.4rem 2rem 0.4rem 0.75rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    outline: "none",
                    minWidth: "120px"
                  }}
                >
                  <option value="default">System</option>
                  <option value="cyberpunk">Cyberpunk</option>
                  <option value="oceanic">Oceanic</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
                <div style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  pointerEvents: "none",
                  color: "#94a3b8",
                  fontSize: "0.6rem"
                }}>
                  ▼
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Pop-up Window for Active Tool */}
      {isOpen && activeTool !== null && (
        <div style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(6px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1100, // Above preferences drawer
          animation: "fade-in 0.2s ease-out"
        }}>
          <div style={{
            width: "680px",
            maxWidth: "94vw",
            backgroundColor: "#0d0f12",
            border: "1px solid #2d3139",
            borderRadius: "12px",
            boxShadow: "0 24px 64px rgba(0, 0, 0, 0.7)",
            color: "#fff",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            overflow: "hidden"
          }}>
            {/* Pop-up Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 1.25rem",
              borderBottom: "1px solid #1e222b",
              backgroundColor: "#161b22"
            }}>
              <span style={{ fontSize: "1rem", fontWeight: "700", color: "#f8fafc", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                ⚙️ {(() => {
                  if (activeTool === "is-project-for-me") return "Is this Project for me";
                  if (activeTool === "find-project") return "Find your next project";
                  if (activeTool === "recently-active") return "Recently Active";
                  if (activeTool === "compare") return "Compare Repositories";
                  if (activeTool === "ai-explain") return "Explain Repository";
                  if (activeTool === "ai-recommend") return "Recommend Projects";
                  if (activeTool === "ai-summarize") return "Summarize Repository";
                  return "Tool Window";
                })()}
              </span>
              <button
                onClick={() => setActiveTool(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#94a3b8",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.2s"
                }}
                aria-label="Close Tool Window"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2.5" fill="none">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Pop-up Body / Tool Content */}
            <div style={{ padding: "0.5rem", maxHeight: "80vh", overflowY: "auto" }}>
              {/* 1. Is This Project For Me Tool */}
              {activeTool === "is-project-for-me" && (
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "0.75rem" }}>
                    Select your tech stack to find the best matching repositories:
                  </p>
                  
                  {/* Grid of skills */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "0.4rem",
                    backgroundColor: "#161b22",
                    border: "1px solid #30363d",
                    padding: "0.6rem",
                    borderRadius: "8px",
                    maxHeight: "130px",
                    overflowY: "auto",
                    marginBottom: "1rem"
                  }}>
                    {TECH_OPTIONS.map((skill) => {
                      const isSelected = tempSelectedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          onClick={() => {
                            if (tempSelectedSkills.includes(skill)) {
                              setTempSelectedSkills(tempSelectedSkills.filter(s => s !== skill));
                            } else {
                              setTempSelectedSkills([...tempSelectedSkills, skill]);
                            }
                          }}
                          style={{
                            backgroundColor: isSelected ? "#10b981" : "#21262d",
                            border: isSelected ? "1px solid #10b981" : "1px solid #30363d",
                            color: isSelected ? "#fff" : "#c9d1d9",
                            borderRadius: "4px",
                            fontSize: "0.7rem",
                            padding: "4px",
                            cursor: "pointer",
                            fontWeight: isSelected ? "700" : "normal",
                            transition: "all 0.15s"
                          }}
                        >
                          {skill}
                        </button>
                      );
                    })}
                  </div>

                  {/* Suggestions */}
                  <div style={{ fontSize: "0.85rem", fontWeight: "700", marginBottom: "0.5rem", color: "#10b981" }}>
                    Suggested Repositories:
                  </div>

                  {(() => {
                    const getSuggestions = () => {
                      if (tempSelectedSkills.length === 0) return [];
                      const scored = projects.map(p => {
                        const matches = tempSelectedSkills.filter(skill => 
                          p.technologies.some(t => t.toLowerCase() === skill.toLowerCase()) ||
                          p.language.toLowerCase() === skill.toLowerCase()
                        ).length;
                        const pct = tempSelectedSkills.length ? Math.round(45 + (matches / tempSelectedSkills.length) * 40 + 15) : 0;
                        return { project: p, score: matches > 0 ? Math.min(pct, 100) : 0 };
                      });
                      return scored.filter(item => item.score > 0).sort((a, b) => b.score - a.score);
                    };
                    const suggestions = getSuggestions();

                    if (suggestions.length === 0) {
                      return (
                        <div style={{ fontSize: "0.8rem", color: "#8b949e", fontStyle: "italic", textAlign: "center", padding: "1rem" }}>
                          Select some skills above to see recommendations.
                        </div>
                      );
                    }

                    return (
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "180px", overflowY: "auto" }}>
                        {suggestions.slice(0, 4).map(({ project: p, score }) => (
                          <div key={p.id} style={{ backgroundColor: "#161b22", border: "1px solid #30363d", padding: "0.6rem 0.75rem", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ flex: 1, marginRight: "0.5rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <a href={`/projects/${p.id}`} onClick={() => { setIsOpen(false); setActiveTool(null); }} style={{ color: "#58a6ff", fontWeight: "600", textDecoration: "none", fontSize: "0.85rem" }}>
                                  {p.name}
                                </a>
                                <span style={{ fontSize: "0.7rem", color: "#8b949e", backgroundColor: "#21262d", padding: "1px 4px", borderRadius: "3px" }}>
                                  {p.difficulty}
                                </span>
                              </div>
                              <div style={{ fontSize: "0.7rem", color: "#8b949e", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
                                {p.technologies.slice(0, 3).join(", ")}
                              </div>
                            </div>
                            <div style={{ fontSize: "0.85rem", fontWeight: "800", color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.1)", padding: "4px 8px", borderRadius: "4px" }}>
                              {score}% Match
                            </div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* 2. Find your next project Tool */}
              {activeTool === "find-project" && (
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "1rem" }}>
                    Scanning all repositories matching your stack: <strong>{userSkills.join(", ")}</strong>
                  </p>
                  {(() => {
                    let best = null;
                    let highest = 0;
                    projects.forEach((p) => {
                      const matches = userSkills.filter(skill => 
                        p.technologies.some(t => t.toLowerCase() === skill.toLowerCase()) ||
                        p.language.toLowerCase() === skill.toLowerCase()
                      ).length;
                      const matchPct = userSkills.length ? Math.round(45 + (matches / userSkills.length) * 40 + 15) : 0;
                      const finalPct = Math.min(matchPct, 100);
                      if (finalPct > highest) {
                        highest = finalPct;
                        best = p;
                      }
                    });
                    return best ? (
                      <div style={{ backgroundColor: "#161b22", border: "1px solid #30363d", padding: "1rem", borderRadius: "8px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                          <span style={{ fontWeight: "600", fontSize: "0.95rem", color: "#10b981" }}>{best.name}</span>
                          <span style={{ fontSize: "0.85rem", fontWeight: "700", color: "#10b981", backgroundColor: "rgba(16, 185, 129, 0.15)", padding: "2px 6px", borderRadius: "4px" }}>
                            {highest}% Match
                          </span>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#8b949e", marginBottom: "0.75rem" }}>{best.description}</div>
                        <a href={`/projects/${best.id}`} onClick={() => { setIsOpen(false); setActiveTool(null); }} style={{ display: "block", textAlign: "center", textDecoration: "none", backgroundColor: "#10b981", color: "#fff", padding: "0.5rem", borderRadius: "6px", fontSize: "0.85rem", fontWeight: "600" }}>
                          Go to Project Page
                        </a>
                      </div>
                    ) : (
                      <div style={{ fontSize: "0.85rem", color: "#ff7b72" }}>No match found. Please configure your skills in the preferences drawer.</div>
                    );
                  })()}
                </div>
              )}

              {/* 3. Recently Active Tool */}
              {activeTool === "recently-active" && (
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "1rem" }}>Simulation of recent git activities:</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      { project: "Next.js", action: "Merged PR #6849: Fix hydration error in routing", time: "12m ago" },
                      { project: "React", action: "Closed issue #28402: SyntheticEvent pooling cleanup", time: "1h ago" },
                      { project: "Kubernetes", action: "Pushed 5 commits to main branch", time: "3h ago" },
                      { project: "Flutter", action: "Released version 3.24.1 stable build", time: "5h ago" }
                    ].map((ev, i) => (
                      <div key={i} style={{ borderBottom: "1px solid #1e222b", paddingBottom: "0.5rem" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "2px" }}>
                          <strong style={{ color: "#58a6ff" }}>{ev.project}</strong>
                          <span style={{ fontSize: "0.75rem", color: "#8b949e" }}>{ev.time}</span>
                        </div>
                        <div style={{ fontSize: "0.8rem", color: "#c9d1d9" }}>{ev.action}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 4. Compare Repositories Tool */}
              {activeTool === "compare" && (
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: "0.75rem", color: "#8b949e", display: "block", marginBottom: "4px" }}>Project A</label>
                      <select value={projA} onChange={(e) => setProjA(Number(e.target.value))} style={{ width: "100%", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "6px", color: "#fff", fontSize: "0.8rem", padding: "4px" }}>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: "0.75rem", color: "#8b949e", display: "block", marginBottom: "4px" }}>Project B</label>
                      <select value={projB} onChange={(e) => setProjB(Number(e.target.value))} style={{ width: "100%", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "6px", color: "#fff", fontSize: "0.8rem", padding: "4px" }}>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                  </div>
                  {(() => {
                    const a = projects.find(p => p.id === projA);
                    const b = projects.find(p => p.id === projB);
                    if (!a || !b) return null;
                    const getMatchPct = (p) => {
                      const m = userSkills.filter(skill => p.technologies.some(t => t.toLowerCase() === skill.toLowerCase()) || p.language.toLowerCase() === skill.toLowerCase()).length;
                      return userSkills.length ? Math.min(Math.round(45 + (m / userSkills.length) * 40 + 15), 100) : 0;
                    };
                    return (
                      <table style={{ width: "100%", fontSize: "0.8rem", color: "#c9d1d9", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid #30363d" }}>
                            <th style={{ textAlign: "left", padding: "4px 0", color: "#8b949e" }}>Metric</th>
                            <th style={{ textAlign: "right", padding: "4px 0", color: "#58a6ff" }}>{a.name}</th>
                            <th style={{ textAlign: "right", padding: "4px 0", color: "#58a6ff" }}>{b.name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid #21262d" }}>
                            <td style={{ padding: "6px 0" }}>⭐ Stars</td>
                            <td style={{ textAlign: "right" }}>{(a.stars / 1000).toFixed(0)}k</td>
                            <td style={{ textAlign: "right" }}>{(b.stars / 1000).toFixed(0)}k</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #21262d" }}>
                            <td style={{ padding: "6px 0" }}>💻 Language</td>
                            <td style={{ textAlign: "right" }}>{a.language}</td>
                            <td style={{ textAlign: "right" }}>{b.language}</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #21262d" }}>
                            <td style={{ padding: "6px 0" }}>🐛 Issues</td>
                            <td style={{ textAlign: "right" }}>{a.issues}</td>
                            <td style={{ textAlign: "right" }}>{b.issues}</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid #21262d" }}>
                            <td style={{ padding: "6px 0" }}>🎯 Match</td>
                            <td style={{ textAlign: "right", color: "#10b981", fontWeight: "bold" }}>{getMatchPct(a)}%</td>
                            <td style={{ textAlign: "right", color: "#10b981", fontWeight: "bold" }}>{getMatchPct(b)}%</td>
                          </tr>
                          <tr>
                            <td style={{ padding: "6px 0" }}>🔗 Action</td>
                            <td style={{ textAlign: "right" }}>
                              <a href={`/projects/${a.id}`} onClick={() => { setIsOpen(false); setActiveTool(null); }} style={{ color: "#58a6ff", textDecoration: "none" }}>View</a>
                            </td>
                            <td style={{ textAlign: "right" }}>
                              <a href={`/projects/${b.id}`} onClick={() => { setIsOpen(false); setActiveTool(null); }} style={{ color: "#58a6ff", textDecoration: "none" }}>View</a>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    );
                  })()}
                </div>
              )}

              {/* 5. Explain Repository Tool */}
              {activeTool === "ai-explain" && (
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <label style={{ fontSize: "0.75rem", color: "#8b949e", display: "block", marginBottom: "4px" }}>Select Repository</label>
                    <select value={selectedExplainProj} onChange={(e) => {
                      setSelectedExplainProj(Number(e.target.value));
                      setExplainAnswer("");
                    }} style={{ width: "100%", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "6px", color: "#fff", fontSize: "0.8rem", padding: "6px" }}>
                      {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    <button onClick={() => {
                      const p = projects.find(x => x.id === selectedExplainProj);
                      setExplainAnswer(p ? p.description : "No description found.");
                    }} style={{ flex: 1, backgroundColor: "#21262d", border: "1px solid #30363d", color: "#c9d1d9", padding: "6px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}>
                      Describe Project
                    </button>
                    <button onClick={() => {
                      const p = projects.find(x => x.id === selectedExplainProj);
                      setExplainAnswer(`Primary technologies are: ${p.technologies.join(", ")}. Licensed under ${p.license}.`);
                    }} style={{ flex: 1, backgroundColor: "#21262d", border: "1px solid #30363d", color: "#c9d1d9", padding: "6px", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}>
                      Tech Stack
                    </button>
                  </div>
                  {explainAnswer && (
                    <div style={{ backgroundColor: "#161b22", border: "1px solid #30363d", padding: "8px", borderRadius: "6px", fontSize: "0.8rem", color: "#cbd5e1", minHeight: "60px", maxHeight: "120px", overflowY: "auto" }}>
                      {explainAnswer}
                    </div>
                  )}
                </div>
              )}

              {/* 6. Recommend Projects Tool */}
              {activeTool === "ai-recommend" && (
                <div style={{ padding: "1.25rem" }}>
                  <p style={{ fontSize: "0.85rem", color: "#94a3b8", marginBottom: "0.75rem" }}>Top matching repositories for your stack:</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                    {(() => {
                      const scored = projects.map(p => {
                        const m = userSkills.filter(skill => p.technologies.some(t => t.toLowerCase() === skill.toLowerCase()) || p.language.toLowerCase() === skill.toLowerCase()).length;
                        const score = userSkills.length ? Math.min(Math.round(45 + (m / userSkills.length) * 40 + 15), 100) : 0;
                        return { p, score };
                      }).sort((x, y) => y.score - x.score).slice(0, 2);
                      
                      return scored.map(({ p, score }) => (
                        <div key={p.id} style={{ backgroundColor: "#161b22", border: "1px solid #30363d", padding: "8px", borderRadius: "6px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", fontWeight: "600", marginBottom: "4px" }}>
                            <span style={{ color: "#10b981" }}>{p.name}</span>
                            <span style={{ color: "#10b981" }}>{score}% Match</span>
                          </div>
                          <div style={{ fontSize: "0.75rem", color: "#8b949e" }}>Recommended because it uses {p.language} and matches your interest.</div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              )}

              {/* 7. Summarize Repository Tool */}
              {activeTool === "ai-summarize" && (
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ marginBottom: "0.75rem" }}>
                    <label style={{ fontSize: "0.75rem", color: "#8b949e", display: "block", marginBottom: "4px" }}>Select Repository</label>
                    <select value={selectedSumProj} onChange={(e) => setSelectedSumProj(Number(e.target.value))} style={{ width: "100%", backgroundColor: "#161b22", border: "1px solid #30363d", borderRadius: "6px", color: "#fff", fontSize: "0.8rem", padding: "6px" }}>
                      {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    </select>
                  </div>
                  {(() => {
                    const p = projects.find(x => x.id === selectedSumProj);
                    if (!p) return null;
                    return (
                      <ul style={{ paddingLeft: "1.2rem", fontSize: "0.8rem", color: "#cbd5e1", display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                        <li><strong>Category:</strong> Curated under {p.domain}</li>
                        <li><strong>Popularity:</strong> Starred by over {(p.stars/1000).toFixed(0)}k users with {p.issues} open issues.</li>
                        <li><strong>Tech Stack:</strong> Heavy reliance on {p.language} with frameworks: {p.technologies.slice(0, 3).join(", ")}.</li>
                      </ul>
                    );
                  })()}
                </div>
              )}

            </div>
          </div>
        </div>
      )}
    </>
  );
}
