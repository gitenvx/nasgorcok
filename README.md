# 🍳 Nasi Goreng Mamas Ucok

Halo bosku! Kenalin, aku Ucok 'Muhammad Fathuloh' (lahir 1999, biasa dipanggil 'Tulloh'). Sehari-hari aku ini jualan nasi goreng jalanan kaki lima, tapi kebetulan juga nyambi jadi *programmer freelance* (walaupun masih sering *copas* dan terus belajar, hehe).

Repo ini isinya *source code* buat **Web Menu Digital Warung Nasi Goreng** punya aku sendiri. Tema desainnya sengaja aku bikin agak beda, terinspirasi dari antarmuka game Resident Evil (bergaya sinematik, gelap, dan agak *grunge*). Walaupun cuma web warung nasi goreng, tapi teknologinya lumayan kekinian bang: **Next.js 16**, **TailwindCSS v4**, sama **TypeScript**.

---

## ✨ Fitur Keren Warung Ini

- **Background Grid & Salju Pixel** — Latar belakangnya kotak-kotak grid ditambah butiran putih yang kelap-kelip statis.
- **Efek Scanline di H1** — Kalau abang perhatiin judul "NASIGORENG", ada garis *scanline* yang jalan terus dari atas ke bawah.
- **Lirik Audio Real-time** — Begitu pengunjung berinteraksi (nge-klik atau *scroll*), bakal muter lagu lofi/ambience, dan liriknya bakal sinkron per-kata kayak mesin karaoke! Kata yang lagi dinyanyiin bakal nyala merah.
- **QRIS Ala Kamera Polaroid** — Frame buat bayar pakai QRIS aku modif bentuknya kayak kotak bidik kamera di RE9.
- **Dark / Light Mode** — Pengunjung bebas pilih mau tema gelap (standar) atau terang. Warna dan peta Google Maps-nya bakal otomatis nyesuaiin.
- **Galeri Foto Ping-pong** — Ada deretan foto warung/jalanan yang geser sendiri (*scrolling*) super mulus di 60fps.
- **Halaman Blog** — Disediain halaman khusus (`/blog`) buat nulis cerita dan bacotan *markdown* dengan tampilan *code block* estetik ala Carbon.
- **Responsif** — Buka di layar PC/Laptop menunya jejer 3 kolom, buka di HP langsung rapi numpuk ke bawah biar gampang dibaca.
- **Siap Docker & VPS** — *Deploy* gampang banget, udah aku siapin script buat *Nginx* dan *Docker*-nya.

---

## 📁 Ngintip Daleman Project (Struktur)

Buat abang-abang programmer yang penasaran mau ngulik, ini isi dapurnya:

```text
nasgorcok/
├── app/
│   ├── globals.css        ← Semua gaya CSS, animasi, dan variabel warna.
│   ├── layout.tsx         ← Pondasi utama web, metadata SEO, sama favicon.
│   ├── page.tsx           ← Halaman utama warung (nampilin menu).
│   └── blog/              ← Tempat nampilin daftar & isi cerita blog.
│
├── components/
│   ├── AudioAutoplay.tsx  ← Pemutar musik & *trigger* lirik otomatis.
│   ├── KontakColumn.tsx   ← Kolom info kontak + gambar QRIS.
│   ├── LyricsDisplay.tsx  ← Mesin karaokenya (lirik sinkron).
│   ├── MenuColumn.tsx     ← Komponen buat nampilin daftar menu makanan.
│   ├── TickerBar.tsx      ← Teks berjalan di bagian bawah (*footer*).
│   └── MarkdownRenderer.tsx ← Tukang sulap dari *markdown* jadi desain keren.
│
├── lib/
│   ├── menu-data.ts       ← ⭐ BUKA INI KALAU MAU UBAH HARGA/MENU.
│   └── blog.ts            ← Buat ngebaca dan ngambil file *markdown* blog.
│
├── public/
│   ├── audio/             ← Isi lagu mp3 dan file json lirik hasil *generate*.
│   ├── img/               ← Semua foto background, logo, dan QRIS kumpul di sini.
│   └── fonts/             ← Font *grunge* dan monospace kesayangan.
│
├── content/blog/          ← Folder buat nyimpen file-file cerita blog (.md).
├── lirik.py               ← Script Python buat ngubah audio jadi lirik JSON.
└── Dockerfile dll         ← Surat-surat berharga buat keperluan deploy ke VPS.
```

---

## ✏️ Cara Ganti Menu & Harga

Gak perlu pusing bongkar-bongkar kode komponennya bang. Semua data menu, harga, sama info kontak udah aku kumpulin rapi di satu file khusus: **`lib/menu-data.ts`**. 

Tinggal buka file itu, ubah teks atau harganya, simpan, otomatis webnya langsung update!

---

## 🎵 Bikin Lirik Karaoke (Audio Setup)

Aku pakai AI (Whisper) buat ngenalin suara penyanyi dari lagunya, terus dia bakal nge-generate lirik otomatis biar pas sama detiknya. Kalau abang mau ganti lagunya pakai lagu kesukaan abang:

1. Install dulu perlengkapannya (Python):
   ```bash
   pip install openai-whisper
   # Jangan lupa install ffmpeg (wajib) di OS abang.
   ```
2. Ganti file `bg.mp3` yang ada di folder `public/audio/` pakai lagu abang.
3. Jalanin scriptnya:
   ```bash
   python lirik.py
   ```
Tungguin bentar, nanti otomatis file `lyrics.json`-nya ke-update dengan sendirinya! Mantap kan?

---

## 💻 Buat Jalanin di Laptop Abang (Local Dev)

Kalau mau nyoba jalanin dan ngoprek kodenya di laptop sendiri, urutannya gini:

```bash
npm install       # Download semua bumbu dan wajan (dependency)
npm run dev       # Buka warung lokal di http://localhost:3000
npm run build     # Bungkus kode biar padat buat dibawa ke server asli (Production)
```

---

## 🐳 Cara Gampang Deploy ke VPS (Docker)

Kebetulan aku juga nulis script kecil-kecilan buat gampangin *deploy* ke server Ubuntu (VPS):

```bash
# 1. Install Docker dulu di server
curl -fsSL https://get.docker.com | bash
apt install -y docker-compose-plugin git

# 2. Ambil kodenya dari Github abang
git clone https://github.com/USERNAME/nasgorcok.git /var/www/nasgorcok
cd /var/www/nasgorcok

# 3. Nyalain Docker-nya
docker compose up -d --build

# 4. Pasang Nginx + SSL otomatis (Pakai script andalanku)
chmod +x nginx.sh
bash nginx.sh
# Nanti tinggal pencet enter buat pakai domain yang udah abang arahin ke server.
```

Kira-kira begitu bang penjelasan singkat daleman warung digital aku. Kalau ada kode yang berantakan atau *bug*, maklumin aja namanya juga koki nasi goreng yang ngerangkap ngoding. 😂

Semoga *source code* ini bermanfaat, entah buat bahan belajar atau mau dipake buat usaha abang-abang sendiri. **Salam dari dapur Mamas Ucok! 🍽️**
