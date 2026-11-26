import {
  Crown,
  Shield,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

export type PlanCategory = "academy" | "subscription";

export interface Plan {
  id: string;
  name: string;
  category: PlanCategory;
  duration: string;
  price: string;
  period: string;
  /** Prominent billing term shown on cards so short and long plans are never confused. */
  billingLabel?: string;
  /** One-line clarification about what the payment actually covers. */
  durationHint?: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  icon: LucideIcon | null;
  badge?: string;
  isExclusive?: boolean;
  applicationsOpen?: boolean;
  supportLink?: string;
  supportContact?: string;
  proofImages: string[];
  paymentInstructions: {
    crypto: {
      network: string;
      address: string;
      symbol: string;
    }[];
    bank?: {
      accountName: string;
      accountNumber: string;
      bankName: string;
    };
  };
}

const DEFAULT_SUPPORT_CONTACT = "https://wa.me/2347026821951";

export interface Promotion {
  name: string;
  /** Fraction off, e.g. 0.3 = 30% off. */
  rate: number;
  /** From here until startsAt the banner counts down; prices stay full. */
  announceAt: Date;
  /** Inclusive start. */
  startsAt: Date;
  /** Exclusive end. */
  endsAt: Date;
}

/**
 * Black Friday 2026: 30% off every fixed-price plan for the whole of
 * Friday 27 Nov 2026 in Nigeria time (WAT, UTC+1), 12:00am to 11:59pm.
 * The server checks this window when it prices a checkout, so the
 * discount turns itself on and off without a redeploy.
 */
export const BLACK_FRIDAY_PROMOTION: Promotion = {
  name: "Black Friday",
  rate: 0.3,
  announceAt: new Date("2026-11-26T00:00:00+01:00"),
  startsAt: new Date("2026-11-27T00:00:00+01:00"),
  endsAt: new Date("2026-11-28T00:00:00+01:00"),
};

const PROMOTIONS: Promotion[] = [BLACK_FRIDAY_PROMOTION];

/** Plans priced by application/quote, never discounted. */
const NON_DISCOUNTABLE_PLAN_IDS = new Set(["inner-caucus", "one-on-one"]);

export function getActivePromotion(now: Date = new Date()): Promotion | null {
  const t = now.getTime();
  return (
    PROMOTIONS.find(
      (promo) => t >= promo.startsAt.getTime() && t < promo.endsAt.getTime(),
    ) ?? null
  );
}

/** A promotion that has been announced but has not started yet. */
export function getUpcomingPromotion(now: Date = new Date()): Promotion | null {
  const t = now.getTime();
  return (
    PROMOTIONS.find(
      (promo) =>
        t >= promo.announceAt.getTime() && t < promo.startsAt.getTime(),
    ) ?? null
  );
}

export function getPlanDiscountRate(
  plan: Pick<Plan, "id" | "price">,
  promotion: Promotion | null = getActivePromotion(),
): number {
  if (!promotion || NON_DISCOUNTABLE_PLAN_IDS.has(plan.id)) return 0;
  const basePrice = Number(plan.price);
  if (!Number.isFinite(basePrice) || basePrice <= 0) return 0;
  return promotion.rate;
}

export function getPlanPaymentPrice(
  plan: Pick<Plan, "id" | "price">,
  promotion: Promotion | null = getActivePromotion(),
): number | null {
  const basePrice = Number(plan.price);

  if (!Number.isFinite(basePrice) || basePrice <= 0) {
    return null;
  }

  const rate = getPlanDiscountRate(plan, promotion);
  return Number((basePrice * (1 - rate)).toFixed(2));
}

export function formatPlanPrice(price: number | null): string {
  if (price === null) {
    return "Custom";
  }

  return Number.isInteger(price) ? String(price) : price.toFixed(2);
}

const DEFAULT_PAYMENT_INSTRUCTIONS: Plan["paymentInstructions"] = {
  crypto: [
    {
      symbol: "USDT",
      network: "BEP20",
      address: "0xcca3702515db3df2cce978cdaf516436ae4229aa",
    },
    {
      symbol: "USDT",
      network: "TRC20",
      address: "TUdEe4v2c8TLv8z8B2S7xVgqabPA7M4Rct",
    },
    {
      symbol: "USDT",
      network: "Aptos",
      address:
        "0xc965330e7faad6d2c02e753c338b8c4a7519f6fba4567dba136307d174034fcb",
    },
  ],
};

export const plans: Plan[] = [
  {
    id: "crypto-academy",
    name: "Salvation Crypto Academy",
    category: "academy",
    duration: "",
    price: "50",
    period: "one-time",
    description:
      "Master crypto markets with a full curriculum that includes DEFI.",
    features: [
      "Complete learning curriculum",
      "Beginner to Advanced modules",
      "DEFI fundamentals and protocols",
      "Trading community access",
      "Recorded masterclasses",
      "Practical workshops",
    ],
    cta: "Enroll in Academy",
    popular: false,
    icon: GraduationCap,
    badge: "Learn to Trade",
    applicationsOpen: false,
    supportLink: "https://wa.me/2347026821951",
    supportContact: DEFAULT_SUPPORT_CONTACT,
    proofImages: [
      "/img/proofs/academy.jpg",
      "/img/proofs/academy1.jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-56(2).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-57(1).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-59(2).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-22-13(5).jpg",
    ],
    paymentInstructions: DEFAULT_PAYMENT_INSTRUCTIONS,
  },
  {
    id: "genesis-signals",
    name: "One month trading Signals",
    category: "subscription",
    duration: "1 Month",
    price: "10",
    period: "/month",
    billingLabel: "1 MONTH",
    durationHint: "One payment = 30 days of signals. This is not the yearly plan.",
    description: "Your gateway into the crypto market, perfect for beginners.",
    features: [
      "Access to daily trading signals",
      "Basic entry, SL & TP levels",
      "Community access",
      "Standard support",
    ],
    cta: "Get Genesis Access",
    popular: false,
    icon: null,
    supportLink: "https://wa.me/2347026821951",
    supportContact: DEFAULT_SUPPORT_CONTACT,
    proofImages: [
      "/img/proofs/genesis.jpg",
      "/img/proofs/trading1.jpg",
      "/img/proofs/trading-2.jpg",
      "/img/proofs/PHOTO-2026-05-08-01-22-13(2).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-59(4).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-56.jpg",
    ],
    paymentInstructions: DEFAULT_PAYMENT_INSTRUCTIONS,
  },
  {
    id: "elite-alpha",
    name: "Elite Alpha Circle",
    category: "subscription",
    duration: "1 Year",
    price: "100",
    period: "/year",
    billingLabel: "FULL YEAR · 12 MONTHS",
    durationHint: "One payment = 12 months of signals. This is the Elite yearly plan.",
    description:
      "The highest level of signal access for committed traders who want maximum edge.",
    features: [
      "Access to daily trading signals",
      "Basic entry, SL & TP levels",
      "Daily market insights",
      "Spot trading signals",
      "Poly market insider info signal",
      "Long-term projects (10,000% potential)",
      "Special pick meme pump calls",
      "Massive follow-up from the team",
    ],
    cta: "Go Elite Alpha",
    popular: true,
    icon: Crown,
    badge: "Best Value",
    supportLink: "https://wa.me/2347026821951",
    supportContact: DEFAULT_SUPPORT_CONTACT,
    proofImages: [
      "/img/proofs/elite.jpg",
      "/img/proofs/insider-info-job.jpg",
      "/img/proofs/insider-indo-job2.jpg",
      "/img/proofs/trading 4.jpg",
      "/img/proofs/trading -5.jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-54(1).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-55(4).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-59(1).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-46-00(4).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-46-00(5).jpg",
    ],
    paymentInstructions: DEFAULT_PAYMENT_INSTRUCTIONS,
  },

  {
    id: "inner-caucus",
    name: "Inner Caucus",
    category: "subscription",
    duration: "Exclusive",
    price: "2000",
    period: "",
    description:
      "Exclusive access for the most committed members. Private high-level platform.",
    features: [
      "Private high-level early access platform",
      "Access to insider information (Crypto/Polymarket)",
      "Strategic market positioning",
      "Advanced alpha plays",
      "Networking with top traders",
      "Direct access to exclusive updates",
    ],
    cta: "Apply for Inner Caucus",
    popular: false,
    icon: Shield,
    badge: "VVIP Access",
    isExclusive: true,
    supportLink: "https://forms.gle/32WvCGoGF5kRazxb6",
    supportContact: DEFAULT_SUPPORT_CONTACT,
    proofImages: [
      "/img/proofs/inner-caucus.jpg",
      "/img/proofs/inner-caucus1.jpg",
      "/img/proofs/inner-cacus2.jpg",
      "/img/proofs/inner.jpg",
      "/img/proofs/inner1.jpg",
      "/img/proofs/inside.jpg",
      "/img/proofs/PHOTO-2026-05-08-01-46-00(5).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-22-13(5).jpg",
    ],
    paymentInstructions: {
      crypto: [],
    },
  },
  {
    id: "one-on-one",
    name: "One on One",
    category: "academy",
    duration: "Custom",
    price: "",
    period: "",
    description:
      "Private one-on-one mentorship. Fill the form to request this plan.",
    features: [
      "Private 1:1 Mentorship",
      "Live Trading Sessions",
      "Full Portfolio Review & Guidance",
      "Trading Psychology Mastery",
      "Risk Management Training",
      "24/7 Priority Support",
      "Exclusive Trading Tools & Resources",
    ],
    cta: "Apply for 1:1",
    popular: false,
    icon: null,
    isExclusive: true,
    supportLink: "https://forms.gle/Jp4hwLukdNvPo9ni8",
    supportContact: DEFAULT_SUPPORT_CONTACT,
    proofImages: [
      "/img/proofs/one1.jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-57.jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-58(2).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-59(3).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-46-01.jpg",
    ],
    paymentInstructions: {
      crypto: [],
    },
  },
];

export const academyPlans = plans.filter((plan) => plan.category === "academy");

export const subscriptionPlans = plans.filter(
  (plan) => plan.category === "subscription",
);
