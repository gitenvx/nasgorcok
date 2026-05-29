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

  const images = LOCATION_DATA.images;

  // Handle manual scroll to snap to nearest image and update active index
  const handleScroll = () => {
    if (!scrollRef.current) return;
    
    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const itemWidth = container.clientWidth * 0.6; // assuming items are around 60% width
    const centerPosition = scrollLeft + (container.clientWidth / 2);
    
    // Calculate which item is closest to the center
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

  // Drag logic for mouse
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
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
    const walk = (x - startX) * 2; // Scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <section className="location-section py-16 mt-8 relative">
      <div className="location-inner max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header and Description */}
        <ScrollReveal revealClass="anim-col-1" className="flex flex-col mb-8 gap-4 border-b border-[var(--c-border)] pb-6">
          <JitterTitle text={LOCATION_DATA.title} className="text-left" />
          <div className="location-desc max-w-2xl text-left">
            <p className="about-tagline re-textbox inline-block text-left">
              {LOCATION_DATA.description}
            </p>
          </div>
        </ScrollReveal>

        {/* Horizontal Gallery */}
        <ScrollReveal revealClass="anim-col-3" className="location-gallery-wrapper relative -mx-4 md:-mx-8">
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
          >
            {images.map((img, i) => (
              <div 
                key={i} 
                className={`loc-item snap-center flex-shrink-0 relative transition-all duration-500 ease-out cursor-grab active:cursor-grabbing overflow-hidden bg-black border ${i === activeIdx ? 'border-[var(--c-ash)] z-20 scale-100 opacity-100 shadow-2xl' : 'border-[var(--c-border)] z-10 scale-90 opacity-40 hover:opacity-70'}`}
                style={{ 
                  width: 'min(70vw, 600px)', 
                  aspectRatio: '16/10'
                }}
                onClick={() => scrollTo(i)}
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

          {/* Navigation Dots */}
          <div className="flex justify-center gap-3 mt-4">
            {images.map((_, i) => (
              <button
                key={i}
                className={`w-3 h-3 transition-colors duration-300 border ${i === activeIdx ? 'bg-[var(--c-red)] border-[var(--c-red)]' : 'bg-transparent border-[var(--c-dim)] hover:border-[var(--c-ash)]'}`}
                onClick={() => scrollTo(i)}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
