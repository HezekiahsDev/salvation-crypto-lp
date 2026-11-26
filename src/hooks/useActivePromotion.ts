"use client";

import { useSyncExternalStore } from "react";
import { getActivePromotion, type Promotion } from "@/data/plans";

// Re-check every second so an open page flips on/off in step with the
// banner countdown.
function subscribe(onChange: () => void) {
  const id = window.setInterval(onChange, 1_000);
  return () => window.clearInterval(id);
}

const getServerSnapshot = () => null;

/**
 * The promotion running right now (client clock), or null.
 * The home page is prerendered at build time, so hydration always starts
 * with "no promotion" and switches to the live value right after.
 */
export function useActivePromotion(): Promotion | null {
  return useSyncExternalStore(subscribe, getActivePromotion, getServerSnapshot);
}
