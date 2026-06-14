"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { LOCATION_DATA } from "@/lib/menu-data";
import JitterTitle from "@/components/JitterTitle";
import ScrollReveal from "@/components/ScrollReveal";
import { CiLocationOn } from "react-icons/ci";
import { FiExternalLink } from "react-icons/fi";

export default function LocationSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const thumbRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(1);
  const [isScrubbing, setIsScrubbing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftPos, setScrollLeftPos] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);
  const rafRef = useRef<number | null>(null);
  const exactScrollLeft = useRef<number | null>(null);
  const tickerDir = useRef(1);

  const images = LOCATION_DATA.images;

  const triggerPause = useCallback(() => {
    setIsPaused(true);
    if (pauseTimeout.current) clearTimeout(pauseTimeout.current);
    pauseTimeout.current = setTimeout(() => setIsPaused(false), 1500);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    if (thumbRef.current) {
      const container = scrollRef.current;
      const maxScroll = container.scrollWidth - container.clientWidth;
      if (maxScroll > 0) {
        const progress = container.scrollLeft / maxScroll;
        const maxLeft = 100 - (100 / images.length);
        thumbRef.current.style.left = `${progress * maxLeft}%`;
      }
    }
    
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
    }, 30);
  };

  const scrollTo = (index: number) => {
    if (!scrollRef.current) return;
    triggerPause();
    const container = scrollRef.current;
    container.style.scrollSnapType = 'x mandatory';
    container.style.scrollBehavior = 'smooth';
    const items = container.querySelectorAll(".loc-item");
    if (items[index]) {
      const item = items[index] as HTMLElement;
      const scrollPosition = item.offsetLeft - (container.clientWidth / 2) + (item.clientWidth / 2);
      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth"
      });
      setActiveIdx(index);
    }
  };

  const handleScrub = useCallback((clientX: number) => {
    if (!scrollRef.current || !progressBarRef.current) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    let percent = (clientX - rect.left) / rect.width;
    percent = Math.max(0, Math.min(1, percent));
    
    const scrollWidth = scrollRef.current.scrollWidth - scrollRef.current.clientWidth;
    scrollRef.current.scrollTo({
      left: scrollWidth * percent,
      behavior: 'auto'
    });
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    setIsScrubbing(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = 'none';
      scrollRef.current.style.scrollBehavior = 'auto';
    }
    handleScrub(e.clientX);
  }, [handleScrub]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (isScrubbing) {
      handleScrub(e.clientX);
    }
  }, [isScrubbing, handleScrub]);

  const onPointerUp = useCallback((e: React.PointerEvent) => {
    setIsScrubbing(false);
    e.currentTarget.releasePointerCapture(e.pointerId);
    if (scrollRef.current) {
      scrollRef.current.style.scrollSnapType = 'x mandatory';
      scrollRef.current.style.scrollBehavior = 'smooth';
      handleScroll();
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollTo(1);
    }, 200);
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Smooth continuous ticker
  useEffect(() => {
    if (isDragging || isScrubbing || isPaused || isHovered) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      exactScrollLeft.current = null;
      return;
    }

    const animateScroll = () => {
      if (scrollRef.current) {
        const container = scrollRef.current;
        container.style.scrollSnapType = 'none';
        container.style.scrollBehavior = 'auto';

        if (exactScrollLeft.current === null) {
          exactScrollLeft.current = container.scrollLeft;
        }

        // Use 1px per frame to avoid sub-pixel rounding jitter (true 60fps)
        exactScrollLeft.current += 1 * tickerDir.current;
        container.scrollLeft = exactScrollLeft.current;

        const maxScroll = container.scrollWidth - container.clientWidth;
        
        if (container.scrollLeft >= maxScroll - 1) {
          tickerDir.current = -1;
          exactScrollLeft.current = maxScroll - 1;
        } else if (container.scrollLeft <= 1) {
          tickerDir.current = 1;
          exactScrollLeft.current = 1;
        }
      }
      rafRef.current = requestAnimationFrame(animateScroll);
    };

    rafRef.current = requestAnimationFrame(animateScroll);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isDragging, isScrubbing, isPaused, isHovered]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftPos(scrollRef.current.scrollLeft);
    scrollRef.current.style.scrollSnapType = 'none';
    scrollRef.current.style.scrollBehavior = 'auto';
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isDragging || !scrollRef.current) return;
    setIsDragging(false);
    scrollRef.current.style.scrollSnapType = 'x mandatory';
    scrollRef.current.style.scrollBehavior = 'smooth';
    handleScroll();
  };

  const handleMouseUp = () => {
    if (!isDragging || !scrollRef.current) return;
    setIsDragging(false);
    scrollRef.current.style.scrollSnapType = 'x mandatory';
    scrollRef.current.style.scrollBehavior = 'smooth';
    handleScroll();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    if (Math.abs(walk) > 5 && !hasDragged) setHasDragged(true);
    scrollRef.current.scrollLeft = scrollLeftPos - walk;
  };

  return (
    <section className="location-section py-4 mt-2 relative overflow-hidden">
      <div className="location-inner max-w-7xl mx-auto px-4 md:px-8">
        
        {/* Header and Description */}
        <ScrollReveal revealClass="anim-col-1" className="flex flex-col mb-8 gap-4 border-b border-(--c-border) pb-6">
          <JitterTitle text={LOCATION_DATA.title} className="text-left" />
          <div className="location-desc max-w-2xl text-left">
            <div className="text-zoom-reveal" style={{ transformOrigin: "left center" }}>
              <p className="about-tagline re-textbox">
                {LOCATION_DATA.description}<br/>
                <a 
                  href={`https://www.google.com/maps?q=${LOCATION_DATA.lokasi}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity cursor-pointer inline-block mt-1 group"
                  title="Buka di Google Maps"
                >
                  <CiLocationOn className="inline-block text-(--c-red) mr-1.5" style={{ fontSize: "1.2em", verticalAlign: "-0.2em" }} />
                  <span className="group-hover:underline">{LOCATION_DATA.lokasi}</span>
                  <FiExternalLink className="inline-block ml-1.5 opacity-60" style={{ fontSize: "0.9em", verticalAlign: "-0.1em" }} />
                </a>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Gallery */}
        <ScrollReveal revealClass="anim-col-3" className="location-gallery-wrapper relative -mx-4 md:-mx-8">
          
          {/* ── Blueprint Grid Overlay (Framing Center Image) ── */}
          <div className="absolute inset-0 pointer-events-none z-0 block overflow-hidden opacity-80">
            {/* Horizontal Grid Lines */}
            <div className="absolute left-0 w-full h-0.5 bg-linear-to-r from-transparent via-(--c-red) to-transparent opacity-70 hud-line-x transform scale-x-0 origin-center transition-transform duration-1000 ease-out delay-150" style={{ top: '0rem' }} />
            <div className="absolute left-0 w-full h-0.5 bg-linear-to-r from-transparent via-(--c-red) to-transparent opacity-70 hud-line-x transform scale-x-0 origin-center transition-transform duration-1000 ease-out delay-150" style={{ top: 'calc(1rem + min(70vw, 600px) * 0.625 + 1rem)' }} />
            
            {/* Inner Vertical Framing Grid Lines */}
            <div className="absolute top-0 bottom-0 left-[50%] -translate-x-[calc(min(70vw,600px)/2+1rem)] w-0.5 bg-linear-to-b from-transparent via-(--c-red) to-transparent opacity-80 hud-line-y transform scale-y-0 origin-center transition-transform duration-1000 ease-out delay-300" />
            <div className="absolute top-0 bottom-0 left-[50%] translate-x-[calc(min(70vw,600px)/2+1rem)] w-0.5 bg-linear-to-b from-transparent via-(--c-red) to-transparent opacity-80 hud-line-y transform scale-y-0 origin-center transition-transform duration-1000 ease-out delay-300" />
            
            {/* Outer Vertical Framing Grid Lines */}
            <div className="absolute top-0 bottom-0 left-[50%] -translate-x-[calc(min(70vw,600px)/2+3rem)] w-0.5 bg-linear-to-b from-transparent via-(--c-red) to-transparent opacity-40 hud-line-y transform scale-y-0 origin-center transition-transform duration-1000 ease-out delay-400" />
            <div className="absolute top-0 bottom-0 left-[50%] translate-x-[calc(min(70vw,600px)/2+3rem)] w-0.5 bg-linear-to-b from-transparent via-(--c-red) to-transparent opacity-40 hud-line-y transform scale-y-0 origin-center transition-transform duration-1000 ease-out delay-400" />
          </div>

          <div 
            className="location-gallery flex overflow-x-auto gap-4 px-[10%] md:px-[25%] pb-4 md:pb-8 pt-4 hide-scrollbar snap-x snap-mandatory select-none"
            ref={scrollRef}
            onScroll={handleScroll}
            onMouseDown={handleMouseDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            onContextMenu={(e) => e.preventDefault()}
          >
            {images.map((img, i) => (
              <div 
                key={i} 
                className={`loc-item snap-center shrink-0 relative transition-all duration-500 ease-out overflow-hidden bg-black border-[3px] border-[#e8e0d0] ${i === activeIdx ? 'z-20 scale-100 opacity-100 shadow-2xl' : 'z-10 scale-90 opacity-40 hover:opacity-70'}`}
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
                <Image 
                  src={img} 
                  alt={`Location ${i+1}`}
                  fill
                  sizes="(max-width: 768px) 70vw, 600px"
                  quality={100}
                  className={`object-cover transition-all duration-700 pointer-events-none ${i === activeIdx ? '' : 'grayscale-[0.8]'}`}
                />
              </div>
            ))}
          </div>

          {/* Scroll Navigation */}
          <ScrollReveal revealClass="" className="relative w-full flex flex-col justify-center items-center mt-1 md:mt-2 z-20">
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-transparent via-(--c-red) to-transparent opacity-60 hud-line-x transform scale-x-0 origin-center transition-transform duration-1000 ease-out delay-150" />

            <div className="flex items-center justify-between w-62.5 md:w-100 relative z-10 mb-2 md:mb-3">
              <button 
                onClick={() => scrollTo(Math.max(0, activeIdx - 1))}
                className={`group flex items-center transition-all duration-300 ${activeIdx === 0 ? 'opacity-30' : 'opacity-80 hover:opacity-100'}`}
                disabled={activeIdx === 0}
                aria-label="Previous location"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/common/icon/arrow.webp" alt="Left" className={`w-6 md:w-10 h-auto invert-on-light transition-transform ${activeIdx === 0 ? '' : 'group-hover:-translate-x-2'}`} />
              </button>
              
              <div 
                 ref={progressBarRef}
                 className="relative flex-1 h-8 flex items-center cursor-pointer select-none group/track mx-4 touch-none"
                 onPointerDown={onPointerDown}
                 onDragStart={(e) => e.preventDefault()}
                 onPointerMove={onPointerMove}
                 onPointerUp={onPointerUp}
                 onPointerCancel={onPointerUp}
                 aria-hidden="true"
              >
                <div className="w-full h-0.5 bg-(--c-dim) opacity-40 transition-opacity group-hover/track:opacity-80" />
                <div 
                  ref={thumbRef}
                  className="absolute h-0.5 md:h-0.75 bg-(--c-red) shadow-[0_0_8px_var(--c-red)] rounded-full will-change-[left]"
                  style={{ 
                    width: `${100 / images.length}%`,
                    left: `${(activeIdx / images.length) * 100}%` 
                  }}
                />
              </div>
              
              <button 
                onClick={() => scrollTo(Math.min(images.length - 1, activeIdx + 1))}
                className={`group flex items-center transition-all duration-300 ${activeIdx === images.length - 1 ? 'opacity-30' : 'opacity-80 hover:opacity-100'}`}
                disabled={activeIdx === images.length - 1}
                aria-label="Next location"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/img/common/icon/arrow.webp" alt="Right" className={`w-6 md:w-10 h-auto scale-x-[-1] invert-on-light transition-transform ${activeIdx === images.length - 1 ? '' : 'group-hover:translate-x-2'}`} />
              </button>
            </div>
          </ScrollReveal>
        </ScrollReveal>

        {/* Google Maps Embed */}
        <ScrollReveal revealClass="anim-col-4" className="mt-8 relative -mx-4 md:-mx-8 flex flex-col items-center">
          <a 
            href={`https://www.google.com/maps?q=${LOCATION_DATA.lokasi}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-(--c-ash) text-(--c-void) px-3 py-1.5 hover:opacity-80 transition-opacity cursor-pointer group mb-4 shadow-md"
            title="Buka di Google Maps"
          >
            <CiLocationOn className="text-(--c-red)" style={{ fontSize: "1.3em" }} />
            <span className="font-mono text-sm sm:text-base tracking-wide group-hover:underline">Pergi ke Maps</span>
            <FiExternalLink className="opacity-70" style={{ fontSize: "1em" }} />
          </a>
          <div className="pb-4 md:pb-8 flex justify-center z-10 relative px-4 w-full pointer-events-auto">
            <div 
              className="relative transition-all duration-500 ease-out overflow-hidden bg-black border-[3px] border-[#e8e0d0] shadow-2xl w-full"
              style={{ maxWidth: '800px', aspectRatio: '16/9' }}
            >
              <iframe
                src={`https://maps.google.com/maps?q=${LOCATION_DATA.lokasi}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                width="100%"
                height="100%"
                className="map-dark-filter"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
