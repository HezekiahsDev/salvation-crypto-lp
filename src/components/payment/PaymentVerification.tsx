"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import Link from "next/link";

export function PaymentVerification({
  reference,
  planName,
  supportLink,
  planId,
}: {
  reference: string | string[] | undefined;
  planName: string;
  supportLink?: string;
  planId: string;
}) {
  const [status, setStatus] = useState<"loading" | "success" | "failed">(
    "loading",
  );

  // Normalize reference if an array was passed (avoid comma-joined values)
  const singleReference = Array.isArray(reference) ? reference[0] : reference;
  useEffect(() => {
    async function verify() {
      try {
        if (!singleReference) {
          setStatus("failed");
          return;
        }
        const encodedRef = encodeURIComponent(singleReference);
        const response = await fetch(`/api/payments/verify/${encodedRef}`);
        const data = await response.json();

        if (response.ok && data.status === "successful") {
          setStatus("success");
        } else {
          setStatus("failed");
        }
      } catch (err) {
        setStatus("failed");
      }
    }
    verify();
  }, [singleReference]);

  if (status === "loading") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-center">
        <div className="bg-[#0f172a] border border-white/10 p-8 rounded-2xl max-w-md w-full shadow-2xl flex flex-col items-center">
          <Loader2 className="animate-spin text-blue-500 mb-4" size={48} />
          <h3 className="text-xl font-bold text-white mb-2">
            Verifying Payment...
          </h3>
          <p className="text-slate-400">
            Please wait while we confirm your transaction.
          </p>
        </div>
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-center">
        <div className="bg-[#0f172a] border border-emerald-500/20 p-8 rounded-2xl max-w-md w-full shadow-2xl shadow-emerald-500/10 flex flex-col items-center">
          <CheckCircle2 className="text-emerald-500 mb-4" size={64} />
          <h3 className="text-2xl font-bold text-white mb-2">
            Payment Successful!
          </h3>
          <p className="text-slate-300 mb-6 font-medium">
            Welcome to <span className="text-emerald-400">{planName}</span>!
          </p>
          <p className="text-sm text-slate-400 mb-8">
            Your transaction reference: <br />
            <code className="text-xs bg-black/40 text-emerald-300 px-2 py-1 rounded block mt-2">
              {singleReference}
            </code>
          </p>
          <div className="flex gap-4 w-full flex-col sm:flex-row">
            <Link
              href={supportLink || "https://t.me/salvationcrypto_support"}
              target="_blank"
              className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all"
            >
              Contact Support for Access
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 text-center">
      <div className="bg-[#0f172a] border border-red-500/20 p-8 rounded-2xl max-w-md w-full shadow-2xl shadow-red-500/10 flex flex-col items-center">
        <XCircle className="text-red-500 mb-4" size={64} />
        <h3 className="text-2xl font-bold text-white mb-2">
          Payment Verification Failed
        </h3>
        <p className="text-slate-400 mb-6 text-sm">
          We could not verify your payment. It might still be processing or it
          has failed.
        </p>
        <p className="text-sm text-slate-400 mb-8">
          Reference:{" "}
          <code className="text-xs text-red-300">{singleReference}</code>
        </p>
        <Link
          href={`/plans/${planId}`}
          className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all border border-white/10"
        >
          Close & Try Again
        </Link>
      </div>
    </div>
  );
}
