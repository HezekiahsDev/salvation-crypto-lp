"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Flame } from "lucide-react";
import { getActivePromotion, getUpcomingPromotion } from "@/data/plans";
import { handleHashClick } from "@/lib/scrollToSection";

const BAR_HEIGHT = "40px";

function formatCountdown(ms: number): string {
  const total = Math.max(0, Math.floor(ms / 1000));
  const d = Math.floor(total / 86400);
  const h = Math.floor((total % 86400) / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const clock = [h, m, s].map((n) => String(n).padStart(2, "0")).join(":");
  return d > 0 ? `${d}d ${clock}` : clock;
}

/**
 * Sticky top bar. Before a promotion starts it counts down to the start;
 * once live it counts down to the end, then disappears.
 */
export function PromoBanner() {
  const pathname = usePathname();
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const tick = () => setNow(new Date());
    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, []);

  const live = now ? getActivePromotion(now) : null;
  const upcoming = now && !live ? getUpcomingPromotion(now) : null;
  const promotion = live ?? upcoming;
  const visible = promotion !== null && !pathname?.startsWith("/admin");

  // Push the fixed nav and page content down by the bar's height.
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--promo-bar-h", visible ? BAR_HEIGHT : "0px");
    return () => {
      root.style.removeProperty("--promo-bar-h");
    };
  }, [visible]);

  if (!visible || !promotion || !now) return null;

  const percent = Math.round(promotion.rate * 100);
  const target = live ? promotion.endsAt : promotion.startsAt;
  const countdown = formatCountdown(target.getTime() - now.getTime());

  return (
    <div
      role="region"
      aria-label={`${promotion.name} sale`}
      className="fixed inset-x-0 top-0 z-[130] flex items-center justify-center bg-linear-to-r from-amber-400 via-orange-500 to-amber-400 px-3 sm:px-4 text-black shadow-lg shadow-orange-500/20"
      style={{ height: BAR_HEIGHT }}
    >
      <Link
        href="/#pricing"
        onClick={(e) => handleHashClick(e, "pricing")}
        className="flex min-w-0 items-center gap-2 sm:gap-3 text-[11px] sm:text-sm font-black uppercase tracking-normal sm:tracking-wider"
      >
        <Flame size={15} className="shrink-0" />
        <span className="truncate">
          {promotion.name}: {percent}% off
          <span className="hidden sm:inline"> all plans</span>
        </span>
        <span className="shrink-0 rounded-md bg-black px-1.5 sm:px-2 py-0.5 font-mono text-[11px] sm:text-xs text-amber-300 tabular-nums">
          {live ? "Ends" : "Starts"}
          <span className="hidden sm:inline"> in</span> {countdown}
        </span>
        <span className="hidden md:inline-flex shrink-0 items-center gap-1 underline underline-offset-2">
          {live ? "Claim deal" : "See plans"}
          <ArrowRight size={14} />
        </span>
        <ArrowRight size={14} className="shrink-0 md:hidden" />
      </Link>
    </div>
  );
}
