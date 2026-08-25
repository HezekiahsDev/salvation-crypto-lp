"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  BadgePercent,
  Check,
  Copy,
  Gift,
  Loader2,
  Share2,
  Wallet,
  X,
} from "lucide-react";
import {
  isValidReferralUsername,
  normalizeReferralUsername,
  REFERRAL_COMMISSION_PERCENT,
  REFERRAL_COMMISSION_RATE,
  REFERRAL_STORAGE_KEY,
} from "@/lib/referrals";
import { plans, getPlanPaymentPrice } from "@/data/plans";

interface Bank {
  name: string;
  code: string;
}

interface ReferralResponse {
  referral?: {
    username: string;
  };
  referralLink?: string;
  existing?: boolean;
  usdtNetworks?: string[];
  error?: string;
}

/** Worked examples so the payout is concrete before anyone registers. */
const earningExamples = plans
  .map((plan) => {
    const price = getPlanPaymentPrice(plan);
    if (price === null || price <= 0) return null;
    return {
      id: plan.id,
      name: plan.name,
      price,
      payout: Number((price * REFERRAL_COMMISSION_RATE).toFixed(2)),
    };
  })
  .filter((example): example is NonNullable<typeof example> => example !== null)
  .sort((a, b) => a.price - b.price);

const formatUsd = (value: number) =>
  Number.isInteger(value) ? `$${value}` : `$${value.toFixed(2)}`;

const inputClass =
  "w-full bg-black/50 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/50 transition-all";

