"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";
import { TradingChart } from "./TradingChart";
import { Play, ArrowRight } from "lucide-react";

const trustStats = [
  { value: 2847, suffix: "+", label: "Active Students" },
  { value: 92, suffix: "%", label: "Signal Accuracy" },
  { value: 10, suffix: "K%", label: "Potential Returns", prefix: "Up to " },
];

export function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Radial glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[120px] animate-pulse-glow" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />

      {/* Trading chart background */}
      <div className="absolute inset-0 flex items-end opacity-35 pointer-events-none">
        <TradingChart />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-[15%] w-3 h-3 rounded-full bg-blue-400/40 animate-float" />
      <div className="absolute top-40 left-[20%] w-2 h-2 rounded-full bg-purple-400/30 animate-float-delayed" />
      <div className="absolute bottom-32 right-[30%] w-2.5 h-2.5 rounded-full bg-cyan-400/30 animate-float" style={{ animationDelay: "2s" }} />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-slate-300 font-medium">
            Now Accepting New Students — Limited Spots Available
          </span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[1.05] mb-8 text-balance"
        >
          <span className="block text-white">Stop Guessing.</span>
          <span className="block gradient-text mt-2">Start Trading</span>
          <span className="block text-white mt-2">With Precision.</span>
        </motion.h1>

        {/* Sub headline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl mx-auto text-lg sm:text-xl text-slate-400 leading-relaxed mb-12 text-balance"
        >
          Join the premier crypto academy and signal service. Learn to navigate 
          the markets with precision and trade alongside a community of 
          consistently profitable professionals.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <a
            href="/#pricing"
            className="btn-primary text-base flex items-center gap-2 group"
          >
            Join the Academy
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
          <a
            href="/#testimonials"
            className="btn-secondary text-base flex items-center gap-2 group"
          >
            <Play
              size={16}
              className="text-blue-400 group-hover:scale-110 transition-transform"
            />
            Watch Success Stories
          </a>
        </motion.div>

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16"
        >
          {trustStats.map((stat, i) => (
            <div
              key={stat.label}
              className="flex flex-col items-center gap-1 group"
            >
              <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
                <AnimatedCounter
                  end={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2000 + i * 300}
                />
              </span>
              <span className="text-sm text-slate-500 font-medium tracking-wide uppercase">
                {stat.label}
              </span>
              {i < trustStats.length - 1 && (
                <div className="hidden sm:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-8 bg-white/10" />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#030014] to-transparent" />
    </section>
  );
}
