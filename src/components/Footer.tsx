"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const footerLinks = {
  Academy: [
    { label: "Curriculum", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Testimonials", href: "/#testimonials" },
    { label: "FAQ", href: "/#faq" },
  ],
  Resources: [
    { label: "Trading Blog", href: "/blog" },
    { label: "Free Webinars", href: "#" },
    { label: "Market Analysis", href: "#" },
    { label: "Trading Tools", href: "#" },
  ],
  Company: [
    { label: "About Us", href: "/#founder" },
    { label: "Contact", href: "https://wa.me/2347026821951" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socialLinks = [
  { label: "Twitter", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "YouTube", href: "#" },
  { label: "Telegram", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#020010]">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-xl overflow-hidden shadow-lg shadow-blue-500/20">
                <img
                  src="/img/logo/icon.png"
                  alt="Salvation Crypto"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-lg font-semibold text-white tracking-tight">
                Salvation<span className="text-blue-400">Crypto</span>
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              The premium trading academy transforming beginners into
              consistently profitable, master traders.
            </p>
          </div>

          {Object.entries(footerLinks).map(([category, links], i) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-white mb-4 tracking-wide">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 border-t border-white/5">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Salvation Crypto Academy. All rights
            reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-white transition-colors"
              >
                {social.label}
                <ArrowUpRight size={10} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Risk disclaimer */}
        <div className="mt-10 p-5 rounded-xl bg-white/[0.02] border border-white/5">
          <p className="text-[11px] text-slate-600 leading-relaxed text-center">
            <span className="text-slate-500 font-semibold">
              Risk Disclaimer:
            </span>{" "}
            Trading cryptocurrencies and digital assets on margin carries a high
            level of risk and may not be suitable for all investors. Past
            performance is not indicative of future results. The high degree of
            leverage can work against you as well as for you. Before deciding to
            trade, you should carefully consider your investment objectives,
            level of experience, and risk appetite. The possibility exists that
            you could sustain a loss of some or all of your initial investment.
            You should be aware of all the risks associated with trading and
            seek advice from an independent financial advisor if you have any
            doubts.
          </p>
        </div>
      </div>
    </footer>
  );
}
