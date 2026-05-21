import {
  Sparkles,
  Crown,
  Shield,
  GraduationCap,
  LucideIcon,
} from "lucide-react";

export interface Plan {
  id: string;
  name: string;
  duration: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
  icon: LucideIcon | null;
  badge?: string;
  isExclusive?: boolean;
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
    id: "genesis-signals",
    name: "Genesis Signals",
    duration: "1 Month",
    price: "10",
    period: "/month",
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
    id: "alpha-signals",
    name: "Alpha Signals",
    duration: "6 Months",
    price: "50",
    period: "/6 months",
    description:
      "Built for traders ready to level up and for serious traders looking for consistency.",
    features: [
      "Access to daily trading signals",
      "Basic entry, SL & TP levels",
      "Daily market insights",
      "Massive follow-up from the team",
      "Priority support",
    ],
    cta: "Join Alpha Circle",
    popular: false,
    icon: Sparkles,
    badge: "Maximum Edge",
    supportLink: "https://wa.me/2347026821951",
    supportContact: DEFAULT_SUPPORT_CONTACT,
    proofImages: [
      "/img/proofs/alpha.jpg",
      "/img/proofs/alpha1.jpg",
      "/img/proofs/trading-3.jpg",
      "/img/proofs/trading-4.jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-54.jpg",
      "/img/proofs/PHOTO-2026-05-08-01-45-58(1).jpg",
      "/img/proofs/PHOTO-2026-05-08-01-46-00(1).jpg",
    ],
    paymentInstructions: DEFAULT_PAYMENT_INSTRUCTIONS,
  },
  {
    id: "elite-alpha",
    name: "Elite Alpha Circle",
    duration: "1 Year",
    price: "100",
    period: "/year",
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
    id: "crypto-academy",
    name: "Crypto Academy",
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
    id: "inner-caucus",
    name: "Inner Caucus",
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
