// components/CookieConsent.tsx
/**
 * Komponen Cookie Consent dengan tema retro Resident Evil (Survival Protocol)
 * Menampilkan peringatan bergaya terminal ketik (typewriter) saat pertama kali berkunjung
 * Menyimpan status persetujuan di localStorage browser
 */
"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  // State untuk menampilkan/menyembunyikan banner
  const [visible, setVisible] = useState(false);
  // State untuk melacak teks mesin ketik yang sedang berjalan
  const [text, setText] = useState("");
  // Teks peringatan yang akan ditampilkan secara berurutan
  const fullText = "SYSTEM MESSAGE: WE USE COOKIES TO ENSURE YOUR BROWSING EXPERIENCE IS OPTIMIZED. PROTOCOL REQUIRES USER CONSENT.";

  useEffect(() => {
    // Periksa apakah pengguna sudah pernah merespon
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      // Berikan delay 1.5 detik untuk menambah sensasi dramatis retro
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Efek typewriter mengetik teks secara bertahap dan aman dari double-effect render
  useEffect(() => {
    if (!visible) return;
    let index = 0;
    let timerId: NodeJS.Timeout;

    const typeWriter = () => {
      if (index < fullText.length) {
        setText(fullText.substring(0, index + 1));
        index++;
        timerId = setTimeout(typeWriter, 25);
      }
    };

    timerId = setTimeout(typeWriter, 25);
    return () => clearTimeout(timerId);
  }, [visible]);

  // Fungsi saat menyetujui cookie
  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  // Fungsi saat menolak cookie
  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: "80px", // Ditempatkan pas di atas ticker bar footer
        left: "50%",
        transform: "translateX(-50%)",
        width: "calc(100% - 20px)",
        maxWidth: "480px",
        background: "rgba(10, 10, 10, 0.65)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid var(--c-border, #cca266)",
        padding: "16px",
        color: "var(--c-ash, #e8e0d0)",
        fontSize: "12px",
        zIndex: 50,
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.8), inset 0 0 10px rgba(232, 224, 208, 0.05)",
        borderRadius: "0px",
        transition: "all 0.5s ease",
      }}
    >
      {/* SYSTEM MESSAGE Header dengan indikator LED hijau berdenyut */}
      <div
        style={{
          color: "var(--c-border, #cca266)",
          fontWeight: "bold",
          letterSpacing: "0.15em",
          marginBottom: "10px",
          borderBottom: "1px solid rgba(232, 224, 208, 0.2)",
          paddingBottom: "6px",
          display: "flex",
          alignItems: "center",
          gap: "8px",
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: "8px",
            height: "8px",
            background: "#00ff66",
            borderRadius: "50%",
            boxShadow: "0 0 6px #00ff66",
            animation: "pulse-led 1s infinite alternate",
          }}
        />
        [ SYSTEM MESSAGE: COOKIES REQUESTED ]
      </div>

      {/* Bidang teks typewriter */}
      <p
        style={{
          minHeight: "36px",
          lineHeight: "1.6",
          letterSpacing: "0.05em",
          margin: "0 0 16px 0",
          textTransform: "uppercase",
          color: "rgba(232, 224, 208, 0.85)",
        }}
      >
        {text}
        <span
          style={{
            animation: "blink-cursor 0.8s infinite",
            fontWeight: "bold",
            color: "var(--c-border, #cca266)",
          }}
        >
          _
        </span>
      </p>

      {/* Baris pilihan tombol aksi */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "16px" }}>
        <button
          onClick={handleDecline}
          style={{
            background: "transparent",
            border: "1px solid rgba(232, 224, 208, 0.5)",
            color: "rgba(232, 224, 208, 0.8)",
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: "11px",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.1em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 8px rgba(232, 224, 208, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          [ DECLINE ]
        </button>
        <button
          onClick={handleAccept}
          style={{
            background: "transparent",
            border: "1px solid #00ff66",
            color: "#00ff66",
            padding: "6px 12px",
            cursor: "pointer",
            fontSize: "11px",
            fontWeight: "bold",
            fontFamily: "var(--font-mono, monospace)",
            letterSpacing: "0.1em",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 0 10px rgba(0, 255, 102, 0.35)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          [ ACCEPT ]
        </button>
      </div>

      {/* Inject css animasi global */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes pulse-led {
            0% { opacity: 0.3; transform: scale(0.95); }
            100% { opacity: 1; transform: scale(1.05); }
          }
          @keyframes blink-cursor {
            50% { opacity: 0; }
          }
        `,
        }}
      />
    </div>
  );
}
