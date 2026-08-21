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
  const [projA, setProjA] = useState(1);
  const [projB, setProjB] = useState(2);
  const [tempSelectedSkills, setTempSelectedSkills] = useState(["React", "TypeScript"]);
  const [isToolkitExpanded, setIsToolkitExpanded] = useState(true);

  useEffect(() => {
    // Render the mock indicator in both development and production for testing
    setIsProduction(true);

    // Load initial theme choice
    const savedTheme = localStorage.getItem("prefTheme") || "default";
    setTheme(savedTheme);
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
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            boxShadow: "0 12px 32px rgba(0, 0, 0, 0.3)",
            zIndex: 1000,
            color: "var(--text-primary)",
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
            borderBottom: "1px solid var(--border)"
          }}>
            <span style={{ fontSize: "0.95rem", fontWeight: "600", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.4rem" }}>
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
            <div style={{ padding: "1.25rem", borderBottom: "1px solid var(--border)", maxHeight: "380px", overflowY: "auto" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                
                {/* Developer Toolkit Dropdown Accordion */}
                <div style={{
                  backgroundColor: "var(--bg-color)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  overflow: "hidden"
                }}>
                  <button onClick={() => setIsToolkitExpanded(!isToolkitExpanded)} style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                    background: "none",
                    border: "none",
                    color: "var(--text-primary)",
                    padding: "0.6rem 0.75rem",
                    fontSize: "0.85rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    textAlign: "left"
                  }}>
                    <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                      <span>🛠️</span> Developer Toolkit
                    </span>
                    <span style={{ color: "var(--text-secondary)", fontSize: "0.75rem" }}>
                      {isToolkitExpanded ? "▲" : "▼"}
                    </span>
                  </button>
                  {isToolkitExpanded && (
                    <div style={{
                      display: "flex",
                      flexDirection: "column",
                      backgroundColor: "var(--card-bg)",
                      padding: "0.75rem",
                      borderTop: "1px solid var(--border)",
                      gap: "0.6rem"
                    }}>
                      <button
                        onClick={() => setActiveTool('is-project-for-me')}
                        className="toolkit-card toolkit-card-purple"
                      >
                        <div className="toolkit-icon-badge toolkit-icon-purple">🤔</div>
                        <div className="toolkit-details">
                          <div className="toolkit-title">Is this Project for me</div>
                          <div className="toolkit-desc">Scan & match your tech stack with projects.</div>
                        </div>
                        <div className="toolkit-arrow">➔</div>
                      </button>

                      <button
                        onClick={() => setActiveTool('compare')}
                        className="toolkit-card toolkit-card-cyan"
                      >
                        <div className="toolkit-icon-badge toolkit-icon-cyan">⚔️</div>
                        <div className="toolkit-details">
                          <div className="toolkit-title">Compare Repositories</div>
                          <div className="toolkit-desc">Compare stars, issues, and language metrics.</div>
                        </div>
                        <div className="toolkit-arrow">➔</div>
                      </button>
                    </div>
                  )}
                </div>



              </div>
            </div>
          )}

          {/* Theme Selection at the bottom of the Dialog */}
          <div style={{ padding: "1.25rem", backgroundColor: "var(--card-hover)" }}>
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1.5rem"
            }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: "0.95rem", fontWeight: "600", marginBottom: "0.2rem" }}>Theme</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Select your theme preference.</div>
              </div>
              
              {/* Custom Select dropdown */}
              <div style={{ position: "relative" }}>
                <select
                  value={theme}
                  onChange={handleThemeChange}
                  style={{
                    appearance: "none",
                    backgroundColor: "var(--bg-color)",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                    color: "var(--text-primary)",
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
            width: "900px",
            maxWidth: "94vw",
            backgroundColor: "var(--card-bg)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            boxShadow: "0 24px 64px rgba(0, 0, 0, 0.4)",
            color: "var(--text-primary)",
            fontFamily: "var(--font-sans), system-ui, sans-serif",
            overflow: "hidden"
          }}>
            {/* Pop-up Header */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "1rem 1.25rem",
              borderBottom: "1px solid var(--border)",
              backgroundColor: "var(--card-hover)"
            }}>
              <span style={{ fontSize: "1rem", fontWeight: "700", color: "var(--text-primary)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
            <div style={{ padding: "0.5rem", maxHeight: "90vh", overflowY: "auto" }}>
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
                    backgroundColor: "var(--bg-color)",
                    border: "1px solid var(--border)",
                    padding: "0.6rem",
                    borderRadius: "8px",
                    maxHeight: "180px",
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
                            backgroundColor: isSelected ? "#10b981" : "var(--card-hover)",
                            border: isSelected ? "1px solid #10b981" : "1px solid var(--border)",
                            color: isSelected ? "#fff" : "var(--text-primary)",
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
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "450px", overflowY: "auto" }}>
                        {suggestions.slice(0, 10).map(({ project: p, score }) => (
                          <div key={p.id} style={{ backgroundColor: "var(--bg-color)", border: "1px solid var(--border)", padding: "0.6rem 0.75rem", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <div style={{ flex: 1, marginRight: "0.5rem" }}>
                              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                                <a href={`/projects/${p.id}`} onClick={() => { setIsOpen(false); setActiveTool(null); }} style={{ color: "#58a6ff", fontWeight: "600", textDecoration: "none", fontSize: "0.85rem" }}>
                                  {p.name}
                                </a>
                                <span style={{ fontSize: "0.7rem", color: "var(--text-secondary)", backgroundColor: "var(--card-hover)", padding: "1px 4px", borderRadius: "3px" }}>
                                  {p.difficulty}
                                </span>
                              </div>
                              <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "2px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "180px" }}>
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



              {/* 4. Compare Repositories Tool */}
              {activeTool === "compare" && (
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Project A</label>
                      <select value={projA} onChange={(e) => setProjA(Number(e.target.value))} style={{ width: "100%", backgroundColor: "var(--bg-color)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--text-primary)", fontSize: "0.8rem", padding: "4px", outline: "none" }}>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Project B</label>
                      <select value={projB} onChange={(e) => setProjB(Number(e.target.value))} style={{ width: "100%", backgroundColor: "var(--bg-color)", border: "1px solid var(--border)", borderRadius: "6px", color: "var(--text-primary)", fontSize: "0.8rem", padding: "4px", outline: "none" }}>
                        {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                      </select>
                    </div>
                  </div>
                  {(() => {
                    const a = projects.find(p => p.id === projA);
                    const b = projects.find(p => p.id === projB);
                    if (!a || !b) return null;

                    return (
                      <table style={{ width: "100%", fontSize: "0.8rem", color: "var(--text-primary)", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ borderBottom: "1px solid var(--border)" }}>
                            <th style={{ textAlign: "left", padding: "4px 0", color: "var(--text-secondary)" }}>Metric</th>
                            <th style={{ textAlign: "right", padding: "4px 0", color: "#58a6ff" }}>{a.name}</th>
                            <th style={{ textAlign: "right", padding: "4px 0", color: "#58a6ff" }}>{b.name}</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr style={{ borderBottom: "1px solid var(--border)" }}>
                            <td style={{ padding: "6px 0" }}>⭐ Stars</td>
                            <td style={{ textAlign: "right" }}>{(a.stars / 1000).toFixed(0)}k</td>
                            <td style={{ textAlign: "right" }}>{(b.stars / 1000).toFixed(0)}k</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid var(--border)" }}>
                            <td style={{ padding: "6px 0" }}>💻 Language</td>
                            <td style={{ textAlign: "right" }}>{a.language}</td>
                            <td style={{ textAlign: "right" }}>{b.language}</td>
                          </tr>
                          <tr style={{ borderBottom: "1px solid var(--border)" }}>
                            <td style={{ padding: "6px 0" }}>🐛 Issues</td>
                            <td style={{ textAlign: "right" }}>{a.issues}</td>
                            <td style={{ textAlign: "right" }}>{b.issues}</td>
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



            </div>
          </div>
        </div>
      )}
    </>
  );
}
