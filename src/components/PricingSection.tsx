"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, ArrowRight, GraduationCap, LineChart } from "lucide-react";

import {
  academyPlans,
  formatPlanPrice,
  getPlanPaymentPrice,
  subscriptionPlans,
  DISCOUNT_RATE,
  type Plan,
} from "@/data/plans";
import Link from "next/link";

interface PlanCardProps {
  plan: Plan;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  accent: "blue" | "amber";
}

function PlanCard({
  plan,
  index,
  isInView,
  isHovered,
  onHoverStart,
  onHoverEnd,
  accent,
}: PlanCardProps) {
  const paymentPrice = getPlanPaymentPrice(plan);
  const isAcademy = accent === "amber";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: 0.2 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={onHoverStart}
      onMouseLeave={onHoverEnd}
      className={`relative rounded-2xl p-6 transition-all duration-500 flex flex-col h-full group/card cursor-pointer ${
        plan.popular
          ? "bg-white/4 border-2 border-transparent pricing-highlight scale-105 z-10"
          : isAcademy
            ? "bg-amber-400/4 border border-amber-300/20 hover:border-amber-300/40"
            : "bg-white/2 border border-white/5 hover:border-white/10"
      } ${isHovered && !plan.popular ? "transform scale-[1.02]" : ""}`}
    >
      {/* Discount tag shown across all plans */}
      {DISCOUNT_RATE > 0 && (
        <div className="absolute -top-3 left-3 z-30">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-amber-400 text-black text-xs font-bold uppercase tracking-wider shadow-md">
            {Math.round(DISCOUNT_RATE * 100)}% off
          </span>
        </div>
      )}
      <Link href={`/plans/${plan.id}`} className="absolute inset-0 z-20" />
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[10px] font-bold text-white shadow-lg uppercase tracking-tighter ${
              isAcademy
                ? "bg-linear-to-r from-amber-500 to-orange-500 shadow-amber-500/25"
                : "bg-linear-to-r from-blue-500 to-purple-600 shadow-blue-500/25"
            }`}
          >
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
        <span
          className={`text-[10px] font-bold uppercase tracking-widest ${
            isAcademy ? "text-amber-300" : "text-blue-400"
          }`}
        >
          {plan.duration}
        </span>
        <p className="text-xs text-slate-500 mt-3 mb-4 h-8 line-clamp-2">
          {plan.description}
        </p>
        <div className="flex flex-col items-start gap-0.5">
          {paymentPrice !== null &&
            plan.id !== "inner-caucus" &&
            plan.id !== "one-on-one" &&
            Number(plan.price) > paymentPrice && (
              <span className="relative inline-flex items-center text-base font-semibold text-red-400/90">
                <span className="relative z-10">
                  ${formatPlanPrice(Number(plan.price))}
                </span>
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-red-300/95"
                />
              </span>
            )}
          <div className="flex items-baseline gap-1">
            <span className="text-xs text-slate-500">$</span>
            <span className="text-3xl font-bold text-white tracking-tight">
              {formatPlanPrice(paymentPrice)}
            </span>
            <span className="text-slate-500 text-[10px]">{plan.period}</span>
          </div>
        </div>
      </div>

      {/* Features */}
      <ul className="space-y-2.5 mb-8 grow relative z-10">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2">
            <Check
              size={12}
              className={`mt-0.5 shrink-0 ${
                plan.popular
                  ? "text-blue-400"
                  : isAcademy
                    ? "text-amber-300/80"
                    : "text-slate-500"
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
            : isAcademy
              ? "bg-amber-400/10 text-amber-100 border border-amber-300/25 group-hover/card:bg-amber-400/20"
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
}

export function PricingSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

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
            Two separate tracks: subscribe to our trading signals, or learn to
            trade for yourself in the Academy. Pick one — or run both.
          </p>
        </motion.div>

        {/* Track 1 — Signal subscriptions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
              <LineChart size={18} />
            </span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Trading Signal Subscriptions
            </h3>
          </div>
          <p className="text-sm text-slate-500 max-w-2xl">
            Recurring access to our daily calls, entries, stop losses and
            targets. We trade, you follow.
          </p>
          <div className="mt-5 h-px w-full bg-linear-to-r from-blue-500/40 via-white/5 to-transparent" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {subscriptionPlans.map((plan, i) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              index={i}
              isInView={isInView}
              isHovered={hoveredPlan === plan.id}
              onHoverStart={() => setHoveredPlan(plan.id)}
              onHoverEnd={() => setHoveredPlan(null)}
              accent="blue"
            />
          ))}
        </div>

        {/* Track 2 — Academy, visually separated */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-24 rounded-3xl border border-amber-300/15 bg-amber-400/[0.03] p-6 sm:p-10"
        >
          <div className="mb-10">
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-amber-200">
              <GraduationCap size={13} />
              Academy — not a signals plan
            </span>
            <div className="flex items-center gap-3 mt-4 mb-2">
              <h3 className="text-2xl font-bold text-white tracking-tight">
                Salvation Crypto Academy
              </h3>
            </div>
            <p className="text-sm text-slate-400 max-w-2xl">
              Education and mentorship, billed separately from the signal
              subscriptions above. You learn to find and manage your own trades
              instead of following ours.
            </p>
            <div className="mt-5 h-px w-full bg-linear-to-r from-amber-400/40 via-white/5 to-transparent" />
          </div>

          <div className="grid md:grid-cols-2 gap-4 items-start">
            {academyPlans.map((plan, i) => (
              <PlanCard
                key={plan.id}
                plan={plan}
                index={i}
                isInView={isInView}
                isHovered={hoveredPlan === plan.id}
                onHoverStart={() => setHoveredPlan(plan.id)}
                onHoverEnd={() => setHoveredPlan(null)}
                accent="amber"
              />
            ))}
          </div>
        </motion.div>

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
