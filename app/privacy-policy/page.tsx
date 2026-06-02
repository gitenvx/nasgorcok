// app/privacy-policy/page.tsx
import Link from "next/link";
import { Metadata } from "next";
import DustOverlay from "@/components/DustOverlay";

export const metadata: Metadata = {
  title: "Privacy Policy | Nasi Goreng Cok",
  description: "Privacy Policy for Nasi Goreng Cok",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: "#0a0a0a", color: "#e8e0d0" }}>
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
        
        {/* Header (Logo & Back Button) */}
        <header
          className="flex flex-col items-center justify-center px-3 md:px-2 pt-6 pb-2"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/img/logo/nasgor.webp"
            alt="Nasi Goreng"
            className="select-none"
            style={{
              height: "clamp(5rem, 15vw, 5.5rem)",
              width: "auto",
            }}
          />
        </header>

        <div className="flex-1 max-w-4xl mx-auto px-6 py-8 md:py-12 w-full">
          <div className="mb-8">
            <Link href="/" className="btn-bg hover-text inline-block px-4 py-2 font-bold text-sm" style={{ color: "#000" }}>
              [ &lt; RETURN TO BASE ]
            </Link>
          </div>

          <div className="p-6 md:p-10 border shadow-lg" style={{ borderColor: "var(--c-border)", backgroundColor: "rgba(10,10,10,0.85)", backdropFilter: "blur(5px)" }}>
            <h1 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: "var(--c-red)", letterSpacing: "0.1em" }}>
              [ PRIVACY POLICY ]
            </h1>
          
          <div className="space-y-6 text-sm md:text-base leading-relaxed" style={{ color: "rgba(232,224,208,0.85)" }}>
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
            <Link href="/" className="btn-bg hover-text inline-block px-4 py-2 font-bold text-sm" style={{ color: "#000" }}>
              [ &lt; RETURN TO BASE ]
            </Link>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
