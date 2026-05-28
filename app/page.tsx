// app/page.tsx
"use client";
import { useRef } from "react";
import {
  SiPython, SiNodedotjs, SiTypescript,
  SiGithub, SiDocker, SiGit,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { FaWindows, FaUbuntu } from "react-icons/fa";
import MenuColumn    from "@/components/MenuColumn";
import KontakColumn  from "@/components/KontakColumn";
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
    <div className="min-h-screen flex flex-col relative">

      {/* ── Background tetap — div terpisah untuk performa mobile ── */}
      <div
        className="fixed-bg"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/img/bg.webp')",
        }}
      />

      {/* ── Audio ── */}
      <AudioAutoplay audioRef={audioRef} />

      {/* ── Cookie Consent (Retro System Style) ── */}
      <CookieConsent />

      {/* ── TEKSTUR RETAK / GORESAN ──
      <CrackOverlay />*/}

      {/* ── EFEK LATAR BELAKANG ── */}

      <div className="bg-grid" aria-hidden="true" />

      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── NAVBAR merekat dengan blur ── */}
        <header
          className="sticky top-0 z-30 flex flex-col items-center justify-center px-3 md:px-2 pt-0 pb-0"
          style={{
            backdropFilter:       "blur(2px)",
            WebkitBackdropFilter: "blur(2px)",
            background:           "rgba(10,10,10,0.40)",
            borderBottom:         "1px solid var(--c-border)",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo/nasgor.webp"
            alt="Nasi Goreng"
            className="select-none"
            style={{
              height: "clamp(5rem, 15vw, 5.5rem)",
              width: "auto",
              objectFit: "contain",
            }}
/>

          {/*<h1
            className="leading-none uppercase select-none flex items-center justify-center"
            style={{
              fontFamily:    "var(--font-title)",
              fontSize:      "clamp(2.8rem, 8vw, 4.5rem)",
              color:         "var(--c-ash)",
              textShadow:    "2px 4px 0 rgba(0,0,0,0.9)",
              letterSpacing: "0.15em",
            }}
            aria-label="Nasi Goreng"
          >
            {"NASIGO".split("").map((ch, i) => (
              <span key={i} className="letter-drop" style={{ animationDelay: `${0.05 + i * 0.07}s` }} aria-hidden="true">
                {ch}
              </span>
            ))}
            <span
              className="title-re letter-re"
              style={{ fontFamily: "var(--font-title)", letterSpacing: "0.04em", animationDelay: "0.55s" }}
              aria-hidden="true"
            >RE</span>
            {"NG".split("").map((ch, i) => (
              <span key={i} className="letter-drop" style={{ animationDelay: `${0.65 + i * 0.07}s`, letterSpacing: "0.15em" }} aria-hidden="true">
                {ch}
              </span>
            ))}
          </h1>*/}

          
        </header>

        
        {/* mENu + logo ── */}
        <div className="text-center pt-3 pb-1">
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

        <main className="flex-1 pb-10">

          {/* Tampilan Desktop */}
          <div className="hidden md:grid md:grid-cols-3 h-full">
            <ScrollReveal revealClass="anim-col-1">
              <MenuColumn title="[ Nasi Goreng ]" items={NASI_GORENG} />
              <div className="px-4 md:px-5 mt-4">
                <p>
                  <span className="re-textbox hover-text">
                    {KATA[0]}<br/>{KATA[1]}<br/>{KATA[2]}
                  </span>
                </p>
              </div>
            </ScrollReveal>

            {/* Kolom tengah — Mie + Lirik di bawah */}
            <ScrollReveal revealClass="anim-col-2" className="flex flex-col">
              <MenuColumn title="[ Mie > Capcay > Kwetiau ]" items={MIE_CAPCAY} hasDivider />
              {/* Lirik + play button — sejajar teks KATA di kolom kiri */}
              <div className="mt-4 pr-0">
                <LyricsDisplay audioRef={audioRef} />
              </div>
            </ScrollReveal>

            <ScrollReveal revealClass="anim-col-3">
              <KontakColumn />
            </ScrollReveal>
          </div>

          {/* MULAI Tampilan Mobile */}
          <ScrollReveal revealClass="anim-nama" className="md:hidden flex flex-col px-2">

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

          </ScrollReveal>
          {/* AKHIR Tampilan Mobile */}

          {/* Bagian Tentang — Gaya RE Requiem */}
          <ScrollReveal>
            <AboutSection />
          </ScrollReveal>

          {/* Bagian Cerita — Karusel Gaya RE Requiem */}
          <ScrollReveal>
            <StorySection />
          </ScrollReveal>

          {/* Bagian Lokasi */}
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
        className="fixed bottom-0 left-0 right-0 z-30 main-footer"
        style={{
          backdropFilter:       "blur(2px)",
          WebkitBackdropFilter: "blur(2px)",
          background:           "rgba(10,10,10,0.40)",
        }}
      >
        <div className="mx-auto w-full max-w-375">
          <TickerBar />
        </div>
      </div>
    </div>
  );
}