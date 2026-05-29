"use client";

import React, { useEffect, useState } from 'react';

// Fungsi acak statis
function random(seed: number) {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate SVG data URI untuk performa super ringan (tidak ngelag)
const generateSvgDust = (count: number, seedStart: number) => {
  let circles = '';
  for (let i = 0; i < count; i++) {
    const x = (random(seedStart + i * 1) * 200).toFixed(1);
    const y = (random(seedStart + i * 2) * 200).toFixed(1);
    const r = (random(seedStart + i * 3) * 1.5 + 0.5).toFixed(1);
    const alpha = (random(seedStart + i * 4) * 0.5 + 0.1).toFixed(2);
    circles += `<circle cx="${x}" cy="${y}" r="${r}" fill="rgba(255,255,255,${alpha})" />`;
  }
  const svg = `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">${circles}</svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
};

export default function DustOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Render 3 lapisan SVG dengan ukuran yang cukup padat
  const layer1 = generateSvgDust(40, 1000);
  const layer2 = generateSvgDust(25, 2000);
  const layer3 = generateSvgDust(10, 3000);

  return (
    <div className="absolute inset-0 z-[2] pointer-events-none mix-blend-screen opacity-50 overflow-hidden">
      <style>{`
        .dust-layer {
          position: absolute;
          inset: 0;
          background-repeat: repeat;
        }
        
        .anim-dust-1 { animation: floatBg 40s linear infinite; background-size: 300px 300px; }
        .anim-dust-2 { animation: floatBgReverse 60s linear infinite; background-size: 450px 450px; }
        .anim-dust-3 { animation: floatBg 80s linear infinite; background-size: 600px 600px; }
        
        @keyframes floatBg {
          0% { background-position: 0px 0px; }
          100% { background-position: 100px -600px; }
        }
        @keyframes floatBgReverse {
          0% { background-position: 0px 0px; }
          100% { background-position: -100px -600px; }
        }
      `}</style>
      
      <div className="dust-layer anim-dust-1" style={{ backgroundImage: layer1 }} />
      <div className="dust-layer anim-dust-2" style={{ backgroundImage: layer2 }} />
      <div className="dust-layer anim-dust-3" style={{ backgroundImage: layer3 }} />
    </div>
  );
}
