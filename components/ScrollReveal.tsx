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
 */
export default function ScrollReveal({
  children,
  className = "",
  revealClass = "anim-nama",
  threshold = 0.15,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

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
