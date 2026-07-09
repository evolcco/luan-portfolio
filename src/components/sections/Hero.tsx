import styles from "./Hero.module.css";
import { Display } from "@/components/type/Display";

export function Hero() {
  return (
    <section className={`cg ${styles.hero}`}>
      <div
        className={`mono ${styles.eyebrow}`}
        data-reveal
        style={{ "--rvd": "120ms" } as React.CSSProperties}
      >
        Diretor de Arte — Brand Specialist
      </div>

      <Display text="Luan" weight={600} tracking={-0.025} className={styles.wl1} />
      <Display text="Andrade" weight={600} tracking={-0.025} className={styles.wl2} />

      <div
        className={`mono ${styles.meta}`}
        data-reveal
        style={{ "--rvd": "520ms" } as React.CSSProperties}
      >
        <span>Direção de arte · Marca · Sistemas visuais</span>
        <span>Disponível 2026 ↗</span>
      </div>
    </section>
  );
}
