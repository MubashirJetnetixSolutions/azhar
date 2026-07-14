"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import AuthSplitLayout from "@/components/AuthSplitLayout";

function EyeIcon({ open }) {
  return open ? (
    <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  ) : (
    <svg width={15} height={15} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );
}

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword]       = useState("");
  const [confirm, setConfirm]         = useState("");
  const [showPwd, setShowPwd]         = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading]         = useState(false);
  const [error, setError]             = useState("");
  const [done, setDone]               = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!password) { setError("New password is required."); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1200);
  };

  if (done) {
    return (
      <AuthSplitLayout>
        <div className="flex flex-col items-center text-center">
          {/* Success icon */}
          <div
            className="w-[64px] h-[64px] rounded-full flex items-center justify-center mb-[28px]"
            style={{
              background: "rgba(34,197,94,0.08)",
              border: "1px solid rgba(34,197,94,0.2)",
            }}
          >
            <svg width={28} height={28} fill="none" viewBox="0 0 24 24" stroke="#22c55e" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <h1 className="text-white text-[24px] sm:text-[30px] lg:text-[38px] font-normal leading-[1.1] tracking-[-0.01em] mb-[12px]">
            Password Reset
          </h1>
          <p className="text-[#6b6b6b] text-[13px] leading-[20px] mb-[24px] lg:mb-[36px]">
            Your password has been reset successfully.
          </p>

          <Link
            href="/login"
            className="w-full flex items-center justify-center h-[46px] rounded-[6px] bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-[14px] font-semibold transition-colors duration-150"
          >
            Back to Login
          </Link>
        </div>
      </AuthSplitLayout>
    );
  }

  return (
    <AuthSplitLayout>
      {/* Brand */}
      <p className="text-center text-[18px] font-normal tracking-[0.22em] text-[#ffffff] capitalize mb-[35px]">
        Auto System
      </p>

      {/* Heading */}
      <h1 className="text-center text-white text-[28px] sm:text-[36px] lg:text-[44px] font-normal leading-[1.1] tracking-[-0.01em] mb-[8px] sm:mb-[10px]">
        Reset Password
      </h1>
      <p className="text-center text-[#6b6b6b] text-[13px] leading-[20px] mb-[24px] lg:mb-[36px]">
        Create a new password for your account
      </p>

      {/* Error */}
      {error && (
        <div className="mb-[18px] px-[14px] py-[10px] rounded-[6px] bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.18)] text-[12px] text-[#ef4444]">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[20px]">
        {/* New password */}
        <div>
          <label className="block text-[12px] font-normal text-[#666] mb-[8px]">New Password</label>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="w-full h-[46px] px-[14px] pr-[44px] rounded-[6px] bg-[#191919] border border-[#202020] text-white text-[13px] outline-none focus:border-[#2c2c2c] transition-colors duration-150"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-[13px] top-1/2 -translate-y-1/2 text-[#484848] hover:text-[#777] transition-colors cursor-pointer"
            >
              <EyeIcon open={showPwd} />
            </button>
          </div>
        </div>

        {/* Confirm password */}
        <div>
          <label className="block text-[12px] font-normal text-[#666] mb-[8px]">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirm ? "text" : "password"}
              value={confirm}
              onChange={(e) => { setConfirm(e.target.value); setError(""); }}
              className="w-full h-[46px] px-[14px] pr-[44px] rounded-[6px] bg-[#191919] border border-[#202020] text-white text-[13px] outline-none focus:border-[#2c2c2c] transition-colors duration-150"
            />
            <button
              type="button"
              onClick={() => setShowConfirm((v) => !v)}
              className="absolute right-[13px] top-1/2 -translate-y-1/2 text-[#484848] hover:text-[#777] transition-colors cursor-pointer"
            >
              <EyeIcon open={showConfirm} />
            </button>
          </div>
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
              Resetting...
            </span>
          ) : (
            "Reset Password"
          )}
        </button>
      </form>

      <p className="text-center text-[12px] mt-[24px]">
        <Link href="/login" className="text-[#6b6b6b] hover:text-white transition-colors">
          ← Back to Login
        </Link>
      </p>
    </AuthSplitLayout>
  );
}
