import { Showcase } from "@/components/sections/Showcase";
import { Hero } from "@/components/sections/Hero";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Manifesto } from "@/components/sections/Manifesto";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Showcase />
      <Hero />
      <SelectedWork />
      <Manifesto />
      <Contact />
    </main>
  );
}
