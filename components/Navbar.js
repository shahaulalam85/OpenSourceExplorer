"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="navbar-header">
      <nav className="navbar-container">
        <Link href="/" className="navbar-logo">
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
        
        <ul className="navbar-links">
          <li>
            <Link
              href="/"
              className={`navbar-link ${pathname === "/" ? "active" : ""}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/projects"
              className={`navbar-link ${pathname.startsWith("/projects") ? "active" : ""}`}
            >
              Projects
            </Link>
          </li>
          <li>
            <Link
              href="/saved"
              className={`navbar-link ${pathname === "/saved" ? "active" : ""}`}
            >
              Saved Projects
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
