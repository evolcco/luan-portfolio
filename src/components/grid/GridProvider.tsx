"use client";

import { useEffect } from "react";

/**
 * Publishes the exact grid unit (--cell = clientWidth/cols) after hydration,
 * blooms the background grid in from nothing to its idle whisper on load, and
 * wires the G key to x-ray the grid.
 */
export function GridProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lastW = 0;

    const measure = () => {
      const w = root.clientWidth;
      if (!w || w === lastW) return;
      lastW = w;
      const cols = w < 640 ? 6 : 12;
      const cell = w / cols;
      root.style.setProperty("--cols", String(cols));
      root.style.setProperty("--cell", `${cell}px`);
      root.style.setProperty("--cell-bg", `${Math.round(cell)}px`); // crisp bg lines
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);

    // one-time settle: grid rises from 0 to its idle whisper
    const bloom = () => root.style.setProperty("--grid-op", "0.55");
    if (reduce) bloom();
    else requestAnimationFrame(() => requestAnimationFrame(bloom));

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
