"use client";
import { useEffect, useState } from "react";

export default function RightNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Efek muncul perlahan (fade-in) setelah halaman dimuat
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: "top", label: "Top", hasDot: false },
    { id: "menu", label: "Produk", hasDot: true },
    { id: "about", label: "About", hasDot: false },
    { id: "story", label: "Story", hasDot: false },
    { id: "locations", label: "Location", hasDot: true }
  ];

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
    // Tutup menu otomatis setelah diklik (khusus mobile)
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* ── TOMBOL MENU KHUSUS MOBILE ── */}
      <button 
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        className={`lg:hidden fixed top-4 right-4 z-[60] flex flex-col justify-center items-center gap-1.5 p-2 px-2.5 min-w-[3.5rem] transition-opacity duration-1000 pointer-events-auto ${isVisible ? "opacity-100" : "opacity-0"}`}
        style={{ 
          backgroundColor: isMobileOpen ? "rgba(204,26,26,0.2)" : "rgba(10,10,10,0.6)",
          backdropFilter: "blur(4px)",
          border: "1px solid var(--c-border)",
        }}
        aria-label="Toggle Mobile Menu"
      >
        <span className="font-mono text-[var(--c-ash)] leading-none" style={{ fontSize: "0.65rem", letterSpacing: "0.15em", textShadow: "1px 1px 2px rgba(0,0,0,0.9)" }}>
          {isMobileOpen ? "CLOSE" : "MENU"}
        </span>
        <div className="relative w-6 h-3">
          <span 
            className={`absolute left-0 w-full h-[2px] bg-[var(--c-ash)] transition-all duration-300 ${
              isMobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
            }`} 
            style={{ boxShadow: "0 0 4px rgba(0,0,0,0.8)" }}
          />
          <span 
            className={`absolute left-0 w-full h-[2px] bg-[var(--c-ash)] transition-all duration-300 ${
              isMobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
            }`} 
            style={{ boxShadow: "0 0 4px rgba(0,0,0,0.8)" }}
          />
        </div>
      </button>

      {/* ── KONTENER NAVIGASI UTAMA ── */}
      <nav 
        className={`fixed top-24 md:top-28 lg:top-[3%] right-4 lg:right-8 z-50 flex flex-col gap-3 lg:gap-2 items-end font-mono pointer-events-auto transition-all duration-1000 ease-out max-h-[calc(100vh-7rem)] md:max-h-[calc(100vh-8rem)] lg:max-h-[94vh] overflow-y-auto overflow-x-hidden pr-2 py-4 -my-4 ${
          isMobileOpen 
            ? "translate-x-0 opacity-100" 
            : `translate-x-10 opacity-0 ${isVisible ? "lg:translate-x-0 lg:opacity-100" : "lg:translate-x-12 lg:opacity-0"}`
        }`}
        aria-label="Right Side Navigation"
      >
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollTo(item.id)}
            className="group relative flex items-center justify-end text-right text-[var(--c-ash)] hover:text-white transition-colors pointer-events-auto"
            style={{ 
              fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
              letterSpacing: "0.05em"
            }}
          >
            {item.hasDot && (
              <span className="menu-dot mr-2.5 transition-transform group-hover:scale-125" style={{ width: "6px", height: "6px" }} />
            )}
            <span className="relative inline-block tracking-wider" style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.9), 0px 0px 8px rgba(0,0,0,0.6)" }}>
              {item.label}
              {/* Animasi Garis Bawah: Masuk dari kiri, keluar ke kanan */}
              <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[var(--c-ash)] origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
            </span>
          </button>
        ))}
      </nav>

      {/* ── BACKDROP GELAP (Muncul saat menu mobile dibuka) ── */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        >
          {/* Half screen blur visual (Softened) */}
          <div className="absolute top-0 right-0 bottom-0 w-[55%] bg-black/50 backdrop-blur-sm shadow-[-10px_0_30px_rgba(0,0,0,0.8)] border-l border-[var(--c-border)]" />
        </div>
      )}
    </>
  );
}
