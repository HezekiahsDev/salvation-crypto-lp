"use client";

import type { MouseEvent } from "react";

type LenisLike = { scrollTo: (target: string) => void };

type LenisWindow = Window & { __lenis?: LenisLike };

const MAX_ATTEMPTS = 60;

function getLenis(): LenisLike | null {
  return (window as LenisWindow).__lenis ?? null;
}

function scrollToId(id: string): void {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(`#${id}`);
  } else {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}

export function handleHashClick(e: MouseEvent<HTMLElement>, id: string): void {
  if (window.location.pathname !== "/") return;

  e.preventDefault();

  if (document.getElementById(id)) {
    scrollToId(id);
    return;
  }

  let attempts = 0;
  const retry = () => {
    if (document.getElementById(id)) {
      scrollToId(id);
      return;
    }
    attempts += 1;
    if (attempts < MAX_ATTEMPTS) {
      requestAnimationFrame(retry);
    }
  };
  requestAnimationFrame(retry);
}