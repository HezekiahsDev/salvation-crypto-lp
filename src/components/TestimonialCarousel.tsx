"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface TestimonialCarouselProps {
  proofImages?: string[];
}

const FALLBACK_IMAGES = [
  "/testimonials/testimonial-1.png",
  "/testimonials/testimonial-2.png",
  "/testimonials/testimonial-3.png",
];

export function TestimonialCarousel({ proofImages }: TestimonialCarouselProps) {
  const images = proofImages && proofImages.length > 0 ? proofImages : FALLBACK_IMAGES;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-white mb-2">Member Results</h3>
        <p className="text-slate-400">Real profits from real members in our community</p>
      </div>

      <div className="relative h-[350px] sm:h-[500px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                x: direction > 0 ? 1000 : -1000,
                opacity: 0,
              }),
              center: {
                zIndex: 1,
                x: 0,
                opacity: 1,
              },
              exit: (direction: number) => ({
                zIndex: 0,
                x: direction < 0 ? 1000 : -1000,
                opacity: 0,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute inset-0 flex items-center justify-center p-4"
          >
            <div className="relative w-full h-full max-w-sm mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/10">
              <Image
                src={images[currentIndex]}
                alt={`Proof ${currentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 384px"
                className="object-contain"
                unoptimized
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          aria-label="Previous proof"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          aria-label="Next proof"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Counter badge */}
        <div className="absolute top-3 right-3 z-10 px-3 py-1 rounded-full bg-black/50 border border-white/10 text-xs text-slate-400 font-mono">
          {currentIndex + 1} / {images.length}
        </div>

        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10 flex-wrap justify-center max-w-[80%]">
          {images.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to proof ${i + 1}`}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-blue-500 w-6" : "bg-white/20 w-2"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
