import { Sparkles, Crown, Shield, GraduationCap, LucideIcon } from "lucide-react";

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
    paymentInstructions: {
      crypto: [
        { symbol: "USDT", network: "TRC20", address: "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
        { symbol: "SOL", network: "Solana", address: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
      ]
    }
  },
  {
    id: "alpha-signals",
    name: "Alpha Signals",
    duration: "6 Months",
    price: "50",
    period: "/6 months",
    description: "Built for traders ready to level up and for serious traders looking for consistency.",
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
    paymentInstructions: {
      crypto: [
        { symbol: "USDT", network: "TRC20", address: "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
        { symbol: "SOL", network: "Solana", address: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
      ]
    }
  },
  {
    id: "elite-alpha",
    name: "Elite Alpha Circle",
    duration: "1 Year",
    price: "100",
    period: "/year",
    description: "The highest level of signal access for committed traders who want maximum edge.",
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
    paymentInstructions: {
      crypto: [
        { symbol: "USDT", network: "TRC20", address: "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
        { symbol: "SOL", network: "Solana", address: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
      ]
    }
  },
  {
    id: "inner-caucus",
    name: "Inner Caucus",
    duration: "Exclusive",
    price: "500",
    period: "",
    description: "Exclusive access for the most committed members. Private high-level platform.",
    features: [
      "Private high-level early access platform",
      "Strategic market positioning",
      "Advanced alpha plays",
      "Networking with top traders",
      "Direct access to exclusive updates",
      "Personalized mentorship",
    ],
    cta: "Apply for Inner Caucus",
    popular: false,
    icon: Shield,
    badge: "VVIP Access",
    isExclusive: true,
    supportLink: "https://t.me/salvationcrypto_support",
    paymentInstructions: {
      crypto: [
        { symbol: "USDT", network: "TRC20", address: "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
        { symbol: "SOL", network: "Solana", address: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
      ]
    }
  },
  {
    id: "crypto-academy",
    name: "Crypto Academy",
    duration: "Unlimited",
    price: "50",
    period: "one-time",
    description: "Master the crypto market through quality education and community.",
    features: [
      "Complete learning curriculum",
      "Beginner to Advanced modules",
      "Trading community access",
      "Recorded masterclasses",
      "Practical workshops",
      "Lifetime updates",
    ],
    cta: "Enroll in Academy",
    popular: false,
    icon: GraduationCap,
    badge: "Learn to Trade",
    paymentInstructions: {
      crypto: [
        { symbol: "USDT", network: "TRC20", address: "TXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" },
        { symbol: "SOL", network: "Solana", address: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" }
      ]
    }
  },
];
