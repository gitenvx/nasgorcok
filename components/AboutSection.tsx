// components/AboutSection.tsx
"use client";
import { useRef, useEffect, useState } from "react";
import { ABOUT } from "@/lib/menu-data";

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState(true);

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
        <h2 className="about-title">About</h2>
        <p className="about-tagline">{ABOUT.tagline}</p>
        <p className="about-desc">{ABOUT.description}</p>
      </div>
    </section>
  );
}
