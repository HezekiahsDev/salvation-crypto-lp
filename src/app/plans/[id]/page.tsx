import { formatPlanPrice, getPlanPaymentPrice, plans, DISCOUNT_RATE } from "@/data/plans";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import {
  Check,
  Wallet,
  ShieldCheck,
  Zap,
  Clock,
  CreditCard,
  Lock,
} from "lucide-react";
import { CopyButton } from "@/components/CopyButton";

import { Metadata } from "next";

import { FiatCheckoutForm } from "@/components/payment/FiatCheckoutForm";
import { PaymentVerification } from "@/components/payment/PaymentVerification";
import { CryptoSupportButton } from "@/components/payment/CryptoSupportButton";
import WhatsAppButton from "@/components/WhatsAppButton";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    reference?: string | string[];
    trxref?: string | string[];
  }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const decodedId = decodeURIComponent(String(id));
  const plan =
    plans.find((p) => p.id === decodedId) ||
    plans.find((p) => slugify(p.name) === decodedId) ||
    plans.find((p) => p.id === String(id));
  if (!plan) return { title: "Plan Not Found" };

  return {
    title: `${plan.name} - Salvation Crypto Academy`,
    description: `Details and payment instructions for the ${plan.name} plan.`,
  };
}

export default async function PlanDetailsPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  // `searchParams` may contain string or string[] depending on how Next provides repeated query params.
  const sp = await searchParams;
  const refParam = sp?.reference ?? sp?.trxref;
  const reference = Array.isArray(refParam) ? String(refParam[0]) : refParam;

  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

  const decodedId = decodeURIComponent(String(id));
  const plan =
    plans.find((p) => p.id === decodedId) ||
    plans.find((p) => slugify(p.name) === decodedId) ||
    plans.find((p) => p.id === String(id));

  if (!plan) {
    notFound();
  }

  const paymentPrice = getPlanPaymentPrice(plan);
  const isOpen = plan.applicationsOpen !== false;

  return (
    <>
      <Navigation />

      {reference && (
        <PaymentVerification
          reference={reference}
          planName={plan.name}
          planId={plan.id}
          supportLink={plan.supportLink}
        />
      )}

      <main className="relative pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Applications closed banner */}
          {!isOpen && (
            <div className="mb-8 p-6 rounded-2xl bg-red-500/10 border border-red-400/30 backdrop-blur-md">
              <div className="flex items-center gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-500/15 text-red-400">
                  <Lock size={24} />
                </span>
                <div>
                  <h2 className="text-white font-bold text-base sm:text-lg">
                    Applications Currently Closed
                  </h2>
                  <p className="text-sm text-slate-400 mt-1 leading-relaxed">
                    We are not accepting new academy applications right now.
                    We&apos;ll announce when our doors open again — stay tuned.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Plan Header - Ultra Compact */}
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-md">
            <div className="flex flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="hidden xs:block p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  {plan.icon ? <plan.icon size={20} /> : <Zap size={20} />}
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight">
                    {plan.name}
                  </h1>
                  <p className="text-blue-400/80 font-bold uppercase tracking-widest text-[9px] sm:text-[10px]">
                    {plan.duration} Access
                  </p>
                </div>
              </div>
              <div className="relative flex flex-col items-start gap-0.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-white/5 border border-white/5 w-fit shrink-0">
                {/* Discount tag shown across all plans */}
                {DISCOUNT_RATE > 0 && (
                  <span className="absolute -top-2 right-2 inline-flex items-center rounded-full bg-amber-400 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider text-black shadow-md shadow-amber-500/20 ring-1 ring-amber-200">
                    {Math.round(DISCOUNT_RATE * 100)}% off
                  </span>
                )}
                {paymentPrice !== null ? (
                  <>
                    {plan.id !== "inner-caucus" &&
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
                      <span className="text-xl sm:text-2xl font-bold text-white">
                        ${formatPlanPrice(paymentPrice)}
                      </span>
                      <span className="text-slate-500 text-[10px] sm:text-xs">
                        {plan.period}
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-base font-bold text-white">Custom</span>
                )}
              </div>
            </div>
            <p className="text-sm sm:text-base text-slate-400 mt-4 leading-relaxed max-w-4xl border-t border-white/5 pt-4">
              {plan.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column: Social Proof (Now Primary) */}
            <div className="space-y-8 h-full">
              <div className="p-1 rounded-3xl bg-linear-to-br from-blue-500/20 to-purple-500/20">
                <div className="rounded-[calc(1.5rem-1px)] bg-[#030014] overflow-hidden">
                  <TestimonialCarousel proofImages={plan.proofImages} />
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <ShieldCheck className="text-blue-400 shrink-0" size={32} />
                <div>
                  <h4 className="text-white font-bold text-sm">
                    Join a Winning Community
                  </h4>
                  <p className="text-xs text-slate-500">
                    Real results from real members. Join the elite circle of
                    profitable traders.
                  </p>
                </div>
              </div>
              <div className="mt-4 p-4 rounded-2xl bg-white/3 border border-white/5">
                <p className="text-sm text-slate-400 mb-2">
                  For inquiries, Call or Message support (WhatsApp only)
                </p>
                <WhatsAppButton
                  className="w-full flex justify-center"
                  message={`Hello, I would like to inquire about the ${plan.name} plan.`}
                />
              </div>
            </div>

            {/* Right Column: Enrollment Instructions */}
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-linear-to-br from-blue-600/10 to-purple-600/10 border border-white/10 backdrop-blur-xl h-full">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                  <CreditCard className="text-blue-400" />
                  {!isOpen
                    ? "Applications Closed"
                    : plan.isExclusive
                      ? "How to Apply"
                      : "Pay with Crypto"}
                </h2>

                <div className="space-y-4">
                  {!isOpen ? (
                    <>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        The{" "}
                        <span className="text-white font-bold">
                          {plan.name}
                        </span>{" "}
                        is currently{" "}
                        <span className="text-red-400 font-bold">
                          not accepting applications
                        </span>{" "}
                        or payments.
                      </p>
                      <div className="p-6 rounded-2xl bg-red-500/5 border border-red-500/20 space-y-3 text-center">
                        <Clock size={32} className="mx-auto text-red-400" />
                        <p className="text-sm text-slate-300 font-semibold">
                          We&apos;ll announce when applications open again
                        </p>
                        <p className="text-xs text-slate-500">
                          Contact us on WhatsApp to be notified when enrollment
                          reopens.
                        </p>
                        <WhatsAppButton
                          message={`Hello, please notify me when applications for the ${plan.name} reopen.`}
                          className="w-full"
                        >
                          <span className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-4 text-white text-sm font-bold hover:bg-emerald-700">
                            Notify Me When Open
                          </span>
                        </WhatsAppButton>
                      </div>
                    </>
                  ) : plan.isExclusive ? (
                    <>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        The{" "}
                        <span className="text-white font-bold">
                          {plan.name}
                        </span>{" "}
                        requires direct onboarding.
                      </p>
                      <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-4">
                        <p className="text-sm text-slate-300">
                          {plan.id === "inner-caucus"
                            ? "To apply for the Inner Caucus, please fill out our private application form. Our team will review your application and contact you if you're a good fit."
                            : plan.id === "one-on-one"
                              ? "To apply for One-on-One mentorship, please message the Secretary directly. They will discuss your goals and provide the next steps."
                              : "To apply for membership, please contact our senior support team. They will guide you through the vetting process and provide secure payment instructions."}
                        </p>
                        <a
                          href={
                            plan.supportLink ||
                            "https://t.me/salvationcrypto_support"
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20"
                        >
                          {plan.id === "inner-caucus"
                            ? "Fill Application Form"
                            : plan.id === "one-on-one"
                              ? "Fill the Application Form"
                              : "Contact Support to Apply"}
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-400 text-sm">
                        Please send the exact amount of{" "}
                        <span className="text-white font-bold">
                          ${formatPlanPrice(paymentPrice)}
                        </span>{" "}
                        to any address below:
                      </p>

                      <div className="space-y-2">
                        {plan.paymentInstructions.crypto.map((crypto, i) => (
                          <div
                            key={i}
                            className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Wallet size={16} className="text-blue-400" />
                                <span className="text-xs font-bold text-white uppercase tracking-wider">
                                  {crypto.symbol} ({crypto.network})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg group">
                              <code className="text-xs text-blue-300 break-all grow font-mono">
                                {crypto.address}
                              </code>
                              <CopyButton text={crypto.address} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <CryptoSupportButton
                        supportContact={
                          plan.supportContact ||
                          "https://wa.me/2347026821951"
                        }
                        planName={plan.name}
                        duration={plan.duration}
                      />

                      {!plan.isExclusive && paymentPrice !== null && (
                        <FiatCheckoutForm
                          planId={plan.id}
                          price={formatPlanPrice(paymentPrice)}
                          planName={plan.name}
                        />
                      )}
                    </>
                  )}
                </div>

                {isOpen && (
                  <div className="p-6 mt-4 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
                    <div className="flex items-center gap-2 text-yellow-500 mb-2">
                      <Clock size={18} />
                      <h4 className="font-bold text-sm">Quick Setup</h4>
                    </div>
                    <ol className="text-xs text-slate-400 space-y-2 list-decimal ml-4">
                      <li>Send payment & take a screenshot.</li>
                      <li>Message support with your receipt.</li>
                      <li>Get access within minutes.</li>
                    </ol>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Features Detail - Moved Below Grid */}
          <div className="mt-12 p-8 rounded-3xl bg-white/2 border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Check size={24} className="text-green-500" />
              Everything you get with {plan.name}
            </h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {plan.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-400 bg-white/5 p-4 rounded-xl border border-white/5"
                >
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500 shrink-0 shadow-lg shadow-blue-500/50" />
                  <span className="text-sm font-medium">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
