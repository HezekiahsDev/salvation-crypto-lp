"use client";

import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { CinematicBackground } from "@/components/CinematicBackground";
import { MouseFollowGlow } from "@/components/MouseFollowGlow";
import { LegalSidebar } from "@/components/LegalSidebar";
import { motion } from "framer-motion";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "information-collection", title: "2. Information We Collect" },
  { id: "usage", title: "3. How We Use Information" },
  { id: "security", title: "4. Data Security" },
  { id: "third-party", title: "5. Third-Party Services" },
  { id: "rights", title: "6. Your Rights" },
  { id: "contact", title: "7. Contact Us" },
];

export default function PrivacyPolicy() {
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
              <h1 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">Privacy Policy</h1>
              <p className="text-slate-400 mb-12">Last Updated: May 9, 2026</p>

              <div className="space-y-20 text-slate-300">
                <section id="introduction" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">1</span>
                    Introduction
                  </h2>
                  <p className="leading-relaxed text-lg">
                    Welcome to Salvation Crypto Academy ("we," "our," or "us"). We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website and use our services.
                  </p>
                </section>

                <section id="information-collection" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">2</span>
                    Information We Collect
                  </h2>
                  <p className="leading-relaxed">
                    We collect information that you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include:
                  </p>
                  <ul className="grid gap-3 mt-6">
                    {[
                      "Name and contact information (email address)",
                      "Payment information (processed securely through third-party providers)",
                      "Profile information and trading experience level",
                      "Communications you send to us"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="usage" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">3</span>
                    How We Use Your Information
                  </h2>
                  <p className="leading-relaxed">
                    We use the information we collect to:
                  </p>
                  <ul className="grid gap-3 mt-6">
                    {[
                      "Provide and maintain our services",
                      "Process your transactions and manage your subscription",
                      "Send you technical notices, updates, and security alerts",
                      "Respond to your comments and questions",
                      "Communicate with you about products, services, and events"
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="security" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">4</span>
                    Data Security
                  </h2>
                  <p className="leading-relaxed text-slate-300">
                    We implement appropriate technical and organizational measures to protect the security of your personal information. However, please note that no method of transmission over the Internet or method of electronic storage is 100% secure.
                  </p>
                </section>

                <section id="third-party" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">5</span>
                    Third-Party Services
                  </h2>
                  <p className="leading-relaxed text-slate-300">
                    Our service may contain links to third-party websites or services that are not owned or controlled by Salvation Crypto Academy. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
                  </p>
                </section>

                <section id="rights" className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center text-sm">6</span>
                    Your Rights
                  </h2>
                  <p className="leading-relaxed text-slate-300">
                    Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete the information we hold about you.
                  </p>
                </section>

                <section id="contact" className="p-10 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/10 scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-4">7. Contact Us</h2>
                  <p className="text-slate-300 mb-8 text-lg">
                    If you have any questions about this Privacy Policy, please contact our support team:
                  </p>
                  <a href="mailto:support@salvationcrypto.com" className="text-2xl font-semibold text-blue-400 hover:text-blue-300 transition-all hover:translate-x-1 inline-block">
                    support@salvationcrypto.com
                  </a>
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
