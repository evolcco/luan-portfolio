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
        Diretor de Arte &amp; Brand Specialist
      </div>

      <Display text="Luan" weight={600} tracking={-0.025} fill={0.62} animateWeight className={styles.wl1} />
      <Display text="Andrade" weight={600} tracking={-0.025} fill={0.62} animateWeight className={styles.wl2} />

      <div
        className={`mono ${styles.meta}`}
        data-reveal
        style={{ "--rvd": "520ms" } as React.CSSProperties}
      >
        <span className={styles.disciplines}>Marca · Campanha · Produto</span>
        <span className={styles.statement}>
          Dez anos transformando complexidade em direção clara.
        </span>
        <a href="#contato" className={`link ${styles.availability}`}>
          Disponível para projetos ↘
        </a>
      </div>
    </section>
  );
}
