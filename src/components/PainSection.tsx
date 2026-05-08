"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  TrendingDown,
  Brain,
  UserX,
  AlertTriangle,
} from "lucide-react";

const painPoints = [
  {
    icon: TrendingDown,
    title: "Blowing Accounts",
    description:
      "You've funded trading account after account, only to watch your balance hit zero. The cycle of depositing and losing feels endless and crushing.",
    stat: "87%",
    statLabel: "of retail traders lose money",
    color: "from-red-500/20 to-red-600/5",
    iconColor: "text-red-400",
    borderColor: "hover:border-red-500/20",
  },
  {
    icon: Brain,
    title: "Emotional Trading",
    description:
      "Revenge trading after a loss. Over-leveraging when you're winning. Fear of pulling the trigger on valid setups. Your emotions control your P&L.",
    stat: "73%",
    statLabel: "of losses are emotion-driven",
    color: "from-orange-500/20 to-orange-600/5",
    iconColor: "text-orange-400",
    borderColor: "hover:border-orange-500/20",
  },
  {
    icon: UserX,
    title: "No Real Mentorship",
    description:
      "YouTube tutorials and free signals won't make you profitable. Without a proven mentor who trades live, you're navigating blindfolded.",
    stat: "94%",
    statLabel: "learn from unverified sources",
    color: "from-yellow-500/20 to-yellow-600/5",
    iconColor: "text-yellow-400",
    borderColor: "hover:border-yellow-500/20",
  },
  {
    icon: AlertTriangle,
    title: "Fake Gurus & Scams",
    description:
      "Rented Lamborghinis. Photoshopped profits. Fake testimonials. The trading education space is filled with people who can't trade themselves.",
    stat: "68%",
    statLabel: "of 'gurus' never trade live",
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-400",
    borderColor: "hover:border-purple-500/20",
  },
];

export function PainSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pain"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Subtle red ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-red-500/3 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
          data-aos="fade-down"
        >
          <span className="inline-block text-sm font-semibold text-red-400/80 tracking-widest uppercase mb-4" data-aos="fade-right" data-aos-delay="200">
            The Reality
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance" data-aos="zoom-in" data-aos-delay="400">
            Why Most Traders{" "}
            <span className="text-red-400/90">Never Make It</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed" data-aos="fade-up" data-aos-delay="600">
            Before you can win, you need to understand why you&apos;re losing.
            These are the silent killers of trading careers.
          </p>
        </motion.div>

        {/* Pain Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {painPoints.map((pain, i) => (
            <motion.div
              key={pain.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              data-aos={i % 2 === 0 ? "fade-right" : "fade-left"}
              data-aos-delay={i * 100}
              className={`group relative p-8 rounded-2xl border border-white/5 bg-gradient-to-b ${pain.color} backdrop-blur-sm transition-all duration-500 ${pain.borderColor} hover:bg-white/[0.02] cursor-default`}
            >
              {/* Icon */}
              <div
                className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-5 ${pain.iconColor} group-hover:scale-110 transition-transform duration-300`}
              >
                <pain.icon size={24} />
              </div>

              <h3 className="text-xl font-semibold text-white mb-3">
                {pain.title}
              </h3>
              <p className="text-slate-400 leading-relaxed mb-6">
                {pain.description}
              </p>

              {/* Stat */}
              <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                <span className="text-2xl font-bold text-white">
                  {pain.stat}
                </span>
                <span className="text-sm text-slate-500">
                  {pain.statLabel}
                </span>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-b from-white/[0.02] to-transparent" />
            </motion.div>
          ))}
        </div>

        {/* Transition statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-center mt-20"
        >
          <p className="text-xl sm:text-2xl text-slate-300 font-medium text-balance">
            But what if there was a{" "}
            <span className="gradient-text font-semibold">
              proven system
            </span>{" "}
            that could change everything?
          </p>
        </motion.div>
      </div>

      {/* Section divider */}
      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
