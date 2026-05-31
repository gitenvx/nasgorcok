"use client";
import { useRef } from "react";
import Image from "next/image";
import RightNav from "@/components/RightNav";
import {
  SiPython, SiNodedotjs, SiTypescript,
  SiGithub, SiDocker, SiGit,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaWindows, FaUbuntu } from "react-icons/fa";
import MenuColumn    from "@/components/MenuColumn";
import KontakColumn  from "@/components/KontakColumn";
import DustOverlay from "@/components/DustOverlay";
import TickerBar     from "@/components/TickerBar";
// import CrackOverlay  from "@/components/CrackOverlay";
import AudioAutoplay from "@/components/AudioAutoplay";
import LyricsDisplay from "@/components/LyricsDisplay";
// import LoveAnimation from "@/components/LoveAnimation";
import AboutSection from "@/components/AboutSection";
import StorySection from "@/components/StorySection";
import LocationSection from "@/components/LocationSection";
import ScrollReveal  from "@/components/ScrollReveal";
import CookieConsent from "@/components/CookieConsent";
import { NAMA_WARUNG, NASI_GORENG, MIE_CAPCAY, KATA } from "@/lib/menu-data";

const LOGOS_CENTER = [SiPython, SiNodedotjs, SiTypescript, SiGit, SiGithub, SiDocker, VscVscode, FaUbuntu, FaWindows];

/**
 * Fungsi komponen utama halaman beranda
 * Menampilkan layout responsif dengan header, menu nasi goreng & mie,
 * kolom kontak, lirik musik, dan bagian about & story.
 * Mendukung tampilan desktop (3 kolom) dan mobile (scrollable vertical).
 */
