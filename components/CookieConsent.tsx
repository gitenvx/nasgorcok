// components/CookieConsent.tsx
/**
 * Komponen Cookie Consent dengan tema retro Resident Evil (Survival Protocol)
 * Menampilkan peringatan bergaya terminal ketik (typewriter) saat pertama kali berkunjung
 * Menyimpan status persetujuan di localStorage browser
 */
"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  // State untuk menampilkan/menyembunyikan banner
  const [visible, setVisible] = useState(false);
  // State untuk melacak teks mesin ketik yang sedang berjalan
  const [text, setText] = useState("");
  // Teks peringatan yang akan ditampilkan secara berurutan
  const fullText = "NASGORCOK MENGGUNAKAN COOKIE UNTUK MEMASTIKAN PENGALAMAN BROWSING KAMU MAKSIMAL. PROTOKOL MEMINTA IZIN PENGGUNA.";

  useEffect(() => {
    // Periksa apakah pengguna sudah pernah merespon
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Berikan delay 1.5 detik untuk menambah sensasi dramatis retro
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Efek typewriter mengetik teks secara bertahap dan aman dari double-effect render
  useEffect(() => {
    if (!visible) return;
    let index = 0;
    let timerId: NodeJS.Timeout;

    const typeWriter = () => {
      if (index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        index++;
        timerId = setTimeout(typeWriter, 25);
      }
    };

    timerId = setTimeout(typeWriter, 25);
    return () => clearTimeout(timerId);
  }, [visible]);

  // Fungsi saat menyetujui cookie
  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  // Fungsi saat menolak cookie
  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-20 left-1/2 -translate-x-1/2 w-[calc(100%-20px)] max-w-120 rounded-xl overflow-hidden border border-(--c-border) bg-(--c-box) text-(--c-ash) shadow-[0_10px_30px_var(--c-border)] z-50 transition-all duration-500 ease-in-out"
      style={{
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        fontFamily: "var(--font-submenu)",
      }}
    >
      {/* Title bar (Carbon Style) */}
      <div className="flex items-center px-3 py-1.5 border-b border-(--c-border) relative z-10" style={{ backgroundColor: 'rgba(128,128,128,0.05)' }}>
        <div className="flex gap-1.5 mr-3">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]"></div>
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-2 h-2 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="flex items-center gap-2 font-bold tracking-widest text-[10px] sm:text-xs opacity-80 uppercase">
          COK: TERIMA COOKIE GAK?
        </div>
      </div>

      <div className="p-4 relative">
        {/* Placeholder teks penuh agar tinggi knotainer konsisten sejak awal */}
        <p
          className="leading-relaxed tracking-wider mb-4 uppercase text-transparent pointer-events-none select-none text-xs sm:text-sm"
          aria-hidden="true"
        >
          {fullText}_
        </p>
        
        {/* Teks typewriter yang sebenarnya */}
        <p
          className="absolute top-4 left-4 right-4 leading-relaxed tracking-wider mb-0 uppercase text-(--c-ash) text-xs sm:text-sm opacity-90"
        >
          {text}
          <span
            className="font-bold text-(--c-red)"
            style={{ animation: "blink-cursor 0.8s infinite" }}
          >
            _
          </span>
        </p>

        {/* Baris pilihan tombol aksi */}
        <div className="flex justify-end gap-3 mt-2">
          <button
            onClick={handleDecline}
            className="bg-transparent border border-(--c-border) text-(--c-ash) px-3 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-200 hover:bg-(--c-dim)"
          >
            [ TOLAK ]
          </button>
          <button
            onClick={handleAccept}
            className="bg-(--c-red) border border-(--c-red) text-[#e8e0d0] font-bold px-3 py-1.5 text-[10px] sm:text-xs tracking-widest uppercase transition-all duration-200 hover:opacity-80 shadow-[0_0_10px_var(--c-red)]"
          >
            [ TERIMA ]
          </button>
        </div>
      </div>

      {/* Inject css animasi global */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes pulse-led {
            0% { opacity: 0.3; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1.05); }
          }
          @keyframes blink-cursor {
            50% { opacity: 0; }
          }
        `,
        }}
      />
    </div>
  );
}
