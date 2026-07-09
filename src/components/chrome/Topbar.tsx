import styles from "./Topbar.module.css";

export function Topbar() {
  return (
    <header className={styles.topbar} aria-hidden>
      <span>Luan Andrade</span>
      <span>Direção de Arte — Sistema</span>
    </header>
  );
}
