"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthSplitLayout from "@/components/AuthSplitLayout";

function VerifyOTPContent() {
  const router       = useRouter();
  const searchParams = useSearchParams();
  const email        = searchParams.get("email") || "";

  const [otp, setOtp]         = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");
  const [resent, setResent]   = useState(false);

  const refs = [useRef(null), useRef(null), useRef(null), useRef(null)];

  useEffect(() => {
    refs[0].current?.focus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (idx, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...otp];
    next[idx] = val;
    setOtp(next);
    setError("");
    if (val && idx < 3) refs[idx + 1].current?.focus();
  };

  const handleKeyDown = (idx, e) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      refs[idx - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    const next = ["", "", "", ""];
    digits.split("").forEach((c, i) => { next[i] = c; });
    setOtp(next);
    const focusIdx = Math.min(digits.length, 3);
    refs[focusIdx].current?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) { setError("Please enter the complete 4-digit OTP."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/reset-password");
    }, 1200);
  };

  const handleResend = () => {
    setOtp(["", "", "", ""]);
    refs[0].current?.focus();
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <AuthSplitLayout>
      {/* Brand */}
      <p className="text-center text-[18px] font-normal tracking-[0.22em] text-[#ffffff] capitalize mb-[35px]">
        Auto System
      </p>

      {/* Heading */}
      <h1 className="text-center text-white text-[28px] sm:text-[36px] lg:text-[44px] font-normal leading-[1.1] tracking-[-0.01em] mb-[8px] sm:mb-[10px]">
        Forgot Password
      </h1>
      <p className="text-center text-[#6b6b6b] text-[13px] leading-[20px] mb-[24px] lg:mb-[36px]">
        Kindly enter your OTP code to change your password.
      </p>

      {/* Error */}
      {error && (
        <div className="mb-[18px] px-[14px] py-[10px] rounded-[6px] bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.18)] text-[12px] text-[#ef4444]">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[24px]">
        <div>
          <label className="block text-[12px] font-normal text-[#666] mb-[14px]">OTP</label>
          <div className="flex gap-[8px] sm:gap-[12px] w-full" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={refs[idx]}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                className="flex-1 w-[25%] h-[52px] sm:h-[62px] rounded-[6px] bg-[#191919] border border-[#202020] text-white text-[19px] sm:text-[22px] font-medium text-center outline-none focus:border-[#2c2c2c] transition-colors duration-150 selection:bg-[#2563eb]"
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[46px] rounded-[6px] bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-[14px] font-semibold transition-colors duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-[8px]">
              <svg className="animate-spin" width={14} height={14} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Verifying...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {/* Resend */}
      <p className="text-center text-[12px] text-[#5a5a5a] mt-[22px]">
        Didn't receive any code?{" "}
        <button
          type="button"
          onClick={handleResend}
          className={`font-medium transition-colors cursor-pointer ${
            resent ? "text-[#22c55e]" : "text-[#2563eb] hover:text-[#3b82f6]"
          }`}
        >
          {resent ? "Sent!" : "Resend"}
        </button>
      </p>
    </AuthSplitLayout>
  );
}

export default function VerifyOTPPage() {
  return (
    <Suspense fallback={
      <AuthSplitLayout>
        <div className="flex items-center justify-center py-20">
          <svg className="animate-spin" width={24} height={24} fill="none" viewBox="0 0 24 24">
            <circle className="opacity-20" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" />
            <path className="opacity-60" fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      </AuthSplitLayout>
    }>
      <VerifyOTPContent />
    </Suspense>
  );
}
