import { DiarioTheme } from "@/components/chrome/DiarioTheme";

export default function DiarioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DiarioTheme>{children}</DiarioTheme>;
}
