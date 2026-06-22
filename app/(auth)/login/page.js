"use client";

import { useState, useEffect } from "react";
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

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [showPwd, setShowPwd]     = useState(false);    
  const [remember, setRemember]   = useState(false);
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");

  useEffect(() => {
    if (localStorage.getItem("autosystem_auth")) {
      router.replace("/dashboard");
    }
  }, [router]);

  const validate = () => {
    if (!email.trim()) return "Email address is required.";
    if (!/\S+@\S+\.\S+/.test(email)) return "Please enter a valid email address.";
    if (!password) return "Password is required.";
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) { setError(err); return; }
    setError("");
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("autosystem_auth", "true");
      router.push("/dashboard");
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
        Welcome Back
      </h1>
      <p className="text-center text-[#6b6b6b] text-[13px] leading-[20px] mb-[24px] lg:mb-[36px]">
        Enter your email and password to access your account
      </p>

      {/* Error */}
      {error && (
        <div className="mb-[18px] px-[14px] py-[10px] rounded-[6px] bg-[rgba(239,68,68,0.07)] border border-[rgba(239,68,68,0.18)] text-[12px] text-[#ef4444] leading-[17px]">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-[20px]">
        {/* Email */}
        <div>
          <label className="block text-[12px] font-normal text-[#666] mb-[8px]">
            Email Address
          </label>
          <input
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setError(""); }}
            className="w-full h-[46px] px-[14px] rounded-[6px] bg-[#191919] border border-[#202020] text-white text-[13px] outline-none focus:border-[#2c2c2c] transition-colors duration-150 placeholder:text-[#3a3a3a]"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-[12px] font-normal text-[#666] mb-[8px]">
            Password
          </label>
          <div className="relative">
            <input
              type={showPwd ? "text" : "password"}
              autoComplete="current-password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(""); }}
              className="w-full h-[46px] px-[14px] pr-[44px] rounded-[6px] bg-[#191919] border border-[#202020] text-white text-[13px] outline-none focus:border-[#2c2c2c] transition-colors duration-150 placeholder:text-[#3a3a3a]"
            />
            <button
              type="button"
              onClick={() => setShowPwd((v) => !v)}
              className="absolute right-[13px] top-1/2 -translate-y-1/2 text-[#484848] hover:text-[#777] transition-colors cursor-pointer"
              aria-label={showPwd ? "Hide password" : "Show password"}
            >
              <EyeIcon open={showPwd} />
            </button>
          </div>
        </div>

        {/* Remember me + Forgot password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-[8px] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-[14px] h-[14px] rounded-[3px] cursor-pointer accent-[#2563eb]"
              style={{ accentColor: "#2563eb" }}
            />
            <span className="text-[12px] text-[#6b6b6b]">Remember me</span>
          </label>
          <Link
            href="/forgot-password"
            className="text-[12px] text-[#6b6b6b] hover:text-white transition-colors"
          >
            Forgot Password
          </Link>
        </div>

        {/* Submit */}
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
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>
      </form>
    </AuthSplitLayout>
  );
}
