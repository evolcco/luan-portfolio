import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";
import styles from "./mdx.module.css";

/**
 * Real, reusable case-study components. Every media block shares one `Frame`:
 * a grayscale-graded `next/image` that clip-reveals on scroll (`data-clip`) and
 * drifts with a subtle parallax (`data-parallax`) — the same motion language as
 * the home grid. Pass no `src` and it falls back to the self-contained placeholder.
 */

/* ---- shared media frame (not exported — used by Figure / Duo) ---- */
function Frame({
  src,
  alt = "",
  ratio = "16 / 9",
  sizes = "100vw",
  placeholder = "radial",
  parallax = "0.06",
}: {
  src?: string;
  alt?: string;
  ratio?: string;
  sizes?: string;
  placeholder?: "radial" | "split";
  parallax?: string;
}) {
  return (
    <div className={styles.media} data-clip style={{ aspectRatio: ratio }}>
      <div className={styles.mediaPar} data-parallax={parallax}>
        {src ? (
          <Image src={src} alt={alt} fill sizes={sizes} className={styles.mediaImg} />
        ) : (
          <PlaceholderImage variant={placeholder} className={styles.mediaCanvas} />
        )}
      </div>
    </div>
  );
}

/* ---- chapter: numbered section, mono kicker held in the margin ---- */
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
      <div className={`mono ${styles.chapterK}`} data-reveal>
        <span>{n}</span>
        <span>{title}</span>
      </div>
      <div className={styles.chapterBody}>{children}</div>
    </section>
  );
}

/* ---- lead: opening statement, a size up from body ---- */
/* a div (not <p>): MDX wraps loose text in its own <p>, so <p> here would nest */
function Lead({ children }: { children: ReactNode }) {
  return (
    <section className={`cg ${styles.leadRow}`}>
      <div className={styles.lead} data-reveal>
        {children}
      </div>
    </section>
  );
}

/* ---- figure: one image at full / wide / inset width ---- */
function Figure({
  src,
  alt = "",
  caption,
  layout = "wide",
  ratio = "16 / 9",
  placeholder = "radial",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  layout?: "full" | "wide" | "inset";
  ratio?: string;
  placeholder?: "radial" | "split";
}) {
  const sizes =
    layout === "inset"
      ? "(max-width: 639px) 100vw, 66vw"
      : layout === "wide"
        ? "(max-width: 639px) 100vw, 83vw"
        : "100vw";
  return (
    <figure className={`cg ${styles.figure}`}>
      <div className={`${styles.frameWrap} ${styles[layout]}`}>
        <Frame src={src} alt={alt} ratio={ratio} sizes={sizes} placeholder={placeholder} />
        {caption ? (
          <figcaption className={`mono ${styles.caption}`} data-reveal>
            {caption}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}

/* ---- duo: two images side by side (flat string props — MDX-safe) ---- */
function Duo({
  aSrc,
  aAlt = "",
  aCaption,
  bSrc,
  bAlt = "",
  bCaption,
  ratio = "4 / 5",
}: {
  aSrc?: string;
  aAlt?: string;
  aCaption?: string;
  bSrc?: string;
  bAlt?: string;
  bCaption?: string;
  ratio?: string;
}) {
  const items = [
    { src: aSrc, alt: aAlt, caption: aCaption, placeholder: "radial" as const },
    { src: bSrc, alt: bAlt, caption: bCaption, placeholder: "split" as const },
  ];
  return (
    <div className={`cg ${styles.duo}`}>
      {items.map((it, i) => (
        <div key={i} className={styles.duoCol}>
          <Frame
            src={it.src}
            alt={it.alt}
            ratio={ratio}
            sizes="(max-width: 639px) 100vw, 41vw"
            placeholder={it.placeholder}
          />
          {it.caption ? (
            <figcaption className={`mono ${styles.caption}`} data-reveal>
              {it.caption}
            </figcaption>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* ---- quote: pulled statement (children auto-wrap in <p> via MDX; style that) ---- */
function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
  return (
    <figure className={`cg ${styles.quoteRow}`}>
      <blockquote className={styles.quote} data-reveal>
        {children}
        {cite ? <cite className={`mono ${styles.cite}`}>{cite}</cite> : null}
      </blockquote>
    </figure>
  );
}

/* ---- metrics band ---- */
function Metrics({ children }: { children: ReactNode }) {
  return <div className={`cg ${styles.metrics}`}>{children}</div>;
}
function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className={styles.metric} data-reveal>
      <b>{value}</b>
      <span className="mono">{label}</span>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  Chapter,
  Lead,
  Figure,
  Duo,
  Quote,
  Metrics,
  Metric,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={styles.h2} {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className={styles.p} {...props} />
  ),
};
