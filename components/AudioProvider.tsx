// components/AudioProvider.tsx
/**
 * Komponen wrapper untuk menyediakan audio dan lirik display kepada komponen anak
 * Mengelola referensi audio element yang diperlukan oleh AudioAutoplay dan LyricsDisplay
 */
"use client";
import { useRef } from "react";
import AudioAutoplay from "./AudioAutoplay";
import LyricsDisplay from "./LyricsDisplay";

/**
 * Komponen AudioProvider - Wrapper untuk audio functionality
 * Menyediakan audio autoplay dan lyrics display di tempat yang tepat
 * Desktop: hanya lirik di bagian bawah, Mobile: lirik di ScrollReveal section
 * @returns JSX element dengan AudioAutoplay dan conditional LyricsDisplay untuk desktop
 */
export default function AudioProvider() {
  // Referensi ke element audio HTML untuk dikontrol oleh child components
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <AudioAutoplay audioRef={audioRef} />
      {/* Desktop hanya — fixed bottom */}
      <div className="hidden md:block">
        <LyricsDisplay audioRef={audioRef} />
      </div>
    </>
  );
}