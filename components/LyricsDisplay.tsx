"use client";
import { useEffect, useRef, useState, useCallback } from "react";

interface Word { word: string; start: number; end: number; }
interface Props {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}

const BEFORE = 3;
const AFTER  = 4;

/**
 * Komponen LyricsDisplay - Menampilkan lirik musik yang tersinkronisasi
 * Mengambil data lirik dari file JSON, track position audio, dan display lirik secara real-time
 * @param props - Props dengan audioRef
 * @returns JSX element berisi tombol play/pause dan display lirik
 */
export default function LyricsDisplay({ audioRef }: Props) {
  // Array berisi semua kata/lirik dari file lyrics.json
  const [words, setWords]           = useState<Word[]>([]);
  // Index lirik yang sedang dimainkan
  const [currentIdx, setCurrentIdx] = useState(-1);
  // Flag status audio apakah sedang diputar atau tidak
  const [isPlaying, setIsPlaying]   = useState(false);
  // Referensi untuk requestAnimationFrame tracking
  const rafRef = useRef<number>(0);

  useEffect(() => {
    fetch("/audio/lyrics.json")
      .then(r => r.json())
      .then(setWords)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay  = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    setIsPlaying(!audio.paused);
    audio.addEventListener("play",  onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play",  onPlay);
      audio.removeEventListener("pause", onPause);
    };
  }, [audioRef]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || words.length === 0 || !isPlaying) {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = () => {
      const t = audio.currentTime;
      let idx = -1;
      for (let i = 0; i < words.length; i++) {
        if (t >= words[i].start && t <= words[i].end) { idx = i; break; }
      }
      setCurrentIdx(prev => prev !== idx ? idx : prev);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [audioRef, words, isPlaying]);

  /**
   * Fungsi untuk toggle play/pause audio
   * Memutar audio jika sedang pause, atau memause jika sedang bermain
   */
  const togglePlay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) audio.play().catch(() => {});
    else audio.pause();
  }, [audioRef]);

  const start   = Math.max(0, currentIdx - BEFORE);
  const end     = Math.min(words.length, currentIdx + AFTER + 1);
  const visible = (isPlaying && currentIdx !== -1) ? words.slice(start, end) : [];

  return (
    <div style={{
      display:      "flex",
      alignItems:   "center",
      gap:          "10px",
      borderTop:    "none",
      borderLeft:   "none",
      borderRight:  "1px solid var(--c-border)",
      borderBottom: "1px solid var(--c-border)",
      background:   "rgba(232,224,208,0.04)",
      padding:      "8px 10px 8px 0",
    }}>
      {/* Play/Pause button */}
      <button
        onClick={togglePlay}
        aria-label={isPlaying ? "Pause music" : "Play music"}
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "center",
          width:          "30px",
          minWidth:       "30px",
          height:         "30px",
          background:     isPlaying ? "var(--c-red)" : "rgba(232,224,208,0.12)",
          border:         "1px solid rgba(232,224,208,0.3)",
          color:          "var(--c-ash)",
          cursor:         "pointer",
          flexShrink:     0,
          transition:     "background 0.2s ease",
        }}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <rect x="5" y="3" width="4" height="18" rx="1" />
            <rect x="15" y="3" width="4" height="18" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5,3 19,12 5,21" />
          </svg>
        )}
      </button>

      {/* Lyrics */}
      <span style={{ flex: 1, textAlign: "center", minHeight: "1.4em" }}>
        {visible.length > 0 ? visible.map((w, i) => {
          const globalIdx = start + i;
          const isActive  = globalIdx === currentIdx;
          const isPast    = globalIdx < currentIdx;
          return (
            <span key={globalIdx} style={{
              display:         "inline",
              fontFamily:      "var(--font-title)",
              letterSpacing:   "0.12em",
              textTransform:   "uppercase",
              fontSize:        isActive ? "clamp(1.1rem, 2.2vw, 1.3rem)" : "clamp(0.9rem, 1.8vw, 1.1rem)",
              color:           isActive ? "rgba(232,224,208,1)" : isPast ? "rgba(232,224,208,0.25)" : "rgba(232,224,208,0.5)",
              backgroundColor: isActive ? "rgba(204,26,26,1)" : "transparent",
              padding:         isActive ? "0 4px" : "0",
              textShadow:      isActive
                ? "0 0 8px rgba(255,255,255,0.9), 1px 1px 0 #000, -1px -1px 0 #000"
                : "none",
              transition: "color 0.15s ease, background-color 0.15s ease, font-size 0.1s ease",
            }}>
              {w.word}{" "}
            </span>
          );
        }) : (
          <span style={{
            fontFamily:    "var(--font-title)",
            fontSize:      "clamp(0.9rem, 1.8vw, 1.1rem)",
            letterSpacing: "0.15em",
            color:         "rgba(232,224,208,0.6)",
          }}>
            {isPlaying ? "♪" : "TAP ▶ TO PLAY MUSIC"}
          </span>
        )}
      </span>
    </div>
  );
}