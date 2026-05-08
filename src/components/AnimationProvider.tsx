"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import AOS from "aos";
import "aos/dist/aos.css";

export function AnimationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
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

    // Initialize AOS
    AOS.init({
      duration: 1000,
      once: false, // Allow animations to repeat when scrolling back up for better storytelling
      mirror: true,
      easing: "ease-out-cubic",
      offset: 100,
    });

    // Refresh AOS on scroll to ensure compatibility with Lenis
    lenis.on("scroll", () => {
      AOS.refresh();
    });

    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
