"use client";

import { useEffect, useRef } from "react";

export function MouseFollowGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.setProperty("--mouse-x", `${e.clientX}px`);
        glowRef.current.style.setProperty("--mouse-y", `${e.clientY}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(59, 130, 246, 0.04), transparent 40%)",
      }}
    />
  );
}
