"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Hanya muncul pas mentok lantai bawah
      const hitBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
      
      if (hitBottom && window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Trigger sekali saat awal muat
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`lg:hidden fixed bottom-2 right-2 z-90 flex items-center justify-center w-10 h-10 transition-all duration-500 pointer-events-auto group ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      style={{ 
        backgroundColor: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(4px)",
        border: "1px solid var(--c-border)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.8)" 
      }}
      aria-label="Back to top"
    >
      <span 
        className="text-(--c-ash) text-2xl font-mono leading-none transition-transform group-hover:-translate-y-1 group-hover:text-white" 
        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.9)" }}
      >
        &uarr;
      </span>
    </button>
  );
}
