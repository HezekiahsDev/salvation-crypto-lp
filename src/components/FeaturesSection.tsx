"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  MonitorPlay,
  Users,
  Brain,
  Shield,
  MessageSquare,
  BarChart3,
  BookOpen,
  Award,
} from "lucide-react";

const features = [
  {
    icon: MonitorPlay,
    title: "Live Trading Sessions",
    description:
      "Watch our professional traders execute live trades in real-time. See the setups, entries, and management — not just the results.",
    highlight: "3x Weekly",
  },
  {
    icon: Users,
    title: "1-on-1 Mentorship",
    description:
      "Personal guidance from traders who are actually profitable. Get your trades reviewed and your weaknesses identified.",
    highlight: "Personal",
  },
  {
    icon: Brain,
    title: "Trading Psychology",
    description:
      "Master the mental game. Learn to manage fear, greed, and revenge trading with our proprietary mindset framework.",
    highlight: "Critical",
  },
  {
    icon: Shield,
    title: "Risk Management",
    description:
      "The #1 skill that separates profitable traders from the rest. Learn position sizing, drawdown management, and portfolio allocation.",
    highlight: "Foundation",
  },
  {
    icon: MessageSquare,
    title: "Elite Community",
    description:
      "Trade alongside 2,800+ serious traders. Daily analysis, trade ideas, and accountability partners who push you forward.",
    highlight: "24/7 Access",
  },
  {
    icon: BarChart3,
    title: "Signals & Analysis",
    description:
      "Premium trade setups with full breakdowns. Not just entries — complete trade plans with risk/reward ratios.",
    highlight: "Daily",
  },
  {
    icon: BookOpen,
    title: "Recorded Masterclasses",
    description:
      "200+ hours of structured content from basic concepts to advanced strategies. Learn at your own pace, revisit anytime.",
    highlight: "200+ Hours",
  },
  {
    icon: Award,
    title: "Certification",
    description:
      "Complete the academy curriculum and receive a certification that validates your trading competency and knowledge.",
    highlight: "Verified",
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="features"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Ambient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-blue-500/3 blur-[150px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-purple-500/3 blur-[120px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
          data-aos="fade-down"
        >
          <span className="inline-block text-sm font-semibold text-blue-400/80 tracking-widest uppercase mb-4" data-aos="fade-left">
            What You Get
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance" data-aos="zoom-in">
            Everything You Need to{" "}
            <span className="gradient-text">Become Profitable</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed" data-aos="fade-up">
            A complete ecosystem designed to take you from wherever you are today
            to consistently profitable trader.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-aos="fade-up"
              data-aos-delay={i * 50}
              className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 hover:border-blue-500/20 cursor-default"
            >
              {/* Highlight badge */}
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400/60 bg-blue-400/5 px-2 py-1 rounded-full">
                  {feature.highlight}
                </span>
              </div>

              {/* Icon */}
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 flex items-center justify-center mb-5 text-blue-400 group-hover:scale-110 group-hover:border-blue-500/20 transition-all duration-300">
                <feature.icon size={20} />
              </div>

              <h3 className="text-base font-semibold text-white mb-2.5 group-hover:text-blue-100 transition-colors">
                {feature.title}
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {feature.description}
              </p>

              {/* Hover gradient overlay */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-blue-500/[0.02] to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
