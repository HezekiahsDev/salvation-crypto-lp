"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Is this academy suitable for complete beginners?",
    answer:
      "Absolutely. Our curriculum is structured from the ground up. Whether you've never placed a trade or you've been trading for years without consistency, we have a clear learning path for you. The Starter plan is specifically designed for beginners, while our Professional and Elite plans include mentorship to accelerate your progress regardless of your starting point.",
  },
  {
    question: "Do you trade live, or is this just pre-recorded content?",
    answer:
      "Both. We have 200+ hours of structured recorded content that you can study at your own pace, AND we host live trading sessions 3 times per week where our professional mentors trade in real-time, explain their thought process, and answer your questions. This combination of theory and live application is what makes our approach so effective.",
  },
  {
    question: "What markets do you cover?",
    answer:
      "We primarily focus on Forex (major and minor pairs), Crypto (BTC, ETH, and major altcoins), Gold (XAUUSD), and Indices (US30, NAS100, SPX500). Our strategies are based on price action and market structure, which means the principles apply across any liquid market.",
  },
  {
    question: "How is this different from free YouTube content?",
    answer:
      "Free content gives you information. We give you transformation. The difference is: structured progression, live mentorship, trade reviews, accountability, a community of serious traders, and a proven system that connects all the pieces. Anyone can learn what a support level is — we teach you how to build a consistently profitable trading business.",
  },
  {
    question: "What if I want to cancel or get a refund?",
    answer:
      "We offer a 7-day money-back guarantee on all plans. If you join, engage with the material, and genuinely feel it's not for you, we'll refund your payment — no questions asked. After the initial 7 days, you can cancel your subscription at any time with no penalties or long-term obligations.",
  },
  {
    question: "How quickly can I become profitable?",
    answer:
      "This depends on your dedication, prior experience, and how much time you invest. Some students see improvements within weeks. On average, students who follow the curriculum consistently and attend live sessions report becoming consistently profitable within 3-6 months. We don't promise overnight results — we promise a proven path to get there.",
  },
  {
    question: "Can I upgrade or downgrade my plan later?",
    answer:
      "Yes. You can upgrade or downgrade your plan at any time. If you upgrade, you'll get immediate access to the additional features. If you downgrade, the change will take effect at the start of your next billing cycle. Many students start with Genesis or Alpha and upgrade to Elite Alpha Circle or Inner Caucus as they grow.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
  index,
}: {
  faq: (typeof faqs)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen ? "bg-white/[0.03] border-white/10" : "hover:bg-white/[0.02]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-6 text-left group"
        aria-expanded={isOpen}
      >
        <span
          className={`text-base font-semibold transition-colors duration-300 pr-4 ${
            isOpen ? "text-white" : "text-slate-300 group-hover:text-white"
          }`}
        >
          {faq.question}
        </span>
        <div
          className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "bg-blue-500/20 text-blue-400 rotate-0"
              : "bg-white/5 text-slate-500 group-hover:bg-white/10"
          }`}
        >
          {isOpen ? <Minus size={16} /> : <Plus size={16} />}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-6 pb-6">
              <p className="text-slate-400 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/3 blur-[150px]" />

      <div className="relative z-10 max-w-3xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
          data-aos="fade-down"
        >
          <span className="inline-block text-sm font-semibold text-blue-400/80 tracking-widest uppercase mb-4" data-aos="fade-left">
            Common Questions
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6" data-aos="zoom-in">
            Objections <span className="gradient-text">Resolved</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg text-slate-400 leading-relaxed">
            Everything you need to know before joining. Can&apos;t find your
            answer? Reach out to our team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
