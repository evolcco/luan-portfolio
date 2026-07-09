import styles from "./Manifesto.module.css";

export function Manifesto() {
  return (
    <section className={`cg ${styles.manifesto}`}>
      <div className={`mono ${styles.k}`}>Manifesto</div>
      <h2 className={styles.h}>
        A estrutura é o argumento. Cada bloco nasce alinhado — o grid não é
        decoração, é o método.
      </h2>
      <p className={styles.p1}>
        Colunas, linhas de base e módulos visíveis: a página mostra como foi
        construída. É o rigor suíço traduzido pra web — clareza como consequência
        do sistema, não enfeite.
      </p>
      <p className={styles.p2}>
        O grid atravessa a página inteira, edge a edge. Texto, imagem e interface
        pousam nas mesmas células. Pressione <kbd>G</kbd> pra ver a armadura.
      </p>
    </section>
  );
}
