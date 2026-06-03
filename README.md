# 🍳 Nasi Goreng Mamas Ucok

Web menu digital warung nasi goreng, terinspirasi desain sinematik Resident Evil Requiem.
Built with **Next.js 15** + **TailwindCSS v4** + **TypeScript**.

---

## ✨ Fitur

- **Opening animation** — judul glitch masuk per-huruf, RE box reveal merah, kolom fade-up bertahap
- **Scratch overlay** — goresan putih SVG pure CSS, animasi reveal + flicker terus-menerus
- **BG Grid + Pixel Snow** — grid kotak + butiran putih kelap-kelip
- **H1 Scanline effect** — highlight sweep + scanline bergerak di judul
- **Red dot pulse** — titik merah animasi pulse + glow di tiap item menu
- **Menu underline hover** — underline muncul dari kiri, hilang dari kanan
- **Audio autoplay** — musik background, play saat interaksi pertama user
- **Lyrics sync** — lirik real-time sinkron audio, kata aktif highlight merah + glow
- **QRIS frame** — border kamera/polaroid ala RE9 dengan label pojok
- **Ticker footer** — scrolling text + copyright auto-update tahun
- **Dark/Light Mode** — switch tema (sun/moon toggle), warna & peta auto adapt
- **Interactive Maps** — embed Google Maps iframe langsung
- **Ticker Gallery** — galeri foto lokasi jalan otomatis (60fps ping-pong smooth)
- **Responsive** — PC = 3 kolom, Mobile = stack langsung (tanpa accordion)
- **react-icons** — semua brand logo tanpa file PNG
- **Docker ready** — multi-stage build, Heroku + VPS support

---

## 📁 Struktur Project

```
nasgorcok/
├── app/
│   ├── globals.css        ← semua CSS: variabel, animasi, komponen
│   ├── layout.tsx         ← root layout + metadata + favicon
│   └── page.tsx           ← halaman utama
│
├── components/
│   ├── AudioAutoplay.tsx  ← audio bg + trigger lyrics
│   ├── CrackOverlay.tsx   ← SVG scratch/goresan overlay
│   ├── KontakColumn.tsx   ← kontak + QRIS frame
│   ├── LyricsDisplay.tsx  ← lirik sinkron real-time
│   ├── MenuColumn.tsx     ← kolom menu reusable
│   └── TickerBar.tsx      ← footer ticker + copyright
│
├── lib/
│   └── menu-data.ts       ← ⭐ EDIT INI untuk ubah semua konten
│
├── public/
│   ├── audio/
│   │   ├── bg.mp3         ← file audio background
│   │   └── lyrics.json    ← hasil generate dari lirik.py (auto)
│   ├── img/
│   │   ├── bg.jpg         ← background utama
│   │   ├── btn-bg.png     ← background box "mamas ucok" + header menu
│   │   └── qris.png       ← foto QRIS
│   └── fonts/
│       ├── display.ttf    ← font grunge judul NASIGORENG
│       └── mono.ttf       ← font monospace isi menu
│
├── lirik.py               ← script generate lyrics.json dari audio
├── Dockerfile             ← multi-stage build
├── docker-compose.yml     ← VPS deploy
├── nginx.sh               ← 1-command Nginx + SSL setup
├── heroku.yml             ← Heroku container deploy
├── start.sh               ← entry point container
└── next.config.ts         ← output standalone
```

---

## 🎨 Asset yang perlu disiapkan

```
public/
├── img/
│   ├── bg.jpg        ← foto nasi goreng / texture gelap
│   ├── btn-bg.png    ← gambar background box teks (distretch 100%)
│   └── qris.png      ← foto QRIS pembayaran
└── fonts/
    ├── display.ttf   ← font grunge untuk judul besar
    └── mono.ttf      ← font monospace untuk isi menu
```

> **btn-bg.png** → gambar yang di-stretch jadi background box "mamas ucok"
> dan semua header `[ Nasi Goreng ]`, `[ Mie ]`, `[ Kontak ]`

---

## ✏️ Edit Konten Menu

