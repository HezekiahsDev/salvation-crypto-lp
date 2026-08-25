import { plans } from "@/data/plans";

export const REFERRAL_STORAGE_KEY = "salvation_referrer_username";

export const REFERRAL_USERNAME_REGEX = /^[a-z0-9_]{1,8}$/;

export function normalizeReferralUsername(username: string) {
  return username.trim().toLowerCase();
}

export function isValidReferralUsername(username: string) {
  return REFERRAL_USERNAME_REGEX.test(normalizeReferralUsername(username));
}

export function getAllowedUsdtNetworks() {
  return Array.from(
    new Set(
      plans.flatMap((plan) =>
        plan.paymentInstructions.crypto
          .filter((crypto) => crypto.symbol.toUpperCase() === "USDT")
          .map((crypto) => crypto.network),
      ),
    ),
  );
}
