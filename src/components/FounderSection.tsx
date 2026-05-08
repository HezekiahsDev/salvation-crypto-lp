"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Target, Award, Heart } from "lucide-react";

export function FounderSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="founder"
      ref={ref}
      className="relative py-32 overflow-hidden"
    >
      {/* Spotlight effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Visual side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-[4/5] max-w-md mx-auto">
              {/* Photo placeholder - gradient silhouette */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-[#0a0a2e] to-[#030014]" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10" />

                {/* Abstract silhouette */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-2xl" />
                    <div className="absolute inset-4 rounded-full bg-gradient-to-br from-blue-400/10 to-purple-400/10 border border-white/5" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-bold gradient-text">SC</span>
                    </div>
                  </div>
                </div>

                {/* Grid overlay */}
                <div className="absolute inset-0 grid-bg opacity-30" />
              </div>

              {/* Floating stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute -right-4 sm:right-4 bottom-20 glass-strong rounded-xl p-4 animate-float"
              >
                <p className="text-xs text-slate-500 mb-1">Trading Since</p>
                <p className="text-xl font-bold text-white">2017</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="absolute -left-4 sm:left-4 top-20 glass-strong rounded-xl p-4 animate-float-delayed"
              >
                <p className="text-xs text-slate-500 mb-1">Students Mentored</p>
                <p className="text-xl font-bold text-white">2,847+</p>
              </motion.div>

              {/* Glow ring */}
              <div className="absolute -inset-px rounded-3xl border border-blue-500/10" />
            </div>
          </motion.div>

          {/* Content side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-block text-sm font-semibold text-blue-400/80 tracking-widest uppercase mb-4">
              Meet the Founder
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-6">
              Built by a Trader,{" "}
              <span className="gradient-text">for Traders</span>
            </h2>

            <div className="space-y-5 text-slate-400 leading-relaxed mb-10">
              <p>
                I started trading in 2017 with $200 and zero knowledge. I blew my
                first 3 accounts, lost money I couldn&apos;t afford to lose, and
                almost gave up entirely.
              </p>
              <p>
                But I didn&apos;t quit. I studied obsessively, found real mentors,
                and developed a systematic approach to the markets. By 2019, I
                was consistently profitable. By 2020, I was managing funded
                accounts.
              </p>
              <p className="text-slate-300 font-medium">
                Salvation Crypto Academy exists because I remember what it felt
                like to be lost, scammed, and hopeless. This is the mentorship I
                wish I had on day one.
              </p>
            </div>

            {/* Values */}
            <div className="space-y-4">
              {[
                {
                  icon: Target,
                  title: "Transparency First",
                  desc: "I show my wins AND my losses. No fake screenshots.",
                },
                {
                  icon: Award,
                  title: "Proven Track Record",
                  desc: "Multiple funded accounts. Verified trading history.",
                },
                {
                  icon: Heart,
                  title: "Genuine Mission",
                  desc: "Building the next generation of disciplined, profitable traders.",
                },
              ].map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + i * 0.15 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="mt-0.5 w-10 h-10 rounded-lg bg-blue-500/10 border border-white/5 flex items-center justify-center text-blue-400 shrink-0 group-hover:border-blue-500/20 transition-all">
                    <value.icon size={18} />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm mb-1">
                      {value.title}
                    </h4>
                    <p className="text-slate-500 text-sm">{value.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 section-divider" />
    </section>
  );
}
