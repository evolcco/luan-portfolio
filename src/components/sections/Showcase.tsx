import Image from "next/image";
import styles from "./Showcase.module.css";

/* A curated, mixed set of case artwork — Key Visual Collection + case covers +
   a few strong branding frames. Interleaved so each marquee column gets variety. */
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

const COLS = 4;
const DURATIONS = ["48s", "38s", "54s", "42s"];

export function Showcase() {
  const columns = Array.from({ length: COLS }, (_, c) =>
    IMAGES.filter((_, i) => i % COLS === c),
  );

  return (
    <section className={styles.showcase} aria-label="Vitrine de trabalhos">
      <div className={styles.scene} aria-hidden>
        <div className={styles.grid}>
          {columns.map((col, c) => (
            <div
              key={c}
              className={styles.col}
              data-dir={c % 2 === 0 ? "up" : "down"}
              style={{ "--dur": DURATIONS[c] } as React.CSSProperties}
            >
              {[...col, ...col].map((src, i) => (
                <div key={`${src}-${i}`} className={styles.cell}>
                  <Image
                    src={src}
                    alt=""
                    fill
                    sizes="(max-width: 639px) 45vw, 24vw"
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

      <div className={styles.intro}>
        <span className={`mono ${styles.cue}`}>Portfólio · 2016—2025</span>
        <span className={`mono ${styles.scroll}`} aria-hidden>
          Role ↓
        </span>
      </div>
    </section>
  );
}
