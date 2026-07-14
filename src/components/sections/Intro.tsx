"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import styles from "./Intro.module.css";

/* Hero-worthy, human-centred case key visuals — they survive a full-bleed crop. */
const SLIDES = [
  "/images/cases/key-visual-collection/11.png",
  "/images/cases/key-visual-collection/03.png",
  "/images/cases/saude-individualizada-branding/07.png",
  "/images/cases/key-visual-collection/10.png",
  "/images/cases/instituto-cigo/cover.jpg",
  "/images/cases/key-visual-collection/06.png",
  "/images/cases/bb-cosmeticos/08.png",
  "/images/cases/key-visual-collection/13.png",
];

const SLIDE_MS = 4800;

export function Intro() {
  const [active, setActive] = useState(0);

  // slideshow cycle
  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % SLIDES.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, []);

  // scroll → hero transition (--t: 0→1 over the first ~70% of a viewport)
  useEffect(() => {
    const el = document.querySelector<HTMLElement>("[data-intro]");
    if (!el) return;
    let last = -1;
    let raf = 0;
    const apply = () => {
      const vh = window.innerHeight || 1;
      const t = Math.min(Math.max(window.scrollY / (vh * 0.7), 0), 1);
      if (t !== last) {
        last = t;
        el.style.setProperty("--t", t.toFixed(4));
        el.dataset.active = t > 0.85 ? "1" : "0";
      }
    };
    const loop = () => {
      apply();
      raf = requestAnimationFrame(loop);
    };
    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply, { passive: true });
    loop();
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div data-intro className={styles.intro} data-active="0">
      <div className={styles.stage}>
        <div className={styles.slideshow} aria-hidden>
          {SLIDES.map((src, i) => (
            <div
              key={src}
              className={styles.slide}
              style={{ opacity: i === active ? 1 : 0 }}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="100vw"
                priority={i === 0}
                loading="eager"
                className={styles.slideImg}
              />
            </div>
          ))}
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
