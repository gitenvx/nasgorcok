// components/AboutSection.tsx
/**
 * Komponen About Section yang menampilkan video background dan konten tentang warung
 * Mencakup video latar, overlay, dan teks deskripsi dari ABOUT data
 */
"use client";
import { useRef, useEffect, useState } from "react";
import { ABOUT } from "@/lib/menu-data";
import JitterTitle from "@/components/JitterTitle";
import ScrollReveal from "@/components/ScrollReveal";

/**
 * Komponen AboutSection - Menampilkan bagian tentang warung dengan video background
 * Mencoba memutar video, jika error tampilkan fallback dengan overlay
 * @returns JSX element section dengan video dan konten tentang warung
 */
export default function AboutSection() {
  // Referensi ke element video
  const videoRef = useRef<HTMLVideoElement>(null);
  // State untuk tracking apakah video bisa dimuat atau error
  const [hasVideo, setHasVideo] = useState(true);
  // State untuk menyimpan Blob URL video
  const [videoUrl, setVideoUrl] = useState<string>("");

  // Ambil video sebagai Blob untuk menghindari deteksi IDM
  useEffect(() => {
    let active = true;
    let localUrl = "";

    fetch(ABOUT.videoSrc)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil video");
        return res.blob();
      })
      .then((blob) => {
        if (!active) return;
        localUrl = URL.createObjectURL(blob);
        setVideoUrl(localUrl);
      })
      .catch(() => {
        if (active) setHasVideo(false);
      });

    return () => {
      active = false;
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, []);

  // Coba mainkan video dan set fallback jika ada error
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !videoUrl) return;
    v.play().catch(() => {});
    const onError = () => setHasVideo(false);
    v.addEventListener("error", onError);
    return () => v.removeEventListener("error", onError);
  }, [videoUrl]);

  return (
    <div className="mt-8 mb-12 w-full relative">
      {/* ── Title and Tagline outside the video ── */}
      <ScrollReveal revealClass="anim-col-1" className="relative z-40">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-0">
          <JitterTitle text="About" />
          <div className="mt-3 text-zoom-reveal">
            <p className="about-tagline re-textbox">
              {ABOUT.tagline}
            </p>
          </div>
        </div>
      </ScrollReveal>

      <div className="relative w-full -mt-6">
        <section className="relative overflow-hidden w-full" style={{ minHeight: '600px' }}>
          
          {/* ── Background Video Container (Capped Width for Zoom Out) ── */}
          <div className="absolute inset-0 z-0 flex justify-center w-full bg-[#0a0a0a]">
            <div className="relative w-full max-w-350 h-full">
              {hasVideo && videoUrl && (
                <video
                  ref={videoRef}
                  src={videoUrl}
                  autoPlay
                  loop
                  muted
                  playsInline
                  disableRemotePlayback
                  controlsList="nodownload"
                  className="w-full h-full object-cover"
                  style={{ filter: "contrast(1.15) saturate(1.1) brightness(1.05)" }}
                />
              )}
              
              {/* Dark gradient overlay so text remains readable */}
              <div className="absolute inset-0 bg-linear-to-r from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.55)] to-[rgba(10,10,10,0.30)] pointer-events-none" />
              
              {/* ── Grunge Edge Frame (Jagged borders) ── */}
              <svg width="0" height="0" style={{ position: 'absolute' }}>
                <filter id="grunge-edge-filter">
                  <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" result="noise" />
                  <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" xChannelSelector="R" yChannelSelector="G" />
                </filter>
              </svg>
              <div 
                style={{
                  position: 'absolute',
                  inset: 0,
                  pointerEvents: 'none',
                  zIndex: 10,
                  boxShadow: 'inset 0 10px 0 0 #0a0a0a, inset -10px 0 0 0 #0a0a0a, inset 0 -30px 0 0 #0a0a0a, inset 30px 0 0 0 #0a0a0a',
                  filter: 'url(#grunge-edge-filter)',
                  transform: 'scale(1.05)', /* Prevent outer edges from bleeding */
                }} 
              />
            </div>
          </div>

          {/* ── Content (Overlay on Video) ── */}
          <ScrollReveal revealClass="anim-slide-right">
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-95 md:pt-12 pb-12">
              <p className="about-desc text-[rgba(232,224,208,0.85)] leading-relaxed tracking-wide text-sm md:text-base max-w-2xl">
                {ABOUT.description}
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── Outer Top Spill Splatter (Subtler) ── */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="grunge-spill-filter-top">
            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <div 
          className="absolute w-full h-[16px] z-20 pointer-events-none"
          style={{
            top: 0, // Wrapper top is exactly the section top
            marginTop: '-8px', // Center the 16px splatter exactly on the line

            left: 0,
            backgroundColor: '#0a0a0a',
            filter: 'url(#grunge-spill-filter-top)',
            transform: 'scaleX(1.05)',
          }} 
        />

        {/* ── Outer Bottom Spill Splatter (Bleeds out of the video container) ── */}
        <svg width="0" height="0" style={{ position: 'absolute' }}>
          <filter id="grunge-spill-filter">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="40" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </svg>
        <div 
          className="absolute w-full h-[50px] z-0 pointer-events-none"
          style={{
            bottom: '-25px', // Straddles the bottom edge, extending outwards
            left: 0,
            backgroundColor: '#0a0a0a',
            filter: 'url(#grunge-spill-filter)',
            transform: 'scaleX(1.05)', // Prevent straight edges on left/right
          }} 
        />
      </div>
    </div>
  );
}
