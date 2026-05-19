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

      {/* ── Splatter / bercak edges ── */}
      <div className="about-splatter" aria-hidden="true">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="splatterBlur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Top-left splatter cluster */}
          <path d="M0,0 Q60,130 0,260 Q40,200 90,210 Q50,130 130,100 Q70,50 0,0Z" fill="var(--c-void)" opacity="0.95" filter="url(#splatterBlur)"/>
          <path d="M0,0 Q160,25 200,110 Q120,60 100,130 Q55,90 0,60Z" fill="var(--c-void)" opacity="0.9" filter="url(#splatterBlur)"/>
          <ellipse cx="50" cy="150" rx="30" ry="20" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <circle cx="110" cy="55" r="18" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="145" cy="110" r="12" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="80" cy="200" r="8" fill="var(--c-void)" opacity="0.5"/>
          <circle cx="170" cy="70" r="6" fill="var(--c-void)" opacity="0.45"/>

          {/* Top-right splatter cluster */}
          <path d="M1440,0 Q1370,120 1440,250 Q1400,190 1350,195 Q1385,120 1310,95 Q1370,45 1440,0Z" fill="var(--c-void)" opacity="0.95" filter="url(#splatterBlur)"/>
          <path d="M1440,0 Q1280,30 1250,115 Q1320,65 1345,135 Q1390,85 1440,55Z" fill="var(--c-void)" opacity="0.9" filter="url(#splatterBlur)"/>
          <ellipse cx="1390" cy="145" rx="28" ry="22" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <circle cx="1330" cy="60" r="16" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="1295" cy="105" r="10" fill="var(--c-void)" opacity="0.55" filter="url(#splatterBlur)"/>

          {/* Bottom-left splatter cluster */}
          <path d="M0,600 Q65,470 0,350 Q45,410 95,400 Q55,480 135,510 Q70,555 0,600Z" fill="var(--c-void)" opacity="0.95" filter="url(#splatterBlur)"/>
          <path d="M0,600 Q175,575 210,490 Q130,540 110,475 Q60,520 0,550Z" fill="var(--c-void)" opacity="0.9" filter="url(#splatterBlur)"/>
          <ellipse cx="55" cy="460" rx="28" ry="20" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <circle cx="115" cy="545" r="16" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="150" cy="500" r="10" fill="var(--c-void)" opacity="0.55" filter="url(#splatterBlur)"/>
          <circle cx="85" cy="395" r="7" fill="var(--c-void)" opacity="0.5"/>

          {/* Bottom-right splatter cluster */}
          <path d="M1440,600 Q1375,480 1440,360 Q1400,415 1350,405 Q1390,480 1310,510 Q1375,555 1440,600Z" fill="var(--c-void)" opacity="0.95" filter="url(#splatterBlur)"/>
          <path d="M1440,600 Q1270,580 1240,500 Q1320,535 1340,480 Q1395,525 1440,555Z" fill="var(--c-void)" opacity="0.9" filter="url(#splatterBlur)"/>
          <ellipse cx="1385" cy="465" rx="28" ry="22" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <circle cx="1325" cy="545" r="15" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="1295" cy="495" r="10" fill="var(--c-void)" opacity="0.55" filter="url(#splatterBlur)"/>

          {/* Left edge drips / stains */}
          <path d="M0,280 Q30,300 25,360 Q15,340 0,350Z" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="15" cy="310" r="12" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="10" cy="430" r="9" fill="var(--c-void)" opacity="0.5" filter="url(#splatterBlur)"/>

          {/* Right edge drips / stains */}
          <path d="M1440,290 Q1410,310 1415,370 Q1425,345 1440,355Z" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="1425" cy="320" r="12" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="1430" cy="440" r="9" fill="var(--c-void)" opacity="0.5" filter="url(#splatterBlur)"/>

          {/* Scattered small splotches */}
          <circle cx="200" cy="20" r="5" fill="var(--c-void)" opacity="0.4"/>
          <circle cx="250" cy="45" r="3" fill="var(--c-void)" opacity="0.35"/>
          <circle cx="1240" cy="25" r="5" fill="var(--c-void)" opacity="0.4"/>
          <circle cx="180" cy="575" r="5" fill="var(--c-void)" opacity="0.4"/>
          <circle cx="1260" cy="580" r="5" fill="var(--c-void)" opacity="0.4"/>
          <circle cx="1200" cy="555" r="3" fill="var(--c-void)" opacity="0.35"/>
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
