import { Intro } from "@/components/sections/Intro";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Manifesto } from "@/components/sections/Manifesto";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main>
      <Intro />
      <SelectedWork />
      <Manifesto />
      <Contact />
    </main>
  );
}