Semua konten ada di **satu file**: `lib/menu-data.ts`

```ts
export const NAMA_WARUNG = "mamas ucok";

export const NASI_GORENG = [
  "telur dadar",
  "telur ceplok",
  // tambah item di sini
];

export const KONTAK = {
  whatsapp:  "0851-8300-9087",
  instagram: "@gitenvx",
  website:   "nasgorcok.com",
};

export const TICKER_ITEMS = [
  "> udah isi ayam swear",
  "harga inbox",
  // tambah teks ticker di sini
];
```

---

## 🎵 Setup Lirik Audio

Install dependensi:
```bash
pip install openai-whisper
```

Install ffmpeg (wajib):
```bash
# Windows
winget install ffmpeg

# Ubuntu
apt install ffmpeg
```

Jalankan transcribe:
```bash
python lirik.py
```

Output: `public/audio/lyrics.json` — timestamp per kata, otomatis disync ke audio.

---

## 🔧 Kustomisasi Tampilan

### Warna — `app/globals.css`
```css
:root {
  --c-void:   #0a0a0a;   /* background utama */
  --c-ash:    #e8e0d0;   /* warna teks */
  --c-red:    #cc1a1a;   /* aksen merah */
  --c-border: rgba(232, 224, 208, 0.18);
}
```

### Grid background — keliatan/samar
```css
.bg-grid {
  background-image:
    linear-gradient(rgba(255,255,255,0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.10) 1px, transparent 1px);
}
```
Naikkan `0.10` untuk lebih keliatan, turunkan untuk lebih samar.

### Volume audio — `components/AudioAutoplay.tsx`
```ts
audio.volume = 0.45;  // 0.0 sampai 1.0
```

### Jumlah kata lirik — `components/LyricsDisplay.tsx`
```ts
const BEFORE = 3;  // kata sebelum aktif
const AFTER  = 4;  // kata sesudah aktif
```

### Logo tech (react-icons) — `app/page.tsx`
```tsx
import { SiPython, SiDocker, SiRust } from "react-icons/si"
import { FaWindows, FaApple }          from "react-icons/fa"
```
Cari semua icon: https://react-icons.github.io/react-icons/

---

## 💻 Development Lokal

```bash
npm install
npm run dev       # → http://localhost:3000
npm run build     # build production
npm start         # jalankan production
```

---

## 🐳 Deploy VPS + Docker

### Persiapan VPS (Ubuntu 24.04)

```bash
curl -fsSL https://get.docker.com | bash
apt install -y docker-compose-plugin git
```

### Clone & jalankan

```bash
git clone https://github.com/USERNAME/nasgorcok.git /var/www/nasgorcok
cd /var/www/nasgorcok
docker compose up -d --build
```

### Setup Nginx + SSL — 1 command

```bash
chmod +x nginx.sh
bash nginx.sh
# enter = pakai domain default nasgorcok.com
```

Script otomatis install Nginx, buat config, setup SSL Let's Encrypt, reload.

### Firewall

```bash
ufw allow 22    # SSH
ufw allow 80    # HTTP
ufw allow 443   # HTTPS
ufw deny 3000   # blokir akses langsung ke container
ufw enable
```

### Update kode

```bash
cd /var/www/nasgorcok
git pull
docker compose up -d --build
```

---

## ☁️ Deploy Heroku

```bash
heroku login
heroku create nasgorcok
heroku stack:set container
git push heroku main
heroku logs --tail
```

---

## 🌐 Cloudflare DNS

| Type | Name | Value | Proxy |
|------|------|-------|-------|
| A | `@` | `IP_VPS` | DNS Only dulu (abu) |
| A | `www` | `IP_VPS` | DNS Only dulu (abu) |

Setelah SSL selesai → nyalakan proxy (oranye) → SSL/TLS → **Full (strict)**.

---

## 🏗️ Arsitektur

```
Internet
    ↓
Cloudflare (CDN + DDoS protection)
    ↓
Nginx host (port 80/443 + SSL)
    ↓
Docker container (127.0.0.1:3000, tidak expose publik)
    ↓
Next.js standalone
```


