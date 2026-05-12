import { plans } from "@/data/plans";
import { notFound } from "next/navigation";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { 
  Check, 
  ArrowLeft, 
  Wallet, 
  ShieldCheck, 
  Zap, 
  Clock, 
  CreditCard 
} from "lucide-react";
import { CopyButton } from "@/components/CopyButton";
import Link from "next/link";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const plan = plans.find((p) => p.id === id);
  if (!plan) return { title: "Plan Not Found" };

  return {
    title: `${plan.name} - Salvation Crypto Academy`,
    description: `Details and payment instructions for the ${plan.name} plan.`,
  };
}

export default async function PlanDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const plan = plans.find((p) => p.id === id);

  if (!plan) {
    notFound();
  }

  return (
    <>
      <Navigation />
      
      <main className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            href="/#pricing" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            Back to Pricing
          </Link>

          {/* Plan Header - High Impact */}
          <div className="mb-12 p-8 rounded-3xl bg-white/[0.03] border border-white/10 backdrop-blur-xl">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-blue-500/10 text-blue-400">
                  {plan.icon ? <plan.icon size={40} /> : <Zap size={40} />}
                </div>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">{plan.name}</h1>
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-sm">{plan.duration} Access</p>
                </div>
              </div>
              <div className="flex items-baseline gap-2 p-6 rounded-2xl bg-white/5 border border-white/5">
                {plan.price ? (
                  <>
                    <span className="text-5xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-500">{plan.period}</span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-white">Custom Pricing</span>
                )}
              </div>
            </div>
            <p className="text-xl text-slate-400 mt-8 leading-relaxed max-w-3xl">
              {plan.description}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Left Column: Social Proof (Now Primary) */}
            <div className="space-y-8 h-full">
              <div className="p-1 rounded-3xl bg-gradient-to-br from-blue-500/20 to-purple-500/20">
                <div className="rounded-[calc(1.5rem-1px)] bg-[#030014] overflow-hidden">
                  <TestimonialCarousel proofImages={plan.proofImages} />
                </div>
              </div>
              
              {/* Trust Badge */}
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <ShieldCheck className="text-blue-400 shrink-0" size={32} />
                <div>
                  <h4 className="text-white font-bold text-sm">Join a Winning Community</h4>
                  <p className="text-xs text-slate-500">Real results from real members. Join the elite circle of profitable traders.</p>
                </div>
              </div>
            </div>

            {/* Right Column: Enrollment Instructions */}
            <div className="space-y-8">
              <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-white/10 backdrop-blur-xl h-full">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <CreditCard className="text-blue-400" />
                  {plan.isExclusive ? "How to Apply" : "Secure Enrollment"}
                </h2>

                <div className="space-y-6">
                  {plan.isExclusive ? (
                    <>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        The <span className="text-white font-bold">{plan.name}</span> requires direct onboarding.
                      </p>
                      <div className="p-6 rounded-2xl bg-blue-500/5 border border-blue-500/20 space-y-4">
                        <p className="text-sm text-slate-300">
                          {plan.id === 'inner-caucus' 
                            ? "To apply for the Inner Caucus, please fill out our private application form. Our team will review your application and contact you if you're a good fit." 
                            : plan.id === 'one-on-one'
                            ? "To apply for One-on-One mentorship, please message the Secretary directly. They will discuss your goals and provide the next steps."
                            : "To apply for membership, please contact our senior support team. They will guide you through the vetting process and provide secure payment instructions."}
                        </p>
                        <a 
                          href={plan.supportLink || "https://t.me/salvationcrypto_support"} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20"
                        >
                          {plan.id === 'inner-caucus' ? 'Fill Application Form' : 
                           plan.id === 'one-on-one' ? 'Message Secretary to Apply' : 
                           'Contact Support to Apply'}
                        </a>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="text-slate-400 text-sm">
                        Please send the exact amount of <span className="text-white font-bold">${plan.price}</span> to any address below:
                      </p>

                      <div className="space-y-4">
                        {plan.paymentInstructions.crypto.map((crypto, i) => (
                          <div key={i} className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Wallet size={16} className="text-blue-400" />
                                <span className="text-xs font-bold text-white uppercase tracking-wider">
                                  {crypto.symbol} ({crypto.network})
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 bg-white/5 p-3 rounded-lg group">
                              <code className="text-xs text-blue-300 break-all flex-grow font-mono">
                                {crypto.address}
                              </code>
                              <CopyButton text={crypto.address} />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
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

                      <a 
                        href={`${plan.supportContact}?text=${encodeURIComponent(`Hello, I've just made payment for the ${plan.name} (${plan.duration}) plan. Here is my proof of payment:`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg shadow-blue-600/20 text-center block"
                      >
                        I've Made Payment
                      </a>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Features Detail - Moved Below Grid */}
          <div className="mt-12 p-8 rounded-3xl bg-white/[0.02] border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Check size={24} className="text-green-500" />
              Everything you get with {plan.name}
            </h3>
            <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3 text-slate-400 bg-white/5 p-4 rounded-xl border border-white/5">
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
