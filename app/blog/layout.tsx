"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from 'next/dynamic';

const RightNav = dynamic(() => import('@/components/RightNav'), { ssr: false });
const DustOverlay = dynamic(() => import('@/components/DustOverlay'), { ssr: false });
const AudioAutoplay = dynamic(() => import('@/components/AudioAutoplay'), { ssr: false });
const CookieConsent = dynamic(() => import('@/components/CookieConsent'), { ssr: false });

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative w-full" style={{ backgroundColor: "var(--c-void)", color: "var(--c-ash)" }}>
      
      {/* ── Background tetap — div terpisah untuk performa mobile ── */}
      <div
        className="fixed-bg"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/img/common/bg/bg.webp')",
        }}
      />

      {/* ── RIGHT NAV ── */}
      <RightNav />

      {/* ── Cookie Consent ── */}
      <CookieConsent />

      {/* ── EFEK LATAR BELAKANG ── */}
      <div className="bg-grid" aria-hidden="true" />
      <DustOverlay />

      {/* ── Konten Blog ── */}
      <div className="relative z-10 flex flex-col min-h-screen">
        
        {/* ── LOGO HEADER ── */}
        <header className="relative w-full z-50 flex flex-col items-center justify-center pt-20 md:pt-10 pb-0 pointer-events-none">
          <Link href="/" className="pointer-events-auto hover:scale-105 transition-transform duration-300">
            <Image
              src="/img/logo/nasgor.webp"
              alt="Nasi Goreng"
              priority
              fetchPriority="high"
              loading="eager"
              quality={100}
              width={600}
              height={200}
              sizes="(max-width: 768px) 80vw, 300px"
              className="select-none"
              style={{
                height: "clamp(8rem, 25vw, 11rem)",
                width: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.8))"
              }}
            />
          </Link>
          <div className="w-[100px] md:w-[150px] -mt-8 md:-mt-12 pointer-events-auto">
            <Link href="/" className="hover:scale-105 transition-transform duration-300 block">
              <Image 
                src="/img/logo/mamasucok.webp" 
                alt="Mamas Ucok Logo" 
                width={150} 
                height={150}
                quality={100}
                className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] grayscale hover:grayscale-0 invert-on-light"
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          </div>
        </header>

        {children}

        {/* ── FOOTER COPYRIGHT ── */}
        <div
          className="relative w-full z-30 flex flex-col items-center pb-8 mt-auto pt-8 border-t border-[var(--c-border)]"
          style={{
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
            background: "var(--c-footer-bg)",
          }}
        >
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <span className="text-sm text-(--c-ash) font-medium">
              © {new Date().getFullYear()} Mohammad Fathuloh. All rights reserved.
            </span>
            <div className="flex justify-center gap-6 mt-1 text-xs">
              <Link href="/privacy-policy" className="hover-text text-(--c-ash) opacity-80 hover:opacity-100 transition-opacity duration-300">Privacy Policy</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
