import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Shop } from "@/components/Shop";
import { Lookbook } from "@/components/Lookbook";
import { Process } from "@/components/Process";
import { WhyCustom } from "@/components/WhyCustom";
import { SurMesureFlow } from "@/components/SurMesureFlow";
import { Measurements } from "@/components/Measurements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Shop />
      <Lookbook />
      <Process />
      <WhyCustom />
      <SurMesureFlow />
      <Measurements />
      <Contact />
      <Footer />
    </>
  );
}
