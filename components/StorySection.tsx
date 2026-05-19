// components/StorySection.tsx
"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { STORY } from "@/lib/menu-data";

export default function StorySection() {
  const [active, setActive] = useState(0);
  const total = STORY.slides.length;
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const goTo = useCallback((idx: number) => {
    setActive(((idx % total) + total) % total);
  }, [total]);

  const next = useCallback(() => goTo(active + 1), [active, goTo]);
  const prev = useCallback(() => goTo(active - 1), [active, goTo]);

  // Keyboard arrow support
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, prev]);

  // Touch swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].clientX;
    touchEndX.current = null;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
  };
  const onTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) {
      if (diff > 0) next(); else prev();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const slide = STORY.slides[active];

  return (
    <section className="story-section" aria-label="Story">
      {/* ── Liquid spill edges (top & bottom only) — transparent to show bg ── */}
      <div className="story-splatter" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "80px" }}>
          <path d="M0,0 L1440,0 L1440,30 Q1380,55 1320,35 Q1260,60 1200,40 Q1140,70 1080,45 Q1020,65 960,38 Q900,58 840,42 Q780,68 720,35 Q660,55 600,40 Q540,72 480,45 Q420,60 360,38 Q300,55 240,42 Q180,65 120,35 Q60,50 0,40 Z" fill="var(--c-void)" opacity="0.95"/>
          <path d="M0,0 L1440,0 L1440,20 Q1350,40 1280,25 Q1180,48 1100,30 Q1000,50 920,28 Q820,45 740,25 Q640,42 560,28 Q460,48 380,25 Q280,40 200,22 Q100,38 0,25 Z" fill="var(--c-void)"/>
        </svg>
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "80px" }}>
          <path d="M0,120 L1440,120 L1440,90 Q1380,65 1320,85 Q1260,60 1200,80 Q1140,50 1080,75 Q1020,55 960,82 Q900,62 840,78 Q780,52 720,85 Q660,65 600,80 Q540,48 480,75 Q420,60 360,82 Q300,65 240,78 Q180,55 120,85 Q60,70 0,80 Z" fill="var(--c-void)" opacity="0.95"/>
          <path d="M0,120 L1440,120 L1440,100 Q1350,80 1280,95 Q1180,72 1100,90 Q1000,70 920,92 Q820,75 740,95 Q640,78 560,92 Q460,72 380,95 Q280,80 200,98 Q100,82 0,95 Z" fill="var(--c-void)"/>
        </svg>
      </div>

      {/* ── Inner container ── */}
      <div className="story-inner">
        {/* Header */}
        <div className="story-header">
          <h2 className="story-title">{STORY.title}</h2>
          <span className="story-counter">
            <span className="story-counter-cur">{String(active + 1).padStart(2, "0")}</span>
            <span className="story-counter-sep">/</span>
            <span className="story-counter-tot">{String(total).padStart(2, "0")}</span>
          </span>
        </div>

        {/* Carousel */}
        <div
          className="story-carousel"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {/* Image side */}
          <div className="story-image-wrap">
            {STORY.slides.map((s, i) => (
              <div
                key={i}
                className={`story-image-slide ${i === active ? "is-active" : ""}`}
                aria-hidden={i !== active}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.img} alt={s.heading} className="story-img" loading="lazy" />
                <div className="story-image-overlay" />
              </div>
            ))}

            {/* Prev / Next buttons */}
            <button
              type="button"
              className="story-nav story-nav-prev"
              onClick={prev}
              aria-label="Previous slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                <polyline points="15 6 9 12 15 18" />
              </svg>
            </button>
            <button
              type="button"
              className="story-nav story-nav-next"
              onClick={next}
              aria-label="Next slide"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square" strokeLinejoin="miter">
                <polyline points="9 6 15 12 9 18" />
              </svg>
            </button>
          </div>

          {/* Caption side */}
          <div className="story-caption">
            {STORY.slides.map((s, i) => (
              <div
                key={i}
                className={`story-caption-slide ${i === active ? "is-active" : ""}`}
                aria-hidden={i !== active}
              >
                <span className="story-chapter">{s.chapter}</span>
                <h3 className="story-heading">{s.heading}</h3>
                <p className="story-desc">{s.desc}</p>
              </div>
            ))}

            {/* Dot indicators */}
            <div className="story-dots" role="tablist">
              {STORY.slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`story-dot ${i === active ? "is-active" : ""}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
