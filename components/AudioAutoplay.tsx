// components/AudioAutoplay.tsx
/**
 * Komponen untuk mengatur autoplay musik latar
 * Memanfaatkan user interaction (click, touch, scroll) untuk unlock autoplay
 * Terenkapsulasi dalam closed Shadow DOM untuk menghindari deteksi IDM
 */
"use client";
import { useEffect, useRef, useState } from "react";

/**
 * Komponen AudioAutoplay - Menjalankan audio secara otomatis setelah interaksi user
 * Menggunakan Shadow DOM tertutup untuk menyembunyikan tag <audio> dari pencarian ekstensi IDM
 * @param audioRef - Referensi ke element audio HTML yang di-share dengan LyricsDisplay
 * @returns JSX element kontainer tersembunyi
 */
export default function AudioAutoplay({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  // Flag untuk memastikan unlock hanya terjadi sekali
  const unlockedRef = useRef(false);
  // State untuk menyimpan Blob URL audio
  const [audioUrl, setAudioUrl] = useState<string>("");
  // Referensi ke element kontainer untuk Shadow DOM
  const containerRef = useRef<HTMLDivElement>(null);

  // Ambil audio sebagai Blob untuk menghindari deteksi IDM
  useEffect(() => {
    let active = true;
    let localUrl = "";

    fetch("/audio/bg.mp3")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil audio");
        return res.blob();
      })
      .then((blob) => {
        if (!active) return;
        localUrl = URL.createObjectURL(blob);
        setAudioUrl(localUrl);
      })
      .catch(() => {});

    return () => {
      active = false;
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, []);

  // Pasang audio di dalam closed Shadow DOM dan set up listener
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !audioUrl) return;

    // Bersihkan isi kontainer terlebih dahulu
    container.innerHTML = "";

    // Buat wrapper div baru
    const wrapper = document.createElement("div");
    wrapper.style.display = "none";
    container.appendChild(wrapper);

    // Attach shadow root dalam mode 'closed' agar extension tidak bisa mendeteksinya
    const shadow = wrapper.attachShadow({ mode: "closed" });

    // Buat tag audio secara dinamis
    const audio = document.createElement("audio");
    audio.src = audioUrl;
    audio.preload = "auto";
    audio.setAttribute("playsInline", "true");
    audio.volume = 0.45;
    audio.loop = true;
    audio.style.display = "none";

    shadow.appendChild(audio);

    // Salurkan ref ke komponen luar (seperti LyricsDisplay)
    if (audioRef) {
      (audioRef as any).current = audio;
    }

    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      audio.play().catch(() => {});
      events.forEach((e) => window.removeEventListener(e, unlock));
    };

    const events = ["click", "touchstart", "keydown", "scroll"];
    events.forEach((e) =>
      window.addEventListener(e, unlock, { once: true, passive: true })
    );

    return () => {
      events.forEach((e) => window.removeEventListener(e, unlock));
      if (audioRef) {
        (audioRef as any).current = null;
      }
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [audioRef, audioUrl]);

  return <div ref={containerRef} style={{ display: "none" }} />;
}