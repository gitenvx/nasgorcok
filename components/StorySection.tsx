// components/StorySection.tsx
/**
 * Komponen Story Section yang menampilkan carousel dengan slide story warung
 * Mendukung navigasi dengan tombol, keyboard arrow, dan swipe gesture
 */
"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { STORY } from "@/lib/menu-data";

/**
 * Komponen StorySection - Menampilkan carousel story dengan gambar dan caption
 * Fitur: navigasi tombol, keyboard arrow, touch swipe, dan dot indicator
 * @returns JSX element section dengan carousel story interaktif
 */
export default function StorySection() {
  // Index slide yang sedang aktif ditampilkan
  const [active, setActive] = useState(0);
  // Total jumlah slide dalam carousel
  const total = STORY.slides.length;
  // Referensi untuk touch start X position saat swipe mulai
  const touchStartX = useRef<number | null>(null);
  // Referensi untuk touch end X position saat swipe selesai
  const touchEndX = useRef<number | null>(null);

  /**
   * Fungsi untuk navigasi ke slide tertentu
   * Menggunakan modulo untuk wrap around ke awal/akhir secara circular
   * @param idx - Index slide yang dituju
   */
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

  return (
    <section className="story-section" aria-label="Story">
      {/* ── Inner container ── */}
      <div className="story-inner">
        {/* Header */}
        <div className="story-header">
          <h2 className="about-title">{STORY.title}</h2>
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
                aria-hidden={i !== active ? "true" : "false"}
              >
                <span className="story-chapter">{s.chapter}</span>
                <h2 className="story-heading">{s.heading}</h2>
                <p><span className="re-textbox">{s.desc[0]}<br/>{s.desc[1]}<br/>{s.desc[2]}</span></p>
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
