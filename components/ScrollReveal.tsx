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
 * @returns JSX element div dengan scroll reveal behavior
 */
export default function ScrollReveal({
  children,
  className = "",
  revealClass = "anim-nama",
  threshold = 0.05,
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
          // Berhenti mengamati setelah elemen terlihat agar elemen tetap tampil selamanya
          // dan menghemat penggunaan resource CPU
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div ref={ref} className={`${revealClass} ${className}`}>
      {children}
    </div>
  );
}
