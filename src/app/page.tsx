import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { SectionLoading } from "@/components/Skeleton";

// Dynamically import heavy sections below the fold
const PainSection = dynamic(
  () => import("@/components/PainSection").then((mod) => mod.PainSection),
  { loading: () => <SectionLoading /> }
);
const JourneySection = dynamic(
  () => import("@/components/JourneySection").then((mod) => mod.JourneySection),
  { loading: () => <SectionLoading /> }
);
const FeaturesSection = dynamic(
  () =>
    import("@/components/FeaturesSection").then((mod) => mod.FeaturesSection),
  { loading: () => <SectionLoading /> }
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection,
    ),
  { loading: () => <SectionLoading /> }
);
const ProofMarquee = dynamic(
  () => import("@/components/ProofMarquee").then((mod) => mod.ProofMarquee),
  { loading: () => <SectionLoading /> }
);
const FounderSection = dynamic(
  () => import("@/components/FounderSection").then((mod) => mod.FounderSection),
  { loading: () => <SectionLoading /> }
);
const HowItWorksSection = dynamic(
  () =>
    import("@/components/HowItWorksSection").then((mod) => mod.HowItWorksSection),
  { loading: () => <SectionLoading /> }
);
const PricingSection = dynamic(
  () => import("@/components/PricingSection").then((mod) => mod.PricingSection),
  { loading: () => <SectionLoading /> }
);
const FAQSection = dynamic(
  () => import("@/components/FAQSection").then((mod) => mod.FAQSection),
  { loading: () => <SectionLoading /> }
);
const FinalCTASection = dynamic(
  () =>
    import("@/components/FinalCTASection").then((mod) => mod.FinalCTASection),
  { loading: () => <SectionLoading /> }
);
const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => mod.Footer),
  { loading: () => <SectionLoading /> }
);

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
        <ProofMarquee />
        <TestimonialsSection />
        <FounderSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
