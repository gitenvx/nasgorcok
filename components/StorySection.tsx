// components/StorySection.tsx
/**
 * Komponen Story Section - Gaya Resident Evil Village
 * Teks cerita statis di sebelah kiri yang overlap dengan carousel gambar besar di sebelah kanan.
 * Auto-advance setiap 5 detik dengan top progress bar.
 */
"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { STORY } from "@/lib/menu-data";
import JitterTitle from "@/components/JitterTitle";
import ScrollReveal from "@/components/ScrollReveal";

export default function StorySection() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const total = STORY.slides.length;
  const DURATION = 5000; // 5 seconds per slide

  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearProgress = () => {
    if (progressRef.current) clearInterval(progressRef.current);
  };

  const goTo = useCallback((idx: number) => {
    const newIdx = ((idx % total) + total) % total;
    setActive(newIdx);
    setProgress(0);
  }, [total]);

  // Start progress bar + auto-advance
  useEffect(() => {
    setProgress(0);
    clearProgress();

    const tick = 50; // ms per tick
    const steps = DURATION / tick;
    let current = 0;

    progressRef.current = setInterval(() => {
      current++;
      setProgress((current / steps) * 100);
      if (current >= steps) {
        clearProgress();
        // Advance to next slide
        setActive(prev => (prev + 1) % total);
        setProgress(0);
      }
    }, tick);

    return clearProgress;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, total]);

  return (
    <section className="relative overflow-hidden w-full py-16 mt-8" aria-label="Story">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-12 relative z-10 flex flex-col lg:block lg:min-h-[850px]">
        
        {/* ── MOBILE TITLE (Only visible on small screens, placed at the very top) ── */}
        <div className="block lg:hidden w-full mb-6 relative z-20">
          <JitterTitle text={STORY.title} className="text-left" />
        </div>

        {/* ── IMAGE CAROUSEL (Absolute on Desktop, positioned on right) ── */}
        <ScrollReveal revealClass="anim-col-2" className="relative lg:absolute lg:top-24 lg:right-8 lg:w-[65%] w-full mb-16 lg:mb-0 z-10 flex flex-col">
          
          {/* Custom Pagination: IMAGES 1 2 3 (Above photo on mobile, below on PC) */}
          <div className="order-1 lg:order-2 mb-4 lg:mb-0 lg:mt-4 w-full flex justify-end z-30 font-mono text-[var(--c-ash)] select-none">
            <div className="flex items-center gap-4">
              <span className="tracking-[0.2em] text-[10px] opacity-75 uppercase mr-1 text-white">IMAGE</span>
              <div className="flex items-center gap-2">
              {STORY.slides.map((_, i) => {
                const isActive = i === active;
                const radius = 14;
                const strokeDasharray = 2 * Math.PI * radius;
                const strokeDashoffset = strokeDasharray - (progress / 100) * strokeDasharray;

                const btn = (
                  <button
                    key={`btn-${i}`}
                    onClick={() => goTo(i)}
                    className="relative w-7 h-7 flex items-center justify-center cursor-pointer group transition-transform duration-300 active:scale-95"
                    aria-label={`Go to image ${i + 1}`}
                  >
                    {/* SVG Circular Progress Indicator */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
                      {/* Background track circle */}
                      <circle
                        cx="18"
                        cy="18"
                        r={radius}
                        fill="transparent"
                        stroke="rgba(232, 224, 208, 0.25)"
                        strokeWidth="2.5"
                        className="transition-colors duration-300 group-hover:stroke-[rgba(232, 224, 208, 0.45)]"
                      />
                      {/* Active progress circle */}
                      {isActive && (
                        <circle
                          cx="18"
                          cy="18"
                          r={radius}
                          fill="transparent"
                          stroke="#ff3b30"
                          strokeWidth="3"
                          strokeDasharray={strokeDasharray}
                          strokeDashoffset={strokeDashoffset}
                          className="transition-[stroke-dashoffset] ease-linear duration-50"
                          style={{ filter: "drop-shadow(0 0 4px rgba(255, 59, 48, 0.8))" }}
                        />
                      )}
                    </svg>
                    {/* Slide Number */}
                    <span
                      className={`z-10 text-[10px] font-mono font-bold transition-all duration-300 ${
                        isActive
                          ? "text-white scale-110"
                          : "text-[var(--c-ash)]/50 group-hover:text-white"
                      }`}
                    >
                      {i + 1}
                    </span>
                  </button>
                );

                // Add a dash after the button if it's not the last one
                if (i < STORY.slides.length - 1) {
                  return [
                    btn,
                    <span key={`dash-${i}`} className="text-[var(--c-ash)]/40 text-[10px] select-none font-bold">
                      -
                    </span>
                  ];
                }
                return btn;
              })}
            </div>
          </div>
        </div>
        
          <div className="order-2 lg:order-1 relative w-full h-[400px] lg:h-[600px] mt-4 lg:mt-8">
            
            {/* Image Slides (Stacked Deck Effect) */}
            {STORY.slides.map((slide, i) => {
              const total = STORY.slides.length;
              const offset = (i - active + total) % total;
              const isVisible = offset < 3;
              
              let translateX = 0;
              let translateY = 0;
              let zIndex = 0;
              let overlayOpacity = 0;
              
              if (offset === 0) {
                zIndex = 30;
                overlayOpacity = 0;
              } else if (offset === 1) {
                translateX = 12;
                translateY = -12;
                zIndex = 20;
                overlayOpacity = 0.6; // Darken the second card
              } else if (offset === 2) {
                translateX = 24;
                translateY = -24;
                zIndex = 10;
                overlayOpacity = 0.85; // Darken the third card heavily
              }
              
              return (
                <div
                  key={i}
                  className="absolute inset-0 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] border-[3px] border-[rgba(232,224,208,0.35)] overflow-hidden bg-[#050505] shadow-2xl"
                  style={{
                    transform: `translate(${translateX}px, ${translateY}px)`,
                    zIndex: zIndex,
                    opacity: isVisible ? 1 : 0,
                    pointerEvents: offset === 0 ? 'auto' : 'none'
                  }}
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={slide.img}
                      alt={`Story ${i + 1}`}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 65vw"
                      priority={i === 0}
                    />
                    {/* Shadow Overlay for cards behind */}
                    <div 
                      className="absolute inset-0 bg-black transition-opacity duration-700 z-10" 
                      style={{ opacity: overlayOpacity }} 
                    />
                    {/* Subtle Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-20" />
                  </div>
                </div>
              );
            })}
          </div>

        </ScrollReveal>

        {/* ── TEXT CONTENT (Overlaps the image on Desktop) ── */}
        <ScrollReveal revealClass="anim-col-1" className="relative z-20 lg:w-[85%] lg:pt-[320px] pointer-events-none">
          {/* PC ONLY TITLE */}
          <div className="hidden lg:block">
            <JitterTitle text={STORY.title} className="text-left mb-16 lg:mb-40" />
          </div>
          
          <div className="flex flex-col gap-[2px] lg:gap-[3px] max-w-4xl">
            {STORY.desc.map((paragraph, i) => (
              <div key={i} className="text-left">
                <span 
                  className="re-textbox"
                  style={{
                    backgroundColor: "rgba(235, 235, 235, 0.95)",
                    lineHeight: "1.5"
                  }}
                >
                  {paragraph}
                </span>
              </div>
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