export function ReferralSystem() {
  const [open, setOpen] = useState(false);
  const [banks, setBanks] = useState<Bank[]>([]);
  const [networks, setNetworks] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [resolving, setResolving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [referralLink, setReferralLink] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    payoutMethod: "NGN",
    bankName: "",
    bankCode: "",
    accountNumber: "",
    accountName: "",
    usdtWalletAddress: "",
    usdtNetwork: "",
  });

  const selectedBank = useMemo(
    () => banks.find((bank) => bank.code === formData.bankCode),
    [banks, formData.bankCode],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const referralCode =
      params.get("ref") || params.get("refer") || params.get("referrer");

    if (referralCode) {
      const username = normalizeReferralUsername(referralCode);
      if (isValidReferralUsername(username)) {
        localStorage.setItem(REFERRAL_STORAGE_KEY, username);
      }
    }

    const openReferralModal = () => setOpen(true);
    window.addEventListener("open-referral-modal", openReferralModal);

    return () => {
      window.removeEventListener("open-referral-modal", openReferralModal);
    };
  }, []);

  useEffect(() => {
    if (!open || networks.length > 0) return;

    fetch("/api/referrals")
      .then((res) => res.json())
      .then((data: ReferralResponse) => {
        if (data.usdtNetworks?.length) {
          setNetworks(data.usdtNetworks);
          setFormData((prev) => ({
            ...prev,
            usdtNetwork: prev.usdtNetwork || data.usdtNetworks?.[0] || "",
          }));
        }
      })
      .catch(() => undefined);
  }, [open, networks.length]);

  useEffect(() => {
    if (!open || formData.payoutMethod !== "NGN" || banks.length > 0) return;

    fetch("/api/paystack/banks")
      .then((res) => res.json())
      .then((data: { banks?: Bank[] }) => {
        if (data.banks?.length) setBanks(data.banks);
      })
      .catch(() => undefined);
  }, [banks.length, formData.payoutMethod, open]);

  useEffect(() => {
    if (
      formData.payoutMethod !== "NGN" ||
      !formData.bankCode ||
      !/^\d{10}$/.test(formData.accountNumber)
    ) {
      return;
    }

    const timeout = window.setTimeout(async () => {
      setResolving(true);
      setError(null);
      try {
        const res = await fetch("/api/paystack/resolve-account", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bankCode: formData.bankCode,
            accountNumber: formData.accountNumber,
          }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Could not resolve account");
        setFormData((prev) => ({ ...prev, accountName: data.accountName }));
      } catch (err: unknown) {
        setFormData((prev) => ({ ...prev, accountName: "" }));
        setError(err instanceof Error ? err.message : "Could not resolve account");
      } finally {
        setResolving(false);
      }
    }, 500);

    return () => window.clearTimeout(timeout);
  }, [formData.accountNumber, formData.bankCode, formData.payoutMethod]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "username" ? normalizeReferralUsername(value) : value,
      ...(name === "bankCode"
        ? {
            bankName: banks.find((bank) => bank.code === value)?.name || "",
            accountName: "",
          }
        : {}),
      ...(name === "accountNumber" ? { accountName: "" } : {}),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch("/api/referrals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          bankName: selectedBank?.name || formData.bankName,
        }),
      });
      const data: ReferralResponse = await res.json();
      if (!res.ok) throw new Error(data.error || "Could not create referral");

      setReferralLink(data.referralLink || "");
      setMessage(
        data.existing
          ? "A referral profile already exists for this email/phone, so the original link is shown."
          : "Referral profile created. This link will stay tied to your username.",
      );
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Could not create referral");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!referralLink) return;
    await navigator.clipboard.writeText(referralLink);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-4 z-[120] inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/30 ring-1 ring-white/15 transition hover:bg-blue-500 sm:bottom-6 sm:right-6"
        aria-label="Open the Refer to Earn form"
        title={`Refer to Earn — ${REFERRAL_COMMISSION_PERCENT}% commission`}
      >
        <Gift size={18} />
        <span>Refer to Earn</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#05001a] p-5 shadow-2xl shadow-black/70 sm:p-6">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Close referral form"
            >
              <X size={18} />
            </button>

            <div className="mb-5 flex items-center gap-3 pr-10">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
                <BadgePercent size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Refer to Earn</h2>
                <p className="text-xs text-slate-500">
                  Earn {REFERRAL_COMMISSION_PERCENT}% on every package your
                  referrals buy. Paid in NGN or USDT.
                </p>
              </div>
            </div>

            {/* Value proposition — shown before any details are collected */}
            <div className="mb-5 rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-4 sm:p-5">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <span className="text-3xl font-black leading-none text-emerald-300">
                  {REFERRAL_COMMISSION_PERCENT}%
                </span>
                <span className="text-sm font-bold text-white">
                  commission on every package your referral buys
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                Share your link. When someone signs up through it and pays for
                any package — signals or Academy — you keep{" "}
                {REFERRAL_COMMISSION_PERCENT}% of what they pay. Every time they
                buy, not just the first time.
              </p>

              {earningExamples.length > 0 && (
                <div className="mt-4">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-emerald-200/70">
                    What you earn
                  </p>
                  <ul className="grid gap-1.5 sm:grid-cols-2">
                    {earningExamples.map((example) => (
                      <li
                        key={example.id}
                        className="flex items-center justify-between gap-2 rounded-lg bg-black/30 px-3 py-2"
                      >
                        <span className="truncate text-[11px] text-slate-400">
                          {example.name}
                        </span>
                        <span className="shrink-0 text-[11px] font-bold text-emerald-300">
                          +{formatUsd(example.payout)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                {[
                  "Register below to get your link",
                  "Share it anywhere",
                  `Get paid ${REFERRAL_COMMISSION_PERCENT}% per purchase`,
                ].map((step, index) => (
                  <div
                    key={step}
                    className="flex items-start gap-2 rounded-lg border border-white/5 bg-black/20 px-3 py-2"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-400/20 text-[9px] font-black text-emerald-200">
                      {index + 1}
                    </span>
                    <span className="text-[11px] leading-tight text-slate-400">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {error && (
              <div className="mb-4 rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
                {error}
              </div>
            )}

            {message && (
              <div className="mb-4 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
                {message}
              </div>
            )}

            {referralLink ? (
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-300">
                    Your Referral Link
                  </label>
                  <p className="mb-2 flex items-center gap-1.5 text-[11px] text-emerald-300">
                    <Share2 size={12} />
                    Share this link — you earn {REFERRAL_COMMISSION_PERCENT}% of
                    every package bought through it.
                  </p>
                  <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/40 p-2">
                    <code className="grow break-all px-2 text-xs text-blue-200">
                      {referralLink}
                    </code>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="rounded-md p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                      title="Copy referral link"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setReferralLink("");
                    setMessage(null);
                  }}
                  className="w-full rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Register another referrer
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">
                      Username
                    </label>
                    <input
                      className={inputClass}
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      maxLength={8}
                      pattern="[a-z0-9_]{1,8}"
                      required
                      placeholder="john123"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">
                      Full Name
                    </label>
                    <input
                      className={inputClass}
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">
                      Email
                    </label>
                    <input
                      className={inputClass}
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-300">
                      Phone Number
                    </label>
                    <input
                      className={inputClass}
                      name="phoneNumber"
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="+234..."
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 rounded-xl bg-black/30 p-1">
                  {(["NGN", "USDT"] as const).map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          payoutMethod: method,
                        }))
                      }
                      className={`flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-bold transition ${
                        formData.payoutMethod === method
                          ? "bg-blue-600 text-white"
                          : "text-slate-400 hover:bg-white/5 hover:text-white"
                      }`}
                    >
                      <Wallet size={16} />
                      {method}
                    </button>
                  ))}
                </div>

                {formData.payoutMethod === "NGN" ? (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        Bank Name
                      </label>
                      <select
                        className={inputClass}
                        name="bankCode"
                        value={formData.bankCode}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select bank</option>
                        {banks.map((bank) => (
                          <option key={bank.code} value={bank.code}>
                            {bank.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        Account Number
                      </label>
                      <input
                        className={inputClass}
                        name="accountNumber"
                        value={formData.accountNumber}
                        onChange={handleChange}
                        inputMode="numeric"
                        maxLength={10}
                        pattern="\d{10}"
                        required
                        placeholder="0123456789"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        Account Name
                      </label>
                      <div className="relative">
                        <input
                          className={`${inputClass} pr-10`}
                          name="accountName"
                          value={formData.accountName}
                          readOnly
                          required
                          placeholder="Fetched from Paystack"
                        />
                        {resolving && (
                          <Loader2
                            className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-slate-400"
                            size={16}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        USDT Network
                      </label>
                      <select
                        className={inputClass}
                        name="usdtNetwork"
                        value={formData.usdtNetwork}
                        onChange={handleChange}
                        required
                      >
                        {networks.map((network) => (
                          <option key={network} value={network}>
                            {network}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-medium text-slate-300">
                        Wallet Address
                      </label>
                      <input
                        className={inputClass}
                        name="usdtWalletAddress"
                        value={formData.usdtWalletAddress}
                        onChange={handleChange}
                        required
                        placeholder="Paste wallet address"
                      />
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || resolving}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading && <Loader2 className="animate-spin" size={18} />}
                  Generate My Referral Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
