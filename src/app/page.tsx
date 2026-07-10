import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Manifesto } from "@/components/sections/Manifesto";
import { Case } from "@/components/sections/Case";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <SelectedWork />
      <Manifesto />
      <Case />
      <Contact />
    </main>
  );
}
