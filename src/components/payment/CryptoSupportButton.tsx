"use client";

import { useEffect, useMemo, useState } from "react";
import {
  isValidReferralUsername,
  normalizeReferralUsername,
  REFERRAL_STORAGE_KEY,
} from "@/lib/referrals";

interface CryptoSupportButtonProps {
  supportContact: string;
  planName: string;
  duration: string;
}

export function CryptoSupportButton({
  supportContact,
  planName,
  duration,
}: CryptoSupportButtonProps) {
  const [referrerUsername, setReferrerUsername] = useState<string | null>(null);

  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      const urlReferrer =
        params.get("ref") || params.get("refer") || params.get("referrer");
      const storedReferrer =
        urlReferrer || localStorage.getItem(REFERRAL_STORAGE_KEY);

      if (storedReferrer && isValidReferralUsername(storedReferrer)) {
        const username = normalizeReferralUsername(storedReferrer);
        localStorage.setItem(REFERRAL_STORAGE_KEY, username);
        setReferrerUsername(username);
      }
    });

    return () => cancelAnimationFrame(raf);
  }, []);

  const href = useMemo(() => {
    const planLabel = duration ? `${planName} (${duration})` : planName;
    const message = [
      `Hello, I've just made payment for the ${planLabel} plan.`,
      referrerUsername ? `Referrer: ${referrerUsername}` : null,
      "Here is my proof of payment:",
    ]
      .filter(Boolean)
      .join(" ");

    return `${supportContact}?text=${encodeURIComponent(message)}`;
  }, [duration, planName, referrerUsername, supportContact]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-full rounded-xl bg-blue-600 py-4 text-center font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
    >
      I&apos;ve Made Payment
    </a>
  );
}
