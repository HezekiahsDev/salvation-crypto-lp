import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { PainSection } from "@/components/PainSection";
import { JourneySection } from "@/components/JourneySection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { ProofMarquee } from "@/components/ProofMarquee";
import { FounderSection } from "@/components/FounderSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";
import { MouseFollowGlow } from "@/components/MouseFollowGlow";
import { CinematicBackground } from "@/components/CinematicBackground";

export default function Home() {
  return (
    <>
      <CinematicBackground />
      <MouseFollowGlow />
      <Navigation />
      <main>
        <HeroSection />
        <PainSection />
        <JourneySection />
        <HowItWorksSection />
        <PricingSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ProofMarquee />
        <FounderSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
