// components/KontakColumn.tsx
import Image from "next/image";
import { FaWhatsapp, FaInstagram, FaGlobe } from "react-icons/fa";
import { CiLocationOn } from "react-icons/ci";
import { KONTAK } from "@/lib/menu-data";

export default function KontakColumn() {
  return (
    <div className="col-divider flex flex-col py-4 px-4 md:px-5">

      {/* Header pakai btn-bg */}
      <div className="menu-header btn-bg mb-3 hover-text">[ Kontak ]</div>

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
      <div className="qris-box mt-auto hover-text">
        <div className="btn-bg mb-3 mx-1" style={{textAlign: "left", color: "black", padding: "5px", marginLeft: "-10px"}}>
          [ Pembayaran QRIS ]
        </div>

        {/* Ganti div image biasa jadi qris-frame */}
        <div className="qris-frame relative max-w-40 mx-auto">

          {/* Sudut kanan atas */}
          <span style={{
            position: "absolute", top: -1, right: -1,
            width: 14, height: 14,
            borderTop: "2px solid rgba(232,224,208,0.5)",
            borderRight: "2px solid rgba(232,224,208,0.5)",
          }} />

          {/* Sudut kiri bawah */}
          <span style={{
            position: "absolute", bottom: -1, left: -1,
            width: 14, height: 14,
            borderBottom: "2px solid rgba(232,224,208,0.5)",
            borderLeft: "2px solid rgba(232,224,208,0.5)",
          }} />

          {/* Label nama di pojok kanan atas — ala "Grace Ashcroft" */}
          <span style={{
            position:   "absolute",
            top:        -10,
            right:      2,
            fontFamily: "var(--font-mono)",
            fontSize:   "0.6rem",
            color:      "rgba(232,224,208,0.7)",
            background: "rgba(10,10,10,0.9)",
            padding:    "1px 5px",
            border:     "1px solid rgba(232,224,208,0.2)",
            letterSpacing: "0.1em",
            whiteSpace: "nowrap",
          }}>
            NASGOR JAKARTA, MAS UCOK
          </span>

          <div className="relative aspect-square">
            <Image
              src="/img/qris.webp"
              alt="QRIS Pembayaran"
              fill
              className="object-contain p-1"
              sizes="160px"
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
