import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { Figure, Duo, Quote } from "@/components/mdx/components";
import styles from "./article.module.css";

/* one loud pull-statement, wider than the reading measure */
function Pull({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <section className={`cg ${styles.pullRow}`}>
      <blockquote className={styles.pull} data-reveal>
        {children}
        {cite ? <cite className={`mono ${styles.pullCite}`}>{cite}</cite> : null}
      </blockquote>
    </section>
  );
}

/* quiet inset aside — a craft note in the reading rhythm */
function Note({ label, children }: { label?: string; children: ReactNode }) {
  return (
    <section className={`cg ${styles.noteRow}`}>
      <aside className={styles.note} data-reveal>
        {label ? <span className={`mono ${styles.noteK}`}>{label}</span> : null}
        <div className={styles.noteBody}>{children}</div>
      </aside>
    </section>
  );
}

/** MDX map for article bodies: prose locked to a measured column, block components wide. */
export const articleComponents: MDXComponents = {
  Pull,
  Note,
  Figure,
  Duo,
  Quote,
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <div className={styles.measure}>
      <p className={styles.p} {...props} />
    </div>
  ),
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <div className={styles.measure}>
      <h2 className={styles.h2} {...props} />
    </div>
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <div className={styles.measure}>
      <h3 className={styles.h3} {...props} />
    </div>
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <div className={styles.measure}>
      <ul className={styles.ul} {...props} />
    </div>
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <div className={styles.measure}>
      <ol className={styles.ol} {...props} />
    </div>
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li className={styles.li} {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <div className={styles.measure}>
      <blockquote className={styles.blockquote} {...props} />
    </div>
  ),
  hr: () => (
    <div className={styles.measure}>
      <hr className={styles.hr} />
    </div>
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => <a className="link" {...props} />,
};
