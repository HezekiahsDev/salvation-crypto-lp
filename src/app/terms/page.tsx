"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CinematicBackground } from "@/components/CinematicBackground";
import { MouseFollowGlow } from "@/components/MouseFollowGlow";
import { LegalSidebar } from "@/components/LegalSidebar";
import { motion } from "framer-motion";

const sections = [
  { id: "agreement", title: "1. Agreement" },
  { id: "no-advice", title: "2. No Financial Advice" },
  { id: "payments", title: "3. Payments" },
  { id: "cancellation", title: "4. Cancellation" },
  { id: "intellectual-property", title: "5. Intellectual Property" },
  { id: "liability", title: "6. Liability" },
  { id: "changes", title: "7. Changes to Terms" },
  { id: "governing-law", title: "8. Governing Law" },
];

export default function TermsAndConditions() {
  return (
    <>
      <CinematicBackground />
      <MouseFollowGlow />
      <Navigation />
      <main className="relative pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16">
          <LegalSidebar sections={sections} />

          <div className="flex-grow max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">Terms & Conditions</h1>
              <p className="text-slate-400 mb-12">Last Updated: May 9, 2026</p>

              <div className="space-y-20 text-slate-300">
                <section id="agreement" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">1</span>
                    Agreement to Terms
                  </h2>
                  <p className="leading-relaxed text-lg">
                    By accessing or using Salvation Crypto Academy, you agree to be bound by these Terms & Conditions. If you disagree with any part of the terms, you may not access the service.
                  </p>
                </section>

                <section id="no-advice" className="p-8 rounded-2xl bg-red-500/5 border border-red-500/10 scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-red-500/10 text-red-400 flex items-center justify-center text-sm">2</span>
                    No Financial Advice
                  </h2>
                  <p className="font-bold text-red-400 mb-4 uppercase tracking-wide text-sm">
                    IMPORTANT: Salvation Crypto Academy provides educational content and trading signals for informational purposes only. We are NOT financial advisors.
                  </p>
                  <p className="leading-relaxed text-slate-300">
                    Trading cryptocurrencies and financial markets involves significant risk of loss. You should never invest money that you cannot afford to lose. Any trades you place based on our signals or educational material are at your own risk.
                  </p>
                </section>

                <section id="payments" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">3</span>
                    Subscription and Payments
                  </h2>
                  <p className="leading-relaxed text-slate-300">
                    We offer various membership plans. By subscribing, you agree to pay the fees associated with your chosen plan. All payments are non-refundable as access to our proprietary content and signals is granted immediately upon payment.
                  </p>
                </section>

                <section id="cancellation" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">4</span>
                    Cancellation Policy
                  </h2>
                  <p className="leading-relaxed text-slate-300">
                    You may cancel your subscription at any time through your account settings. Upon cancellation, you will continue to have access to the service until the end of your current billing period. No partial refunds will be provided.
                  </p>
                </section>

                <section id="intellectual-property" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">5</span>
                    Intellectual Property
                  </h2>
                  <p className="leading-relaxed text-slate-300">
                    The content, signals, strategies, and materials provided by Salvation Crypto Academy are our intellectual property. You may not reproduce, distribute, or share our content with third parties without our explicit written consent. Sharing signal access or course materials is grounds for immediate account termination without refund.
                  </p>
                </section>

                <section id="liability" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">6</span>
                    Limitation of Liability
                  </h2>
                  <p className="leading-relaxed text-slate-300">
                    In no event shall Salvation Crypto Academy or its founders be liable for any financial losses, damages, or consequences arising from your use of our services or reliance on our information.
                  </p>
                </section>

                <section id="changes" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">7</span>
                    Changes to Terms
                  </h2>
                  <p className="leading-relaxed text-slate-300">
                    We reserve the right to modify these terms at any time. We will notify users of any significant changes by posting the new terms on this page and updating the "Last Updated" date.
                  </p>
                </section>

                <section id="governing-law" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">8</span>
                    Governing Law
                  </h2>
                  <p className="leading-relaxed text-slate-300">
                    These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the academy operates, without regard to its conflict of law provisions.
                  </p>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
