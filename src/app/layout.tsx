import type { Metadata } from "next";
import "./globals.css";
import { display, mono } from "./fonts";
import { GridProvider } from "@/components/grid/GridProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { Parallax } from "@/components/motion/Parallax";
import { Topbar } from "@/components/chrome/Topbar";

export const metadata: Metadata = {
  metadataBase: new URL("https://luanandrade.me"),
  title: "Luan Andrade — Diretor de Arte & Brand Specialist",
  description:
    "Direção de arte, marca e sistemas visuais. Dez anos transformando marcas com clareza e método.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Luan Andrade",
    title: "Luan Andrade — Diretor de Arte & Brand Specialist",
    description: "Direção de arte, marca e sistemas visuais.",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${mono.variable}`}>
      <body>
        <div className="grid-bg" aria-hidden />
        <div className="grid-veil" aria-hidden />
        <RevealObserver />
        <Parallax />
        <Topbar />
        <GridProvider>
          <SmoothScroll>
            <div className="content">{children}</div>
          </SmoothScroll>
        </GridProvider>
      </body>
    </html>
  );
}
