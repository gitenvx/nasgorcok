// app/privacy-policy/page.tsx
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import DustOverlay from "@/components/DustOverlay";
import RightNav from "@/components/RightNav";

export const metadata: Metadata = {
  title: "Privacy Policy | Nasi Goreng Cok",
  description: "Privacy Policy for Nasi Goreng Cok",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col relative bg-(--c-void) text-(--c-ash)">
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
      <div className="relative z-10 flex flex-col min-h-screen mb-8">
        
        {/* ── LOGO HEADER ── */}
        <header className="relative w-full z-50 flex flex-col items-center justify-center pt-20 md:pt-10 pb-0 pointer-events-none">
          <Link href="/" className="pointer-events-auto hover:scale-105 transition-transform duration-300">
            <Image
              src="/img/logo/nasgor.webp"
              alt="Nasi Goreng"
              priority
              fetchPriority="high"
              loading="eager"
              quality={100}
              width={600}
              height={200}
              sizes="(max-width: 768px) 80vw, 300px"
              className="select-none"
              style={{
                height: "clamp(8rem, 25vw, 11rem)",
                width: "auto",
                objectFit: "contain",
                filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.8))"
              }}
            />
          </Link>
          <div className="w-[100px] md:w-[150px] -mt-8 md:-mt-12 pointer-events-auto">
            <Link href="/" className="hover:scale-105 transition-transform duration-300 block">
              <Image 
                src="/img/logo/mamasucok.webp" 
                alt="Mamas Ucok Logo" 
                width={150} 
                height={150}
                quality={100}
                className="w-full h-auto opacity-80 hover:opacity-100 transition-opacity duration-300 drop-shadow-[0_0_8px_rgba(255,255,255,0.1)] grayscale hover:grayscale-0 invert-on-light"
                style={{ width: "100%", height: "auto" }}
              />
            </Link>
          </div>
        </header>

        <div className="flex-1 max-w-4xl mx-auto px-6 py-8 md:py-12 w-full">
          <div className="mb-8">
            <Link href="/" className="btn-bg hover-text inline-block px-4 py-2 font-bold text-sm">
              [ &lt; RETURN TO BASE ]
            </Link>
          </div>

          <div className="p-6 md:p-10 border shadow-lg" style={{ borderColor: "var(--c-border)", backgroundColor: "var(--c-box)", backdropFilter: "blur(5px)" }}>
            <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--c-red)", letterSpacing: "0.1em" }}>
              [ PRIVACY POLICY ]
            </h1>
          
          <div className="space-y-6 text-sm md:text-base leading-relaxed">
            <p>
              <strong>Effective Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>

            <section>
              <h2 className="about-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>1. INTRODUCTION</h2>
              <p>
                Welcome to Nasi Goreng Cok ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about this privacy notice, or our practices with regards to your personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="about-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>2. INFORMATION WE COLLECT</h2>
              <p>
                <strong>Personal Information Disclosed by You:</strong> We collect personal information that you voluntarily provide to us when you express an interest in obtaining information about us or our products and services, or otherwise when you contact us.
              </p>
              <p className="mt-2">
                <strong>Automatically Collected Information:</strong> We automatically collect certain information when you visit, use, or navigate the Site. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Site, and other technical information.
              </p>
            </section>

            <section>
              <h2 className="about-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>3. COOKIES AND SIMILAR TECHNOLOGIES</h2>
              <p>
                We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
              </p>
            </section>

            <section>
              <h2 className="about-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>4. HOW WE USE YOUR INFORMATION</h2>
              <p>
                We use personal information collected via our Site for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
            </section>

            <section>
              <h2 className="about-title" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>5. CONTACT US</h2>
              <p>
                If you have questions or comments about this notice, you may contact us at our physical location or via our standard contact methods displayed on the main page.
              </p>
            </section>
          </div>

          {/* Bottom Back Button */}
          <div className="mt-8">
            <Link href="/" className="btn-bg hover-text inline-block px-4 py-2 font-bold text-sm">
              [ &lt; RETURN TO BASE ]
            </Link>
          </div>
        </div>
        </div>
        
        {/* ── FOOTER COPYRIGHT ── */}
        <div
          className="relative w-full z-30 flex flex-col items-center pb-8 mt-auto pt-8 border-t border-[var(--c-border)]"
          style={{
            backdropFilter: "blur(0px)",
            WebkitBackdropFilter: "blur(0px)",
            background: "var(--c-footer-bg)",
          }}
        >
          <div className="flex flex-col items-center gap-2 text-center px-4">
            <span className="text-sm text-(--c-ash) font-medium">
              © {new Date().getFullYear()} Mohammad Fathuloh. All rights reserved.
            </span>
          </div>
        </div>

      </div>
      
      {/* ── Right Navigation & Theme Toggle ── */}
      <RightNav />
    </div>
  );
}
