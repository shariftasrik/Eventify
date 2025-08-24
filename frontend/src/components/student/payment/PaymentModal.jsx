// PaymentModal.jsx
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Wallet, CreditCard, ShieldCheck } from "lucide-react";

export default function PaymentModal({
  open,
  event,
  amount,
  onClose,
  onConfirm, // (method) => void
}) {
  const [method, setMethod] = useState("");

  const MotionDiv = motion.div;
  const payNow = () => {
    if (!method) return;
    onConfirm(method);
  };

  return (
    <AnimatePresence>
      {open && (
        <MotionDiv
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <MotionDiv
            initial={{ opacity: 0, scale: 0.96, y: 14 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 14 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-slate-200 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* subtle gradient skin */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-purple-50/20 to-pink-50/25 pointer-events-none" />

            <div className="relative p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900">Payment</h3>
                  <p className="text-sm text-slate-600 mt-0.5">
                    {event?.title}
                  </p>
                </div>

                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  <ShieldCheck className="h-4 w-4" />
                  Secure
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-slate-200 bg-white/90 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Amount</span>
                  <span className="text-lg font-bold text-slate-900">{amount} Tk</span>
                </div>
              </div>

              {/* payment methods */}
              <div className="mt-5 grid gap-3">
                <label
                  className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition
                    ${
                      method === "cash"
                        ? "border-indigo-400 bg-indigo-50/50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    value="cash"
                    checked={method === "cash"}
                    onChange={() => setMethod("cash")}
                    className="h-4 w-4"
                  />
                  <div className="flex items-center gap-2 text-slate-800">
                    <Wallet className="h-5 w-5 text-slate-600" />
                    <span className="font-semibold">Cash (On-site)</span>
                  </div>
                </label>

                <label
                  className={`flex items-center gap-3 rounded-xl border p-4 cursor-pointer transition
                    ${
                      method === "sslcommerz"
                        ? "border-indigo-400 bg-indigo-50/50"
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <input
                    type="radio"
                    name="pay"
                    value="sslcommerz"
                    checked={method === "sslcommerz"}
                    onChange={() => setMethod("sslcommerz")}
                    className="h-4 w-4"
                  />
                  <div className="flex items-center gap-2 text-slate-800">
                    <CreditCard className="h-5 w-5 text-slate-600" />
                    <span className="font-semibold">SSLCommerz</span>
                    <span className="ml-2 text-xs text-slate-500">
                      (demo flow)
                    </span>
                  </div>
                </label>
              </div>

              {/* actions */}
              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border-2 border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={!method}
                  onClick={payNow}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 px-6 py-2.5 text-sm font-semibold text-white shadow-lg disabled:opacity-60 disabled:cursor-not-allowed transition-all"
                >
                  Pay {amount} Tk
                </button>
              </div>
            </div>
          </MotionDiv>
        </MotionDiv>
      )}
    </AnimatePresence>
  );
}
