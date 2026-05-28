"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  Check,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Crown,
  GraduationCap,
} from "lucide-react";

import {
  formatPlanPrice,
  getPlanPaymentPrice,
  plans,
  DISCOUNT_RATE,
} from "@/data/plans";
import Link from "next/link";

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null);

  return (
    <section id="pricing" ref={ref} className="relative py-32 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-150 rounded-full bg-blue-500/3 blur-[150px]" />

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
            Whether you want professional signals or complete market mastery, we
            have a dedicated track for your growth.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 items-start">
          {plans.map((plan, i) => {
            const paymentPrice = getPlanPaymentPrice(plan);

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.7,
                  delay: 0.2 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onMouseEnter={() => setHoveredPlan(i)}
                onMouseLeave={() => setHoveredPlan(null)}
                className={`relative rounded-2xl p-6 transition-all duration-500 flex flex-col h-full group/card cursor-pointer ${
                  plan.popular
                    ? "bg-white/4 border-2 border-transparent pricing-highlight scale-105 z-10"
                    : "bg-white/2 border border-white/5 hover:border-white/10"
                } ${hoveredPlan === i && !plan.popular ? "transform scale-[1.02]" : ""}`}
              >
                {/* Discount tag for eligible plans */}
                {paymentPrice !== null &&
                  plan.id !== "inner-caucus" &&
                  plan.id !== "one-on-one" &&
                  Number(plan.price) > paymentPrice && (
                    <div className="absolute -top-3 left-3 z-30">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wider shadow-md">
                        {Math.round(DISCOUNT_RATE * 100)}% off
                      </span>
                    </div>
                  )}
                <Link
                  href={`/plans/${plan.id}`}
                  className="absolute inset-0 z-20"
                />
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-linear-to-r from-blue-500 to-purple-600 text-[10px] font-bold text-white shadow-lg shadow-blue-500/25 uppercase tracking-tighter">
                      {plan.icon && <plan.icon size={10} />}
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="mb-6 relative z-10">
                  <h3 className="text-base font-bold text-white mb-1 uppercase tracking-tight">
                    {plan.name}
                  </h3>
                  <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">
                    {plan.duration}
                  </span>
                  <p className="text-xs text-slate-500 mt-3 mb-4 h-8 line-clamp-2">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs text-slate-500">$</span>
                    <span className="text-3xl font-bold text-white tracking-tight">
                      {formatPlanPrice(paymentPrice)}
                    </span>
                    <span className="text-slate-500 text-[10px]">
                      {plan.period}
                    </span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-8 grow relative z-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check
                        size={12}
                        className={`mt-0.5 shrink-0 ${
                          plan.popular ? "text-blue-400" : "text-slate-500"
                        }`}
                      />
                      <span className="text-[11px] text-slate-400 leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div
                  className={`w-full py-3 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-2 group mt-auto relative z-10 ${
                    plan.popular
                      ? "bg-linear-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                      : "bg-white/5 text-white border border-white/10 group-hover/card:bg-white/10"
                  }`}
                >
                  {plan.cta}
                  <ArrowRight
                    size={14}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </motion.div>
            );
          })}
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
