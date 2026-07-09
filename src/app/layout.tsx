import type { Metadata } from "next";
import "./globals.css";
import { GridProvider } from "@/components/grid/GridProvider";
import { Topbar } from "@/components/chrome/Topbar";

export const metadata: Metadata = {
  title: "Luan Andrade — Diretor de Arte & Brand Specialist",
  description:
    "Portfólio de Luan Andrade — direção de arte, marca e sistemas visuais. Um sistema, à mostra.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="grid-bg" aria-hidden />
        <Topbar />
        <GridProvider>
          <div className="content">{children}</div>
        </GridProvider>
      </body>
    </html>
  );
}
