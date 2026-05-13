"use client";

import { useEffect, useRef, useState, useCallback } from "react";

// ── types ──────────────────────────────────────────────────────────────────
interface Candle {
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number; // 0–1 normalised
}

// ── helpers ────────────────────────────────────────────────────────────────
function nextCandle(prev: Candle): Candle {
  const bias = 0.52; // slight bullish drift
  const change = (Math.random() - (1 - bias)) * 6;
  const open = prev.close;
  const close = Math.min(Math.max(open + change, 5), 95);
  const high = Math.max(open, close) + Math.random() * 3;
  const low = Math.min(open, close) - Math.random() * 3;
  return { open, close, high, low, volume: 0.2 + Math.random() * 0.8 };
}

function seed(count: number): Candle[] {
  const list: Candle[] = [{ open: 50, close: 52, high: 54, low: 48, volume: 0.6 }];
  for (let i = 1; i < count; i++) list.push(nextCandle(list[i - 1]));
  return list;
}

// ── chart dimensions ───────────────────────────────────────────────────────
const W = 900;
const H = 220;
const PADDING_TOP = 16;
const PADDING_BOTTOM = 40; // room for volume bars
const CHART_H = H - PADDING_TOP - PADDING_BOTTOM;
const CANDLE_W = 10;
const CANDLE_GAP = 8;
const CANDLE_STEP = CANDLE_W + CANDLE_GAP;
const VISIBLE = Math.floor(W / CANDLE_STEP); // ~50

const priceToY = (p: number, lo: number, hi: number) => {
  const range = hi - lo || 1;
  return PADDING_TOP + CHART_H - ((p - lo) / range) * CHART_H;
};

const volBarH = (v: number) => v * (PADDING_BOTTOM - 4);

