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

      {/* ── Liquid spill edges (top & bottom only) — transparent to show bg ── */}
      <div className="about-splatter" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "80px" }}>
          {/* Top liquid spill — irregular drip edge */}
          <path d="M0,0 L1440,0 L1440,30 Q1380,55 1320,35 Q1260,60 1200,40 Q1140,70 1080,45 Q1020,65 960,38 Q900,58 840,42 Q780,68 720,35 Q660,55 600,40 Q540,72 480,45 Q420,60 360,38 Q300,55 240,42 Q180,65 120,35 Q60,50 0,40 Z" fill="var(--c-void)" opacity="0.95"/>
          <path d="M0,0 L1440,0 L1440,20 Q1350,40 1280,25 Q1180,48 1100,30 Q1000,50 920,28 Q820,45 740,25 Q640,42 560,28 Q460,48 380,25 Q280,40 200,22 Q100,38 0,25 Z" fill="var(--c-void)"/>
        </svg>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "80px" }}>
          {/* Bottom liquid spill — irregular drip edge */}
          <path d="M0,120 L1440,120 L1440,90 Q1380,65 1320,85 Q1260,60 1200,80 Q1140,50 1080,75 Q1020,55 960,82 Q900,62 840,78 Q780,52 720,85 Q660,65 600,80 Q540,48 480,75 Q420,60 360,82 Q300,65 240,78 Q180,55 120,85 Q60,70 0,80 Z" fill="var(--c-void)" opacity="0.95"/>
          <path d="M0,120 L1440,120 L1440,100 Q1350,80 1280,95 Q1180,72 1100,90 Q1000,70 920,92 Q820,75 740,95 Q640,78 560,92 Q460,72 380,95 Q280,80 200,98 Q100,82 0,95 Z" fill="var(--c-void)"/>
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
