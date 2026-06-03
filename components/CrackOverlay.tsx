"use client";

import React, { useEffect, useState } from 'react';

export default function CrackOverlay() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none opacity-40 overflow-hidden mix-blend-difference">
      <style>{`
        .scratch-group { opacity: 0; animation: flashScratch 4s infinite; }
        @keyframes flashScratch {
          0%, 95% { opacity: 0; }
          96% { opacity: 0.8; transform: translate(2px, -2px); }
          98% { opacity: 0.2; transform: translate(-1px, 1px); }
          100% { opacity: 0; }
        }
        .scratch-0 { animation-delay: 0.1s; }
        .scratch-1 { animation-delay: 0.8s; }
        .scratch-2 { animation-delay: 1.5s; }
        .scratch-3 { animation-delay: 2.2s; }
        .scratch-4 { animation-delay: 3.0s; }
      `}</style>
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="scratchy" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <g filter="url(#scratchy)" className="scratch-group scratch-0">
          <line x1="20"  y1="80"  x2="180" y2="55"  stroke="white" strokeWidth="0.9" strokeLinecap="round" />
          <line x1="35"  y1="95"  x2="120" y2="85"  stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="60"  y1="140" x2="210" y2="110" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-1">
          <line x1="90"  y1="200" x2="280" y2="170" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
          <line x1="110" y1="220" x2="195" y2="210" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-2">
          <line x1="0"   y1="380" x2="160" y2="350" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
          <line x1="20"  y1="400" x2="90"  y2="390" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="5"   y1="420" x2="200" y2="400" stroke="white" strokeWidth="0.6" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-3">
          <line x1="30"  y1="500" x2="220" y2="470" stroke="white" strokeWidth="0.8" strokeLinecap="round" />
          <line x1="15"  y1="520" x2="130" y2="508" stroke="white" strokeWidth="0.4" strokeLinecap="round" />
        </g>
        <g filter="url(#scratchy)" className="scratch-group scratch-4">
          <line x1="40"  y1="680" x2="260" y2="650" stroke="white" strokeWidth="1.0" strokeLinecap="round" />
          <line x1="60"  y1="700" x2="180" y2="690" stroke="white" strokeWidth="0.5" strokeLinecap="round" />
          <line x1="20"  y1="730" x2="300" y2="710" stroke="white" strokeWidth="0.7" strokeLinecap="round" />
        </g>
      </svg>
    </div>
  );
}
