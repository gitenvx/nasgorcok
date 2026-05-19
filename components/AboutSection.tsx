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

      {/* ── Splatter / bercak edges (top & bottom only - minimal) ── */}
      <div className="about-splatter" aria-hidden="true">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="splatterBlur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>

          {/* Top edge - minimal splatter */}
          <ellipse cx="200" cy="15" rx="40" ry="12" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="180" cy="20" r="8" fill="var(--c-void)" opacity="0.5"/>
          <circle cx="720" cy="18" r="10" fill="var(--c-void)" opacity="0.55" filter="url(#splatterBlur)"/>
          <ellipse cx="1240" cy="15" rx="35" ry="12" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="1260" cy="22" r="7" fill="var(--c-void)" opacity="0.5"/>

          {/* Bottom edge - minimal splatter */}
          <ellipse cx="200" cy="585" rx="40" ry="12" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="180" cy="580" r="8" fill="var(--c-void)" opacity="0.5"/>
          <circle cx="720" cy="582" r="10" fill="var(--c-void)" opacity="0.55" filter="url(#splatterBlur)"/>
          <ellipse cx="1240" cy="585" rx="35" ry="12" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="1260" cy="578" r="7" fill="var(--c-void)" opacity="0.5"/>
        </svg>
      </div>

      {/* ── Content ── */}
      <div className="about-content">
        <h2 className="about-title">Tentang</h2>
        <p className="about-tagline">{ABOUT.tagline}</p>
        <p className="about-desc">{ABOUT.description}</p>
      </div>
    </section>
  );
}
