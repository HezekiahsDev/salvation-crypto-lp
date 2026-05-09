"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  AlertCircle,
  BookOpen,
  BarChart2,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

const storyStages = [
  {
    phase: "01",
    title: "The Chaos",
    story:
      "You start with excitement but no direction. You follow random signals, chase pumps, and feel the sting of every red candle. This is where most quit.",
    pain: "Blowing accounts & stress",
    icon: AlertCircle,
    color: "#ef4444",
    bgGradient: "from-red-950/20 to-transparent",
  },
  {
    phase: "02",
    title: "The Awakening",
    story:
      "You realize trading is a skill, not a gamble. You start studying market structure, liquidity, and risk management. The fog begins to clear.",
    pain: "Information overload",
    icon: BookOpen,
    color: "#f97316",
    bgGradient: "from-orange-950/20 to-transparent",
  },
  {
    phase: "03",
    title: "The Discipline",
    story:
      "Strategy meets execution. You stop trading every move and start waiting for your edge. You treat your capital with respect. Consistency is born.",
    pain: "Developing patience",
    icon: BarChart2,
    color: "#eab308",
    bgGradient: "from-yellow-950/20 to-transparent",
  },
  {
    phase: "04",
    title: "The Mastery",
    story:
      "Trading becomes boring because it's systematic. You follow your plan with robotic precision. Your P&L reflects your growth. You are a Master Trader.",
    pain: "Maintaining edge",
    icon: CheckCircle2,
    color: "#22c55e",
    bgGradient: "from-green-950/20 to-transparent",
  },
];

function StageCard({
  stage,
  index,
  progress,
}: {
  stage: (typeof storyStages)[0];
  index: number;
  progress: any;
}) {
  // Animating based on scroll progress
  const opacity = useTransform(
    progress,
    [index * 0.25, index * 0.25 + 0.1, index * 0.25 + 0.2, index * 0.25 + 0.25],
    [0, 1, 1, 0],
  );

  const scale = useTransform(
    progress,
    [index * 0.25, index * 0.25 + 0.1, index * 0.25 + 0.2, index * 0.25 + 0.25],
    [0.8, 1, 1, 0.9],
  );

  const y = useTransform(
    progress,
    [index * 0.25, index * 0.25 + 0.1, index * 0.25 + 0.2, index * 0.25 + 0.25],
    [100, 0, 0, -100],
  );

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="absolute inset-0 flex items-center justify-center p-6"
    >
      <div
        className="max-w-2xl w-full glass-strong p-6 md:p-12 rounded-2xl md:rounded-[2rem] border-white/10 relative overflow-hidden group cursor-pointer hover:border-white/20 transition-colors mx-4"
        data-aos="zoom-in"
      >
        {/* Background Glow */}
        <div
          className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 transition-opacity group-hover:opacity-40"
          style={{ backgroundColor: stage.color }}
        />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-white"
              style={{
                backgroundColor: `${stage.color}20`,
                border: `1px solid ${stage.color}40`,
              }}
            >
              <stage.icon size={28} style={{ color: stage.color }} />
            </div>
            <div>
              <span className="text-[10px] md:text-xs font-bold tracking-widest uppercase opacity-50">
                Phase {stage.phase}
              </span>
              <h3 className="text-2xl md:text-4xl font-bold text-white">
                {stage.title}
              </h3>
            </div>
          </div>

          <p className="text-sm md:text-xl text-slate-300 leading-relaxed mb-6 md:mb-8">
            {stage.story}
          </p>

          <div className="flex items-center gap-3 py-4 border-t border-white/5">
            <span className="text-sm font-semibold uppercase tracking-wider opacity-40">
              The Challenge:
            </span>
            <span className="text-sm font-bold text-white/80">
              {stage.pain}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function JourneySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      ref={containerRef}
      className="relative h-[400vh] bg-[#030014]"
      id="transformation"
    >
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-white/5 z-50">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 origin-left"
            style={{ scaleX: smoothProgress }}
          />
        </div>

        {/* Section Title - Stays Pinned */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="absolute top-16 md:top-24 text-center z-20 py-4 px-6"
        >
          <span
            className="text-[10px] md:text-sm font-bold text-blue-400 tracking-[0.3em] uppercase mb-2 md:mb-4 block"
            data-aos="fade-down"
          >
            The Journey
          </span>
          <h2
            className="text-3xl md:text-6xl font-bold text-white mb-2 md:mb-4"
            data-aos="fade-up"
          >
            Your Transformation <span className="gradient-text">Story</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-sm md:text-base">
            Scroll to walk through the path of a master trader. Every step is a
            milestone in your new career.
          </p>
        </motion.div>

        {/* Background Motion Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] rounded-full blur-[180px] opacity-5 transition-colors duration-1000"
            style={{
              backgroundColor: useTransform(
                smoothProgress,
                [0, 0.33, 0.66, 1],
                ["#ef4444", "#f97316", "#eab308", "#22c55e"],
              ),
            }}
          />
        </div>

        {/* Story Stages */}
        <div className="relative w-full h-full">
          {storyStages.map((stage, i) => (
            <StageCard
              key={stage.phase}
              stage={stage}
              index={i}
              progress={smoothProgress}
            />
          ))}
        </div>

        {/* Bottom indicator */}
        <div className="absolute bottom-12 flex items-center gap-4 opacity-40">
          <div className="w-1 h-12 bg-white/10 rounded-full relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-white origin-top"
              style={{ height: "100%", scaleY: smoothProgress }}
            />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase">
            Scroll to Progress
          </span>
        </div>
      </div>
    </section>
  );
}
