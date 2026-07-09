"use client";

import { useEffect, useRef } from "react";

type Variant = "radial" | "split";

/**
 * Grayscale, self-contained placeholder art (canvas). Stands in for real case
 * imagery until assets are wired. `split` (dark ↔ light) is handy for showing the
 * mix-blend inversion working across a single element.
 */
export function PlaceholderImage({
  variant = "radial",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;

    const paint = () => {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      const r = c.getBoundingClientRect();
      const w = Math.max(2, r.width);
      const h = Math.max(2, r.height);
      c.width = w * d;
      c.height = h * d;
      const x = c.getContext("2d");
      if (!x) return;
      x.scale(d, d);

      if (variant === "split") {
        const g = x.createLinearGradient(0, 0, w, 0);
        g.addColorStop(0, "#0a0a0b");
        g.addColorStop(0.42, "#141518");
        g.addColorStop(0.5, "#3a3b3e");
        g.addColorStop(0.5, "#d8d7d3");
        g.addColorStop(1, "#f2f1ee");
        x.fillStyle = g;
        x.fillRect(0, 0, w, h);
      } else {
        const g = x.createLinearGradient(0, 0, w, h);
        g.addColorStop(0, "#3a3b3e");
        g.addColorStop(0.55, "#202124");
        g.addColorStop(1, "#0c0d0f");
        x.fillStyle = g;
        x.fillRect(0, 0, w, h);
        const rg = x.createRadialGradient(w * 0.4, h * 0.35, 0, w * 0.4, h * 0.35, h);
        rg.addColorStop(0, "rgba(235,235,233,.6)");
        rg.addColorStop(0.5, "rgba(150,150,150,.1)");
        rg.addColorStop(1, "rgba(0,0,0,0)");
        x.fillStyle = rg;
        x.fillRect(0, 0, w, h);
      }
      const n = Math.floor(w * h * 0.02);
      x.fillStyle = "rgba(128,128,128,.05)";
      for (let k = 0; k < n; k++) x.fillRect(Math.random() * w, Math.random() * h, 1, 1);
    };

    paint();
    const ro = new ResizeObserver(paint);
    ro.observe(c);
    return () => ro.disconnect();
  }, [variant]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
