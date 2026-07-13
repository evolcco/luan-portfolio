import Link from "next/link";
import styles from "./Topbar.module.css";

export function Topbar() {
  return (
    <header className={styles.topbar}>
      <Link href="/" className={`${styles.home} link`} aria-label="Luan Andrade, início">
        Luan Andrade
      </Link>
      <span aria-hidden className={styles.role}>
        Diretor de Arte
      </span>
      <nav className={styles.nav} aria-label="Navegação principal">
        <Link href="/trabalho" className="link">Trabalho</Link>
        <Link href="/diario" className="link">Diário</Link>
        <Link href="/sobre" className="link">Sobre</Link>
        <Link href="/#contato" className="link">Contato</Link>
      </nav>
    </header>
  );
}
