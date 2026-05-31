// components/ScrollReveal.tsx
"use client";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Extra classes to pass through (e.g. anim-col-1) */
  revealClass?: string;
  /** Threshold 0-1, default 0.05 */
  threshold?: number;
  /** If true, the reveal effect will only apply on mobile screens, and always be visible on desktop */
  mobileOnly?: boolean;
}

/**
 * Wraps children in a div that gets .is-visible when it enters viewport.
 * Uses IntersectionObserver — zero JS animation overhead.
 * Sekali elemen terlihat, elemen akan tetap terlihat selamanya (tidak hilang saat di-scroll atau di-zoom).
 * 
 * @param children - Element child yang akan dibungkus dengan scroll reveal
 * @param className - Class CSS tambahan untuk element wrapper
 * @param revealClass - Class untuk animasi reveal (misal: anim-col-1)
 * @param threshold - Threshold visibility untuk IntersectionObserver (0-1)
 * @param mobileOnly - Jika true, animasi reveal hanya aktif di HP. Di PC akan langsung tampil.
 * @returns JSX element div dengan scroll reveal behavior
 */
export default function ScrollReveal({
  children,
  className = "",
  revealClass = "anim-nama",
  threshold = 0.05,
  mobileOnly = false,
}: ScrollRevealProps) {
  // Referensi ke element div wrapper
  const ref = useRef<HTMLDivElement>(null);

  // Setup IntersectionObserver untuk mendeteksi kapan elemen masuk viewport
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
        } else {
          // Hapus class agar bisa dianimasikan ulang saat di-scroll kembali
          el.classList.remove("is-visible");
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`${revealClass} ${className} ${mobileOnly ? 'mobile-only-reveal' : ''}`}>
      {children}
    </div>
  );
}
