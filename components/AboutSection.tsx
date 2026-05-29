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
      <ScrollReveal revealClass="anim-col-1" className="relative z-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8 mb-0">
          <JitterTitle text="Tentang" />
          <div className="mt-3">
            <p className="about-tagline re-textbox">{ABOUT.tagline}</p>
          </div>
        </div>
      </ScrollReveal>

      <section className="relative overflow-hidden w-full -mt-6" style={{ minHeight: '600px' }}>
        
        {/* ── Background Video Container (Capped Width for Zoom Out) ── */}
        <div className="absolute inset-0 z-0 flex justify-center w-full bg-[#0a0a0a]">
          <div className="relative w-full max-w-[1400px] h-full">
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
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(10,10,10,0.85)] via-[rgba(10,10,10,0.55)] to-[rgba(10,10,10,0.30)] pointer-events-none" />
            
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
                boxShadow: 'inset 0 0 0 30px #0a0a0a',
                filter: 'url(#grunge-edge-filter)',
                transform: 'scale(1.05)', /* Prevent outer edges from bleeding */
              }} 
            />
          </div>
        </div>

        {/* ── Content (Overlay on Video) ── */}
        <ScrollReveal revealClass="anim-col-2">
          <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-8 md:pt-12 pb-12">
            <p className="about-desc text-[rgba(232,224,208,0.85)] leading-relaxed tracking-wide text-sm md:text-base max-w-2xl">
              {ABOUT.description}
            </p>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
}
