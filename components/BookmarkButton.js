"use client";

import { useState, useEffect } from "react";

export default function BookmarkButton({ projectId }) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const checkBookmark = () => {
      try {
        const saved = localStorage.getItem("savedProjects");
        const list = saved ? JSON.parse(saved) : [];
        setIsBookmarked(list.includes(Number(projectId)));
      } catch (e) {
        setIsBookmarked(false);
      }
    };

    const timer = setTimeout(checkBookmark, 0);

    window.addEventListener("savedProjectsChanged", checkBookmark);
    window.addEventListener("storage", checkBookmark);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("savedProjectsChanged", checkBookmark);
      window.removeEventListener("storage", checkBookmark);
    };
  }, [projectId]);

  const toggleBookmark = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const saved = localStorage.getItem("savedProjects");
      let list = saved ? JSON.parse(saved) : [];
      const numId = Number(projectId);

      if (list.includes(numId)) {
        list = list.filter((id) => id !== numId);
      } else {
        list.push(numId);
      }

      localStorage.setItem("savedProjects", JSON.stringify(list));
      window.dispatchEvent(new Event("savedProjectsChanged"));
    } catch (err) {
      console.error("Could not toggle bookmark", err);
    }
  };

  return (
    <button
      onClick={toggleBookmark}
      className={`bookmark-btn ${isBookmarked ? "active" : ""}`}
      title={isBookmarked ? "Remove from Saved" : "Save Project"}
      aria-label={isBookmarked ? "Remove from Saved" : "Save Project"}
    >
      <svg
        viewBox="0 0 24 24"
        width="18"
        height="18"
        stroke="currentColor"
        strokeWidth="2.2"
        fill={isBookmarked ? "currentColor" : "none"}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    </button>
  );
}
