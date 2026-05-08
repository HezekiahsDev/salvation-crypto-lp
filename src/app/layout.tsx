import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Salvation Crypto Academy — Master the Financial Markets",
  description:
    "Join the premier Forex & Financial Markets Trading Academy. Learn from funded traders, master risk management, and transform your trading career with battle-tested strategies.",
  keywords: [
    "forex trading",
    "trading academy",
    "financial markets",
    "crypto trading",
    "funded trader",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <body className="min-h-screen bg-[#030014] text-white overflow-x-hidden font-sans">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
