import styles from "./Manifesto.module.css";

export function Manifesto() {
  return (
    <section className={`cg ${styles.manifesto}`}>
      <div className={`mono ${styles.k}`} data-reveal style={{ "--rvd": "0ms" } as React.CSSProperties}>
        Sobre
      </div>

      {/* signature reveal — lines rise from behind a clip */}
      <h2 className={`reveal-lines ${styles.h}`}>
        <span className="ln" style={{ "--rvd": "0ms" } as React.CSSProperties}>
          <span>Há dez anos dou forma</span>
        </span>
        <span className="ln" style={{ "--rvd": "90ms" } as React.CSSProperties}>
          <span>a marcas — com direção de</span>
        </span>
        <span className="ln" style={{ "--rvd": "180ms" } as React.CSSProperties}>
          <span>arte, sistema e clareza.</span>
        </span>
      </h2>

      <p className={styles.p1} data-reveal style={{ "--rvd": "140ms" } as React.CSSProperties}>
        Comecei cedo, movido por curiosidade e pelo desejo de dominar tanto a
        ferramenta quanto a estratégia. Marca, campanha, produto: o método é o
        mesmo — estrutura a serviço da mensagem.
      </p>
      <p className={styles.p2} data-reveal style={{ "--rvd": "220ms" } as React.CSSProperties}>
        Trabalho no ponto onde estética e resultado se encontram. Menos ruído,
        mais decisão.
      </p>
    </section>
  );
}
