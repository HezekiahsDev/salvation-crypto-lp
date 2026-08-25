"use client";

import { useEffect, useMemo, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import {
  Check,
  Copy,
  Gift,
  Loader2,
  Users,
  Wallet,
  X,
} from "lucide-react";
import {
  isValidReferralUsername,
  normalizeReferralUsername,
  REFERRAL_STORAGE_KEY,
} from "@/lib/referrals";

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
        className="fixed bottom-6 right-6 z-90 inline-flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-500 md:h-auto md:w-auto md:gap-2 md:rounded-xl md:px-4 md:py-3 md:text-sm md:font-bold"
        aria-label="Open referral form"
        title="Refer"
      >
        <Gift size={18} />
        <span className="hidden md:inline">Refer</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
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
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/15 text-blue-300">
                <Users size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Become a Referrer</h2>
                <p className="text-xs text-slate-500">
                  Create your unique link and receive payouts through NGN or USDT.
                </p>
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
                  Generate Referral Link
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
