"use client";
import { useEffect, useRef } from "react";

export default function AudioAutoplay({
  audioRef,
}: {
  audioRef: React.RefObject<HTMLAudioElement | null>;
}) {
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