"use client";

import { useEffect } from "react";

/**
 * Refines the global grid unit to exact pixels after hydration.
 * CSS ships a `calc(100vw / cols)` fallback so the grid is correct on first paint;
 * here we override `--cell` with `clientWidth / cols` for sub-pixel-accurate alignment
 * (avoids the scrollbar drift of `vw`).
 */
export function GridProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    let lastW = 0;
    const measure = () => {
      const w = root.clientWidth;
      if (!w || w === lastW) return;
      lastW = w;
      const cols = w < 640 ? 6 : 12;
      root.style.setProperty("--cols", String(cols));
      root.style.setProperty("--cell", `${w / cols}px`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);

    // press G to x-ray the grid
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "g") document.body.classList.toggle("grid-x");
    };
    window.addEventListener("keydown", onKey);

    return () => {
      ro.disconnect();
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  return <>{children}</>;
}
