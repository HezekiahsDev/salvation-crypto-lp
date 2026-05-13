import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";

// Dynamically import heavy sections below the fold
const PainSection = dynamic(() => import("@/components/PainSection").then(mod => mod.PainSection));
const JourneySection = dynamic(() => import("@/components/JourneySection").then(mod => mod.JourneySection));
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection").then(mod => mod.FeaturesSection));
const TestimonialsSection = dynamic(() => import("@/components/TestimonialsSection").then(mod => mod.TestimonialsSection));
const ProofMarquee = dynamic(() => import("@/components/ProofMarquee").then(mod => mod.ProofMarquee));
const FounderSection = dynamic(() => import("@/components/FounderSection").then(mod => mod.FounderSection));
const HowItWorksSection = dynamic(() => import("@/components/HowItWorksSection").then(mod => mod.HowItWorksSection));
const PricingSection = dynamic(() => import("@/components/PricingSection").then(mod => mod.PricingSection));
const FAQSection = dynamic(() => import("@/components/FAQSection").then(mod => mod.FAQSection));
const FinalCTASection = dynamic(() => import("@/components/FinalCTASection").then(mod => mod.FinalCTASection));
const Footer = dynamic(() => import("@/components/Footer").then(mod => mod.Footer));

export default function Home() {
  return (
    <>
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
