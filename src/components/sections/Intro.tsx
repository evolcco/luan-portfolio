"use client";

import { useEffect } from "react";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import styles from "./Intro.module.css";

/* Curated, mixed case artwork for the marquee floor. */
const IMAGES = [
  "/images/cases/key-visual-collection/11.png",
  "/images/cases/contclaro/07.png",
  "/images/cases/key-visual-collection/03.png",
  "/images/cases/instituto-cigo/cover.jpg",
  "/images/cases/key-visual-collection/13.png",
  "/images/cases/bb-cosmeticos/08.png",
  "/images/cases/key-visual-collection/06.png",
  "/images/cases/amgen-pharma-experience/cover.jpg",
  "/images/cases/key-visual-collection/10.png",
  "/images/cases/saude-individualizada-branding/07.png",
  "/images/cases/key-visual-collection/05.png",
  "/images/cases/nucleart/cover.jpg",
  "/images/cases/key-visual-collection/12.png",
  "/images/cases/life4u/cover.jpg",
  "/images/cases/key-visual-collection/07.png",
  "/images/cases/caminhos-pos-avc/cover.jpg",
  "/images/cases/key-visual-collection/16.png",
  "/images/cases/bb-cosmeticos/06.jpg",
  "/images/cases/key-visual-collection/01.png",
  "/images/cases/mitsubishi-app/01.webp",
  "/images/cases/key-visual-collection/14.png",
  "/images/cases/saude-individualizada-branding/11.png",
  "/images/cases/key-visual-collection/15.png",
  "/images/cases/instituto-cigo/s02.png",
  "/images/cases/key-visual-collection/08.png",
  "/images/cases/contclaro/06.png",
  "/images/cases/key-visual-collection/04.png",
  "/images/cases/nucleart/s06.png",
];

const COLS = 5;
const DURATIONS = ["52s", "40s", "58s", "44s", "48s"];

export function Intro() {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-intro]");
    if (!el) return;
    // rAF loop reading real window.scrollY (Lenis root mode keeps it live) —
    // same approach as the Parallax component. Runs once synchronously so the
    // initial state is set even if a rAF is cancelled by a remount.
    let raf = 0;
    let last = -1;
    const tick = () => {
      const vh = window.innerHeight || 1;
      // transition scrubs over the first ~70% of a viewport of scroll
      const t = Math.min(Math.max(window.scrollY / (vh * 0.7), 0), 1);
      if (t !== last) {
        last = t;
        el.style.setProperty("--t", t.toFixed(4));
        el.dataset.active = t > 0.85 ? "1" : "0";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  const columns = Array.from({ length: COLS }, (_, c) =>
    IMAGES.filter((_, i) => i % COLS === c),
  );

  return (
    <div data-intro className={styles.intro} data-active="0">
      <div className={styles.stage}>
        <div className={styles.marquee} aria-hidden>
          <div className={styles.grid}>
            {columns.map((col, c) => (
              <div
                key={c}
                className={styles.col}
                data-dir={c % 2 ? "down" : "up"}
                style={{ "--dur": DURATIONS[c] } as React.CSSProperties}
              >
                {[...col, ...col].map((src, i) => (
                  <div key={`${src}-${i}`} className={styles.cell}>
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="30vw"
                      loading="eager"
                      className={styles.cellImg}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className={styles.scrim} aria-hidden />

        <div className={styles.heroLayer}>
          <Hero />
        </div>

        <div className={`mono ${styles.cue}`} aria-hidden>
          Role ↓
        </div>
      </div>
    </div>
  );
}
