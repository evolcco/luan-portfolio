import styles from "./Hero.module.css";
import { Display } from "@/components/type/Display";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";

export function Hero() {
  return (
    <section className={`cg ${styles.hero}`}>
      <div className={`mono ${styles.eyebrow}`}>
        <span>Portfólio V3</span>
        <b>/</b>
        <span>Sistema</span>
      </div>

      <div className={`mono ${styles.plate}`}>(001)</div>

      <div className={styles.img}>
        <PlaceholderImage variant="radial" className={styles.imgCanvas} />
      </div>

      <Display text="Luan" className={styles.wl1} />
      <Display text="Andrade" className={styles.wl2} />

      <div className={styles.meta}>
        <div className={`mono ${styles.metacol}`}>
          Diretor de Arte
          <span className={styles.sub}>Brand Specialist</span>
        </div>
        <div className={`mono ${styles.metacol}`}>
          10 anos
          <span className={styles.sub}>Marca · Campanha · Digital</span>
        </div>
        <div className={`mono ${styles.metacol}`}>
          Disponível 2026
          <span className={styles.sub}>Available for projects</span>
        </div>
      </div>
    </section>
  );
}
