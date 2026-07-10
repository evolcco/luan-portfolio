import Link from "next/link";
import Image from "next/image";
import { Display } from "@/components/type/Display";
import type { CaseMeta } from "@/lib/cases";
import styles from "./NextCase.module.css";

/** Closes a case study with a large teaser to the next one — keeps the loop moving. */
export function NextCase({ meta }: { meta: CaseMeta }) {
  return (
    <Link href={`/trabalho/${meta.slug}`} className={`cg ${styles.next}`}>
      <span
        className={`mono ${styles.k}`}
        data-reveal
        style={{ "--rvd": "0ms" } as React.CSSProperties}
      >
        Próximo case
      </span>

      <div className={styles.media} data-clip>
        <div className={styles.mediaPar} data-parallax="0.05">
          {meta.cover ? (
            <Image
              src={meta.cover}
              alt=""
              fill
              sizes="100vw"
              className={styles.mediaImg}
            />
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
        Ver case ↗
      </span>
    </Link>
  );
}
