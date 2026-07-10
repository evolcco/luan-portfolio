import Link from "next/link";
import Image from "next/image";
import { Display } from "@/components/type/Display";
import { formatDate, type ArticleMeta } from "@/lib/articles";
import styles from "./ArticleHeader.module.css";

export function ArticleHeader({ meta }: { meta: ArticleMeta }) {
  return (
    <header className={`cg ${styles.header}`}>
      <Link href="/diario" className={`mono link ${styles.back}`}>
        ← Diário
      </Link>
      <div className={`mono ${styles.topic}`}>{meta.topic}</div>

      <Display text={meta.title} weight={600} tracking={-0.025} fill={0.62} className={styles.title} />

      <p
        className={styles.deck}
        data-reveal
        style={{ "--rvd": "120ms" } as React.CSSProperties}
      >
        {meta.deck}
      </p>

      <div
        className={`mono ${styles.byline}`}
        data-reveal
        style={{ "--rvd": "200ms" } as React.CSSProperties}
      >
        <span>{meta.author}</span>
        <span className={styles.mid}>·</span>
        <span>{formatDate(meta.date)}</span>
        {meta.readingTime ? (
          <>
            <span className={styles.mid}>·</span>
            <span>{meta.readingTime}</span>
          </>
        ) : null}
      </div>

      {meta.cover ? (
        <div className={styles.cover} data-clip>
          <div className={styles.coverPar} data-parallax="0.05">
            <Image
              src={meta.cover}
              alt=""
              fill
              sizes="100vw"
              priority
              className={styles.coverImg}
            />
          </div>
        </div>
      ) : null}
    </header>
  );
}
