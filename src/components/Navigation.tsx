"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Academy", href: "/#features" },
  { label: "Results", href: "/#testimonials" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "FAQ", href: "/#faq" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Set mounted asynchronously to avoid lint warning and cascading renders
    const raf = requestAnimationFrame(() => setMounted(true));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!mounted)
    return (
      <nav className="fixed top-0 left-0 right-0 z-[100] py-5 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/5 animate-pulse" />
            <span className="text-lg font-semibold text-white/50">
              Salvation Crypto
            </span>
          </div>
        </div>
      </nav>
    );

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? "py-3 bg-black/90 backdrop-blur-[60px] shadow-lg shadow-black/40 border-b border-white/10"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20">
              <Image
                src="/img/logo/icon.png"
                alt="Salvation Crypto"
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-lg font-semibold tracking-tight text-white hidden sm:block">
              Salvation<span className="text-blue-400">Crypto</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white transition-colors duration-300 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/#pricing"
              className="btn-primary text-sm !py-2.5 !px-6 inline-flex items-center gap-2"
            >
              Join Academy
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              className="fixed inset-0 z-[98] bg-black/40 backdrop-blur-[20px] md:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-x-0 top-[70px] z-[99] p-4 md:hidden"
            >
              <div className="bg-[#05001a]/95 backdrop-blur-[60px] rounded-2xl p-6 space-y-1 shadow-2xl shadow-black/80 border border-white/10">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="block px-4 py-3 text-base font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-xl transition-all text-center"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="pt-4 border-t border-white/5">
                  <Link
                    href="/#pricing"
                    onClick={() => setIsMobileOpen(false)}
                    className="btn-primary block text-center !py-3 shadow-lg shadow-blue-500/20"
                  >
                    Join Academy
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
