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
    <section className="about-section">
      {/* ── Video / fallback background ── */}
      <div className="about-bg">
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
