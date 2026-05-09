"use client";

import { motion } from "framer-motion";

const categories = [
  "All Articles",
  "Market Analysis",
  "Trading Strategy",
  "Crypto Education",
  "Academy Updates",
  "Psychology",
];

interface BlogFiltersProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export function BlogFilters({ activeCategory, setActiveCategory }: BlogFiltersProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3 mb-16">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`relative px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
            activeCategory === category
              ? "text-white"
              : "text-slate-500 hover:text-slate-300 bg-white/[0.02] border border-white/5"
          }`}
        >
          {activeCategory === category && (
            <motion.div
              layoutId="activeFilter"
              className="absolute inset-0 bg-blue-600 rounded-full"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="relative z-10">{category}</span>
        </button>
      ))}
    </div>
  );
}
