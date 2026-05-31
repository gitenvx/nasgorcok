"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import { LOCATION_DATA } from "@/lib/menu-data";
import JitterTitle from "@/components/JitterTitle";
import ScrollReveal from "@/components/ScrollReveal";

export default function LocationSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(1); // Default center image
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  const images = LOCATION_DATA.images;

  // Handle manual scroll to snap to nearest image and update active index (Debounced for 120FPS smoothness)
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    
    scrollTimeout.current = setTimeout(() => {
      if (!scrollRef.current) return;
      const container = scrollRef.current;
      const scrollLeft = container.scrollLeft;
      const centerPosition = scrollLeft + (container.clientWidth / 2);
      
      let closestIndex = 0;
      let minDistance = Infinity;

      const items = container.querySelectorAll(".loc-item");
      items.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemCenter = item.parentElement!.scrollLeft + rect.left + (rect.width / 2) - container.getBoundingClientRect().left;
        const distance = Math.abs(centerPosition - itemCenter);
        
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });

      if (activeIdx !== closestIndex) {
        setActiveIdx(closestIndex);
      }
    }, 30); // 30ms debounce for buttery smooth drag
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const items = container.querySelectorAll(".loc-item");
    if (items[index]) {
      const item = items[index] as HTMLElement;
      // Center the item
      const scrollPosition = item.offsetLeft - (container.clientWidth / 2) + (item.clientWidth / 2);
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
      setActiveIdx(index);
    }
  };

  // Posisikan otomatis foto kedua (index 1) ke tengah saat pertama kali dimuat
  useEffect(() => {
    const timer = setTimeout(() => {
      scrollTo(1);
    }, 200);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Drag logic for mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
    // Disable scroll snapping during drag
    scrollRef.current.style.scrollSnapType = 'none';
    scrollRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseLeave = () => {
    if (!isDragging || !scrollRef.current) return;
    setIsDragging(false);
    // Re-enable scroll snapping
    scrollRef.current.style.scrollSnapType = 'x mandatory';
    scrollRef.current.style.scrollBehavior = 'smooth';
    handleScroll(); // Trigger snap to nearest
  };

  const handleMouseUp = () => {
    if (!isDragging || !scrollRef.current) return;
    setIsDragging(false);
    // Re-enable scroll snapping
    scrollRef.current.style.scrollSnapType = 'x mandatory';
    scrollRef.current.style.scrollBehavior = 'smooth';
    handleScroll(); // Trigger snap to nearest
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Natural speed multiplier
    if (Math.abs(walk) > 5 && !hasDragged) setHasDragged(true);
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <section className="location-section py-16 mt-8 relative">
      <div className="location-inner max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header and Description */}
        <ScrollReveal revealClass="anim-col-1" className="flex flex-col mb-8 gap-4 border-b border-[var(--c-border)] pb-6">
          <JitterTitle text={LOCATION_DATA.title} className="text-left" />
          <div className="location-desc max-w-2xl text-left">
            <div className="text-zoom-reveal" style={{ transformOrigin: "left center" }}>
              <p className="about-tagline re-textbox">
                {LOCATION_DATA.description}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Gallery */}
        <ScrollReveal revealClass="anim-col-3" className="location-gallery-wrapper relative -mx-4 md:-mx-8">
          
          {/* ── Blueprint Grid Overlay (Framing Center Image) ── */}
          <div className="absolute inset-0 pointer-events-none z-0 hidden md:block overflow-hidden opacity-80">
            {/* Horizontal Grid Lines */}
            <div className="absolute top-[12%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--c-red)] to-transparent opacity-70" />
            <div className="absolute bottom-[18%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--c-red)] to-transparent opacity-70" />
            
            {/* Vertical Framing Grid Lines (Matches active image width + 1.5rem padding) */}
            <div className="absolute top-0 bottom-0 left-[50%] -translate-x-[calc(min(70vw,600px)/2+1.5rem)] w-[1px] bg-gradient-to-b from-transparent via-[var(--c-red)] to-transparent opacity-80" />
            <div className="absolute top-0 bottom-0 left-[50%] translate-x-[calc(min(70vw,600px)/2+1.5rem)] w-[1px] bg-gradient-to-b from-transparent via-[var(--c-red)] to-transparent opacity-80" />
            
            {/* Center Crosshair Markers at intersections */}
            <div className="absolute top-[12%] left-[50%] w-[5px] h-[5px] bg-white -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 shadow-[0_0_8px_rgba(255,255,255,1)]" />
            <div className="absolute bottom-[18%] left-[50%] w-[5px] h-[5px] bg-white -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80 shadow-[0_0_8px_rgba(255,255,255,1)]" />
          </div>

          {/* Fading edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none" />

          <div 
            className="location-gallery flex overflow-x-auto gap-4 px-[10%] md:px-[25%] pb-8 pt-4 hide-scrollbar snap-x snap-mandatory select-none"
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onContextMenu={(e) => e.preventDefault()}
          >
            {images.map((img, i) => (
              <div 
                key={i} 
                className={`loc-item snap-center flex-shrink-0 relative transition-all duration-500 ease-out cursor-grab active:cursor-grabbing overflow-hidden bg-black border ${i === activeIdx ? 'border-[var(--c-ash)] z-20 scale-100 opacity-100 shadow-2xl' : 'border-[var(--c-border)] z-10 scale-90 opacity-40 hover:opacity-70'}`}
                style={{ 
                  width: 'min(70vw, 600px)', 
                  aspectRatio: '16/10'
                }}
                onClick={(e) => {
                  if (hasDragged) {
                    e.preventDefault();
                    e.stopPropagation();
                  } else {
                    scrollTo(i);
                  }
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src={img} 
                  alt={`Location ${i+1}`} 
                  className={`w-full h-full object-cover transition-all duration-700 pointer-events-none ${i === activeIdx ? '' : 'grayscale-[0.8]'}`}
                />
              </div>
            ))}
          </div>

          {/* Scroll Navigation (Left / Right) */}
          <div className="flex justify-center items-center gap-4 md:gap-8 mt-6 z-20 relative">
            <button 
              onClick={() => scrollTo(Math.max(0, activeIdx - 1))}
              className={`group flex items-center transition-all duration-300 ${activeIdx === 0 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'}`}
              disabled={activeIdx === 0}
              aria-label="Previous location"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/common/icon/arrow.webp" alt="Left" className={`w-6 md:w-10 h-auto transition-transform ${activeIdx === 0 ? '' : 'group-hover:-translate-x-2'}`} />
            </button>
            
            {/* Scroll Track & Thumb */}
            <div 
               className="relative w-32 md:w-64 h-6 flex items-center cursor-pointer group/track mx-2"
               onClick={(e) => {
                 const rect = e.currentTarget.getBoundingClientRect();
                 const x = e.clientX - rect.left;
                 const percentage = x / rect.width;
                 const newIdx = Math.floor(percentage * images.length);
                 scrollTo(Math.min(images.length - 1, Math.max(0, newIdx)));
               }}
               aria-label="Scroll track"
            >
              {/* Background Track Line */}
              <div className="w-full h-[2px] bg-[var(--c-dim)] opacity-40 rounded-full transition-opacity group-hover/track:opacity-80" />
              {/* Moving Thumb */}
              <div 
                className="absolute h-[4px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)] rounded-full transition-all duration-500 ease-out"
                style={{ 
                  width: `${100 / images.length}%`,
                  left: `${(activeIdx / images.length) * 100}%` 
                }}
              />
            </div>
            
            <button 
              onClick={() => scrollTo(Math.min(images.length - 1, activeIdx + 1))}
              className={`group flex items-center transition-all duration-300 ${activeIdx === images.length - 1 ? 'opacity-30 cursor-not-allowed' : 'opacity-80 hover:opacity-100'}`}
              disabled={activeIdx === images.length - 1}
              aria-label="Next location"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/img/common/icon/arrow.webp" alt="Right" className={`w-6 md:w-10 h-auto scale-x-[-1] transition-transform ${activeIdx === images.length - 1 ? '' : 'group-hover:translate-x-2'}`} />
            </button>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
