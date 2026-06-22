"use client";

function RightPanel() {
  return (
    <div
      className="hidden md:flex flex-col flex-1 relative overflow-hidden min-h-screen"
      style={{
        backgroundImage:
          "url('/auth-bg.png'), linear-gradient(135deg, #090a0c 0%, #0d0e12 100%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Dark overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,5,8,0.70) 0%, rgba(4,5,8,0.58) 55%, rgba(4,5,8,0.78) 100%)",
        }}
      />

      {/* Content — flex-1 so it fills the full panel height */}
      <div className="relative z-10 flex flex-col justify-between flex-1 p-[28px] lg:p-[52px]">
        {/* Headline */}
        <h1
          className="text-white font-normal leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(30px, 5.6vw, 76px)" }}
        >
          Financial
          <br />
          Reporting
          <br />
          Made&nbsp;<span style={{ color: "rgba(255,255,255,0.50)" }}>Easy!</span>
        </h1>

        {/* Caption */}
        <p
          className="self-end text-right text-[13px] leading-[21px]"
          style={{ color: "rgba(255,255,255,0.42)" }}
        >
          One platform to handle all the requests, reports,
          <br />
          orders and invoices.
        </p>
      </div>
    </div>
  );
}

export default function AuthSplitLayout({ children }) {
  return (
    <div className="min-h-screen flex">
      {/* ── Left panel ──
          flex-none + explicit pixel width so percentage quirks can't affect it.
          min-h-screen stretches it to full viewport height. */}
      <div
        className="flex-none w-full md:w-[55%] lg:w-[40%] bg-[#0d0e10]
                   min-h-screen overflow-y-auto
                   flex items-center justify-center
                   py-10 sm:py-12 md:py-14 lg:py-16
                   px-5 sm:px-7 md:px-8"
      >
        <div className="w-full max-w-[380px]">{children}</div>
      </div>

      {/* ── Right panel ── */}
      <RightPanel />
    </div>
  );
}
