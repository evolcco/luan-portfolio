import Link from "next/link";
import styles from "./Topbar.module.css";

export function Topbar() {
  return (
    <header className={styles.topbar}>
      <Link href="/" className={`${styles.home} link`}>
        Luan Andrade
      </Link>
      <span aria-hidden className={styles.role}>
        Direção de Arte — Sistema
      </span>
    </header>
  );
}
