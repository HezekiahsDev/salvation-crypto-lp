"use client";

import { motion } from "framer-motion";
import { Search, TrendingUp } from "lucide-react";

export function BlogHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8"
          >
            <TrendingUp size={14} className="text-blue-400" />
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-blue-400">
              Salvation Crypto Journal
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6"
          >
            Market Insights & <br />
            <span className="gradient-text">Trading Mastery</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="max-w-2xl text-lg text-slate-400 leading-relaxed mb-12"
          >
            Stay ahead of the curve with expert analysis, institutional-grade 
            trading strategies, and the latest updates from the crypto frontier.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative w-full max-w-xl group"
          >
            <div className="absolute inset-0 bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative flex items-center bg-white/[0.03] border border-white/10 rounded-2xl p-2 backdrop-blur-xl focus-within:border-blue-500/50 transition-all">
              <div className="pl-4 pr-2">
                <Search size={20} className="text-slate-500" />
              </div>
              <input
                type="text"
                placeholder="Search articles, strategies, analysis..."
                className="flex-grow bg-transparent border-none focus:ring-0 text-white placeholder:text-slate-600 py-3"
              />
              <button className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-900/20 active:scale-95">
                Search
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
