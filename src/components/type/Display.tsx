"use client";

import { useEffect, useRef } from "react";

/**
 * Display type locked to the background grid on BOTH axes.
 * - Vertical: cap-height sized to the element's cell-height; `text-box-trim` seats
 *   cap-top and baseline exactly on the grid lines (measured-baseline fallback for Firefox).
 * - Horizontal: measures real glyph ink (canvas actualBoundingBox), trims the left
 *   side-bearing to the column line, and justifies the width to a whole number of cells.
 *
 * The element renders as a `.wl` grid item — the parent places it with a grid-area.
 */
export function Display({
  text,
  className,
  weight = 800,
  tracking = -0.045,
  fill = 1,
  animateWeight = false,
  condense = 100,
}: {
  text: string;
  className?: string;
  weight?: number;
  tracking?: number;
  /** cap-height as a fraction of the cell-span (baseline stays on the bottom grid line). */
  fill?: number;
  /** on load, each letter starts at a random variable weight and cascades to `weight`. */
  animateWeight?: boolean;
  /** width axis (wdth) — < 100 = true condensed (measured into the fit, not scaleX-flattened). */
  condense?: number;
}) {
  const wlRef = useRef<HTMLSpanElement>(null);
  const snapRef = useRef<HTMLSpanElement>(null);
  const txtRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const wl = wlRef.current;
    const snap = snapRef.current;
    const txt = txtRef.current;
    if (!wl || !snap || !txt) return;

    const mctx = document.createElement("canvas").getContext("2d");
    if (!mctx) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fam = getComputedStyle(txt).fontFamily;
    const capOf = (F: number) => {
      mctx.font = `${weight} ${F}px ${fam}`;
      return mctx.measureText("H").actualBoundingBoxAscent;
    };
    const capR = capOf(100) / 100;
    const TB =
      typeof CSS !== "undefined" &&
      !!CSS.supports &&
      (CSS.supports("text-box", "trim-both cap alphabetic") ||
        CSS.supports("text-box-trim", "trim-both"));

    const cellPx = () => {
      const root = document.documentElement;
      const cols =
        parseFloat(getComputedStyle(root).getPropertyValue("--cols")) || 12;
      return root.clientWidth / cols;
    };

    const fit = () => {
      const H = wl.clientHeight;
      if (!H) return;
      const CELL = cellPx();
      const F = (fill * H) / capR; // cap-height = fill × cell-span (baseline stays on the bottom line)
      txt.style.fontSize = `${F}px`;

      // Ink shape ratios from a valid (stretch-free) canvas font. Canvas rejects a
      // font-stretch axis ("70%") in the shorthand — it silently falls back to
      // 10px sans-serif and measures garbage — so never put `%` here. Ratios are
      // scale-invariant, so they hold for any wdth; canvas measures at the settled weight.
      mctx.font = `${weight} ${F}px ${fam}`;
      try {
        (mctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
          `${tracking * F}px`;
      } catch {
        /* older engines: measurement omits tracking, negligible */
      }
      const m = mctx.measureText(text);
      const caAdvance = m.width || 1;
      const leftRatio = -m.actualBoundingBoxLeft / caAdvance;
      const inkRatio = (m.actualBoundingBoxRight + m.actualBoundingBoxLeft) / caAdvance;

      // True rendered advance from a hidden probe at the settled weight + wdth — canvas
      // can't apply the variable width axis, so the DOM is the source of truth here.
      const probe = document.createElement("span");
      probe.textContent = text;
      probe.style.cssText =
        `position:absolute;left:-99999px;top:0;white-space:nowrap;visibility:hidden;` +
        `font-family:${fam};font-size:${F}px;font-weight:${weight};letter-spacing:${tracking}em;` +
        `font-variation-settings:"wght" ${weight},"wdth" ${condense}`;
      document.body.appendChild(probe);
      const advance = probe.getBoundingClientRect().width || caAdvance;
      document.body.removeChild(probe);

      const inkLeft = advance * leftRatio;
      const inkW = advance * inkRatio;
      const avail = Math.max(1, Math.round(wl.clientWidth / CELL));
      const cols = Math.min(Math.max(1, Math.round(inkW / CELL)), avail);
      const s = (cols * CELL) / inkW;

      let vy = H * (1 - fill); // drop the shorter cap so its baseline seats on the bottom grid line
      if (!TB) {
        snap.style.transform = "none";
        const mk = document.createElement("i");
        mk.style.cssText =
          "display:inline-block;width:0;height:0;vertical-align:baseline";
        txt.appendChild(mk);
        vy = H - (mk.getBoundingClientRect().top - wl.getBoundingClientRect().top);
        txt.removeChild(mk);
      }

      snap.style.transformOrigin = "left center";
      snap.style.transform = `translate(${-inkLeft * s}px, ${vy}px) scaleX(${s.toFixed(4)})`;
      wl.dataset.fit = ""; // reveal once fitted (no unfitted → fitted pop)
    };

    const letters = () => txt.querySelectorAll<HTMLElement>(".ltr");

    // start each letter at a random weight (before the reveal), so the reveal opens mid-morph
    if (animateWeight && !reduce) {
      letters().forEach((l) => {
        l.style.transition = "none";
        l.style.setProperty("--wght", String(200 + Math.floor(Math.random() * 480)));
      });
    }

    fit();

    // …then cascade every letter to the normalized weight
    if (animateWeight && !reduce) {
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          letters().forEach((l, i) => {
            l.style.transition = `--wght 1400ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 90}ms`;
            l.style.setProperty("--wght", String(weight));
          });
        }),
      );
    }

    let alive = true;
    const refit = () => {
      if (alive) fit();
    };
    const ro = new ResizeObserver(fit);
    ro.observe(wl);
    // `fonts.ready` can resolve before an @import'd variable font finishes downloading,
    // so the first fit under-measures (canvas falls back to the narrower face) and the
    // wordmark overflows. Explicitly wait for scale-variable, then re-fit.
    if (document.fonts) {
      document.fonts.ready.then(refit).catch(() => {});
      document.fonts.load(`${weight} 100px "scale-variable"`).then(refit).catch(() => {});
    }
    return () => {
      alive = false;
      ro.disconnect();
    };
  }, [text, weight, tracking, fill, animateWeight, condense]);

  return (
    <span ref={wlRef} className={`wl ${className ?? ""}`}>
      <span ref={snapRef} className="snap">
        <span
          ref={txtRef}
          className="txt"
          style={
            {
              "--wght": weight,
              "--wdth": condense,
              fontWeight: weight,
              letterSpacing: `${tracking}em`,
            } as React.CSSProperties
          }
        >
          {animateWeight
            ? text.split("").map((ch, i) => (
                <span
                  key={i}
                  className="ltr"
                  style={{ "--wght": weight, "--wdth": condense } as React.CSSProperties}
                >
                  {ch === " " ? " " : ch}
                </span>
              ))
            : text}
        </span>
      </span>
    </span>
  );
}
