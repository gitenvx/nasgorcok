"use client";
import { useEffect, useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  /** Extra classes to pass through (e.g. anim-col-1) */
  revealClass?: string;
  /** Threshold 0-1, default 0.15 */
  threshold?: number;
}

/**
 * Wraps children in a div that gets .is-visible when it enters viewport.
 * Uses IntersectionObserver — zero JS animation overhead.
 * 
 * Komponen ScrollReveal - Menampilkan animasi ketika elemen masuk viewport
 * Membungkus children dalam div yang mendapat class .is-visible saat masuk viewport
 * Menggunakan IntersectionObserver - tidak ada overhead animasi JavaScript
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
  threshold = 0.15,
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
          observer.unobserve(el); // only trigger once
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
