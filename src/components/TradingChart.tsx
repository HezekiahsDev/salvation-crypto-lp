"use client";

import { useMemo } from "react";

interface Candle {
  x: number;
  open: number;
  close: number;
  high: number;
  low: number;
  isGreen: boolean;
}

export function TradingChart({ className = "" }: { className?: string }) {
  const candles: Candle[] = useMemo(() => {
    const data: Candle[] = [];
    let price = 50;
    for (let i = 0; i < 40; i++) {
      const change = (Math.random() - 0.45) * 8;
      const open = price;
      const close = price + change;
      const high = Math.max(open, close) + Math.random() * 4;
      const low = Math.min(open, close) - Math.random() * 4;
      const isGreen = close >= open;
      data.push({
        x: i * 22,
        open: 100 - open,
        close: 100 - close,
        high: 100 - high,
        low: 100 - low,
        isGreen,
      });
      price = close;
    }
    return data;
  }, []);

  return (
    <svg
      viewBox="0 0 880 200"
      className={`w-full h-full ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id="redGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[40, 80, 120, 160].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2="880"
          y2={y}
          stroke="rgba(59, 130, 246, 0.06)"
          strokeWidth="1"
        />
      ))}

      {/* Candlesticks */}
      {candles.map((c, i) => {
        const bodyTop = Math.min(c.open, c.close);
        const bodyHeight = Math.abs(c.close - c.open) || 1;
        return (
          <g key={i} opacity={0.7 + Math.random() * 0.3}>
            {/* Wick */}
            <line
              x1={c.x + 4}
              y1={c.high}
              x2={c.x + 4}
              y2={c.low}
              stroke={c.isGreen ? "#10b981" : "#ef4444"}
              strokeWidth="1.5"
              opacity="0.6"
            />
            {/* Body */}
            <rect
              x={c.x}
              y={bodyTop}
              width="8"
              height={Math.max(bodyHeight, 2)}
              rx="1.5"
              fill={c.isGreen ? "url(#greenGrad)" : "url(#redGrad)"}
              filter="url(#glow)"
            >
              <animate
                attributeName="opacity"
                values="0;1"
                dur={`${0.5 + i * 0.05}s`}
                fill="freeze"
              />
            </rect>
          </g>
        );
      })}

      {/* Moving average line */}
      <path
        d={`M ${candles
          .map((c, i) => `${c.x + 4},${(c.open + c.close) / 2}`)
          .join(" L ")}`}
        fill="none"
        stroke="url(#lineGrad)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.6"
      >
        <animate
          attributeName="stroke-dashoffset"
          from="2000"
          to="0"
          dur="3s"
          fill="freeze"
        />
        <animate
          attributeName="stroke-dasharray"
          from="0 2000"
          to="2000 0"
          dur="3s"
          fill="freeze"
        />
      </path>
    </svg>
  );
}
