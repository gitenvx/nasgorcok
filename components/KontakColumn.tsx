// components/KontakColumn.tsx
"use client";
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaGlobe } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { KONTAK } from "@/lib/menu-data";

export default function KontakColumn() {
  return (
    <div className="col-divider flex flex-col py-4 px-4 md:px-5">

      <div className="menu-header btn-bg mb-3 hover-text" style={{ display: "block", width: "100%", textAlign: "center" }}>
        [ Kontak ]
      </div>

      <div className="space-y-1 mb-4 hover-text">
        <div className="kontak-row">
          <FaWhatsapp className="shrink-0 opacity-80" style={{ fontSize: "1em" }} />
          <span>{KONTAK.whatsapp}</span>
        </div>
        <div className="kontak-row">
          <FaInstagram className="shrink-0 opacity-80" style={{ fontSize: "1em" }} />
          <span>{KONTAK.instagram}</span>
        </div>
        <div className="kontak-row">
          <FaGlobe className="shrink-0 opacity-80" style={{ fontSize: "1em" }} />
          <span>{KONTAK.website}</span>
        </div>
        <div className="kontak-row">
          <CiLocationOn className="shrink-0 opacity-80" style={{ fontSize: "1em" }} />
          <span>{KONTAK.alamat}</span>
        </div>
      </div>

      {/* QRIS */}
      <div className="qris-box mt-auto">
        <div
          className="menu-header btn-bg mb-3 hover-text"
          style={{ display: "block", width: "100%", textAlign: "center" }}
        >
          [ Pembayaran QRIS ]
        </div>

        {/* Frame QRIS dengan hover glow di sudut */}
        <div className="qris-corner-frame" style={{ width: 180, position: "relative", marginTop: 14 }}>

          {/* Label atas — sejajar dengan frame, tidak overflow */}
          <span style={{
            position:    "absolute",
            top:         -11,
            left:        0,
            right:       0,
            fontFamily:  "var(--font-mono)",
            fontSize:    "0.58rem",
            color:       "rgba(232,224,208,0.7)",
            background:  "rgba(10,10,10,0.9)",
            padding:     "1px 6px",
            border:      "1px solid rgba(232,224,208,0.2)",
            letterSpacing: "0.1em",
            whiteSpace:  "nowrap",
            textAlign:   "center",
            display:     "block",
          }}>
            NASGOR JAKARTA, MAS UCOK
          </span>

          {/* Corner TL */}
          <span className="qris-corner qris-corner-tl" />
          {/* Corner TR */}
          <span className="qris-corner qris-corner-tr" />
          {/* Corner BL */}
          <span className="qris-corner qris-corner-bl" />
          {/* Corner BR */}
          <span className="qris-corner qris-corner-br" />

          {/* Gambar */}
          <div style={{
            border:     "1px solid rgba(232,224,208,0.18)",
            background: "rgba(10,10,10,0.8)",
            padding:    8,
            boxShadow:  "4px 4px 12px rgba(0,0,0,0.6)",
          }}>
            <div style={{ position: "relative", width: 164, height: 164 }}>
              <Image
                src="/img/qris.webp"
                alt="QRIS Pembayaran"
                fill
                className="object-contain"
                sizes="164px"
                priority
              />
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}