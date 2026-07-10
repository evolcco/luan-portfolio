import Link from "next/link";
import styles from "./SiteFooter.module.css";

/** Global footer — closes every page with contact + nav. Token-based, so it
 *  re-themes with the diário space automatically. */
export function SiteFooter() {
  return (
    <footer className={`cg ${styles.footer}`}>
      <div className={styles.top}>
        <span className={`mono ${styles.brandK}`}>Luan Andrade — Diretor de Arte</span>
        <a
          href="mailto:contato@luanandrade.me"
          className={`${styles.mail} link`}
          aria-label="Enviar e-mail para contato@luanandrade.me"
        >
          contato@luanandrade.me
        </a>
      </div>

      <div className={styles.bar}>
        <nav className={`mono ${styles.nav}`} aria-label="Rodapé">
          <Link href="/trabalho" className="link">Trabalho</Link>
          <Link href="/diario" className="link">Diário</Link>
          <Link href="/sobre" className="link">Sobre</Link>
        </nav>
        <div className={`mono ${styles.social}`}>
          <a href="#" className="link">LinkedIn ↗</a>
          <a href="#" className="link">Instagram ↗</a>
          <a href="#" className="link">Behance ↗</a>
        </div>
        <div className={`mono ${styles.copy}`}>São Paulo · Brasil · © 2026</div>
      </div>
    </footer>
  );
}
