"use client";

import { useState, useEffect } from "react";

export default function DevOverlayReplica() {
  const [isProduction, setIsProduction] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Only render the mock indicator in production builds
    if (process.env.NODE_ENV === "production") {
      setIsProduction(true);
    }
  }, []);

  if (!isProduction) {
    return null;
  }

  const handlePreferencesClick = () => {
    // Fire event to open the custom Preferences drawer inside Navbar.js
    window.dispatchEvent(new Event("openPreferencesDrawer"));
    setIsOpen(false);
  };

  return (
    <>
      {/* Floating Next.js Dev tools style "N" Badge */}
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


      {/* Floating Preferences Popover Menu */}
      {isOpen && (
        <div
          className="dev-overlay-replica-popover"
          style={{
            position: "fixed",
            bottom: "4rem",
            left: "1.25rem",
            width: "220px",
            backgroundColor: "#0d111c",
            border: "1px solid #1e293b",
            borderRadius: "8px",
            padding: "0.5rem",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
            zIndex: 1000,
            display: "flex",
            flexDirection: "column",
            color: "#fff",
            animation: "fade-in 0.2s ease-out"
          }}
        >
          <div
            onClick={handlePreferencesClick}
            className="dev-overlay-replica-row"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0.5rem 0.75rem",
              borderRadius: "6px",
              cursor: "pointer",
              transition: "background-color 0.2s"
            }}
          >
            <span style={{ fontSize: "0.85rem", fontWeight: "500" }}>Preferences</span>
            <svg
              viewBox="0 0 24 24"
              width="16"
              height="16"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: "#94a3b8" }}
            >
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </div>
        </div>
      )}
    </>
  );
}
