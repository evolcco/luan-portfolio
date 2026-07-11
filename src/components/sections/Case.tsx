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
          Método / 01 a 03
        </div>
        <h2
          className={`blend ${styles.title}`}
          data-reveal
          style={{ "--rvd": "100ms" } as React.CSSProperties}
        >
          Estrutura antes
          <br />
          do gesto.
        </h2>
        <div
          className={`blend ${styles.note}`}
          data-reveal
          style={{ "--rvd": "180ms" } as React.CSSProperties}
        >
          <p>
            Cada projeto começa reduzindo ruído. O sistema vem antes da forma,
            para que cada escolha tenha função, continuidade e consequência.
          </p>
          <ol className={styles.steps} aria-label="Etapas do método">
            <li><span>01</span>Diagnóstico</li>
            <li><span>02</span>Sistema</li>
            <li><span>03</span>Expressão</li>
          </ol>
        </div>
      </div>
    </section>
  );
}
