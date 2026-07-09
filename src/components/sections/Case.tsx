import styles from "./Case.module.css";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";

export function Case() {
  return (
    <section className={styles.case}>
      <PlaceholderImage variant="split" className={styles.img} />
      <div className={`cg ${styles.over}`}>
        <div className={`mono blend ${styles.tag}`}>Case / Identidade</div>
        <h2 className={`blend ${styles.title}`}>
          Legível sobre
          <br />
          qualquer imagem.
        </h2>
        <div className={`mono blend ${styles.note}`}>
          O texto usa mix-blend-mode: difference — inverte conforme o fundo. Sobre
          a metade clara vira escuro; sobre a escura, claro. Nunca ilegível.
        </div>
      </div>
    </section>
  );
}
