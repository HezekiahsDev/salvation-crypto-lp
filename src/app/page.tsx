import dynamic from "next/dynamic";
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import WhatsAppButton from "@/components/WhatsAppButton";
import { SectionLoading } from "@/components/Skeleton";

// Dynamically import heavy sections below the fold
const PainSection = dynamic(
  () => import("@/components/PainSection").then((mod) => mod.PainSection),
  { loading: () => <SectionLoading /> },
);
const JourneySection = dynamic(
  () => import("@/components/JourneySection").then((mod) => mod.JourneySection),
  { loading: () => <SectionLoading /> },
);
const FeaturesSection = dynamic(
  () =>
    import("@/components/FeaturesSection").then((mod) => mod.FeaturesSection),
  { loading: () => <SectionLoading /> },
);
const TestimonialsSection = dynamic(
  () =>
    import("@/components/TestimonialsSection").then(
      (mod) => mod.TestimonialsSection,
    ),
  { loading: () => <SectionLoading /> },
);
const FounderSection = dynamic(
  () => import("@/components/FounderSection").then((mod) => mod.FounderSection),
  { loading: () => <SectionLoading /> },
);
const HowItWorksSection = dynamic(
  () =>
    import("@/components/HowItWorksSection").then(
      (mod) => mod.HowItWorksSection,
    ),
  { loading: () => <SectionLoading /> },
);
const PricingSection = dynamic(
  () => import("@/components/PricingSection").then((mod) => mod.PricingSection),
  { loading: () => <SectionLoading /> },
);
const FAQSection = dynamic(
  () => import("@/components/FAQSection").then((mod) => mod.FAQSection),
  { loading: () => <SectionLoading /> },
);
const FinalCTASection = dynamic(
  () =>
    import("@/components/FinalCTASection").then((mod) => mod.FinalCTASection),
  { loading: () => <SectionLoading /> },
);
const Footer = dynamic(
  () => import("@/components/Footer").then((mod) => mod.Footer),
  { loading: () => <SectionLoading /> },
);

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <HeroSection />
        <section className="bg-slate-50 py-8">
          <div className="max-w-5xl mx-auto text-center px-4">
            <p className="text-sm text-slate-600">For inquiries</p>
            <h3 className="mt-2 text-2xl font-semibold text-slate-900">
              Call or Message Our Customer Service on WhatsApp
            </h3>
            <div className="mt-4">
              <WhatsAppButton
                className=""
                message={"Hello, I would like to inquire about your services."}
              />
            </div>
            <p className="mt-2 text-sm text-slate-500">WhatsApp only</p>
          </div>
        </section>
        <PainSection />
        <JourneySection />
        <HowItWorksSection />
        <PricingSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FounderSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
