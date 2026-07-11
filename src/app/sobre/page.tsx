import type { Metadata } from "next";
import Link from "next/link";
import { Display } from "@/components/type/Display";
import styles from "./sobre.module.css";

export const metadata: Metadata = {
  title: "Sobre, Luan Andrade",
  description:
    "Diretor de arte e especialista em marcas. Dez anos de identidade, campanha, produto e UI, com densidade em saúde.",
};

const CAPABILITIES = [
  "Direção de Arte",
  "Identidade Visual",
  "Campanha",
  "UI/UX",
  "Motion",
  "Estratégia de Marca",
];

const CLIENTS = [
  "Danone", "Amgen", "Roche", "Teva", "Boehringer", "IQVIA",
  "Aché", "Zambon", "Ipsen", "BLS", "Wella", "Sample Doc",
];

export default function Sobre() {
  return (
    <main>
      <section className={`cg ${styles.intro}`}>
        <Link href="/" className={`mono link ${styles.back}`}>← Home</Link>
        <div className={`mono ${styles.k}`} data-reveal style={{ "--rvd": "0ms" } as React.CSSProperties}>
          Sobre
        </div>
        <Display text="Luan Andrade" weight={600} tracking={-0.025} fill={0.72} className={styles.title} />
        <p className={styles.lead} data-reveal style={{ "--rvd": "120ms" } as React.CSSProperties}>
          Diretor de arte e especialista em marcas. Dez anos dando clareza, da
          identidade à campanha, do produto à interface.
        </p>
      </section>

      <section className={`cg ${styles.body}`}>
        <p className={styles.p1} data-reveal style={{ "--rvd": "0ms" } as React.CSSProperties}>
          Comecei cedo, movido por curiosidade e pelo desejo de dominar tanto a
          ferramenta quanto a estratégia. Design nunca foi só estética pra mim,
          é a forma de fazer uma ideia ser entendida e escolhida.
        </p>
        <p className={styles.p2} data-reveal style={{ "--rvd": "120ms" } as React.CSSProperties}>
          Tenho densidade em saúde e farma, um setor que exige precisão e
          responsabilidade. Mas o método atravessa qualquer área: estrutura a
          serviço da mensagem, menos ruído, mais decisão.
        </p>

        <div className={`${styles.caps}`}>
          <div className={`mono ${styles.capsK}`}>Capacidades</div>
          <ul className={styles.capsList}>
            {CAPABILITIES.map((c) => (
              <li key={c} data-reveal className={styles.cap}>{c}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className={`cg ${styles.clients}`}>
        <div className={`mono ${styles.clientsK}`} data-reveal>Marcas que confiaram</div>
        <ul className={styles.clientsList}>
          {CLIENTS.map((c) => (
            <li key={c} className={`mono ${styles.client}`}>{c}</li>
          ))}
        </ul>
        <Link href="/#contato" className={`mono link ${styles.cta}`} data-reveal>
          Vamos conversar ↗
        </Link>
      </section>
    </main>
  );
}
