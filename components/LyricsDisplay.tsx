"use client";
import { useEffect, useRef, useState } from "react";

interface Word { word: string; start: number; end: number; }
interface Props {
  audioRef: React.RefObject<HTMLAudioElement | null>;
  inline?: boolean; // ← true = render inline (mobile), false = fixed (desktop)
}

const BEFORE = 3;
const AFTER  = 4;

export default function LyricsDisplay({ audioRef, inline = false }: Props) {
  const [words, setWords]           = useState<Word[]>([]);
  const [currentIdx, setCurrentIdx] = useState(-1);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    fetch("/audio/lyrics.json")
      .then(r => r.json())
      .then(setWords)
      .catch(() => {});
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || words.length === 0) return;
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
  }, [audioRef, words]);

  if (words.length === 0 || currentIdx === -1) return null;

  const start   = Math.max(0, currentIdx - BEFORE);
  const end     = Math.min(words.length, currentIdx + AFTER + 1);
  const visible = words.slice(start, end);

  const content = (
    <>
      {visible.map((w, i) => {
        const globalIdx = start + i;
        const isActive  = globalIdx === currentIdx;
        const isPast    = globalIdx < currentIdx;
        return (
          <span
            key={globalIdx}
            style={{
              display:         "inline",
              fontFamily:      "var(--font-mono)",
              fontSize:        isActive ? "clamp(0.95rem, 2.2vw, 1.2rem)" : "clamp(0.75rem, 1.8vw, 1rem)",
              color:           isActive ? "rgba(232,224,208,1)" : isPast ? "rgba(232,224,208,0.25)" : "rgba(232,224,208,0.5)",
              backgroundColor: isActive ? "rgba(204,26,26,1)" : "transparent",
              padding:         isActive ? "0 5px" : "0",
              textShadow:      isActive
                ? "0 0 8px rgba(255,255,255,0.9), 0 0 20px rgba(255,255,255,0.6), 0 0 40px rgba(255,255,255,0.3), 1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000"
                : "none",
              transition: "color 0.15s ease, text-shadow 0.15s ease, font-size 0.1s ease, background-color 0.15s ease",
            }}
          >
            {w.word}{" "}
          </span>
        );
      })}
    </>
  );

  // INLINE MODE — untuk mobile, render biasa di dalam flow
  if (inline) {
    return (
      <div style={{
        textAlign:  "center",
        padding:    "8px 16px",
        border:     "1px solid var(--c-border)",
        background: "rgba(232,224,208,0.04)",
        marginTop:  "12px",
      }}>
        {content}
      </div>
    );
  }

  // FIXED MODE — untuk desktop
  return (
    <div
      aria-label="Lirik"
      style={{
        position:      "fixed",
        bottom:        "48px",
        left:          "50%",
        transform:     "translateX(-50%)",
        zIndex:        40,
        pointerEvents: "none",
        textAlign:     "center",
        width:         "47vw",
        maxWidth:      "425px",
        border:        "1px solid var(--c-border)",
        background:    "rgba(232,224,208,0.04)",
        padding:       "8px 16px",
      }}
    >
      {content}
    </div>
  );
}