export default function Home() {
  // Referensi untuk element audio di halaman
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <div className="min-h-screen flex flex-col relative pb-48 md:pb-64" style={{ backgroundColor: "#0a0a0a", color: "#e8e0d0" }}>

      {/* ── Background tetap — div terpisah untuk performa mobile ── */}
      <div
        className="fixed-bg"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/img/common/bg/bg.webp')",
        }}
      />

      {/* ── Audio ── */}
      <AudioAutoplay audioRef={audioRef} />

      {/* ── RIGHT NAV ── */}
      <RightNav />

      {/* ── Cookie Consent (Retro System Style) ── */}
      <CookieConsent />

      {/* ── TEKSTUR RETAK / GORESAN ──
      <CrackOverlay />*/}

      {/* ── EFEK LATAR BELAKANG ── */}

      <div className="bg-grid" aria-hidden="true" />
      <DustOverlay />

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── NAVBAR mentahan ── */}
        <header className="absolute top-0 left-0 w-full z-50 flex flex-col items-center justify-center pt-6 pb-0 pointer-events-none">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo/nasgor.webp"
            alt="Nasi Goreng"
            className="select-none pointer-events-auto"
            style={{
              height: "clamp(8rem, 25vw, 11rem)",
              width: "auto",
              objectFit: "contain",
              filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.8))"
            }}
          />
        </header>

        
        {/* mENu + logo ── */}
        <div className="text-center pt-[220px] pb-1">
          <div className="menu-header btn-bg mb-1 hover-text" style={{ textAlign: "center", display: "inline", marginBottom: 0 }}>
              {NAMA_WARUNG}
            </div><br/>
          <p
            className="hover-text"
            style={{
              fontFamily:    "var(--font-mono)",
              fontSize:      "clamp(0.75rem, 1.8vw, 1.2rem)",
              color:         "var(--c-ash)",
              letterSpacing: "0.1em",
              opacity:       0.85,
            }}
          >
            mENu
          </p>
          <div className="w-full flex items-center justify-center gap-2 flex-wrap mt-2">
            {LOGOS_CENTER.map((Icon, i) => (
              <Icon key={i} className="tech-logo" aria-hidden="true" />
            ))}
          </div>
        </div>

        {/* Pemisah ── */}
        <div className="mx-3 md:mx-6 mt-2" style={{ height: "1px", background: "var(--c-border)" }} aria-hidden="true" />

        {/* ── SEKSI KONTEN UTAMA ── */}
        <main id="menu" className="flex-1 pb-10">

          {/* Tampilan Desktop */}
          <div className="hidden md:grid md:grid-cols-3 h-full">
            <div>
              <MenuColumn title="[ Nasi Goreng ]" items={NASI_GORENG} />
              <div className="px-4 md:px-5 mt-4">
                <p>
                  <span className="re-textbox hover-text">
                    {KATA[0]}<br/>{KATA[1]}<br/>{KATA[2]}
                  </span>
                </p>
              </div>
            </div>

            {/* Kolom tengah — Mie + Lirik di bawah */}
            <div className="flex flex-col">
              <MenuColumn title="[ Mie > Capcay > Kwetiau ]" items={MIE_CAPCAY} hasDivider />
              {/* Lirik + play button — sejajar teks KATA di kolom kiri */}
              <div className="mt-4 pr-0">
                <LyricsDisplay audioRef={audioRef} />
              </div>
            </div>

            <div>
              <KontakColumn />
            </div>
          </div>

          {/* MULAI Tampilan Mobile */}
          <div className="md:hidden flex flex-col px-2">

            <div className="border-b" style={{ borderColor: "var(--c-border)" }}>
              <div className="m-3">
                <span className="menu-header btn-bg hover-text">[ Nasi Goreng ]</span>
              </div>
              <ul className="px-5 pb-5 space-y-1">
                {NASI_GORENG.map(item => (
                  <li key={item} className="menu-item">
                    <span className="menu-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-b" style={{ borderColor: "var(--c-border)" }}>
              <div className="m-3">
                <span className="menu-header btn-bg hover-text">[ Mie &gt; Capcay &gt; Kwetiau ]</span>
              </div>
              <ul className="px-5 pb-5 space-y-1">
                {MIE_CAPCAY.map(item => (
                  <li key={item} className="menu-item">
                    <span className="menu-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="px-4 mt-4 mb-4">
              <p>
                <span className="re-textbox hover-text">
                  {KATA[0]}<br/>{KATA[1]}<br/>{KATA[2]}
                </span>
              </p>
            </div>
            <div>
              <KontakColumn />
            </div>

            {/* Mobile: lirik + play button di bawah kontak */}
            <div className="px-4 mb-4 mt-3">
              <LyricsDisplay audioRef={audioRef} />
            </div>

          </div>
          {/* AKHIR Tampilan Mobile */}

          {/* Bagian Tentang — Gaya RE Requiem */}
          <div id="about" className="pt-8 -mt-8" />
          <ScrollReveal>
            <AboutSection />
          </ScrollReveal>

          {/* Bagian Cerita — Karusel Gaya RE Requiem */}
          <div id="story" className="relative top-32" />
          <ScrollReveal>
            <StorySection />
          </ScrollReveal>

          {/* Bagian Lokasi */}
          <div id="locations" className="pt-8 -mt-8" />
          <ScrollReveal>
            <LocationSection />
          </ScrollReveal>

          {/* Animasi Cinta — tengah di atas footer
          <div className="flex justify-center pb-6">
            <LoveAnimation />
          </div>}*/}
        </main>

        <div className="mx-3 md:mx-6" style={{ height: "1px", background: "var(--c-border)" }} aria-hidden="true" />

      </div>

      {/* TICKER FOOTER merekat di bawah */}
      <div
        className="absolute bottom-0 left-0 right-0 z-30 main-footer flex flex-col items-center pb-8"
        style={{
          backdropFilter:       "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          background:           "rgba(10,10,10,0.40)",
        }}
      >
        <div className="w-full border-b border-[rgba(232,224,208,0.15)] mb-8 bg-black/20">
          <div className="mx-auto w-full max-w-375">
            <TickerBar />
          </div>
        </div>
        
        {/* ── FOOTER LOGOS ── */}
        <div className="mb-6 flex flex-col items-center gap-0">
          <Image 
            src="/img/logo/nasgor.webp" 
            alt="NasgorCok Logo" 
            width={300} 
            height={300} 
            className="opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] grayscale hover:grayscale-0" 
          />
          <Image 
            src="/img/logo/mamasucok.webp" 
            alt="Mamas Ucok Logo" 
            width={150} 
            height={150} 
            className="-mt-6 opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] grayscale hover:grayscale-0" 
          />
        </div>
        
        {/* ── COPYRIGHT & POLICIES ── */}
        <div className="flex flex-col items-center gap-2 text-center px-4">
          <span className="text-sm text-white font-medium">
            © {new Date().getFullYear()} Mohammad Fathuloh. All rights reserved.
          </span>
          <div className="flex justify-center gap-6 mt-1 text-xs">
            <a href="/privacy-policy" className="text-white/80 hover:text-white transition-colors duration-300">Privacy Policy</a>
          </div>
        </div>
      </div>
    </div>
  );
}