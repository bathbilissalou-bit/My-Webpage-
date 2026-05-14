import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Shop } from "@/components/Shop";
import { Lookbook } from "@/components/Lookbook";
import { Process } from "@/components/Process";
import { HowItWorks } from "@/components/HowItWorks";
import { WhyCustom } from "@/components/WhyCustom";
import { SurMesureFlow } from "@/components/SurMesureFlow";
import { Measurements } from "@/components/Measurements";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { OnboardingWelcome } from "@/components/OnboardingWelcome";

export default function Home() {
  return (
    <>
      <OnboardingWelcome />
      <Navbar />
      <Hero />
      <About />
      <Shop />
      <Lookbook />
      <Process />
      <HowItWorks />
      <WhyCustom />
      <SurMesureFlow />
      <Measurements />
      <Contact />
      <Footer />
    </>
  );
}
