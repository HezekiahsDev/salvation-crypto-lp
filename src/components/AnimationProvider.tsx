"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
// AOS removed to reduce page load and rely on framer-motion for in-view animations

export function AnimationProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
      infinite: false,
    });

    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // No AOS initialization. Framer Motion handles reveal animations.

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
