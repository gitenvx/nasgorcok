// app/page.tsx
import Image from "next/image";
import {
  SiPython, SiNodedotjs, SiTypescript,
  SiGithub, SiDocker, SiGit,
} from "react-icons/si";
import { FaWindows, FaUbuntu } from "react-icons/fa";
import MenuColumn   from "@/components/MenuColumn";
import KontakColumn from "@/components/KontakColumn";
import TickerBar    from "@/components/TickerBar";
import CrackOverlay from "@/components/CrackOverlay";
import AudioAutoplay from "@/components/AudioAutoplay";
import { NAMA_WARUNG, NASI_GORENG, MIE_CAPCAY } from "@/lib/menu-data";

/* ─── Tech logo rows ─────────────────────────────── */
const LOGOS_CENTER  = [SiPython, SiNodedotjs, SiTypescript, SiGit, SiGithub, SiDocker, FaUbuntu, FaWindows];

export default function Home() {
  return (

    <div
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage:      "url('/img/bg.webp')",
        backgroundSize:       "cover",
        backgroundPosition:   "center",
        backgroundRepeat:     "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >

      {/* ── CRACK / SCRATCH TEXTURE ──*/}
      <div className="hidden md:grid h-full">
        <AudioAutoplay />
      </div>
      <CrackOverlay />
      <CrackOverlay />

      <div className="bg-grid" aria-hidden="true" />
      <div className="pixel-snow" aria-hidden="true" />

      {/* ══════════════════════════════════════
          KONTEN UTAMA
          ══════════════════════════════════════ */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* ── HEADER: title ── */}
        <header className="flex items-center justify-between px-3 md:px-6 pt-3 gap-2">

           {/* */}

          {/* TITLE CENTER */}
          <div className="flex-1 text-center px-1 md:px-3">

            {/* NASIGORENG — per-letter animasi, RE box centered */}
            <h1
              className="h1-scanline leading-none uppercase select-none
                         flex items-center justify-center"
              style={{
                fontFamily:    "var(--font-title)",
                fontSize:      "clamp(2rem, 9vw, 7rem)",
                color:         "var(--c-ash)",
                textShadow:    "2px 4px 0 rgba(0,0,0,0.9)",
                letterSpacing: "0.15em",
              }}
              aria-label="Nasi Goreng"
            >
              {"NASIGO".split("").map((ch, i) => (
                <span
                  key={i}
                  className="letter-drop"
                  style={{ animationDelay: `${0.05 + i * 0.07}s` }}
                  aria-hidden="true"
                >
                  {ch}
                </span>
              ))}
              <span
                className="title-re letter-re"
                style={{ fontFamily: "var(--font-title)", letterSpacing: "0.04em", animationDelay: "0.55s" }}
                aria-hidden="true"
              >RE</span>
              {"NG".split("").map((ch, i) => (
                <span
                  key={i}
                  className="letter-drop"
                  style={{ animationDelay: `${0.65 + i * 0.07}s`, letterSpacing: "0.15em" }}
                  aria-hidden="true"
                >
                  {ch}
                </span>
              ))}
            </h1>

            {/* Nama warung — pakai background gambar btn-bg */}
            <div className="anim-nama flex justify-center mt-1">
              <div
                className="menu-header btn-bg mb-3 hover-text"
                style={{ textAlign: "center", display: "inline"}}
              >
                {NAMA_WARUNG}
              </div>
            </div>

            {/* mENu */}
            <p
              className="anim-nama mt-1 hover-text"
              style={{
                fontFamily:   "var(--font-mono)",
                fontSize:     "clamp(0.75rem, 1.8vw, 1.2rem)",
                color:        "var(--c-ash)",
                letterSpacing: "0.1em",
                opacity:      0.85,
              }}
            >
              mENu
            </p>
            {/* Logos tengsh */}
            <div className="w-full flex items-center justify-center gap-2 flex-wrap mt-2">
              {LOGOS_CENTER.map((Icon, i) => (
                <Icon key={i} className="tech-logo" aria-hidden="true" />
              ))}
            </div>
          </div>

        </header>

        {/* Divider */}
        <div
          className="anim-divider mx-3 md:mx-6 mt-3"
          style={{ height: "1px", background: "var(--c-border)" }}
          aria-hidden="true"
        />

        {/* ══════════════════════════════════════
            MENU GRID
            PC  : 3 kolom side-by-side
            HP  : accordion stack
            ══════════════════════════════════════ */}
        <main className="flex-1">

          {/* PC */}
          <div className="hidden md:grid md:grid-cols-3 h-full">
            <div className="anim-col-1">
              <MenuColumn title="[ Nasi Goreng ]" items={NASI_GORENG} />
              {/* ← quotes */}
                <div className="px-4 md:px-5 mt-4">
                  <p>
                    <span className="re-textbox hover-text">
                      Nasi goreng kaki lima, dimasak dengan cinta.<br/>
                      Tersedia setiap hari 18:00 - 00:00 WITA, harga bisa ditanya.<br/>
                      Jualan kok, kalau tidak meriang hehe.
                    </span>
                  </p>
                </div>
            </div>
            <div className="anim-col-2">
              <MenuColumn title="[ Mie > Capcay > Kwetiau ]" items={MIE_CAPCAY} hasDivider />
            </div>
            <div className="anim-col-3">
              <KontakColumn />
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex flex-col md:grid-cols-2 h-full">

            {/* Nasi Goreng */}
            <div className="border-b" style={{ borderColor: "var(--c-border)" }}>
              <div className="m-3">
                <span className="menu-header btn-bg hover-text">[ Nasi Goreng ]</span>
              </div>
              <ul className="px-4 pb-4 space-y-0.5">
                {NASI_GORENG.map(item => (
                  <li key={item} className="menu-item">
                    <span className="menu-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="m-3">
                <span className="menu-header btn-bg hover-text">[ Mie &gt; Capcay &gt; Kwetiau ]</span>
              </div>
              <ul className="px-4 pb-4 space-y-0.5">
                {MIE_CAPCAY.map(item => (
                  <li key={item} className="menu-item">
                    <span className="menu-dot" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              {/* ← quotes */}
                <div className="px-4 md:px-5 mt-4">
                  <p>
                    <span className="re-textbox hover-text">
                      Nasi goreng kaki lima, dimasak dengan cinta.<br/>
                      Tersedia setiap hari 18:00 - 00:00 WITA, harga bisa ditanya.<br/>
                      Jualan kok, kalau tidak meriang hehe.
                    </span>
                  </p>
                </div>
            </div>

            {/* Kontak */}
            <div className="anim-col-3">
              <KontakColumn />
            </div>

          </div>
        </main>

        {/* Bottom divider */}
        <div
          className="anim-divider mx-3 md:mx-6"
          style={{ height: "1px", background: "var(--c-border)" }}
          aria-hidden="true"
        />

        {/* Ticker */}
        <div className="anim-ticker -mt-3 mb-5">
          <TickerBar />
        </div>

      </div>
    </div>
  );
}
