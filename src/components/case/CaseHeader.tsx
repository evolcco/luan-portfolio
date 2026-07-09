import Link from "next/link";
import { Display } from "@/components/type/Display";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";
import type { CaseMeta } from "@/lib/cases";
import styles from "./CaseHeader.module.css";

export function CaseHeader({ meta }: { meta: CaseMeta }) {
  return (
    <header className={`cg ${styles.header}`}>
      <Link href="/trabalho" className={`mono ${styles.back}`}>
        ← Índice
      </Link>
      <div className={`mono ${styles.tag}`}>
        <span>{meta.category}</span>
        <span>{meta.year}</span>
      </div>

      <Display text={meta.title} className={styles.title} />

      <p className={styles.summary}>{meta.summary}</p>

      <dl className={`mono ${styles.meta}`}>
        {meta.client ? (
          <div>
            <dt>Cliente</dt>
            <dd>{meta.client}</dd>
          </div>
        ) : null}
        {meta.role ? (
          <div>
            <dt>Atuação</dt>
            <dd>{meta.role}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.cover}>
        <PlaceholderImage variant={meta.cover ?? "radial"} className={styles.coverCanvas} />
      </div>
    </header>
  );
}
