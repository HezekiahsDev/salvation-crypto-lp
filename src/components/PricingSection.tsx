"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, Sparkles, Zap, Shield, Crown, GraduationCap } from "lucide-react";

const plans = [
  {
    name: "Genesis Signals",
    duration: "1 Month",
    price: "49", // Placeholder price, user didn't specify
    period: "/month",
    description: "Your gateway into the crypto market, perfect for beginners.",
    features: [
      "Access to daily trading signals",
      "Basic entry, SL & TP levels",
      "Community access",
      "Standard support",
    ],
    cta: "Get Genesis Access",
    popular: false,
    icon: null,
  },
  {
    name: "Alpha Signals",
    duration: "6 Months",
    price: "199", // Placeholder price
    period: "/6 months",
    description: "Built for traders ready to level up and for serious traders looking for consistency.",
    features: [
      "Access to daily trading signals",
      "Basic entry, SL & TP levels",
      "Daily market insights",
      "Massive follow-up from the team",
      "Priority support",
    ],
    cta: "Join Alpha Circle",
    popular: true,
    icon: Sparkles,
    badge: "Best Value",
  },
  {
    name: "Elite Alpha Circle",
    duration: "1 Year",
    price: "399", // Placeholder price
    period: "/year",
    description: "The highest level of signal access for committed traders who want maximum edge.",
    features: [
      "Access to daily trading signals",
      "Basic entry, SL & TP levels",
      "Daily market insights",
      "Poly market insider info signal",
      "Long-term projects (10,000% potential)",
      "Special pick meme pump calls",
      "Massive follow-up from the team",
    ],
    cta: "Go Elite Alpha",
    popular: false,
    icon: Crown,
    badge: "Maximum Edge",
  },
  {
    name: "Inner Caucus",
    duration: "Exclusive",
    price: "Custom",
    period: "",
    description: "Exclusive access for the most committed members. Private high-level platform.",
    features: [
      "Private high-level early access platform",
      "Strategic market positioning",
      "Advanced alpha plays",
      "Networking with top traders",
      "Direct access to exclusive updates",
      "Personalized mentorship",
    ],
    cta: "Apply for Inner Caucus",
    popular: false,
    icon: Shield,
    badge: "VVIP Access",
  },
  {
    name: "Crypto Academy",
    duration: "Unlimited",
    price: "299", // Placeholder price
    period: "one-time",
    description: "Master the crypto market through quality education and community.",
    features: [
      "Complete learning curriculum",
      "Beginner to Advanced modules",
      "Trading community access",
      "Recorded masterclasses",
      "Practical workshops",
      "Lifetime updates",
    ],
    cta: "Enroll in Academy",
    popular: false,
    icon: GraduationCap,
    badge: "Learn to Trade",
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

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="inline-block text-sm font-semibold text-blue-400/80 tracking-widest uppercase mb-4">
            Membership Plans
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white mb-6 text-balance">
            Choose Your <span className="gradient-text">Success Path</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed">
            Whether you want professional signals or complete market mastery, we have a dedicated track for your growth.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setHoveredPlan(i)}
              onMouseLeave={() => setHoveredPlan(null)}
              className={`relative rounded-2xl p-6 transition-all duration-500 flex flex-col h-full ${
                plan.popular
                  ? "bg-white/[0.04] border-2 border-transparent pricing-highlight scale-105 z-10"
                  : "bg-white/[0.02] border border-white/5 hover:border-white/10"
              } ${hoveredPlan === i && !plan.popular ? "transform scale-[1.02]" : ""}`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-[10px] font-bold text-white shadow-lg shadow-blue-500/25 uppercase tracking-tighter">
                    {plan.icon && <plan.icon size={10} />}
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan header */}
              <div className="mb-6">
                <h3 className="text-base font-bold text-white mb-1 uppercase tracking-tight">
                  {plan.name}
                </h3>
                <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">{plan.duration}</span>
                <p className="text-xs text-slate-500 mt-3 mb-4 h-8 line-clamp-2">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-xs text-slate-500">$</span>
                  <span className="text-3xl font-bold text-white tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-slate-500 text-[10px]">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="space-y-2.5 mb-8 flex-grow">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check
                      size={12}
                      className={`mt-0.5 shrink-0 ${
                        plan.popular ? "text-blue-400" : "text-slate-500"
                      }`}
                    />
                    <span className="text-[11px] text-slate-400 leading-tight">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 group mt-auto ${
                  plan.popular
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                    : "bg-white/5 text-white border border-white/10 hover:bg-white/10"
                }`}
              >
                {plan.cta}
                <ArrowRight
                  size={14}
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
          <p className="text-xs text-slate-500">
            🔒 Secure checkout · Instant access · No long-term commitments
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
