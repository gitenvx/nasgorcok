// components/AboutSection.tsx
/**
 * Komponen About Section yang menampilkan video background dan konten tentang warung
 * Mencakup video latar, overlay, dan teks deskripsi dari ABOUT data
 */
"use client";
import { useRef, useEffect, useState } from "react";
import { ABOUT } from "@/lib/menu-data";

/**
 * Komponen AboutSection - Menampilkan bagian tentang warung dengan video background
 * Terenkapsulasi dalam closed Shadow DOM untuk menghindari deteksi IDM
 * @returns JSX element section dengan video dan konten tentang warung
 */
export default function AboutSection() {
  // Referensi ke element kontainer shadow DOM
  const containerRef = useRef<HTMLDivElement>(null);
  // State untuk tracking apakah video bisa dimuat atau error
  const [hasVideo, setHasVideo] = useState(true);
  // State untuk menyimpan Blob URL video
  const [videoUrl, setVideoUrl] = useState<string>("");

  // Ambil video sebagai Blob untuk menghindari deteksi IDM
  useEffect(() => {
    let active = true;
    let localUrl = "";

    fetch(ABOUT.videoSrc)
      .then((res) => {
        if (!res.ok) throw new Error("Gagal mengambil video");
        return res.blob();
      })
      .then((blob) => {
        if (!active) return;
        localUrl = URL.createObjectURL(blob);
        setVideoUrl(localUrl);
      })
      .catch(() => {
        if (active) setHasVideo(false);
      });

    return () => {
      active = false;
      if (localUrl) {
        URL.revokeObjectURL(localUrl);
      }
    };
  }, []);

  // Memasang video di dalam closed Shadow DOM setelah videoUrl didapatkan
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !videoUrl) return;

    // Bersihkan isi kontainer terlebih dahulu
    container.innerHTML = "";

    // Buat wrapper div yang akan dipasangi shadow root
    // Hal ini agar kita selalu memasang shadow root baru pada elemen wrapper yang baru,
    // menghindari error DOMException karena memanggil attachShadow dua kali pada elemen yang sama.
    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    container.appendChild(wrapper);

    // Attach shadow root dalam mode 'closed' agar extension browser tidak bisa mendeteksinya
    const shadow = wrapper.attachShadow({ mode: "closed" });

    // Buat tag video secara dinamis
    const video = document.createElement("video");
    video.src = videoUrl;
    video.autoplay = true;
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("disableRemotePlayback", "true");
    video.setAttribute("controlsList", "nodownload");

    // Cegah klik kanan/context menu untuk mempersulit interaksi extension
    video.addEventListener("contextmenu", (e) => e.preventDefault());

    // Berikan styling internal di dalam shadow DOM agar video berukuran penuh
    const style = document.createElement("style");
    style.textContent = `
      video {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    `;

    shadow.appendChild(style);
    shadow.appendChild(video);

    // Coba putar video
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.log("Autoplay video dicegah atau gagal:", err);
      });
    }

    const onError = () => setHasVideo(false);
    video.addEventListener("error", onError);

    return () => {
      video.removeEventListener("error", onError);
      if (container) {
        container.innerHTML = "";
      }
    };
  }, [videoUrl]);

  return (
    <section className="about-section">
      {/* ── Video / fallback background ── */}
      <div className="about-bg">
        {hasVideo && videoUrl && (
          <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
        )}
        <div className="about-overlay" />
      </div>

      {/* ── Content ── */}
      <div className="about-content">
        <h2 className="about-title">Tentang</h2>
        <p className="about-tagline re-textbox">{ABOUT.tagline}</p>
        <p className="about-desc">{ABOUT.description}</p>
      </div>
    </section>
  );
}
