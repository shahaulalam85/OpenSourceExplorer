"use client";

import { useState, useEffect } from "react";

export default function RepositoryMatch({ project }) {
  const [userSkills, setUserSkills] = useState([]);

  useEffect(() => {
    const loadSkills = () => {
      try {
        const saved = localStorage.getItem("userSkills");
        // Default to a couple of skills if empty (like Java, React, Spring Boot)
        // so it populates nicely out-of-the-box
        if (!saved) {
          const defaultSkills = ["Java", "React", "Spring Boot"];
          localStorage.setItem("userSkills", JSON.stringify(defaultSkills));
          setUserSkills(defaultSkills);
        } else {
          setUserSkills(JSON.parse(saved));
        }
      } catch (e) {
        setUserSkills([]);
      }
    };

    loadSkills();
    window.addEventListener("userSkillsChanged", loadSkills);
    return () => {
      window.removeEventListener("userSkillsChanged", loadSkills);
    };
  }, []);

  const { technologies, difficulty, domain, language, beginnerFriendly } = project;

  if (userSkills.length === 0) {
    return null;
  }

  // Check matching status for each of the user's skills against the repo
  const skillMatches = userSkills.map((skill) => {
    const isTechMatch = technologies.some(
      (tech) => tech.toLowerCase() === skill.toLowerCase()
    );
    const isLangMatch = language.toLowerCase() === skill.toLowerCase();
    return {
      name: skill,
      matched: isTechMatch || isLangMatch
    };
  });

  const matchedCount = skillMatches.filter((s) => s.matched).length;
  
  // Calculate match percentage matching the user's expectations
  let matchPct = 0;
  if (matchedCount > 0) {
    const overlapRatio = matchedCount / userSkills.length;
    // Base 45% + ratio * 40% + 15% (difficulty alignment bonus)
    matchPct = Math.round(45 + overlapRatio * 40 + 15);
  } else {
    matchPct = 0;
  }
  matchPct = Math.min(matchPct, 100);



  return (
    <div className="sidebar-card" style={{ marginBottom: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
      <h3 style={{ fontSize: "1.1rem", marginBottom: "0.15rem", color: "var(--primary)" }}>
        Is This Project For Me
      </h3>
      <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "0.75rem" }}>
        Repository Match
      </div>
      
      <div style={{ borderBottom: "1px solid var(--border)", marginBottom: "0.75rem" }}></div>

      <div style={{ marginBottom: "0.75rem" }}>
        <h4 style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
          Your Skills:
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem" }}>
          {skillMatches.map((skill) => (
            <div key={skill.name} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem" }}>
              <span style={{ color: skill.matched ? "var(--primary)" : "var(--accent-rose)", fontWeight: "bold" }}>
                {skill.matched ? "✓" : "✗"}
              </span>
              <span style={{ color: skill.matched ? "var(--text-primary)" : "var(--text-muted)" }}>
                {skill.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: "0.75rem", 
        backgroundColor: "var(--bg-color)", 
        padding: "0.5rem 0.75rem", 
        borderRadius: "var(--radius-md)", 
        border: "1px solid var(--border)" 
      }}>
        <span style={{ fontSize: "0.85rem", fontWeight: "600" }}>Match:</span>
        <span style={{ fontSize: "1rem", fontWeight: "800", color: "var(--primary)" }}>
          {matchPct}%
        </span>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.75rem" }}>
        <span style={{ color: "var(--text-secondary)" }}>Difficulty:</span>
        <span style={{ fontWeight: "700" }}>{difficulty}</span>
      </div>


    </div>
  );
}
