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
}: {
  text: string;
  className?: string;
  weight?: number;
  tracking?: number;
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
    const fam = getComputedStyle(document.body).fontFamily;
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
      const F = H / capR; // cap-height == the element's cell-height (integer rows)
      txt.style.fontSize = `${F}px`;

      mctx.font = `${weight} ${F}px ${fam}`;
      try {
        (mctx as CanvasRenderingContext2D & { letterSpacing?: string }).letterSpacing =
          `${tracking * F}px`;
      } catch {
        /* older engines: measurement omits tracking, negligible */
      }
      const m = mctx.measureText(text);
      const inkLeft = -m.actualBoundingBoxLeft;
      const inkW = m.actualBoundingBoxRight + m.actualBoundingBoxLeft;
      const avail = Math.max(1, Math.round(wl.clientWidth / CELL));
      const cols = Math.min(Math.max(1, Math.round(inkW / CELL)), avail);
      const s = (cols * CELL) / inkW;

      let vy = 0;
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
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wl);
    if (document.fonts?.ready) document.fonts.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, [text, weight, tracking]);

  return (
    <span ref={wlRef} className={`wl ${className ?? ""}`}>
      <span ref={snapRef} className="snap">
        <span ref={txtRef} className="txt">
          {text}
        </span>
      </span>
    </span>
  );
}
