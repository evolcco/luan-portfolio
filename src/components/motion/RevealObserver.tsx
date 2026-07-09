"use client";

import { useEffect } from "react";

/**
 * One global observer for scroll reveals. Server components just add `data-reveal`
 * (fade+rise) or class `reveal-lines` (line mask) plus an optional `--rvd` delay;
 * this arms the SSR-safe ready flag and toggles `data-inview` when they enter view.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sel = "[data-reveal], .reveal-lines, [data-clip]";

    root.dataset.revealReady = "";

    if (reduce) {
      document
        .querySelectorAll<HTMLElement>(sel)
        .forEach((el) => (el.dataset.inview = ""));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).dataset.inview = "";
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const observeAll = () =>
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        if (el.dataset.inview === undefined) io.observe(el);
      });

    observeAll();
    const mo = new MutationObserver(observeAll);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
