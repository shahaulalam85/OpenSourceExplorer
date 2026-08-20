"use client";

import { useEffect } from "react";

export default function ThemeSync() {
  useEffect(() => {
    // Helper to hide non-preference rows and options in Next.js Dev Overlay
    const cleanDevOverlay = (shadowRoot) => {
      if (!shadowRoot) return;

      const walker = document.createTreeWalker(
        shadowRoot,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );

      const popoverTargets = ["Route", "Bundler", "Route Info"];
      const preferenceTargets = [
        "Position",
        "Size",
        "Hide Dev Tools for this session",
        "Hide Dev Tools shortcut",
        "Disable Dev Tools for this project",
        "Restart Dev Server",
        "Reset Bundler Cache"
      ];

      const nodesToHide = [];
      let node;

      while ((node = walker.nextNode())) {
        const text = node.textContent.trim();
        if (popoverTargets.includes(text)) {
          let current = node.parentElement;
          while (current && current.parentElement) {
            const parentText = current.parentElement.textContent || "";
            if (parentText.includes("Preferences")) {
              nodesToHide.push(current);
              break;
            }
            current = current.parentElement;
          }
        } else if (preferenceTargets.includes(text)) {
          let current = node.parentElement;
          while (current && current.parentElement) {
            const parentText = current.parentElement.textContent || "";
            const currentText = current.textContent || "";
            // Find the option container row: it is a child of the container holding "Theme", 
            // but is not the "Theme" container itself
            if (parentText.includes("Theme") && !currentText.includes("Theme")) {
              nodesToHide.push(current);
              break;
            }
            current = current.parentElement;
          }
        }
      }

      nodesToHide.forEach((el) => {
        el.style.display = "none";
      });
    };

    // Sync function that checks the class list of the Next.js portal
    const syncTheme = (portal) => {
      if (!portal) return;
      const isLight = portal.classList.contains("light");
      const isDark = portal.classList.contains("dark");

      if (isLight) {
        document.documentElement.setAttribute("data-theme", "light");
      } else if (isDark) {
        document.documentElement.setAttribute("data-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
      }
    };

    let observer;
    let overlayObserver;
    let portal = document.querySelector("nextjs-portal");

    const setupPortalObservers = (p) => {
      if (!p) return;
      
      // Theme syncing
      syncTheme(p);
      if (observer) observer.disconnect();
      observer = new MutationObserver(() => syncTheme(p));
      observer.observe(p, {
        attributes: true,
        attributeFilter: ["class"]
      });

      // Dev overlay cleaning
      if (p.shadowRoot) {
        cleanDevOverlay(p.shadowRoot);
        if (overlayObserver) overlayObserver.disconnect();
        overlayObserver = new MutationObserver(() => cleanDevOverlay(p.shadowRoot));
        overlayObserver.observe(p.shadowRoot, {
          childList: true,
          subtree: true
        });
      }
    };

    if (portal) {
      setupPortalObservers(portal);
    }

    // Observe document root to capture when nextjs-portal is dynamically attached
    const docObserver = new MutationObserver(() => {
      const foundPortal = document.querySelector("nextjs-portal");
      if (foundPortal && foundPortal !== portal) {
        portal = foundPortal;
        setupPortalObservers(portal);
      }
    });

    docObserver.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    return () => {
      if (observer) observer.disconnect();
      if (overlayObserver) overlayObserver.disconnect();
      docObserver.disconnect();
    };
  }, []);

  return null;
}
