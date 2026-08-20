"use client";

import { useEffect } from "react";

export default function ThemeSync() {
  useEffect(() => {
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
        // System fallback
        document.documentElement.removeAttribute("data-theme");
      }
    };

    let observer;
    let portal = document.querySelector("nextjs-portal");

    // If it exists initially, sync it
    if (portal) {
      syncTheme(portal);
      observer = new MutationObserver(() => syncTheme(portal));
      observer.observe(portal, {
        attributes: true,
        attributeFilter: ["class"]
      });
    }

    // Since nextjs-portal is injected asynchronously by Next.js,
    // we observe the document root to capture when it's attached.
    const docObserver = new MutationObserver(() => {
      const foundPortal = document.querySelector("nextjs-portal");
      if (foundPortal && foundPortal !== portal) {
        portal = foundPortal;
        syncTheme(portal);
        if (observer) observer.disconnect();
        observer = new MutationObserver(() => syncTheme(portal));
        observer.observe(portal, {
          attributes: true,
          attributeFilter: ["class"]
        });
      }
    });

    docObserver.observe(document.documentElement, {
      childList: true,
      subtree: true
    });

    return () => {
      if (observer) observer.disconnect();
      docObserver.disconnect();
    };
  }, []);

  return null;
}
