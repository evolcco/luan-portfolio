import Link from "next/link";
import Image from "next/image";
import { getAllCases } from "@/lib/cases";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  const cases = getAllCases().slice(0, 6);

  return (
    <section className={styles.work}>
      <div className={`cg ${styles.head}`}>
        <div
          className={`mono ${styles.k}`}
          data-reveal
          style={{ "--rvd": "0ms" } as React.CSSProperties}
        >
          Trabalho selecionado
        </div>
        <Link
          href="/trabalho"
          className={`mono link ${styles.all}`}
          data-reveal
          style={{ "--rvd": "80ms" } as React.CSSProperties}
        >
          Ver todos ↗
        </Link>
      </div>

      {cases.map((c, i) => (
        <Link
          key={c.slug}
          href={`/trabalho/${c.slug}`}
          className={`cg ${styles.item} ${i % 2 ? styles.flip : ""}`}
          aria-label={`Ver case ${c.title}`}
        >
          <div className={styles.media} data-clip>
            <div className={styles.mediaPar} data-parallax="0.05">
              {c.cover ? (
                <Image
                  src={c.cover}
                  alt=""
                  fill
                  sizes="(max-width: 639px) 100vw, 45vw"
                  className={styles.mediaImg}
                />
              ) : null}
            </div>
          </div>
          <div className={styles.info}>
            <div
              className={styles.topline}
              data-reveal
              style={{ "--rvd": "120ms" } as React.CSSProperties}
            >
              <span className={`mono ${styles.cat}`}>
                {c.category} · {c.year}
              </span>
              <span className={`mono ${styles.idx}`} aria-hidden>
                / {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className={`reveal-lines ${styles.title}`}>
              <span className="ln" style={{ "--rvd": "180ms" } as React.CSSProperties}>
                <span>{c.title}</span>
              </span>
            </h3>
            <p
              className={styles.summary}
              data-reveal
              style={{ "--rvd": "260ms" } as React.CSSProperties}
            >
              {c.summary}
            </p>
            <span
              className={`mono ${styles.view}`}
              data-reveal
              style={{ "--rvd": "340ms" } as React.CSSProperties}
            >
              Ver case ↗
            </span>
          </div>
        </Link>
      ))}
    </section>
  );
}
