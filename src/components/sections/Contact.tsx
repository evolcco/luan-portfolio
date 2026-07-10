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
          tracking={-0.02}
          fill={0.66}
          condense={70}
          animateWeight
          className={styles.headline}
        />

        <a
          href="mailto:contato@luanandrade.me"
          className={`${styles.mail} link`}
          aria-label="Enviar e-mail para contato@luanandrade.me"
        >
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
          <div className={`mono ${styles.base}`}>
            <span>São Paulo · Brasil</span>
            <span>Remoto / Presencial</span>
          </div>
          <div className={`mono ${styles.copy}`}>© 2026 — Luan Andrade</div>
        </div>
      </div>
    </section>
  );
}
