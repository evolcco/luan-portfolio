import { DiarioTheme } from "@/components/chrome/DiarioTheme";

export default function ArtigoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DiarioTheme>{children}</DiarioTheme>;
}
