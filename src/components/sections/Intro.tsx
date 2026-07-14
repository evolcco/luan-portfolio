"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Hero } from "@/components/sections/Hero";
import styles from "./Intro.module.css";

/* Case artwork that flashes through the centre frame during the entrance. */
const FLASH = [
  "/images/cases/key-visual-collection/11.png",
  "/images/cases/instituto-cigo/cover.jpg",
  "/images/cases/key-visual-collection/03.png",
  "/images/cases/bb-cosmeticos/08.png",
  "/images/cases/saude-individualizada-branding/07.png",
  "/images/cases/key-visual-collection/13.png",
  "/images/cases/amgen-pharma-experience/cover.jpg",
  "/images/cases/key-visual-collection/10.png",
  "/images/cases/contclaro/07.png",
  "/images/cases/key-visual-collection/06.png",
  "/images/cases/life4u/cover.jpg",
  "/images/cases/nucleart/cover.jpg",
  "/images/cases/key-visual-collection/16.png",
  "/images/cases/caminhos-pos-avc/cover.jpg",
];

const FRAME_W = "44vw";
const FRAME_H = "24.75vw"; // 44vw * 9/16

type Phase = "flash" | "grow" | "expand" | "hero";

export function Intro() {
  const [phase, setPhase] = useState<Phase>("flash");
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const flash = setInterval(
      () => setIdx((i) => Math.min(i + 1, FLASH.length - 1)),
      165,
    );
    const t1 = setTimeout(() => {
      clearInterval(flash);
      setPhase("grow");
    }, 2400);
    const t2 = setTimeout(() => setPhase("expand"), 3050);
    const t3 = setTimeout(() => setPhase("hero"), 3800);
    return () => {
      clearInterval(flash);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const solidStyle =
    phase === "flash"
      ? { width: 0, height: 0 }
      : phase === "grow"
        ? { width: FRAME_W, height: FRAME_H }
        : { width: "100vw", height: "100vh" };

  return (
    <section className={styles.intro} data-phase={phase}>
      {phase === "hero" && <Hero />}

      <div
        className={styles.entrance}
        aria-hidden
        style={{
          opacity: phase === "hero" ? 0 : 1,
          pointerEvents: phase === "hero" ? "none" : undefined,
        }}
      >
        <div className={styles.frame} style={{ width: FRAME_W, height: FRAME_H }}>
          {/* all preloaded + stacked; each grows scale 0→1 from centre (bezier)
             over the previous, building a stack. */}
          {(phase === "flash" || phase === "grow") &&
            FLASH.map((src, i) => (
              <div
                key={src}
                className={styles.flash}
                style={{
                  zIndex: i + 1,
                  transform: i <= idx ? "scale(1)" : "scale(0)",
                }}
              >
                <Image
                  src={src}
                  alt=""
                  fill
                  sizes="46vw"
                  priority={i === 0}
                  loading="eager"
                  className={styles.flashImg}
                />
              </div>
            ))}
        </div>
        <div className={styles.solid} style={solidStyle} />
      </div>
    </section>
  );
}
