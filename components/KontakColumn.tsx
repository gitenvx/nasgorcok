// components/KontakColumn.tsx
"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaGlobe, FaTelegram } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { FiExternalLink } from "react-icons/fi";
import { KONTAK } from "@/lib/menu-data";
//import LoveAnimation from "@/components/LoveAnimation";

/**
 * Komponen kolom kontak yang menampilkan informasi kontak warung
 * Mencakup WhatsApp, Telegram, Instagram, Website, Email, Alamat, dan QRIS pembayaran
 * @returns JSX element berisi daftar kontak dengan icon dan QR code QRIS
 */
export default function KontakColumn() {
  return (
    <div className="col-divider flex flex-col py-4 px-4 md:px-5">

      <div
        className="menu-header btn-bg mb-3 hover-text kontak-header-mobile"
        style={{ display: "block", width: "100%", textAlign: "center" }}
      >
        [ Kontak ]
      </div>

      <div className="space-y-1 mb-4 hover-text">
        <a href={`https://wa.me/62${KONTAK.whatsapp.replace(/-/g, '').substring(1)}?text=${encodeURIComponent('Mamas Ucok, nasgor buka hari ini?')}`} target="_blank" rel="noopener noreferrer" className="menu-item cursor-pointer flex items-center justify-between w-full pr-2">
          <div className="flex items-center gap-2.5">
            <FaWhatsapp className="shrink-0 opacity-80" style={{ fontSize: "1em" }} />
            <span>WhatsApp</span>
          </div>
          <FiExternalLink className="opacity-40 text-[0.8em]" />
        </a>
        <a href={`https://t.me/${KONTAK.telegram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="menu-item cursor-pointer flex items-center justify-between w-full pr-2">
          <div className="flex items-center gap-2.5">
            <FaTelegram className="shrink-0 opacity-80" style={{ fontSize: "1em" }} />
            <span>Telegram</span>
          </div>
          <FiExternalLink className="opacity-40 text-[0.8em]" />
        </a>
        <a href={`https://instagram.com/${KONTAK.instagram.replace('@', '')}`} target="_blank" rel="noopener noreferrer" className="menu-item cursor-pointer flex items-center justify-between w-full pr-2">
          <div className="flex items-center gap-2.5">
            <FaInstagram className="shrink-0 opacity-80" style={{ fontSize: "1em" }} />
            <span>Instagram</span>
          </div>
          <FiExternalLink className="opacity-40 text-[0.8em]" />
        </a>
        <a href={KONTAK.website} target="_blank" rel="noopener noreferrer" className="menu-item cursor-pointer flex items-center justify-between w-full pr-2">
          <div className="flex items-center gap-2.5">
            <FaGlobe className="shrink-0 opacity-80" style={{ fontSize: "1em" }} />
            <span>Website</span>
          </div>
          <FiExternalLink className="opacity-40 text-[0.8em]" />
        </a>
        <a href={`mailto:${KONTAK.email}`} className="menu-item cursor-pointer flex items-center justify-between w-full pr-2">
          <div className="flex items-center gap-2.5">
            <TfiEmail className="shrink-0 opacity-80" style={{ fontSize: "1em" }} />
            <span>Email</span>
          </div>
          <FiExternalLink className="opacity-40 text-[0.8em]" />
        </a>
      </div>

      {/* QRIS + Love Animation */}
      <div className="qris-box mt-auto">
        <div
          className="menu-header btn-bg mb-3 hover-text kontak-header-mobile"
          style={{ display: "block", width: "100%", textAlign: "center" }}
        >
          [ Pembayaran QRIS ]
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>

          {/* QRIS Frame */}
          <div className="qris-corner-frame" style={{ width: 180, position: "relative", marginTop: 14, flexShrink: 0 }}>
            <span style={{
              position:      "absolute",
              top:           -11,
              left:          0,
              right:         0,
              fontFamily:    "var(--font-mono)",
              fontSize:      "0.58rem",
              color:         "rgba(232,224,208,0.7)",
              background:    "var(--c-box)",
              padding:       "1px 6px",
              border:        "1px solid rgba(232,224,208,0.2)",
              letterSpacing: "0.1em",
              whiteSpace:    "nowrap",
              textAlign:     "center",
              display:       "block",
            }}>
              NASGOR JAKARTA, MAS UCOK
            </span>
            <span className="qris-corner qris-corner-tl" />
            <span className="qris-corner qris-corner-tr" />
            <span className="qris-corner qris-corner-bl" />
            <span className="qris-corner qris-corner-br" />
            <div style={{
              border:     "1px solid rgba(232,224,208,0.18)",
              background: "var(--c-box)",
              padding:    8,
              boxShadow:  "4px 4px 12px rgba(0,0,0,0.6)",
            }}>
              <div className="relative w-41 h-41">
                <Image
                  src="/img/qris.webp"
                  alt="QRIS Pembayaran"
                  width={164}
                  height={164}
                  quality={100}
                  className="object-contain"
                  style={{ width: "100%", height: "auto" }}
                  priority
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>

    </div>
  );
}