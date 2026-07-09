import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Case } from "@/components/sections/Case";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <Manifesto />
      <SelectedWork />
      <Case />
      <Contact />
    </main>
  );
}
