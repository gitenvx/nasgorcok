// components/AboutSection.tsx
/**
 * Komponen About Section yang menampilkan video background dan konten tentang warung
 * Mencakup video latar, overlay, dan teks deskripsi dari ABOUT data
 */
"use client";
import { useRef, useEffect, useState } from "react";
import { ABOUT } from "@/lib/menu-data";

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

  // Coba mainkan video dan set fallback jika ada error
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const onError = () => setHasVideo(false);
    v.addEventListener("error", onError);
    return () => v.removeEventListener("error", onError);
  }, []);

  return (
    <section className="about-section">
      {/* ── Video / fallback background ── */}
      <div className="about-bg">
        {hasVideo && (
          <video
            ref={videoRef}
            src={ABOUT.videoSrc}
            autoPlay
            loop
            muted
            playsInline
            className="about-video"
          />
        )}
        <div className="about-overlay" />
      </div>

      {/* ── Content ── */}
      <div className="about-content">
        <h2 className="about-title">Tentang</h2>
        <p className="about-tagline re-textbox">{ABOUT.tagline}</p>
        <p className="about-desc">{ABOUT.description}</p>
      </div>
    </section>
  );
}
