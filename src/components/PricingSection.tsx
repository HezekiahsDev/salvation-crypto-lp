"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Sparkles, Zap } from "lucide-react";

const plans = [
  {
    name: "Starter",
    price: "49",
    period: "/month",
    description: "Perfect for beginners who want to learn the fundamentals.",
    features: [
      "Recorded masterclasses (50+ hours)",
      "Community access",
      "Weekly market analysis",
      "Basic trading templates",
      "Email support",
    ],
    cta: "Start Learning",
    popular: false,
    icon: null,
  },
  {
    name: "Professional",
    price: "149",
    period: "/month",
    description:
      "For serious traders ready to become consistently profitable.",
    features: [
      "Everything in Starter",
      "Live trading sessions (3x/week)",
      "1-on-1 mentorship (monthly)",
      "Trading psychology modules",
      "Premium signals & analysis",
      "Risk management frameworks",
      "Trade journal & analytics",
      "Priority community access",
    ],
    cta: "Join Professional",
    popular: true,
    icon: Sparkles,
    badge: "Most Popular",
  },
  {
    name: "Elite",
    price: "349",
    period: "/month",
    description:
      "The ultimate package for traders who want maximum results, fast.",
    features: [
      "Everything in Professional",
      "Unlimited 1-on-1 mentorship",
      "Funded account challenge prep",
      "Private elite trading group",
      "Direct founder access",
      "Personal trade plan creation",
      "Certification upon completion",
      "Lifetime alumni network",
    ],
    cta: "Go Elite",
    popular: false,
    icon: Zap,
    badge: "Maximum Results",
  },
];

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section
      id="pricing"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-blue-500/3 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold text-blue-400/80 tracking-widest uppercase mb-4">
            Investment
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
            Choose Your{" "}
            <span className="gradient-text">Trading Journey</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Every plan includes access to our community and proven curriculum.
            The only question is how fast you want to get there.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative rounded-3xl p-8 transition-all duration-500 ${
                plan.popular
                  ? "bg-white/[0.04] border-2 border-transparent pricing-highlight lg:scale-105 lg:-my-4"
                  : "bg-white/[0.02] border border-white/5 hover:border-white/10"
              } ${hoveredPlan === i ? "transform lg:scale-[1.02]" : ""}`}
            >
              {/* Popular badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-xs font-bold text-white shadow-lg shadow-blue-500/25">
                    {plan.icon && <plan.icon size={12} />}
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-slate-500 mb-6">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-slate-500">$</span>
                  <span className="text-5xl font-bold text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 text-sm">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-3.5 mb-10">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <Check
                      size={16}
                      className={`mt-0.5 shrink-0 ${
                        plan.popular ? "text-blue-400" : "text-slate-500"
                      }`}
                    />
                    <span className="text-sm text-slate-400">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 group ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5"
                }`}
              >
                {plan.cta}
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </button>
            </motion.div>
          ))}
        </div>

        {/* Guarantee */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-16"
        >
          <p className="text-sm text-slate-500">
            🔒 7-day money-back guarantee · Cancel anytime · No long-term
            contracts
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
