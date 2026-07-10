import type { ComponentPropsWithoutRef, ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { PlaceholderImage } from "@/components/media/PlaceholderImage";
import { BrandMark, UISkeleton } from "./assets";
import styles from "./mdx.module.css";

/**
 * Real, reusable case-study components. Every media block shares one `MediaFrame`:
 * a grayscale-graded image that clip-reveals on scroll (`data-clip`) and drifts
 * with a subtle parallax (`data-parallax`) — the same motion language as the home
 * grid. It also renders wireframe UI skeletons (device screens) and falls back to a
 * self-contained placeholder when no `src`.
 */

/* ---- shared media frame (exported — Figure / Duo / DeviceFrame / KV / Gallery build on it) ---- */
export function MediaFrame({
  src,
  alt = "",
  ratio = "16 / 9",
  sizes = "100vw",
  placeholder = "radial",
  parallax = "0.06",
  skeleton,
  fill = false,
  priority = false,
  className,
}: {
  src?: string;
  alt?: string;
  ratio?: string;
  sizes?: string;
  placeholder?: "radial" | "split";
  parallax?: string;
  skeleton?: string;
  fill?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={`${styles.media} ${className ?? ""}`}
      data-clip
      style={fill ? undefined : { aspectRatio: ratio }}
    >
      {skeleton ? (
        <div className={styles.skeletonWrap}>
          <UISkeleton variant={skeleton} />
        </div>
      ) : (
        <div className={styles.mediaPar} data-parallax={parallax}>
          {src ? (
            <Image
              src={src}
              alt={alt}
              fill
              sizes={sizes}
              priority={priority}
              className={styles.mediaImg}
            />
          ) : (
            <PlaceholderImage variant={placeholder} className={styles.mediaCanvas} />
          )}
        </div>
      )}
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
function Lead({ children }: { children: ReactNode }) {
  return (
    <section className={`cg ${styles.leadRow}`}>
      <div className={styles.lead} data-reveal>
        {children}
      </div>
    </section>
  );
}

/* ---- figure: one image at full / wide / inset width (exported for the article map) ---- */
export function Figure({
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
        <MediaFrame src={src} alt={alt} ratio={ratio} sizes={sizes} placeholder={placeholder} />
        {caption ? (
          <figcaption className={`mono ${styles.caption}`} data-reveal>
            {caption}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}

/* ---- duo: two images side by side (flat string props — MDX-safe; exported) ---- */
export function Duo({
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
          <MediaFrame
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

/* ---- quote: pulled statement (children auto-wrap in <p> via MDX; exported) ---- */
export function Quote({ children, cite }: { children: ReactNode; cite?: string }) {
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

/* ═══════════════════ UX/UI: device frames, flow, spec sheet ═══════════════════ */

/* pure-CSS B&W device chrome around the shared screen mechanic */
function Bezel({
  kind,
  url,
  src,
  skeleton,
  alt = "",
}: {
  kind: "browser" | "phone";
  url?: string;
  src?: string;
  skeleton?: string;
  alt?: string;
}) {
  const isPhone = kind === "phone";
  const ratio = isPhone ? "9 / 19.5" : "16 / 10";
  const screen = (
    <div className={styles.screen}>
      <MediaFrame
        src={src}
        skeleton={skeleton}
        alt={alt}
        ratio={ratio}
        parallax="0.04"
        sizes={isPhone ? "(max-width: 639px) 100vw, 30vw" : "(max-width: 639px) 100vw, 83vw"}
      />
    </div>
  );
  if (isPhone) {
    return (
      <div className={styles.phone} data-reveal>
        <span className={styles.notch} aria-hidden />
        {screen}
      </div>
    );
  }
  return (
    <div className={styles.browser} data-reveal>
      <div className={styles.chrome} aria-hidden>
        <span className={styles.dot} />
        <span className={styles.dot} />
        <span className={styles.dot} />
        {url ? <span className={styles.urlPill}>{url}</span> : null}
      </div>
      {screen}
    </div>
  );
}

function DeviceFrame({
  kind = "browser",
  src,
  skeleton,
  alt = "",
  caption,
  url,
  align,
}: {
  kind?: "browser" | "phone";
  src?: string;
  skeleton?: string;
  alt?: string;
  caption?: string;
  url?: string;
  align?: "wide" | "center";
}) {
  const finalAlign = align ?? (kind === "phone" ? "center" : "wide");
  return (
    <figure className={`cg ${styles.deviceFig}`}>
      <div className={`${styles.frameWrap} ${finalAlign === "center" ? styles.devCenter : styles.devWide}`}>
        <Bezel kind={kind} url={url} src={src} skeleton={skeleton} alt={alt} />
        {caption ? (
          <figcaption className={`mono ${styles.caption}`} data-reveal>
            {caption}
          </figcaption>
        ) : null}
      </div>
    </figure>
  );
}

/* a row of 2–3 device frames (flat string props, MDX-safe) */
function ScreenSet({
  kind = "phone",
  stagger = false,
  url,
  aSkel,
  aSrc,
  aAlt = "",
  aCaption,
  bSkel,
  bSrc,
  bAlt = "",
  bCaption,
  cSkel,
  cSrc,
  cAlt = "",
  cCaption,
}: {
  kind?: "browser" | "phone";
  stagger?: boolean;
  url?: string;
  aSkel?: string;
  aSrc?: string;
  aAlt?: string;
  aCaption?: string;
  bSkel?: string;
  bSrc?: string;
  bAlt?: string;
  bCaption?: string;
  cSkel?: string;
  cSrc?: string;
  cAlt?: string;
  cCaption?: string;
}) {
  const cells = [
    { skel: aSkel, src: aSrc, alt: aAlt, caption: aCaption },
    { skel: bSkel, src: bSrc, alt: bAlt, caption: bCaption },
    { skel: cSkel, src: cSrc, alt: cAlt, caption: cCaption },
  ].filter((c) => c.skel || c.src || c.caption);
  return (
    <div
      className={`cg ${styles.screenSet} ${stagger ? styles.screenStagger : ""}`}
      data-count={cells.length}
    >
      {cells.map((c, i) => (
        <div
          key={i}
          className={styles.setCell}
          style={{ "--rvd": `${i * 120}ms` } as React.CSSProperties}
        >
          <Bezel kind={kind} url={url} src={c.src} skeleton={c.skel} alt={c.alt} />
          {c.caption ? (
            <figcaption className={`mono ${styles.caption}`} data-reveal>
              {c.caption}
            </figcaption>
          ) : null}
        </div>
      ))}
    </div>
  );
}

/* numbered user-flow band */
function Flow({ children }: { children: ReactNode }) {
  return (
    <section className={`cg ${styles.flow}`}>
      <div className={styles.steps}>{children}</div>
    </section>
  );
}
function Step({
  n,
  title,
  children,
  ...rest
}: {
  n: string;
  title: string;
  children: ReactNode;
} & { style?: React.CSSProperties }) {
  return (
    <div className={styles.step} data-reveal {...rest}>
      <span className={`mono ${styles.stepN}`}>{n}</span>
      <span className={styles.stepTitle}>{title}</span>
      <span className={styles.stepDesc}>{children}</span>
    </div>
  );
}

/* Swiss spec ledger — the component-system moment, stated typographically */
function SpecSheet({ children }: { children: ReactNode }) {
  return <section className={`cg ${styles.specSheet}`}>{children}</section>;
}
function SpecRow({ label, value, ...rest }: { label: string; value: string } & { style?: React.CSSProperties }) {
  return (
    <div className={styles.specRow} data-reveal {...rest}>
      <span className={`mono ${styles.specLabel}`}>{label}</span>
      <span className={`mono ${styles.specValue}`}>{value}</span>
    </div>
  );
}

/* ═══════════════════ Branding: marks, swatches, specimen ═══════════════════ */

function Marks({ children }: { children: ReactNode }) {
  return (
    <section className={`cg ${styles.marks}`}>
      <div className={styles.marksGrid}>{children}</div>
    </section>
  );
}
function Mark({
  variant = "path",
  label,
  reversed = false,
  wordmark = false,
}: {
  variant?: string;
  label: string;
  reversed?: boolean;
  wordmark?: boolean;
}) {
  return (
    <figure className={styles.mark} data-reveal>
      <div
        className={`${styles.markField} ${reversed ? styles.markInk : styles.markPaper}`}
        data-clip
      >
        <BrandMark variant={variant as never} wordmark={wordmark} />
      </div>
      <figcaption className={`mono ${styles.markLabel}`}>{label}</figcaption>
    </figure>
  );
}

function Swatches({ children }: { children: ReactNode }) {
  return <section className={`cg ${styles.swatches}`}>{children}</section>;
}
function Swatch({
  name,
  value,
  note,
  tone,
  border = false,
  ...rest
}: {
  name: string;
  value: string;
  note?: string;
  tone: string;
  border?: boolean;
} & { style?: React.CSSProperties }) {
  return (
    <div className={styles.swatch} data-reveal {...rest}>
      <div
        className={`${styles.chip} ${border ? styles.chipBorder : ""}`}
        style={{ background: tone }}
        data-clip
      />
      <div className={styles.swatchName}>{name}</div>
      <div className={`mono ${styles.swatchVal}`}>{value}</div>
      {note ? <div className={styles.swatchNote}>{note}</div> : null}
    </div>
  );
}

/* Scale VF weight waterfall — self-labeled type specimen */
function Specimen({ big, sample, note }: { big: string; sample: string; note?: string }) {
  const weights = [300, 440, 600, 760];
  return (
    <section className={`cg ${styles.specimen}`}>
      <div className={`mono ${styles.specimenK}`} data-reveal>
        <span>Tipografia</span>
        <span>Scale Variable</span>
      </div>
      <div className={styles.specimenBody}>
        <div
          className={styles.specimenBig}
          data-reveal
          style={{ fontVariationSettings: '"wght" 600, "wdth" 100' }}
        >
          {big}
        </div>
        <div className={styles.waterfall}>
          {weights.map((w, i) => (
            <div
              key={w}
              className={styles.wfRow}
              data-reveal
              style={{ "--rvd": `${i * 70}ms` } as React.CSSProperties}
            >
              <span className={`mono ${styles.wfTag}`}>{w}</span>
              <span
                className={styles.wfSample}
                style={{ fontVariationSettings: `"wght" ${w}, "wdth" 100` }}
              >
                {sample}
              </span>
            </div>
          ))}
        </div>
        {note ? (
          <p className={styles.specimenNote} data-reveal>
            {note}
          </p>
        ) : null}
      </div>
    </section>
  );
}

/* ═══════════════════ Key visual: hero KV + gallery ═══════════════════ */

function KV({
  src,
  alt = "",
  ratio = "21 / 9",
  label,
  caption,
  parallax = "0.06",
  priority = false,
}: {
  src?: string;
  alt?: string;
  ratio?: string;
  label?: string;
  caption?: string;
  parallax?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`cg ${styles.kv}`}>
      <div className={styles.kvWrap}>
        <MediaFrame src={src} alt={alt} ratio={ratio} parallax={parallax} sizes="100vw" priority={priority} />
        {label ? (
          <span
            className={`mono blend ${styles.kvLabel}`}
            data-reveal
            style={{ "--rvd": "120ms" } as React.CSSProperties}
          >
            {label}
          </span>
        ) : null}
      </div>
      {caption ? (
        <figcaption
          className={`mono ${styles.caption} ${styles.kvCaption}`}
          data-reveal
          style={{ "--rvd": "200ms" } as React.CSSProperties}
        >
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Gallery({ children }: { children: ReactNode }) {
  return <div className={styles.gallery}>{children}</div>;
}
function GalleryItem({
  src,
  alt = "",
  caption,
  format,
  cols = 5,
  rows = 4,
  parallax = "0.03",
}: {
  src?: string;
  alt?: string;
  caption?: string;
  format?: string;
  cols?: number;
  rows?: number;
  parallax?: string;
}) {
  return (
    <figure
      className={styles.galleryItem}
      style={{ "--c": cols, "--r": rows } as React.CSSProperties}
    >
      <MediaFrame src={src} alt={alt} fill parallax={parallax} sizes="(max-width: 639px) 100vw, 50vw" />
      {format || caption ? (
        <figcaption className={styles.itemCap} data-reveal>
          {format ? <span className={`mono ${styles.itemFmt}`}>{format}</span> : null}
          {caption ? <span className={`mono ${styles.itemNote}`}>{caption}</span> : null}
        </figcaption>
      ) : null}
    </figure>
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
  DeviceFrame,
  ScreenSet,
  Flow,
  Step,
  SpecSheet,
  SpecRow,
  Marks,
  Mark,
  Swatches,
  Swatch,
  Specimen,
  KV,
  Gallery,
  GalleryItem,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2 className={styles.h2} {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p className={styles.p} {...props} />
  ),
};
