import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";
import styles from "./mdx.module.css";

function Chapter({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className={`cg ${styles.chapter}`}>
      <div className={`mono ${styles.chapterK}`}>
        <span>{n}</span>
        <span>{title}</span>
      </div>
      <div className={styles.chapterBody}>{children}</div>
    </section>
  );
}

function Figure({
  variant = "radial",
  caption,
}: {
  variant?: "radial" | "split";
  caption?: string;
}) {
  return (
    <figure className={`cg ${styles.figure}`}>
      <div className={styles.figureMedia}>
        <PlaceholderImage variant={variant} className={styles.figureCanvas} />
      </div>
      {caption ? (
        <figcaption className={`mono ${styles.caption}`}>{caption}</figcaption>
      ) : null}
    </figure>
  );
}

function Metrics({ children }: { children: ReactNode }) {
  return <div className={`cg ${styles.metrics}`}>{children}</div>;
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.metric}>
      <b>{value}</b>
      <span className="mono">{label}</span>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  Chapter,
  Figure,
  Metrics,
  Metric,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={styles.h2} {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className={styles.p} {...props} />
  ),
};
