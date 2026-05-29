import React from "react";

export default function JitterTitle({ text, className = "" }: { text: string, className?: string }) {
  if (!text) return null;
  
  // Pisahkan huruf terakhir untuk diberi efek animasi
  const firstPart = text.slice(0, -1);
  const lastChar = text.slice(-1);

  return (
    <h2 className={`about-title ${className}`}>
      {firstPart}
      <span className="jitter-char">{lastChar}</span>
    </h2>
  );
}
