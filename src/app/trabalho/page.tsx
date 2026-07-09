import Link from "next/link";
import type { Metadata } from "next";
import { getAllCases } from "@/lib/cases";
import styles from "./work.module.css";

export const metadata: Metadata = {
  title: "Trabalho — Luan Andrade",
  description: "Índice de projetos: marca, campanha, UI/UX e identidade.",
};

export default function WorkIndex() {
  const cases = getAllCases();

  return (
    <main className={`cg ${styles.work}`}>
      <Link href="/" className={`mono ${styles.back}`}>
        ← Home
      </Link>
      <div className={`mono ${styles.k}`}>Trabalho / Índice</div>
      <h1 className={styles.h}>
        {cases.length} projeto{cases.length === 1 ? "" : "s"} selecionado
        {cases.length === 1 ? "" : "s"}.
      </h1>

      <ol className={styles.list}>
        {cases.map((c, i) => (
          <li key={c.slug}>
            <Link href={`/trabalho/${c.slug}`} className={styles.row}>
              <span className={`mono ${styles.idx}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.name}>{c.title}</span>
              <span className={`mono ${styles.cat}`}>{c.category}</span>
              <span className={`mono ${styles.year}`}>{c.year}</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
