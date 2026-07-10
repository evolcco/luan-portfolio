import type { Metadata } from "next";
import "./globals.css";
import { display, mono } from "./fonts";
import { GridProvider } from "@/components/grid/GridProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { RevealObserver } from "@/components/motion/RevealObserver";
import { Parallax } from "@/components/motion/Parallax";
import { Topbar } from "@/components/chrome/Topbar";
import { SiteFooter } from "@/components/chrome/SiteFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://luanandrade.me"),
  title: "Luan Andrade — Diretor de Arte & Brand Specialist",
  description:
    "Direção de arte, marca, campanha e produto. Dez anos transformando complexidade em direção clara.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Luan Andrade",
    title: "Luan Andrade — Diretor de Arte & Brand Specialist",
    description: "Dez anos transformando complexidade em direção clara.",
    images: [
      {
        url: "/og.png",
        width: 1730,
        height: 909,
        alt: "Luan Andrade — Diretor de Arte & Brand Specialist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Luan Andrade — Diretor de Arte & Brand Specialist",
    description: "Marca · Campanha · Produto",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${mono.variable}`}>
      <body>
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        <div className="grid-bg" aria-hidden />
        <div className="grid-veil" aria-hidden />
        <RevealObserver />
        <Parallax />
        <Topbar />
        <GridProvider>
          <SmoothScroll>
            <div className="content" id="conteudo">
              {children}
              <SiteFooter />
            </div>
          </SmoothScroll>
        </GridProvider>
      </body>
    </html>
  );
}
