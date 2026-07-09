import Link from "next/link";
import { Display } from "@/components/type/Display";
import styles from "./Contact.module.css";

export function Contact() {
  return (
    <section className={styles.contact} id="contato">
      <div className={styles.lgrid} aria-hidden />

      <div className={`cg ${styles.over}`}>
        <div
          className={`mono ${styles.k}`}
          data-reveal
          style={{ "--rvd": "0ms" } as React.CSSProperties}
        >
          Contato — vamos conversar
        </div>

        <Display
          text="Vamos conversar."
          weight={600}
          tracking={-0.025}
          className={styles.headline}
        />

        <a href="mailto:contato@luanandrade.me" className={`${styles.mail} link`}>
          contato@luanandrade.me
        </a>

        <p
          className={styles.lead}
          data-reveal
          style={{ "--rvd": "120ms" } as React.CSSProperties}
        >
          Disponível para novos projetos em 2026. Marca, campanha, produto — vamos
          dar clareza ao próximo.
        </p>

        <div className={styles.foot}>
          <div className={`mono ${styles.links}`}>
            <Link href="/trabalho" className="link">Trabalho</Link>
            <Link href="/sobre" className="link">Sobre</Link>
          </div>
          <div className={`mono ${styles.social}`}>
            <a href="#" className="link">LinkedIn ↗</a>
            <a href="#" className="link">Instagram ↗</a>
            <a href="#" className="link">Behance ↗</a>
          </div>
          <div className={`mono ${styles.copy}`}>© 2026 — Luan Andrade</div>
        </div>
      </div>
    </section>
  );
}
