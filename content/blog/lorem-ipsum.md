---
title: "Panduan Markdown & Contoh Elemen (Lorem Ipsum)"
date: "2026-06-05"
description: "Artikel uji coba untuk mendemonstrasikan bagaimana berbagai elemen Markdown (heading, list, quote, code) dirender di dalam blog Nasi Goreng Mamas Ucok."
---

# Heading 1: Panduan Utama

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.

## Heading 2: Sub-Bagian

Ini adalah contoh paragraf biasa yang menjelaskan suatu hal. Di dalam paragraf ini, terdapat teks yang **dicetak tebal (bold)** dan juga teks yang *dicetak miring (italic)*. Bahkan ada juga [contoh tautan/link](https://github.com) untuk mengarahkan pengguna ke halaman lain.

### Heading 3: Detail Lebih Lanjut

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.

**Contoh Daftar Tidak Berurut (Unordered List):**
- Bawang merah dan putih
- Cabai rawit ekstra pedas
- Kecap manis legendaris
- Telur mata sapi setengah matang

**Contoh Daftar Berurut (Ordered List):**
1. Panaskan wajan dan tuang sedikit minyak.
2. Tumis bumbu halus sampai harum.
3. Masukkan nasi putih, aduk rata.
4. Tambahkan kecap dan bumbu rahasia.

---

## Elemen Khusus (Quote & Code)

Untuk menekankan pesan penting, kita bisa menggunakan format blok kutipan (*blockquote*):

> "Rahasia utama dari sepiring nasi goreng yang enak bukan hanya pada bumbunya, tetapi pada besarnya api dan ayunan wajan yang konsisten." 
> — *Mamas Ucok, Master Chef Denpasar*

Bagi teman-teman *developer*, ini adalah contoh bagaimana blok kode (Code Block) ditampilkan dalam artikel:

```javascript
// Fungsi untuk memvalidasi pesanan nasi goreng
function pesanNasiGoreng(levelPedas, pakaiTelur) {
  if (levelPedas > 10) {
    console.warn("AWAS: Level pedas ini hanya untuk profesional!");
  }
  
  return {
    menu: "Nasi Goreng Spesial",
    spicyLevel: levelPedas,
    egg: pakaiTelur ? "Mata Sapi" : "Tanpa Telur",
    status: "Sedang Dimasak..."
  };
}

const pesananSaya = pesanNasiGoreng(15, true);
console.log(pesananSaya);
```

Untuk *inline code*, kita juga bisa menyorot teks seperti `npm run dev` atau `console.log("Hello")` di tengah kalimat biasa.

Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
