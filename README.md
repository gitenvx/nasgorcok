# Nasi Goreng Mamas Ucok — Next.js

Web menu digital terinspirasi desain video.

---

## Asset yang perlu kamu taruh

```
public/
├── img/
│   ├── bg.jpg          ← background utama (foto nasi goreng / texture)
│   ├── qris.png        ← foto QRIS kamu
│   ├── logo.png        ← logo warung kamu (opsional)
│   └── logos/
│       ├── python.png  ← logo Python (sudah punya)
│       ├── nodejs.png
│       ├── ts.png      ← TypeScript
│       ├── git.png
│       ├── github.png
│       ├── docker.png
│       ├── ubuntu.png
│       └── windows.png
└── fonts/
    ├── display.ttf     ← font grunge/display untuk judul
    └── mono.ttf        ← font monospace untuk isi menu
```

> Semua file di `public/` langsung bisa diakses via `/img/...` dan `/fonts/...`

---

## Setup & Run

```bash
# Install dependencies
npm install

# Development (http://localhost:3000)
npm run dev

# Build production
npm run build
npm start
```

---

## Edit konten menu

Semua konten menu, kontak, dan logo diatur dari satu file:

```
lib/menu-data.ts
```

Edit nama warung, item menu, nomor WA, Instagram, dll di sana. Tidak perlu sentuh komponen lain.

---

## Struktur file

```
nasgorcok/
├── app/
│   ├── globals.css     ← font, warna, animasi ticker
│   ├── layout.tsx      ← root layout + metadata
│   └── page.tsx        ← halaman utama
├── components/
│   ├── MenuColumn.tsx  ← kolom menu (nasi goreng / mie)
│   ├── KontakColumn.tsx← kolom kontak + QRIS
│   └── TickerBar.tsx   ← footer ticker scroll
├── lib/
│   └── menu-data.ts    ← ⭐ EDIT INI untuk ubah konten
└── public/
    ├── img/            ← taruh asset di sini
    └── fonts/          ← taruh font di sini
```

---

## Responsive

- **PC / Tablet landscape**: 3 kolom side-by-side
- **Mobile / Tablet portrait**: accordion — tap kolom untuk buka/tutup

---

## Kustomisasi warna

Edit di `app/globals.css` bagian `:root`:

```css
:root {
  --c-void: #0a0a0a;   /* bg fallback */
  --c-ash:  #e8e0d0;   /* warna teks */
  --c-red:  #cc1a1a;   /* aksen merah (RE box, bullet) */
}
```
