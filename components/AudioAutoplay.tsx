// components/AudioAutoplay.tsx
/**
 * Komponen untuk mengatur autoplay musik latar
 * Memanfaatkan user interaction (click, touch, scroll) untuk unlock autoplay
 * Browser modern mengharuskan user interaction sebelum audio bisa autoplay dengan suara
 */
"use client";
import { useEffect, useRef } from "react";

/**
 * Komponen AudioAutoplay - Menjalankan audio secara otomatis setelah interaksi user
 * @param audioRef - Referensi ke element audio HTML
 * @returns JSX element audio (biasanya tidak ditampilkan secara visual)
 */
export default function AudioAutoplay({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
  // Flag untuk memastikan unlock hanya terjadi sekali
  const unlockedRef = useRef(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = 0.45;
    audio.loop   = true;

    const unlock = () => {
      if (unlockedRef.current) return;
      unlockedRef.current = true;
      audio.play().catch(() => {});
      events.forEach(e => window.removeEventListener(e, unlock));
    };

    const events = ["click", "touchstart", "keydown", "scroll"];
    events.forEach(e => window.addEventListener(e, unlock, { once: true, passive: true }));
    return () => events.forEach(e => window.removeEventListener(e, unlock));
  }, [audioRef]);

  return (
    <audio ref={audioRef} src="/audio/bg.mp3" preload="auto" playsInline />
  );
}