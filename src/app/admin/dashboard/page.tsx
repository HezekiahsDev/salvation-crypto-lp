"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LogOut,
  RefreshCw,
  Eye,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const router = useRouter();

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/payments");
      const data = await res.json();
      if (data.payments) {
        setPayments(data.payments);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
  };

  const handleVerify = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/payments/${id}/confirm`, {
        method: "POST",
      });
      if (res.ok) {
        fetchPayments();
      } else {
        const data = await res.json();
        alert(data.error || "Confirm failed");
      }
    } catch (err) {
      alert("Error confirming payment");
    }
  };

  const filteredPayments = payments.filter(
    (p) =>
      p.email.toLowerCase().includes(search.toLowerCase()) ||
      p.full_name.toLowerCase().includes(search.toLowerCase()) ||
      p.transaction_reference.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-[#030014] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-slate-400">
              Manage and monitor payments.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all text-sm font-medium"
          >
            <LogOut size={16} />
            Logout
          </button>
        </header>

        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by email, name, or reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 text-white rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500/50"
            />
          </div>
          <button
            onClick={fetchPayments}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all text-sm"
          >
            <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-4 font-medium text-slate-400">Date</th>
                  <th className="p-4 font-medium text-slate-400">Customer</th>
                  <th className="p-4 font-medium text-slate-400">Plan</th>
                  <th className="p-4 font-medium text-slate-400">Amount</th>
                  <th className="p-4 font-medium text-slate-400">Status</th>
                  <th className="p-4 font-medium text-slate-400">Reference</th>
                  <th className="p-4 font-medium text-slate-400 text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500">
                      No payments found.
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((payment) => (
                    <tr
                      key={payment.id}
                      className="border-b border-white/5 hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="p-4 text-slate-300">
                        {new Date(payment.created_at).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <div className="font-medium text-white">
                          {payment.full_name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {payment.email}
                        </div>
                        <div className="text-xs text-slate-500">
                          {payment.phone_number}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="inline-block px-2 py-1 rounded bg-blue-500/10 text-blue-400 text-xs">
                          {payment.plan_id}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-white">
                        ${payment.amount}
                      </td>
                      <td className="p-4">
                        {payment.payment_status === "successful" ? (
                          <span className="flex items-center gap-1 text-emerald-400 text-xs font-medium">
                            <CheckCircle2 size={14} /> Successful
                          </span>
                        ) : payment.payment_status === "pending" ? (
                          <span className="flex items-center gap-1 text-yellow-400 text-xs font-medium">
                            <Clock size={14} /> Pending
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-500 text-xs font-medium">
                            <XCircle size={14} /> {payment.payment_status}
                          </span>
                        )}
                      </td>
                      <td className="p-4">
                        <code className="text-[10px] text-slate-400 bg-black/40 px-2 py-1 rounded block w-fit">
                          {payment.transaction_reference}
                        </code>
                      </td>
                      <td className="p-4 text-right">
                        {payment.payment_status === "successful" &&
                          !payment.confirmed && (
                            <button
                              onClick={() => handleVerify(payment.id)}
                              className="text-xs px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded text-white font-medium transition-colors"
                            >
                              Confirm
                            </button>
                          )}
                        {payment.confirmed && (
                          <span className="text-xs px-3 py-1.5 bg-emerald-600/20 rounded text-emerald-300">
                            Confirmed
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
