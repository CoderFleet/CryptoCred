import React from "react";

import { ShieldCheck } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0a0a0a 0%, #181818 60%, #0a0a0a 100%)'}}>
      {/* Background accent glows */}
      <div className="pointer-events-none absolute inset-0 z-0" style={{
        boxShadow: '0 0 90px 12px #1a1a1a, 0 0 160px 18px #3a2d15 inset, 0 0 120px 12px #1d160a inset',
        opacity: 0.14
      }} />
      <div className="pointer-events-none absolute inset-0 z-0" style={{
        background: 'radial-gradient(ellipse at 70% 20%, rgba(191,160,70,0.10) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(108,85,39,0.08) 0%, transparent 60%)'
      }} />
      {/* Glassy Auth Card */}
      <div className="w-full max-w-md p-[3px] rounded-3xl bg-gradient-to-br from-[#A7C7E7] to-[#B9F6CA] shadow-[0_8px_40px_0_rgba(167,199,231,0.13),0_1.5px_32px_0_rgba(185,246,202,0.11)] flex flex-col items-center">
        <div className="w-full rounded-3xl bg-black/95 backdrop-blur-2xl px-10 py-12 relative flex flex-col items-center before:absolute before:inset-0 before:rounded-3xl before:pointer-events-none before:bg-gradient-to-br before:from-white/10 before:to-transparent before:opacity-20 after:absolute after:inset-0 after:rounded-3xl after:pointer-events-none after:bg-gradient-to-t after:from-white/10 after:to-transparent after:opacity-30">
        {/* Glassy Blue/Green Heading and Badge */}
        <div className="flex flex-col items-center mb-8 mt-2 w-full">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl md:text-4xl font-extrabold tracking-wide font-mono bg-gradient-to-r from-[#A7C7E7] via-[#B9F6CA] to-white text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(167,199,231,0.16)]" style={{letterSpacing: '0.045em'}}>CryptoCred</span>
            <span className="inline-flex items-center justify-center rounded-full bg-gradient-to-br from-[#A7C7E7] via-[#B9F6CA] to-white p-1 shadow border border-[#A7C7E7] ml-1">
              <ShieldCheck className="w-5 h-5 text-black/70" />
            </span>
          </div>
          <span className="text-base md:text-lg font-medium text-[#A7C7E7] drop-shadow-[0_0_6px_rgba(167,199,231,0.13)] tracking-wide mb-1">Blockchain Academic Credentials</span>
        </div>
        {/* Form content with glass overlay */}
        <div className="w-full flex flex-col items-center z-10">
          {children}
        </div>
        </div>
      </div>
    </div>
  );
}
