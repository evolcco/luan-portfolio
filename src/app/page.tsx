import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Case } from "@/components/sections/Case";
import { TetrisFooter } from "@/components/sections/TetrisFooter";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <Case />
      <TetrisFooter />
    </main>
  );
}
