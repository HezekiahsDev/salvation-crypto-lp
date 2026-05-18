"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { UserPlus, BookOpen, Rocket } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Apply & Enroll",
    description:
      "Choose your plan and complete your enrollment. Get instant access to the academy platform, community, and your onboarding materials.",
    detail: "Takes 5 minutes",
  },
  {
    icon: BookOpen,
    step: "02",
    title: "Learn & Practice",
    description:
      "Follow the structured curriculum, attend live sessions, get your trades reviewed by mentors, and build your edge in a supportive environment.",
    detail: "Your pace, your schedule",
  },
  {
    icon: Rocket,
    step: "03",
    title: "Master & Profit",
    description:
      "Apply your skills to the live markets with confidence. Join 312+ elite circle members who are now navigating the crypto space with a professional edge.",
    detail: "Real results, real growth",
  },
];

export function HowItWorksSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-purple-500/3 blur-[150px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold text-blue-400/80 tracking-widest uppercase mb-4">
            Simple Process
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
            Three Steps to{" "}
            <span className="gradient-text">Your New Career</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Getting started is straightforward. We&apos;ve removed every barrier
            so you can focus on what matters — becoming profitable.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line for desktop */}
          <div className="hidden lg:block absolute top-[4.5rem] left-[16%] right-[16%] h-px">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.6, ease: "easeOut" }}
              className="h-full w-full origin-left bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-blue-500/30"
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.3 + i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative text-center group"
              >
                {/* Step number circle */}
                <div className="relative inline-flex items-center justify-center w-[72px] h-[72px] rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 mb-8 mx-auto group-hover:border-blue-500/20 group-hover:scale-110 transition-all duration-500">
                  <step.icon size={28} className="text-blue-400" />
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-[11px] font-bold text-white">
                      {step.step}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-100 transition-colors">
                  {step.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4 max-w-xs mx-auto">
                  {step.description}
                </p>
                <span className="text-xs font-semibold text-blue-400/60 tracking-wider uppercase">
                  {step.detail}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
