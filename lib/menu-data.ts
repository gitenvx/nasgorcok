// lib/menu-data.ts
/**
 * File data konfigurasi untuk semua konten halaman utama
 * Berisi: nama warung, menu items, kontak, about, story, dan ticker items
 * EDIT FILE INI untuk mengubah semua konten di halaman
 */

/**
 * Nama warung yang ditampilkan di halaman
 * @const
 */
export const NAMA_WARUNG = "mamas ucok";

/**
 * Array kata/tagline yang ditampilkan di kolom kiri halaman utama
 * Berisi 3 baris teks promosi warung
 * @const
 */
export const KATA = [
  "Nasi goreng kaki lima, dimasak dengan cinta",
  "Buka setiap hari 18:00 - 00:00 WITA",
  "Harga aman merakyat dari rakyat",
  "Jualan kok, liburnya tak menentu"
];

/**
 * Array menu Nasi Goreng dengan berbagai pilihan topping
 * Ditampilkan di kolom kiri halaman utama (desktop) dan mobile
 * @const
 */
export const NASI_GORENG = [
  "telur dadar",
  "telur ceplok",
  "ati ampela",
  "bakso ayam",
  "sosis ayam",
  "pete",
  "mawut (campur mie)",
  "spesial edition",
];

/**
 * Array menu Mie, Capcay, dan Kwetiau dengan berbagai pilihan topping
 * Ditampilkan di kolom tengah halaman utama (desktop) dan mobile
 * @const
 */
export const MIE_CAPCAY = [
  "goreng / kuah",
  "telur dadar",
  "telur ceplok",
  "ati ampela",
  "bakso ayam",
  "sosis ayam",
  "pete",
  "spesial edition",
];

/**
 * Object berisi data kontak warung
 * Mencakup WhatsApp, Instagram, Telegram, Website, Alamat, dan Email
 * Ditampilkan di kolom kanan halaman utama
 * @const
 */
export const KONTAK = {
  whatsapp:  "0816-1999-248",
  instagram: "@nasgorcokcom",
  telegram: "@nasgorcok",
  website:   "https://nasgorcok.com",
  email: "admin@nasgorcok.com"
};

/**
 * Object berisi data About section warung
 * Mencakup tagline, deskripsi, dan video background source
 * Ditampilkan di bagian About section halaman utama
 * @const
 */
export const ABOUT = {
  tagline: "Nasi goreng kaki lima. Dimasak dengan cinta.",
  description:
    "Warung Nasi Goreng Mamas Ucok hadir membawa cita rasa autentik nasi goreng kaki lima yang diracik dengan bumbu rahasia turun-temurun. " +
    "Setiap 10 porsi dimasak langsung di wajan panas dengan api besar, menghasilkan aroma smoky yang khas dan rasa yang bikin nagih. " +
    "Buka setiap malam mulai pukul 18:00 hingga tengah malam, siap menemani lapar malammu dengan harga yang merakyat.",
  videoSrc: "/video/about_bg.webm",
};

/**
 * Array item yang ditampilkan di ticker/scrolling footer
 * Berisi informasi, promo, dan tagline warung
 * Menampilkan teks yang bergulir terus-menerus di bawah halaman
 * @const
 */
export const TICKER_ITEMS = [
  "Dibuat dengan cinta oleh MFA",
  "udah isi ayam swear",
  "harga inbox",
  "100% halal",
  "sangqyu (nada goku)",
  "kalian luarbiasa",
  "indonesia emas 2045",
  "localhost:3000"
];


/**
 * Object berisi data Story section dengan array slide carousel
 * Setiap slide memiliki: image, chapter, heading, dan description (3 baris)
 * Ditampilkan di bagian Story section halaman utama dengan carousel interaktif
 * @const
 */
export const STORY = {
  title: "Story",
  desc: [
    "Hello world, aku Ucok 'Muhammad Fathuloh', lahir tahun 1999, bisa dipanggil 'Tulloh' juga.",
    "Aku adalah koki nasi goreng jalanan kaki lima, sekaligus programmer freelance yang cupu masih belajar, di bidang bot Telegram dan Website.",
    "Aku memutuskan berhenti sekolah lalu diajak sepupu ikut jualan nasi goreng, setelah punya ilmu dan modal akupun sekarang bisa punya warung nasgor sendiri.",
    "Aku belajar koding secara otodidak, menonton tutorial, membaca dokumentasi, hobi yang tidak disengaja karena waktu itu aku hampir stress ditolak cewek yang aku cintai.",
    "Cerita lengkapnya mungkin nanti aku tulis di dalam Blog disini."
  ],
  slides: [
    { img: "/img/story/story-1.webp" },
    { img: "/img/story/story-2.webp" },
    { img: "/img/story/story-3.webp" },
    { img: "/img/story/story-4.webp" },
    { img: "/img/story/story-5.webp" },
  ],
};

/**
 * Object berisi data Lokasi section
 * @const
 */
export const LOCATION_DATA = {
  title: "Location",
  lokasi: "-8.618119,115.240907",
  description: "Lapak saya sekarang di depan Indomaret, lokasi lengkapnya bisa cari kordinat ini di Google Maps!",
  images: [
    "/img/story/story-1.webp",
    "/img/story/story-2.webp",
    "/img/story/story-3.webp",
    "/img/story/story-4.webp",
    "/img/story/story-5.webp",
  ]
};
