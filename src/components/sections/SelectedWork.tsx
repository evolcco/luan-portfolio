import Link from "next/link";
import Image from "next/image";
import { getAllCases } from "@/lib/cases";
import styles from "./SelectedWork.module.css";

export function SelectedWork() {
  const cases = getAllCases().slice(0, 3);

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
          <div
            className={styles.info}
            data-reveal
            style={{ "--rvd": "120ms" } as React.CSSProperties}
          >
            <span className={`mono ${styles.cat}`}>
              {c.category} · {c.year}
            </span>
            <h3 className={styles.title}>{c.title}</h3>
            <span className={`mono ${styles.view}`}>Ver case ↗</span>
          </div>
        </Link>
      ))}
    </section>
  );
}
