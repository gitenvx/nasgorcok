"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import * as OTPAuth from "otpauth";

// Dynamically import heavy/interactive components
const RightNav = dynamic(() => import('@/components/RightNav'), { ssr: false });
const DustOverlay = dynamic(() => import('@/components/DustOverlay'), { ssr: false });

export default function OTPPage() {
  const params = useParams();
  const initialSecret = params?.secret ? (Array.isArray(params.secret) ? params.secret[0] : params.secret) : "";
  const [secret, setSecret] = useState(initialSecret);
  const [codes, setCodes] = useState({ prev: "000 000", current: "000 000", next: "000 000" });
  const [secondsRemaining, setSecondsRemaining] = useState(30);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  // Initialize the TOTP object when the secret changes
  const totp = useMemo(() => {
    if (!secret.trim()) return null;
    
    // Clean up spaces if user pastes something like "abcd efgh ijkl"
    const cleanedSecret = secret.replace(/\s+/g, '').toUpperCase();
    
    try {
      return new OTPAuth.TOTP({
        issuer: "Nasi Goreng Cok",
        label: "Mamas Ucok",
        algorithm: "SHA1",
        digits: 6,
        period: 30,
        secret: OTPAuth.Secret.fromBase32(cleanedSecret),
      });
    } catch (err: any) {
      console.error("Invalid base32 secret", err);
      return null;
    }
  }, [secret]);

  useEffect(() => {
    const updateCodeAndTimer = () => {
      const now = Date.now();
      // TOTP period is 30 seconds
      const seconds = 30 - Math.floor((now / 1000) % 30);
      setSecondsRemaining(seconds);

      if (totp) {
        try {
          const rawPrev = totp.generate({ timestamp: now - 30000 });
          const rawCurrent = totp.generate({ timestamp: now });
          const rawNext = totp.generate({ timestamp: now + 30000 });
          
          setCodes({
            prev: `${rawPrev.slice(0, 3)} ${rawPrev.slice(3)}`,
            current: `${rawCurrent.slice(0, 3)} ${rawCurrent.slice(3)}`,
            next: `${rawNext.slice(0, 3)} ${rawNext.slice(3)}`
          });
          setErrorMsg(null);
        } catch (err) {
          setCodes({ prev: "--- ---", current: "--- ---", next: "--- ---" });
          setErrorMsg("INVALID SECRET FORMAT");
        }
      } else {
        setCodes({ prev: "000 000", current: "000 000", next: "000 000" });
        if (secret.length > 0) {
           setErrorMsg("INVALID SECRET KEY");
        } else {
           setErrorMsg(null);
        }
      }
    };

    // Run immediately
    updateCodeAndTimer();

    // Set interval to update every second
    const interval = setInterval(updateCodeAndTimer, 1000);
    return () => clearInterval(interval);
  }, [totp, secret]);

  const handleCopy = () => {
    if (codes.current !== "000 000" && codes.current !== "--- ---") {
      navigator.clipboard.writeText(codes.current.replace(/\s+/g, ''));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Calculate progress bar width (100% to 0%)
  const progressPercent = (secondsRemaining / 30) * 100;

  return (
    <div className="min-h-screen flex flex-col relative bg-(--c-void) text-(--c-ash)">
      {/* ── Background tetap ── */}
      <div
        className="fixed-bg"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/img/common/bg/bg.webp')",
        }}
      />
      
      {/* ── EFEK LATAR BELAKANG ── */}
      <div className="bg-grid" aria-hidden="true" />
      <DustOverlay />
      
      {/* ── Content Container ── */}
      <div className="relative z-10 flex flex-col min-h-screen mb-8">
        
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
          <div className="w-25 md:w-37.5 -mt-8 md:-mt-12 pointer-events-auto">
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

        <div className="flex-1 max-w-2xl mx-auto px-6 py-8 md:py-12 w-full">
          <div className="mb-8 flex justify-between items-center">
            <Link href="/" className="btn-bg hover-text inline-block px-4 py-2 font-bold text-sm">
              [ &lt; RETURN TO BASE ]
            </Link>
          </div>

          <div className="p-6 md:p-10 border shadow-lg relative overflow-hidden group" style={{ borderColor: "var(--c-border)", backgroundColor: "var(--c-box)", backdropFilter: "blur(5px)" }}>
            
            {/* Top right indicator */}
            <div className="absolute top-0 right-0 flex gap-1 p-3 opacity-50">
               <div className="w-1.5 h-1.5 rounded-full bg-(--c-red) animate-pulse" />
               <div className="w-1.5 h-1.5 rounded-full bg-(--c-ash)" />
            </div>

            <h1 className="text-xl md:text-2xl font-bold mb-6 tracking-widest" style={{ color: "var(--c-red)" }}>
              [ MULTI-FACTOR AUTH ]
            </h1>

            <div className="space-y-8">
              
              {/* Input Section */}
              <div className="space-y-2 relative">
                <label htmlFor="secret-input" className="block text-xs md:text-sm font-(--font-submenu) tracking-widest text-(--c-ash) opacity-80 uppercase">
                  &gt; ENTER SECRET KEY (BASE32)
                </label>
                <div className="relative">
                  <input
                    id="secret-input"
                    type="text"
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                    placeholder="JBSWY3DPEHPK3PXP"
                    className="w-full bg-[rgba(0,0,0,0.5)] border border-(--c-border) p-3 md:p-4 text-(--c-ash) font-(--font-submenu) tracking-widest focus:outline-none focus:border-(--c-red) transition-colors"
                    spellCheck={false}
                    autoComplete="off"
                  />
                  {/* Decorative corner brackets for input */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-(--c-red) opacity-50 pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-(--c-red) opacity-50 pointer-events-none" />
                </div>
                {errorMsg && (
                  <p className="text-(--c-red) text-xs font-(--font-submenu) mt-2 animate-pulse">
                    [!] {errorMsg}
                  </p>
                )}
              </div>

              {/* Display Code Section */}
              <div className="mt-8 pt-8 border-t border-(--c-border) relative">
                <div className="flex flex-col items-center justify-center">
                  
                  <div className="text-center w-full mb-6 relative">
                    {/* The Code Section (Style 2: Cards below) */}
                    <div className="w-full flex flex-col items-center justify-center">
                      
                      {/* CURRENT CODE */}
                      <div className="flex flex-col items-center shrink-0 relative mb-6">
                        <div 
                          onClick={handleCopy}
                          className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-widest md:tracking-[0.2em] cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 ${errorMsg || !totp ? "text-(--c-ash) opacity-30" : "text-(--c-red)"} whitespace-nowrap`}
                          style={{ 
                            textShadow: !errorMsg && totp ? "0 0 15px rgba(204,26,26,0.5), 0 0 30px rgba(204,26,26,0.3)" : "none"
                          }}
                          title="Click to copy"
                        >
                          {codes.current}
                        </div>
                      </div>

                      {/* PREV & NEXT CARDS */}
                      <div className="flex flex-row justify-center items-center gap-4 md:gap-8 w-full px-2 mt-4 opacity-70">
                        {/* PREV CARD */}
                        <div className="flex flex-col items-center justify-center border border-(--c-border) p-3 md:p-4 w-1/2 max-w-37.5 bg-[rgba(0,0,0,0.3)]">
                          <span className="text-[10px] md:text-xs font-(--font-submenu) tracking-widest uppercase mb-1 text-(--c-ash) opacity-50">PREV</span>
                          <span className="text-sm md:text-lg font-bold tracking-widest text-(--c-ash)">{codes.prev}</span>
                        </div>

                        {/* NEXT CARD */}
                        <div className="flex flex-col items-center justify-center border border-(--c-border) p-3 md:p-4 w-1/2 max-w-37.5 bg-[rgba(0,0,0,0.3)]">
                          <span className="text-[10px] md:text-xs font-(--font-submenu) tracking-widest uppercase mb-1 text-(--c-ash) opacity-50">NEXT</span>
                          <span className="text-sm md:text-lg font-bold tracking-widest text-(--c-ash)">{codes.next}</span>
                        </div>
                      </div>

                    </div>
                    
                    {copied && (
                       <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs font-(--font-submenu) text-(--c-red) tracking-widest animate-pulse">
                         [ COPIED TO CLIPBOARD ]
                       </div>
                    )}
                  </div>

                  {/* Visual Timer Bar */}
                  <div className="w-full max-w-sm mt-4">
                    <div className="flex justify-between items-center mb-2 text-xs font-(--font-submenu) text-(--c-ash) opacity-70">
                      <span>REFRESH IN</span>
                      <span>{secondsRemaining}s</span>
                    </div>
                    <div className="w-full h-1 bg-[rgba(232,224,208,0.1)] relative overflow-hidden">
                      <div 
                        className="absolute top-0 left-0 h-full transition-all duration-1000 ease-linear"
                        style={{ 
                          width: `${progressPercent}%`,
                          backgroundColor: secondsRemaining <= 5 ? "var(--c-red)" : "var(--c-ash)",
                          boxShadow: secondsRemaining <= 5 ? "0 0 10px var(--c-red)" : "none"
                        }}
                      />
                    </div>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>

        {/* ── FOOTER COPYRIGHT ── */}
        <div
          className="relative w-full z-30 flex flex-col items-center pb-8 mt-auto pt-8 border-t border-(--c-border)"
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
           </div>
        </div>

      </div>
      
      {/* ── Right Navigation & Theme Toggle ── */}
      <RightNav />
    </div>
  );
}
