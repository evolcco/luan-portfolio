import Link from "next/link";
import Image from "next/image";
import { Display } from "@/components/type/Display";
import type { ArticleMeta } from "@/lib/articles";
import styles from "@/components/case/NextCase.module.css";

/** Closes an essay with a teaser to the next one — mirrors NextCase so essays loop. */
export function MoreReading({ meta }: { meta: ArticleMeta }) {
  return (
    <Link href={`/artigo/${meta.slug}`} className={`cg ${styles.next}`}>
      <span
        className={`mono ${styles.k}`}
        data-reveal
        style={{ "--rvd": "0ms" } as React.CSSProperties}
      >
        Próximo ensaio
      </span>

      <div className={styles.media} data-clip>
        <div className={styles.mediaPar} data-parallax="0.05">
          {meta.cover ? (
            <Image src={meta.cover} alt="" fill sizes="100vw" className={styles.mediaImg} />
          ) : null}
        </div>
      </div>

      <Display
        text={meta.title}
        weight={600}
        tracking={-0.025}
        fill={0.6}
        className={styles.title}
      />

      <span
        className={`mono ${styles.view}`}
        data-reveal
        style={{ "--rvd": "120ms" } as React.CSSProperties}
      >
        Ler ensaio ↗
      </span>
    </Link>
  );
}
