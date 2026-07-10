import Link from "next/link";
import type { Metadata } from "next";
import { getAllArticles, formatDate } from "@/lib/articles";
import styles from "@/app/trabalho/work.module.css";

export const metadata: Metadata = {
  title: "Diário — Luan Andrade",
  description: "Ensaios sobre design, sistema e clareza.",
};

export default function DiarioIndex() {
  const articles = getAllArticles();

  return (
    <main className={`cg ${styles.work}`}>
      <Link href="/" className={`mono ${styles.back}`}>
        ← Home
      </Link>
      <div className={`mono ${styles.k}`}>Diário / Ensaios</div>
      <h1 className={styles.h}>
        {articles.length} ensaio{articles.length === 1 ? "" : "s"}.
      </h1>

      <ol className={styles.list}>
        {articles.map((a, i) => (
          <li key={a.slug}>
            <Link href={`/artigo/${a.slug}`} className={styles.row}>
              <span className={`mono ${styles.idx}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={styles.name}>{a.title}</span>
              <span className={`mono ${styles.cat}`}>{a.topic}</span>
              <span className={`mono ${styles.year}`}>{formatDate(a.date)}</span>
            </Link>
          </li>
        ))}
      </ol>
    </main>
  );
}
