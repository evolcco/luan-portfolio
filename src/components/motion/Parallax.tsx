"use client";

import { useEffect } from "react";

/**
 * Subtle scroll parallax on image WRAPPERS only (never Display / .grid-bg).
 * rAF-coalesced, CSS-var driven (--py), no React state. Off under reduced-motion
 * and coarse pointers. Lenis (root mode) updates real window.scrollY, so this stays smooth.
 */
export function Parallax() {
  useEffect(() => {
    if (
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      matchMedia("(pointer: coarse)").matches
    )
      return;

    // live list — refreshed on DOM mutations so figures added on client-side
    // navigation (e.g. a case route) get parallax too, not just those at mount
    let els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-parallax]"),
    );
    const refresh = () =>
      (els = Array.from(
        document.querySelectorAll<HTMLElement>("[data-parallax]"),
      ));
    const mo = new MutationObserver(refresh);
    mo.observe(document.body, { childList: true, subtree: true });

    let raf = 0;
    let last = -1;
    const tick = () => {
      const y = window.scrollY;
      if (y !== last) {
        last = y;
        const vh = window.innerHeight;
        for (const el of els) {
          const f = parseFloat(el.dataset.parallax || "0.05");
          const r = el.getBoundingClientRect();
          const p = (r.top + r.height / 2 - vh / 2) / vh;
          el.style.setProperty("--py", `${(-p * r.height * f).toFixed(1)}px`);
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      mo.disconnect();
    };
  }, []);

  return null;
}
