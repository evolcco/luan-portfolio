import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <main className={`cg ${styles.nf}`}>
      <div className={`mono ${styles.k}`}>Erro 404</div>
      <h1 className={styles.h}>Página não encontrada.</h1>
      <p className={styles.p}>
        O endereço não existe ou foi movido. A estrutura continua — só essa página
        saiu do grid.
      </p>
      <Link href="/" className={`mono link ${styles.home}`}>
        ← Voltar pra home
      </Link>
    </main>
  );
}
