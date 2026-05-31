"use client";

import React, { useEffect, useState } from 'react';

// Fungsi acak statis
function random(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate scattered static noise blocks (efek digital grain)
const generateStaticFrame = (count: number, seedStart: number) => {
  let blocks = '';
  for (let i = 0; i < count; i++) {
    const x = (random(seedStart + i * 1) * 100).toFixed(1);
    const y = (random(seedStart + i * 2) * 100).toFixed(1);
    const w = (random(seedStart + i * 3) * 30 + 10).toFixed(1); // Lebar 10-40px
    const h = (random(seedStart + i * 4) * 4 + 2).toFixed(1);   // Tinggi 2-6px
    const alpha = (random(seedStart + i * 5) * 0.4 + 0.1).toFixed(2);
    blocks += `<rect x="${x}%" y="${y}%" width="${w}px" height="${h}px" fill="rgba(150,150,150,${alpha})" />`;
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg">${blocks}</svg>`;
  return `url('data:image/svg+xml;utf8,${encodeURIComponent(svg)}')`;
};

export default function DustOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Generate 4 frame efek grain yang berbeda
  const frame1 = generateStaticFrame(4, 1000);
  const frame2 = generateStaticFrame(6, 2000);
  const frame3 = generateStaticFrame(3, 3000);
  const frame4 = generateStaticFrame(5, 4000);

  return (
    <div className="fixed inset-0 z-[2] pointer-events-none mix-blend-screen opacity-80 overflow-hidden">
      <style>{`
        .static-noise-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          animation: staticBlink 0.6s steps(1) infinite;
        }
        
        @keyframes staticBlink {
          0%   { background-image: ${frame1}; }
          16%  { background-image: none; }
          33%  { background-image: ${frame2}; }
          50%  { background-image: ${frame3}; }
          66%  { background-image: none; }
          83%  { background-image: ${frame4}; }
          100% { background-image: ${frame1}; }
        }
      `}</style>
      
      <div className="static-noise-layer" />
    </div>
  );
}
