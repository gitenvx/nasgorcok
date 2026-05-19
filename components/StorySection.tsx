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
      {/* ── Splatter edges (top & bottom only) ── */}
      <div className="story-splatter" aria-hidden="true">
        <svg viewBox="0 0 1440 600" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="storySplatterBlur">
              <feGaussianBlur stdDeviation="2" />
            </filter>
          </defs>
          {/* Top edge */}
          <ellipse cx="220" cy="14" rx="42" ry="12" fill="#1a1410" opacity="0.6" filter="url(#storySplatterBlur)" />
          <circle cx="200" cy="20" r="8" fill="#1a1410" opacity="0.5" />
          <circle cx="720" cy="18" r="10" fill="#1a1410" opacity="0.55" filter="url(#storySplatterBlur)" />
          <ellipse cx="1230" cy="15" rx="36" ry="12" fill="#1a1410" opacity="0.6" filter="url(#storySplatterBlur)" />
          <circle cx="1255" cy="22" r="7" fill="#1a1410" opacity="0.5" />
          {/* Bottom edge */}
          <ellipse cx="200" cy="585" rx="40" ry="12" fill="#1a1410" opacity="0.6" filter="url(#storySplatterBlur)" />
          <circle cx="180" cy="580" r="8" fill="#1a1410" opacity="0.5" />
          <circle cx="720" cy="582" r="10" fill="#1a1410" opacity="0.55" filter="url(#storySplatterBlur)" />
          <ellipse cx="1240" cy="585" rx="35" ry="12" fill="#1a1410" opacity="0.6" filter="url(#storySplatterBlur)" />
          <circle cx="1260" cy="578" r="7" fill="#1a1410" opacity="0.5" />
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
