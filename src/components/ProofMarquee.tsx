"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const proofImages = Array.from({ length: 46 }, (_, i) => `/img/testimonies/Salvation/${i + 1}.jpg`);

export function ProofMarquee() {
  return (
    <section className="py-20 overflow-hidden bg-black/40">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Wall of Proof</h2>
        <p className="text-slate-400">Real screenshots from our private community channels</p>
      </div>

      <div className="flex relative">
        <motion.div
          className="flex gap-6 whitespace-nowrap"
          animate={{
            x: ["0%", "-50%"],
          }}
          transition={{
            duration: 40,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {[...proofImages, ...proofImages].map((src, i) => (
            <div
              key={i}
              className="relative w-[250px] h-[450px] rounded-xl overflow-hidden border border-white/10 flex-shrink-0 group shadow-2xl shadow-blue-500/5"
            >
              <Image
                src={src}
                alt={`Proof ${i}`}
                fill
                sizes="(max-width: 768px) 250px, 250px"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