// ── component ──────────────────────────────────────────────────────────────
export function TradingChart({ className = "" }: { className?: string }) {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [livePrice, setLivePrice] = useState(50);
  const [mounted, setMounted] = useState(false);
  
  const tickRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const priceTickRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
    const initialCandles = seed(VISIBLE);
    setCandles(initialCandles);
    setLivePrice(initialCandles[initialCandles.length - 1].close);
  }, []);

  // Every ~2s: push a new finished candle and start fresh live candle
  const pushCandle = useCallback(() => {
    setCandles((prev) => {
      const next = [...prev.slice(-(VISIBLE - 1)), nextCandle(prev[prev.length - 1])];
      setLivePrice(next[next.length - 1].close);
      return next;
    });
  }, []);

  // Every ~120ms: wiggle the live price inside the forming candle's range
  const tickPrice = useCallback(() => {
    setCandles((prev) => {
      const last = prev[prev.length - 1];
      const noise = (Math.random() - 0.48) * 1.2;
      const newClose = Math.min(Math.max(last.close + noise, last.low - 0.5), last.high + 0.5);
      const newHigh = Math.max(last.high, newClose);
      const newLow = Math.min(last.low, newClose);
      const updated = { ...last, close: newClose, high: newHigh, low: newLow };
      setLivePrice(newClose);
      return [...prev.slice(0, -1), updated];
    });
  }, []);

  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const schedulePush = () => {
      tickRef.current = setTimeout(() => {
        pushCandle();
        schedulePush();
      }, 1800 + Math.random() * 800);
    };
    const scheduleTick = () => {
      priceTickRef.current = setTimeout(() => {
        tickPrice();
        scheduleTick();
      }, 100 + Math.random() * 80);
    };
    schedulePush();
    scheduleTick();
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
      if (priceTickRef.current) clearTimeout(priceTickRef.current);
    };
  }, [pushCandle, tickPrice, isVisible]);

  if (!mounted || candles.length === 0) return null;

  // ── derived layout ───────────────────────────────────────────────────────
  const prices = candles.flatMap((c) => [c.high, c.low]);
  const lo = Math.min(...prices) - 2;
  const hi = Math.max(...prices) + 2;

  const livePriceY = priceToY(livePrice, lo, hi);
  const lastCandle = candles[candles.length - 1];
  const lastIsGreen = lastCandle.close >= lastCandle.open;

  // moving average (5-period)
  const maPoints = candles.map((c, i) => {
    const slice = candles.slice(Math.max(0, i - 4), i + 1);
    const avg = slice.reduce((s, cc) => s + (cc.open + cc.close) / 2, 0) / slice.length;
    const x = i * CANDLE_STEP + CANDLE_W / 2;
    const y = priceToY(avg, lo, hi);
    return `${x},${y}`;
  });
  const maPath = `M ${maPoints.join(" L ")}`;

  return (
    <svg
      ref={containerRef}
      viewBox={`0 0 ${W} ${H}`}
      className={`w-full h-full ${className}`}
      preserveAspectRatio="none"
    >
      <defs>
        {/* Green candle gradient */}
        <linearGradient id="tcGreen" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        {/* Red candle gradient */}
        <linearGradient id="tcRed" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="100%" stopColor="#dc2626" />
        </linearGradient>
        {/* Volume green */}
        <linearGradient id="tcVolG" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0.1" />
        </linearGradient>
        {/* Volume red */}
        <linearGradient id="tcVolR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
        </linearGradient>
        {/* MA line gradient */}
        <linearGradient id="tcMA" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#818cf8" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.6" />
        </linearGradient>
        {/* Live price line gradient */}
        <linearGradient id="tcLive" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={lastIsGreen ? "#10b981" : "#ef4444"} stopOpacity="0" />
          <stop offset="80%" stopColor={lastIsGreen ? "#10b981" : "#ef4444"} stopOpacity="0.7" />
          <stop offset="100%" stopColor={lastIsGreen ? "#10b981" : "#ef4444"} stopOpacity="1" />
        </linearGradient>
        {/* Glow filter for candle bodies */}
        <filter id="tcGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Stronger glow for live candle */}
        <filter id="tcGlowStrong" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        {/* Price label glow */}
        <filter id="tcLabelGlow" x="-30%" y="-50%" width="160%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Horizontal grid lines ── */}
      {[0.2, 0.4, 0.6, 0.8].map((t) => {
        const y = PADDING_TOP + CHART_H * t;
        return (
          <line
            key={t}
            x1={0} y1={y} x2={W} y2={y}
            stroke="rgba(99,102,241,0.07)"
            strokeWidth="1"
            strokeDasharray="4 6"
          />
        );
      })}

      {/* ── Volume bars (bottom strip) ── */}
      {candles.map((c, i) => {
        const bh = volBarH(c.volume);
        return (
          <rect
            key={`vol-${i}`}
            x={i * CANDLE_STEP}
            y={H - bh}
            width={CANDLE_W}
            height={bh}
            rx={1}
            fill={c.close >= c.open ? "url(#tcVolG)" : "url(#tcVolR)"}
            opacity={0.7}
          />
        );
      })}

      {/* ── Candle bodies + wicks ── */}
      {candles.map((c, i) => {
        const isLast = i === candles.length - 1;
        const isGreen = c.close >= c.open;
        const bodyTop = priceToY(Math.max(c.open, c.close), lo, hi);
        const bodyBot = priceToY(Math.min(c.open, c.close), lo, hi);
        const bodyH = Math.max(bodyBot - bodyTop, 1.5);
        const wickTop = priceToY(c.high, lo, hi);
        const wickBot = priceToY(c.low, lo, hi);
        const cx = i * CANDLE_STEP + CANDLE_W / 2;
        const color = isGreen ? "#34d399" : "#f87171";

        return (
          <g key={`c-${i}`} filter={isLast ? "url(#tcGlowStrong)" : "url(#tcGlow)"}>
            {/* Wick */}
            <line
              x1={cx} y1={wickTop}
              x2={cx} y2={wickBot}
              stroke={color}
              strokeWidth={isLast ? 1.5 : 1}
              opacity={isLast ? 1 : 0.65}
            />
            {/* Body */}
            <rect
              x={i * CANDLE_STEP}
              y={bodyTop}
              width={CANDLE_W}
              height={bodyH}
              rx={1.5}
              fill={isGreen ? "url(#tcGreen)" : "url(#tcRed)"}
              opacity={isLast ? 1 : 0.8}
            >
              {/* Entry fade-in for new candles */}
              {isLast && (
                <animate
                  attributeName="opacity"
                  from="0"
                  to="1"
                  dur="0.3s"
                  fill="freeze"
                />
              )}
            </rect>
            {/* Highlight sheen on body */}
            <rect
              x={i * CANDLE_STEP + 1}
              y={bodyTop + 1}
              width={3}
              height={Math.max(bodyH - 2, 0)}
              rx={1}
              fill="rgba(255,255,255,0.15)"
            />
          </g>
        );
      })}

      {/* ── Moving average line ── */}
      <path
        d={maPath}
        fill="none"
        stroke="url(#tcMA)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0.85}
      />

      {/* ── Live price horizontal line ── */}
      <line
        x1={0}
        y1={livePriceY}
        x2={W}
        y2={livePriceY}
        stroke={lastIsGreen ? "#10b981" : "#ef4444"}
        strokeWidth="0.75"
        strokeDasharray="4 5"
        opacity={0.6}
      />

      {/* ── Glowing live price dot on last candle ── */}
      <circle
        cx={(candles.length - 1) * CANDLE_STEP + CANDLE_W / 2}
        cy={livePriceY}
        r={3}
        fill={lastIsGreen ? "#34d399" : "#f87171"}
        filter="url(#tcGlowStrong)"
      >
        <animate attributeName="r" values="2.5;4;2.5" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1s" repeatCount="indefinite" />
      </circle>

      {/* ── Price label ── */}
      <g filter="url(#tcLabelGlow)">
        <rect
          x={W - 58}
          y={livePriceY - 9}
          width={56}
          height={18}
          rx={3}
          fill={lastIsGreen ? "#059669" : "#dc2626"}
          opacity={0.9}
        />
        <text
          x={W - 30}
          y={livePriceY + 4.5}
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fontFamily="monospace"
          fill="white"
          letterSpacing="0.5"
        >
          {livePrice.toFixed(2)}
        </text>
      </g>
    </svg>
  );
}
