import Image from "next/image";
import styles from "./Case.module.css";

export function Case() {
  return (
    <section className={styles.case}>
      <div className={styles.img} data-clip>
        <div className={styles.imgPar} data-parallax="0.08">
          <Image
            src="/images/case-arch.jpg"
            alt=""
            fill
            sizes="100vw"
            className={styles.imgEl}
          />
        </div>
        <div className={styles.grade} aria-hidden />
      </div>

      <div className={`cg ${styles.over}`}>
        <div
          className={`mono blend ${styles.tag}`}
          data-reveal
          style={{ "--rvd": "0ms" } as React.CSSProperties}
        >
          Case / Identidade
        </div>
        <h2
          className={`blend ${styles.title}`}
          data-reveal
          style={{ "--rvd": "100ms" } as React.CSSProperties}
        >
          Legível sobre
          <br />
          qualquer imagem.
        </h2>
        <div
          className={`blend ${styles.note}`}
          data-reveal
          style={{ "--rvd": "180ms" } as React.CSSProperties}
        >
          O texto inverte conforme o fundo (mix-blend-mode: difference). Sobre a
          luz vira escuro; sobre a sombra, claro. Nunca ilegível.
        </div>
      </div>
    </section>
  );
}
