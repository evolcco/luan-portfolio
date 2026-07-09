import { Archivo, Geist_Mono } from "next/font/google";

/**
 * Display grotesk. Archivo — a confident neo-grotesque with more fingerprint than
 * the system Helvetica stack, self-hosted by next/font (zero CLS). Swap here to
 * change the whole voice; the Display component re-fits on document.fonts.ready.
 */
export const display = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display-face",
  display: "swap",
  preload: true,
  fallback: ["Helvetica Neue", "Arial", "sans-serif"],
});

export const mono = Geist_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
