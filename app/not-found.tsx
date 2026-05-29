// app/not-found.tsx
import Link from "next/link";
import DustOverlay from "@/components/DustOverlay";
import JitterTitle from "@/components/JitterTitle";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col relative items-center justify-center" style={{ backgroundColor: "#0a0a0a", color: "#e8e0d0" }}>
      {/* ── Background tetap ── */}
      <div
        className="fixed-bg"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/img/common/bg/bg.webp')",
        }}
      />
      
      {/* ── EFEK LATAR BELAKANG ── */}
      <div className="bg-grid" aria-hidden="true" />
      <DustOverlay />
      
      {/* ── Content Container ── */}
      <div className="relative z-10 flex flex-col min-h-screen items-center justify-center">
        
        {/* Header (Logo) outside the dark box */}
        <header className="flex flex-col items-center justify-center px-3 md:px-2 pt-6 pb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo/nasgor.webp"
            alt="Nasi Goreng"
            className="select-none mx-auto"
            style={{
              height: "clamp(5rem, 15vw, 5.5rem)",
              width: "auto",
              filter: "drop-shadow(0px 0px 4px rgba(204, 26, 26, 0.5))",
            }}
          />
        </header>

        {/* 404 Box inside dark background */}
        <div className="flex flex-col items-center text-center p-8 md:p-16 border shadow-2xl max-w-2xl mx-auto w-full" style={{ borderColor: "var(--c-border)", backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(5px)" }}>

        {/* 404 Text */}
        <JitterTitle text="ERROR 404" className="text-4xl md:text-5xl mb-4" />
        
        <p className="about-tagline re-textbox mb-8 inline-block px-4 py-2 mt-4 text-sm md:text-base">
          Page you requested not found.
        </p>

        {/* Back Button */}
        <div>
          <Link href="/" className="btn-bg hover-text inline-block px-6 py-3 font-bold text-sm md:text-base" style={{ color: "#000" }}>
            [ &lt; RETURN TO BASE ]
          </Link>
        </div>
      </div>
    </div>
  </div>
  );
}
