import styles from "./Case.module.css";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";

export function Case() {
  return (
    <section className={styles.case}>
      <PlaceholderImage variant="split" className={styles.img} />
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
          className={`mono blend ${styles.note}`}
          data-reveal
          style={{ "--rvd": "180ms" } as React.CSSProperties}
        >
          O texto usa mix-blend-mode: difference — inverte conforme o fundo. Sobre
          a metade clara vira escuro; sobre a escura, claro. Nunca ilegível.
        </div>
      </div>
    </section>
  );
}
