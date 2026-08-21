"use client";

import { useState, useEffect } from "react";

export default function DevOverlayReplica() {
  const [isProduction, setIsProduction] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState("default");

  useEffect(() => {
    // Only render the mock indicator in production builds (e.g. Vercel)
    if (process.env.NODE_ENV === "production") {
      setIsProduction(true);
    }

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
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "1rem 1.25rem",
            borderBottom: "1px solid #1e222b"
          }}>
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

          {/* Body */}
          <div style={{ padding: "1.25rem" }}>
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
    </>
  );
}
