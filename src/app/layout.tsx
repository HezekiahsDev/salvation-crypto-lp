import type { Metadata } from "next";
import { AnimationProvider } from "@/components/AnimationProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salvation Crypto Academy — Master the Financial Markets",
  description:
    "Join the premier crypto learning and trading community. Master the markets through quality education, daily signals, and professional mentorship.",
  keywords: [
    "trading academy",
    "financial markets",
    "crypto trading",
    "crypto trading",
    "trading academy",
    "crypto education",
    "bitcoin signals",
    "master trader",
    "trading mentorship",
    "trading psychology",
    "risk management",
  ],
  openGraph: {
    title: "Salvation Crypto Academy — Master the Financial Markets",
    description:
      "The premium trading academy that transforms beginners into consistently profitable traders.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Salvation Crypto Academy",
    description:
      "Master the financial markets with elite mentorship and proven strategies.",
  },
};

import { CinematicBackground } from "@/components/CinematicBackground";
import { MouseFollowGlow } from "@/components/MouseFollowGlow";
import { ReferralSystem } from "@/components/referral/ReferralSystem";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen bg-[#030014] text-white overflow-x-hidden font-sans">
        <CinematicBackground />
        <MouseFollowGlow />
        <AnimationProvider>{children}</AnimationProvider>
        <ReferralSystem />
      </body>
    </html>
  );
}
