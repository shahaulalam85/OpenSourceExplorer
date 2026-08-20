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

  // Determine contribution recommendations based on domain and difficulty
  const recommendations = [];

  // 1. Documentation
  if (difficulty.toLowerCase() === "advanced") {
    recommendations.push({ label: "Documentation", level: "medium", icon: "🟡" });
  } else {
    recommendations.push({ label: "Documentation", level: "high", icon: "🟢" });
  }

  // 2. Good First Issue
  if (beginnerFriendly) {
    recommendations.push({ label: "Good First Issue", level: "high", icon: "🟢" });
  } else if (difficulty.toLowerCase() === "beginner") {
    recommendations.push({ label: "Good First Issue", level: "high", icon: "🟢" });
  } else if (difficulty.toLowerCase() === "intermediate") {
    recommendations.push({ label: "Good First Issue", level: "medium", icon: "🟡" });
  } else {
    recommendations.push({ label: "Good First Issue", level: "low", icon: "🔴" });
  }

  // 3. Technical Areas (Backend/Frontend/DevOps/AI-ML)
  const userHasFrontend = userSkills.some(s => ["react", "next.js", "javascript", "typescript", "svelte", "flutter"].includes(s.toLowerCase()));
  const userHasBackend = userSkills.some(s => ["node.js", "go", "python", "rust", "java", "spring boot"].includes(s.toLowerCase()));
  const userHasDevOps = userSkills.some(s => ["docker", "kubernetes", "go", "python"].includes(s.toLowerCase()));
  const userHasAIML = userSkills.some(s => ["python"].includes(s.toLowerCase()));

  if (domain === "Web Development" || domain === "Mobile Development") {
    recommendations.push({
      label: "Frontend",
      level: userHasFrontend ? "high" : "medium",
      icon: userHasFrontend ? "🟢" : "🟡"
    });
  } else if (domain === "Backend") {
    recommendations.push({
      label: "Backend",
      level: userHasBackend ? "high" : "medium",
      icon: userHasBackend ? "🟢" : "🟡"
    });
  } else if (domain === "DevOps") {
    recommendations.push({
      label: "DevOps",
      level: userHasDevOps ? "high" : "medium",
      icon: userHasDevOps ? "🟢" : "🟡"
    });
  } else if (domain === "AI/ML") {
    recommendations.push({
      label: "AI/ML",
      level: userHasAIML ? "high" : "medium",
      icon: userHasAIML ? "🟢" : "🟡"
    });
  } else {
    // Systems & Security
    const userHasSystems = userSkills.some(s => ["c++", "rust", "go"].includes(s.toLowerCase()));
    recommendations.push({
      label: "Systems Development",
      level: userHasSystems ? "high" : "medium",
      icon: userHasSystems ? "🟢" : "🟡"
    });
  }

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

      <div>
        <h4 style={{ fontSize: "0.8rem", fontWeight: "700", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "0.35rem" }}>
          Recommended Contribution:
        </h4>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          {recommendations.map((rec) => (
            <div key={rec.label} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem" }}>
              <span>{rec.icon}</span>
              <span>{rec.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
