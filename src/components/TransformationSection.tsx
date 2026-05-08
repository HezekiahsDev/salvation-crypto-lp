"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stages = [
  {
    phase: "01",
    title: "The Beginner",
    subtitle: "Where everyone starts",
    description:
      "No strategy. No risk management. Trading based on gut feeling and random signals from Telegram groups.",
    traits: ["Random entries", "No stop losses", "Emotional decisions"],
    color: "from-red-500 to-orange-500",
    bgGlow: "bg-red-500/5",
  },
  {
    phase: "02",
    title: "The Student",
    subtitle: "The awakening",
    description:
      "You discover structure. You learn price action, market structure, and the importance of having a trading plan.",
    traits: ["Learning price action", "Understanding risk", "Building discipline"],
    color: "from-orange-500 to-yellow-500",
    bgGlow: "bg-orange-500/5",
  },
  {
    phase: "03",
    title: "The Practitioner",
    subtitle: "Skills taking shape",
    description:
      "Backtesting becomes second nature. You start recognizing patterns in real-time and managing your emotions.",
    traits: ["Consistent backtesting", "Live practice", "Emotional control"],
    color: "from-yellow-500 to-green-500",
    bgGlow: "bg-yellow-500/5",
  },
  {
    phase: "04",
    title: "The Funded Trader",
    subtitle: "The breakthrough",
    description:
      "You pass your funded account challenge. You trade with discipline. Your P&L is consistently green. Trading becomes a skill, not a gamble.",
    traits: ["Funded account", "Consistent profits", "Professional mindset"],
    color: "from-green-500 to-blue-500",
    bgGlow: "bg-green-500/5",
  },
];

export function TransformationSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="transformation"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue-500/3 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold text-blue-400/80 tracking-widest uppercase mb-4">
            The Journey
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
            From Beginner to{" "}
            <span className="gradient-text">Funded Trader</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Every successful trader follows this path. Our academy compresses
            years of painful trial and error into a structured transformation.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px">
            <motion.div
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
              className="h-full w-full origin-top"
              style={{
                background:
                  "linear-gradient(180deg, #ef4444 0%, #f97316 25%, #eab308 50%, #22c55e 75%, #3b82f6 100%)",
              }}
            />
          </div>

          {/* Stage cards */}
          <div className="space-y-16 md:space-y-24">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.phase}
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                animate={
                  isInView ? { opacity: 1, x: 0 } : {}
                }
                transition={{
                  duration: 0.7,
                  delay: 0.4 + i * 0.2,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`relative flex flex-col md:flex-row items-start gap-8 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gradient-to-r border-2 border-[#030014] z-10"
                  style={{
                    backgroundImage: `linear-gradient(to right, ${stage.color.replace('from-', '').replace(' to-', ', ').replace(/(\w+)-(\d+)/g, 'var(--color-$1-$2, #888)')})`,
                  }}
                >
                  <div className={`absolute inset-0 rounded-full ${stage.bgGlow} blur-md scale-[3] -z-10`} />
                </div>

                {/* Content */}
                <div
                  className={`ml-20 md:ml-0 md:w-[calc(50%-3rem)] ${
                    i % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
                  }`}
                >
                  <div
                    className={`inline-flex items-center gap-2 mb-3 ${
                      i % 2 === 0 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    <span
                      className={`text-xs font-bold tracking-widest uppercase bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}
                    >
                      Phase {stage.phase}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                    {stage.title}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium mb-4 uppercase tracking-wider">
                    {stage.subtitle}
                  </p>
                  <p className="text-slate-400 leading-relaxed mb-5">
                    {stage.description}
                  </p>

                  {/* Traits */}
                  <div
                    className={`flex flex-wrap gap-2 ${
                      i % 2 === 0 ? "md:justify-end" : ""
                    }`}
                  >
                    {stage.traits.map((trait) => (
                      <span
                        key={trait}
                        className="px-3 py-1.5 text-xs font-medium rounded-full glass text-slate-300"
                      >
                        {trait}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Spacer for the other side */}
                <div className="hidden md:block md:w-[calc(50%-3rem)]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
