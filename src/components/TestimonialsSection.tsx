"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { AnimatedCounter } from "./AnimatedCounter";

const testimonials = [
  {
    name: "David Okonkwo",
    role: "Elite Alpha Circle Member",
    avatar: "DO",
    content:
      "Before joining Salvation Crypto, I blew 4 accounts in 6 months. The mentorship here completely rewired how I approach the markets. The signals are pinpoint accurate, and the community support is unmatched.",
    screenshot: "/img/testimonies/Salvation/1.jpg",
    profit: "+$12,400",
    period: "Last month returns",
    rating: 5,
  },
  {
    name: "Amara Johnson",
    role: "Full-Time Crypto Trader",
    avatar: "AJ",
    content:
      "I quit my 9-5 after 8 months in the academy. The insights from the Elite Alpha Circle are worth 10x the price. I went from losing $500/month to consistently making $3,000-5,000/month.",
    screenshot: "/img/testimonies/Salvation/2.jpg",
    profit: "+$4,200",
    period: "Monthly average",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Salvation Crypto Academy Member",
    avatar: "MC",
    content:
      "The live trading sessions and daily signals changed everything for me. Watching the team execute in real-time showed me what was missing from my strategy. My portfolio has grown 300% in 4 months.",
    screenshot: "/img/testimonies/Salvation/3.jpg",
    profit: "+$8,750",
    period: "Best trading month",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Genesis Signals Member",
    avatar: "SW",
    content:
      "As a nurse working shifts, I needed signals that were easy to follow. Salvation Crypto's basic entry/SL/TP levels are perfect. I now make a steady side income with very little screen time.",
    screenshot: "/img/testimonies/Salvation/4.jpg",
    profit: "+$6,100",
    period: "Monthly average",
    rating: 5,
  },
  {
    name: "James Adeyemi",
    role: "Inner Caucus Member",
    avatar: "JA",
    content:
      "I was skeptical after being burned elsewhere. But the Inner Caucus provides strategic positioning that you just can't find anywhere else. The long-term project calls are literal life-changers.",
    screenshot: "/img/testimonies/Salvation/5.jpg",
    profit: "+$15,300",
    period: "3-month total",
    rating: 5,
  },
  {
    name: "Oluwaseun Ariyo",
    role: "VIP Alpha Member",
    avatar: "OA",
    content:
      "The accuracy of the SOL and BTC calls this week was insane. Caught the entire move from the bottom. This community is a goldmine for serious traders.",
    screenshot: "/img/testimonies/Salvation/6.jpg",
    profit: "+$9,200",
    period: "Weekly profit",
    rating: 5,
  },
  {
    name: "Blessing Udoh",
    role: "Academy Graduate",
    avatar: "BU",
    content:
      "I finally understand liquidity and market gaps. No more gambling, just pure execution. My win rate has jumped from 30% to over 75% thanks to the mentorship.",
    screenshot: "/img/testimonies/Salvation/7.jpg",
    profit: "+$3,800",
    period: "Last 2 weeks",
    rating: 5,
  },
  {
    name: "Emmanuel Nwosu",
    role: "Elite Circle Member",
    avatar: "EN",
    content:
      "The institutional order flow insights are something else. I've been trading for 3 years, but I never saw the market this clearly until I joined Salvation Crypto.",
    screenshot: "/img/testimonies/Salvation/8.jpg",
    profit: "+$21,500",
    period: "Monthly PnL",
    rating: 5,
  },
  {
    name: "Chioma Okereke",
    role: "Pro Signals Member",
    avatar: "CO",
    content:
      "From a struggling newbie to a confident trader. The step-by-step guidance is what makes this group different. I just secured my first $1,000 day!",
    screenshot: "/img/testimonies/Salvation/9.jpg",
    profit: "+$1,050",
    period: "Single day return",
    rating: 5,
  },
  {
    name: "Tunde Bakare",
    role: "Inner Circle Veteran",
    avatar: "TB",
    content:
      "I've been with Salvation for over a year now. The consistency is what keeps me here. It's not just about one-off wins; it's about building a sustainable trading career.",
    screenshot: "/img/testimonies/Salvation/10.jpg",
    profit: "+$45,000",
    period: "Yearly growth",
    rating: 5,
  },
];

const metrics = [
  { value: 94, suffix: "%", label: "Student Success Rate" },
  { value: 2847, suffix: "+", label: "Active Students" },
  { value: 92, suffix: "%", label: "Signal Accuracy" },
  { value: 10, suffix: "K%", label: "Max Potential Gains", prefix: "" },
];

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [current, setCurrent] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying || !isInView) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, isInView]);

  const next = () => {
    setIsAutoPlaying(false);
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };
  const prev = () => {
    setIsAutoPlaying(false);
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full bg-blue-500/3 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold text-blue-400/80 tracking-widest uppercase mb-4">
            Real Results
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
            Don&apos;t Take Our Word.{" "}
            <span className="gradient-text">See the Growth.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Real stories from real traders who mastered the crypto market
            through our mentorship and signals.
          </p>
        </motion.div>

        {/* Metrics row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
        >
          {metrics.map((metric, i) => (
            <div
              key={metric.label}
              className="text-center p-6 rounded-2xl border border-white/5 bg-white/[0.02]"
            >
              <div className="text-3xl sm:text-4xl font-bold text-white mb-2">
                <AnimatedCounter
                  end={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={2000 + i * 200}
                />
              </div>
              <p className="text-sm text-slate-500 font-medium">
                {metric.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Testimonial Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          <div className="relative max-w-4xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="relative p-8 sm:p-12 rounded-3xl border border-white/5 bg-white/[0.02] backdrop-blur-sm overflow-hidden"
              >
                <div className="grid lg:grid-cols-5 gap-12 items-center">
                  <div className="lg:col-span-3">
                    <Quote size={40} className="text-blue-500/10 mb-6" />

                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: testimonials[current].rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className="text-yellow-400 fill-yellow-400"
                          />
                        ),
                      )}
                    </div>

                    {/* Quote */}
                    <p className="text-lg sm:text-xl text-slate-300 leading-relaxed mb-8 italic">
                      &ldquo;{testimonials[current].content}&rdquo;
                    </p>

                    {/* Author + Profit */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                          {testimonials[current].avatar}
                        </div>
                        <div>
                          <p className="font-semibold text-white">
                            {testimonials[current].name}
                          </p>
                          <p className="text-sm text-slate-500">
                            {testimonials[current].role}
                          </p>
                        </div>
                      </div>
                      <div className="px-5 py-3 rounded-xl bg-green-500/10 border border-green-500/20">
                        <p className="text-lg font-bold text-green-400">
                          {testimonials[current].profit}
                        </p>
                        <p className="text-xs text-green-400/60">
                          {testimonials[current].period}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Screenshot Column */}
                  <div className="lg:col-span-2 relative aspect-[9/16] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-blue-500/10">
                    <Image
                      src={testimonials[current].screenshot}
                      alt={`Chat proof from ${testimonials[current].name}`}
                      fill
                      sizes="(max-width: 768px) 100vw, 300px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setCurrent(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === current
                        ? "bg-blue-400 w-6"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-2.5 rounded-full border border-white/10 text-slate-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="Next testimonial"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
