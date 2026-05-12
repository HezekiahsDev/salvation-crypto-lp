"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CinematicBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const elements = containerRef.current.querySelectorAll(".floating-element");
    
    elements.forEach((el) => {
      // Random movement for each element
      gsap.to(el, {
        x: "random(-40, 40)",
        y: "random(-40, 40)",
        rotation: "random(-15, 15)",
        duration: "random(3, 6)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: "random(0, 2)",
      });
    });

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;

      if (!containerRef.current) return;
      gsap.to(containerRef.current, {
        x: xPos,
        y: yPos,
        duration: 1,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.killTweensOf(elements);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-30"
    >
      {/* Abstract floating shapes */}
      <div className="floating-element absolute top-[10%] left-[5%] w-64 h-64 bg-blue-600/10 rounded-full blur-[80px]" />
      <div className="floating-element absolute bottom-[15%] right-[10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[100px]" />
      <div className="floating-element absolute top-[40%] right-[20%] w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px]" />
      <div className="floating-element absolute bottom-[40%] left-[15%] w-72 h-72 bg-blue-400/5 rounded-full blur-[90px]" />
      
      {/* Grid lines */}
      <div className="absolute inset-0 grid-bg opacity-20" />
    </div>
  );
}
