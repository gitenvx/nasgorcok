"use client";
import { useRef } from "react";
import AudioAutoplay from "./AudioAutoplay";
import LyricsDisplay from "./LyricsDisplay";

export default function AudioProvider() {
  const audioRef = useRef<HTMLAudioElement>(null);

  return (
    <>
      <AudioAutoplay audioRef={audioRef} />
      {/* Desktop only — fixed bottom */}
      <div className="hidden md:block">
        <LyricsDisplay audioRef={audioRef} inline={false} />
      </div>
    </>
  );
}