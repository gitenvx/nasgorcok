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

      {/* ── Splatter / bercak edges (top & bottom only) ── */}
      <div className="about-splatter" aria-hidden="true">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="splatterBlur">
              <feGaussianBlur stdDeviation="3" />
            </filter>
          </defs>

          {/* Top splatter - left area */}
          <path d="M100,0 Q160,30 200,60 Q140,50 120,80 Q75,50 60,0Z" fill="var(--c-void)" opacity="0.95" filter="url(#splatterBlur)"/>
          <ellipse cx="150" cy="35" rx="30" ry="20" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <circle cx="210" cy="40" r="18" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="180" cy="15" r="12" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="120" cy="50" r="8" fill="var(--c-void)" opacity="0.5"/>

          {/* Top splatter - center */}
          <circle cx="600" cy="25" r="15" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="720" cy="35" r="20" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <ellipse cx="800" cy="20" rx="25" ry="15" fill="var(--c-void)" opacity="0.75" filter="url(#splatterBlur)"/>
          <circle cx="500" cy="40" r="10" fill="var(--c-void)" opacity="0.6"/>
          <circle cx="900" cy="30" r="12" fill="var(--c-void)" opacity="0.65"/>

          {/* Top splatter - right area */}
          <path d="M1340,0 Q1280,30 1240,60 Q1300,50 1320,80 Q1365,50 1380,0Z" fill="var(--c-void)" opacity="0.95" filter="url(#splatterBlur)"/>
          <ellipse cx="1290" cy="35" rx="28" ry="22" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <circle cx="1230" cy="40" r="16" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="1260" cy="15" r="10" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="1320" cy="50" r="8" fill="var(--c-void)" opacity="0.55"/>

          {/* Bottom splatter - left area */}
          <path d="M100,600 Q165,570 210,540 Q145,550 125,520 Q80,550 65,600Z" fill="var(--c-void)" opacity="0.95" filter="url(#splatterBlur)"/>
          <ellipse cx="155" cy="565" rx="28" ry="20" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <circle cx="215" cy="560" r="16" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="185" cy="585" r="10" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="125" cy="550" r="7" fill="var(--c-void)" opacity="0.5"/>

          {/* Bottom splatter - center */}
          <circle cx="600" cy="575" r="15" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="720" cy="565" r="20" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <ellipse cx="800" cy="580" rx="25" ry="15" fill="var(--c-void)" opacity="0.75" filter="url(#splatterBlur)"/>
          <circle cx="500" cy="560" r="10" fill="var(--c-void)" opacity="0.6"/>
          <circle cx="900" cy="570" r="12" fill="var(--c-void)" opacity="0.65"/>

          {/* Bottom splatter - right area */}
          <path d="M1340,600 Q1275,570 1235,540 Q1295,550 1315,520 Q1360,550 1375,600Z" fill="var(--c-void)" opacity="0.95" filter="url(#splatterBlur)"/>
          <ellipse cx="1285" cy="565" rx="28" ry="22" fill="var(--c-void)" opacity="0.8" filter="url(#splatterBlur)"/>
          <circle cx="1225" cy="560" r="15" fill="var(--c-void)" opacity="0.7" filter="url(#splatterBlur)"/>
          <circle cx="1260" cy="585" r="10" fill="var(--c-void)" opacity="0.6" filter="url(#splatterBlur)"/>
          <circle cx="1315" cy="550" r="8" fill="var(--c-void)" opacity="0.55"/>

          {/* Scattered small splotches - top */}
          <circle cx="350" cy="20" r="5" fill="var(--c-void)" opacity="0.4"/>
          <circle cx="450" cy="45" r="3" fill="var(--c-void)" opacity="0.35"/>
          <circle cx="1050" cy="25" r="5" fill="var(--c-void)" opacity="0.4"/>
          <circle cx="1150" cy="35" r="4" fill="var(--c-void)" opacity="0.38"/>
          
          {/* Scattered small splotches - bottom */}
          <circle cx="350" cy="580" r="5" fill="var(--c-void)" opacity="0.4"/>
          <circle cx="450" cy="555" r="3" fill="var(--c-void)" opacity="0.35"/>
          <circle cx="1050" cy="575" r="5" fill="var(--c-void)" opacity="0.4"/>
          <circle cx="1150" cy="565" r="4" fill="var(--c-void)" opacity="0.38"/>
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
