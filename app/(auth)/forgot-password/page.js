"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthSplitLayout from "@/components/AuthSplitLayout";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail]     = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) { setError("Email address is required."); return; }
    if (!/\S+@\S+\.\S+/.test(email)) { setError("Please enter a valid email address."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
    }, 1200);
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
        Enter your registered email address to receive OTP
      </p>

      {/* Error */}
      {error && (
        <div className="mb-[18px] px-[14px] py-[10px] rounded-[6px] bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.18)] text-[12px] text-[#ef4444]">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[20px]">
        <div>
          <label className="block text-[12px] font-normal text-[#666] mb-[8px]">
            Email Address
          </label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="w-full h-[46px] px-[14px] rounded-[6px] bg-[#191919] border border-[#202020] text-white text-[13px] outline-none focus:border-[#2c2c2c] transition-colors duration-150"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-[46px] rounded-[6px] bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] text-white text-[14px] font-semibold transition-colors duration-150 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mt-[2px]"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-[8px]">
              <svg className="animate-spin" width={14} height={14} fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Sending...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      {/* Back to login */}
      <p className="text-center text-[12px] text-[#555] mt-[24px]">
        <Link href="/login" className="text-[#6b6b6b] hover:text-white transition-colors">
          ← Back to Login
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
