"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    id: 1,
    image: "/testimonials/testimonial-1.png",
    author: "Telegram User",
    text: "Just hit 500% profit on the SOL call! Thank you Salvation Crypto!",
  },
  {
    id: 2,
    image: "/testimonials/testimonial-2.png",
    author: "Discord Member",
    text: "The Inner Caucus info is insane, I doubled my portfolio in a month! Best investment ever.",
  },
  {
    id: 3,
    image: "/testimonials/testimonial-3.png",
    author: "Academy Student",
    text: "The Academy modules are so clear. I finally understand market structure!",
  },
];

export function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h3 className="text-2xl font-bold text-white mb-2">Social Proof</h3>
        <p className="text-slate-400">Join hundreds of successful traders in our community</p>
      </div>

      <div className="relative h-[350px] sm:h-[450px] overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">
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
            className="absolute inset-0 flex flex-col items-center justify-center p-6"
          >
            <div className="relative w-full h-full max-w-md mx-auto rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <Image
                src={testimonials[currentIndex].image}
                alt={`Testimonial ${currentIndex + 1}`}
                fill
                sizes="(max-width: 768px) 100vw, 448px"
                className="object-contain"
              />
            </div>
            <div className="mt-6 text-center">
              <Quote className="text-blue-500 mx-auto mb-2 opacity-50" size={24} />
              <p className="text-lg font-medium text-white italic">
                "{testimonials[currentIndex].text}"
              </p>
              <p className="text-sm text-blue-400 mt-2 font-semibold">
                — {testimonials[currentIndex].author}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Controls */}
        <button
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors border border-white/10"
        >
          <ChevronRight size={24} />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-blue-500 w-6" : "bg-white/20"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
