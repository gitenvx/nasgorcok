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

      {/* ── Blood splatter edges (RE9-style) — top & bottom only, fill = bg color */}
      <div className="about-splatter" aria-hidden="true">
        {/* TOP splatter — drips going down */}
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "120px" }}
        >
          {/* Main jagged splatter edge with drips */}
          <path
            fill="var(--c-void)"
            d="M0,0 L1440,0 L1440,40
               C 1410,55 1395,70 1380,52
               C 1360,80 1340,68 1325,90
               C 1310,72 1295,85 1280,55
               C 1265,68 1250,52 1235,75
               L 1230,100
               L 1225,75
               C 1210,60 1195,72 1180,50
               C 1160,72 1140,58 1125,82
               L 1120,108
               L 1115,82
               C 1095,68 1080,80 1065,55
               C 1045,72 1025,60 1010,80
               C 990,65 970,78 955,52
               C 935,75 915,62 900,85
               L 895,98
               L 890,85
               C 870,68 850,80 835,55
               C 815,72 795,58 780,82
               C 760,65 740,78 725,50
               C 705,72 685,60 670,82
               L 665,105
               L 660,82
               C 640,68 620,80 605,55
               C 585,75 565,62 550,85
               C 530,68 510,80 495,55
               C 475,75 455,62 440,82
               L 435,95
               L 430,82
               C 410,68 390,80 375,52
               C 355,72 335,60 320,80
               C 300,65 280,78 265,55
               C 245,72 225,58 210,82
               L 205,110
               L 200,82
               C 180,68 160,80 145,55
               C 125,75 105,62 90,82
               C 70,65 50,78 35,52
               C 20,68 10,55 0,40 Z"
          />
          {/* Isolated droplets dripping down */}
          <ellipse cx="180" cy="115" rx="3" ry="6" fill="var(--c-void)" />
          <ellipse cx="450" cy="120" rx="2.5" ry="5" fill="var(--c-void)" />
          <ellipse cx="640" cy="125" rx="3" ry="7" fill="var(--c-void)" />
          <ellipse cx="900" cy="118" rx="2" ry="4" fill="var(--c-void)" />
          <ellipse cx="1090" cy="122" rx="3" ry="6" fill="var(--c-void)" />
          <ellipse cx="1240" cy="128" rx="2.5" ry="5" fill="var(--c-void)" />
          <circle cx="320" cy="112" r="1.5" fill="var(--c-void)" />
          <circle cx="780" cy="115" r="1.8" fill="var(--c-void)" />
          <circle cx="1170" cy="118" r="1.5" fill="var(--c-void)" />
        </svg>

        {/* BOTTOM splatter — drips going up */}
        <svg
          viewBox="0 0 1440 140"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "120px" }}
        >
          <path
            fill="var(--c-void)"
            d="M0,140 L1440,140 L1440,100
               C 1410,85 1395,70 1380,88
               C 1360,60 1340,72 1325,50
               C 1310,68 1295,55 1280,85
               C 1265,72 1250,88 1235,65
               L 1230,40
               L 1225,65
               C 1210,80 1195,68 1180,90
               C 1160,68 1140,82 1125,58
               L 1120,32
               L 1115,58
               C 1095,72 1080,60 1065,85
               C 1045,68 1025,80 1010,60
               C 990,75 970,62 955,88
               C 935,65 915,78 900,55
               L 895,42
               L 890,55
               C 870,72 850,60 835,85
               C 815,68 795,82 780,58
               C 760,75 740,62 725,90
               C 705,68 685,80 670,58
               L 665,35
               L 660,58
               C 640,72 620,60 605,85
               C 585,65 565,78 550,55
               C 530,72 510,60 495,85
               C 475,65 455,78 440,58
               L 435,45
               L 430,58
               C 410,72 390,60 375,88
               C 355,68 335,80 320,60
               C 300,75 280,62 265,85
               C 245,68 225,82 210,58
               L 205,30
               L 200,58
               C 180,72 160,60 145,85
               C 125,65 105,78 90,58
               C 70,75 50,62 35,88
               C 20,72 10,85 0,100 Z"
          />
          {/* Isolated droplets splashing up */}
          <ellipse cx="220" cy="25" rx="3" ry="6" fill="var(--c-void)" />
          <ellipse cx="480" cy="20" rx="2.5" ry="5" fill="var(--c-void)" />
          <ellipse cx="680" cy="15" rx="3" ry="7" fill="var(--c-void)" />
          <ellipse cx="920" cy="22" rx="2" ry="4" fill="var(--c-void)" />
          <ellipse cx="1110" cy="18" rx="3" ry="6" fill="var(--c-void)" />
          <ellipse cx="1260" cy="12" rx="2.5" ry="5" fill="var(--c-void)" />
          <circle cx="350" cy="28" r="1.5" fill="var(--c-void)" />
          <circle cx="800" cy="25" r="1.8" fill="var(--c-void)" />
          <circle cx="1200" cy="22" r="1.5" fill="var(--c-void)" />
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
