"use client";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export default function RightNav() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Efek muncul perlahan (fade-in) setelah halaman dimuat
  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => setIsVisible(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { id: "top", label: "Top", hasDot: false },
    { id: "menu", label: "Produk", hasDot: true },
    { id: "about", label: "About", hasDot: false },
    { id: "story", label: "Story", hasDot: false },
    { id: "locations", label: "Location", hasDot: true },
    { id: "blog", label: "Blog", hasDot: true }
  ];

  const scrollTo = (id: string) => {
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (id === "blog") {
      if (window.location.pathname !== "/blog") {
        window.location.href = "/blog";
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.location.href = "/#" + id;
      }
    }
    // Tutup menu otomatis setelah diklik (khusus mobile)
    setIsMobileOpen(false);
  };

  return (
    <>
      {/* ── HEADER MOBILE (TOMBOL THEME & MENU) ── */}
      <div className={`md:hidden fixed top-4 right-4 z-60 flex items-stretch gap-2 transition-opacity duration-1000 pointer-events-auto ${isVisible ? "opacity-100" : "opacity-0"}`}>
        
        {/* Tombol Toggle Theme (Mobile) */}
        <button
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          className="flex items-center justify-center w-10 bg-[var(--c-box)] border border-[var(--c-border)] text-(--c-ash) hover:text-(--c-red) transition-colors duration-200"
          style={{ backdropFilter: "blur(4px)" }}
          aria-label="Toggle Theme"
        >
          {mounted && theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          ) : (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          )}
        </button>

        {/* Tombol Menu */}
        <button 
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="flex flex-col justify-center items-center gap-1.5 p-2 px-2.5 min-w-14"
          style={{ 
            backgroundColor: isMobileOpen ? "var(--c-red)" : "var(--c-box)",
            backdropFilter: "blur(4px)",
            border: "1px solid var(--c-border)",
          }}
          aria-label="Toggle Mobile Menu"
        >
          <span className="font-mono leading-none transition-colors" style={{ 
            color: isMobileOpen && mounted && theme === 'light' ? '#fff' : 'var(--c-ash)',
            fontSize: "0.65rem", letterSpacing: "0.15em", textShadow: "1px 1px 2px rgba(0,0,0,0.9)" 
          }}>
            {isMobileOpen ? "CLOSE" : "MENU"}
          </span>
          <div className="relative w-6 h-3">
            <span 
              className={`absolute left-0 w-full h-0.5 transition-all duration-300 ${
                isMobileOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
              }`} 
              style={{ 
                backgroundColor: isMobileOpen && mounted && theme === 'light' ? '#fff' : 'var(--c-ash)',
                boxShadow: "0 0 4px rgba(0,0,0,0.8)" 
              }}
            />
            <span 
              className={`absolute left-0 w-full h-0.5 transition-all duration-300 ${
                isMobileOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
              }`} 
              style={{ 
                backgroundColor: isMobileOpen && mounted && theme === 'light' ? '#fff' : 'var(--c-ash)',
                boxShadow: "0 0 4px rgba(0,0,0,0.8)" 
              }}
            />
          </div>
        </button>
      </div>

      {/* ── KONTENER NAVIGASI UTAMA ── */}
      <nav 
        className={`fixed top-24 md:top-[3%] right-4 md:right-8 z-50 flex flex-col gap-3 md:gap-2 items-end font-mono transition-all duration-1000 ease-out max-h-[calc(100vh-7rem)] md:max-h-[94vh] overflow-y-auto overflow-x-hidden pr-2 py-4 -my-4 ${
          isMobileOpen 
            ? "translate-x-0 opacity-100 pointer-events-auto" 
            : `translate-x-10 opacity-0 pointer-events-none ${isVisible ? "md:translate-x-0 md:opacity-100 md:pointer-events-auto" : "md:translate-x-12 md:opacity-0 md:pointer-events-none"}`
        }`}
        aria-label="Right Side Navigation"
      >
        {navItems.map((item, index) => (
          <button
            key={index}
            onClick={() => scrollTo(item.id)}
            className="group relative flex items-center justify-end text-right text-(--c-ash) hover:text-[var(--c-red)] transition-colors pl-4 py-1"
            style={{ 
              fontSize: "clamp(0.75rem, 1.2vw, 1rem)",
              letterSpacing: "0.05em"
            }}
          >
            {item.hasDot && (
              <span className="menu-dot mr-2.5 transition-transform group-hover:scale-125" style={{ width: "6px", height: "6px" }} />
            )}
            <span className="relative inline-block tracking-wider" style={{ 
              textShadow: mounted && theme === 'light' 
                ? "-1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff, 1px 1px 0 #fff, -1px 0 0 #fff, 1px 0 0 #fff, 0 1px 0 #fff, 0 -1px 0 #fff" 
                : "1px 1px 3px rgba(0,0,0,0.9), 0px 0px 8px rgba(0,0,0,0.6)" 
            }}>
              {item.label}
              {/* Animasi Garis Bawah: Masuk dari kiri, keluar ke kanan */}
              <span className="absolute -bottom-1 left-0 w-full h-px bg-(--c-ash) origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
            </span>
          </button>
        ))}


      </nav>

      {/* ── TOMBOL TOGGLE THEME (PC ONLY - FIXED BOTTOM RIGHT, SNAPPED TO 40px GRID) ── */}
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className={`hidden md:flex fixed z-50 items-center justify-center w-[40px] h-[40px] bg-[var(--c-box)] text-(--c-ash) hover:text-(--c-red) transition-all duration-200 ${
          mounted && theme === 'dark' ? 'border-2 border-white hover:border-(--c-red)' : 'border border-[var(--c-border)] hover:border-(--c-red)'
        }`}
        style={{ 
          // Snap to the 40px background grid using calc
          // We position it relative to top/left so it aligns with the grid origin (top-left)
        }}
        ref={(el) => {
          if (el && typeof window !== 'undefined') {
            const updatePos = () => {
              const grid = 40;
              const w = document.documentElement.clientWidth;
              const h = window.innerHeight;
              const left = Math.floor(w / grid) * grid - (grid * 2); // 2 kotak dari kanan
              const top = Math.floor(h / grid) * grid - (grid * 2);  // 2 kotak dari bawah (geser ke atas 1)
              el.style.left = `${left}px`;
              el.style.top = `${top}px`;
            };
            updatePos();
            window.addEventListener('resize', updatePos);
            if ((el as any)._cleanup) window.removeEventListener('resize', (el as any)._cleanup);
            (el as any)._cleanup = updatePos;
          }
        }}
        aria-label="Toggle Theme"
      >
        {mounted ? (
          theme === 'dark' ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
          ) : (
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
          )
        ) : null}
      </button>

      {/* ── BACKDROP GELAP (Muncul saat menu mobile dibuka) ── */}
      {isMobileOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 animate-in fade-in duration-300"
          onClick={() => setIsMobileOpen(false)}
          aria-hidden="true"
        >
          {/* Half screen blur visual (Softened) */}
          <div className="absolute top-0 right-0 bottom-0 w-[30%] bg-black/50 backdrop-blur-sm shadow-[-10px_0_30px_rgba(0,0,0,0.8)] border-l border-(--c-border)" />
        </div>
      )}
    </>
  );
}
