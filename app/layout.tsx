// app/layout.tsx
/**
 * Layout Root untuk aplikasi Next.js
 * Setup metadata SEO, integration dengan Vercel analytics, dan global styling
 */
import type { Metadata } from "next";
// @ts-ignore: CSS side-effect import type declarations handled by Next.js
import "./globals.css";
import "@/lib/self-ping";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

/**\n * Metadata untuk SEO dan Open Graph
n * Mencakup title, description, keywords, robots config, dan OpenGraph settings
 */
export const metadata: Metadata = {
  title:       "Nasi Goreng Mamas Ucok",
  description: "Nasi Goreng Mamas Ucok, nasi goreng yang dibuat dengan cinta oleh Mohammad Fathuloh, berlokasi di Denpasar Bali.",
  keywords: ['nasigoreng', 'nasi goreng', 'mohammadfathuloh'],
  icons: {
  icon:   "/img/logo.png",
  apple:  "/img/logo.png",
  shortcut: "/img/logo.png",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Nasi Goreng Mamas Ucok',
    description: 'Nasi Goreng Mamas Ucok, nasi goreng yang dibuat dengan cinta oleh Mohammad Fathuloh, berlokasi di Denpasar Bali.',
    url: 'https://nasgorcok.com',
    siteName: 'Nasi Goreng Mamas Ucok',
    images: [
      {
        url: 'https://nasgorcok.com/img/logo/nasgor.webp',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

/**
 * Komponen RootLayout - Root layout untuk semua halaman
 * Setup HTML lang, body className, dan render children dengan analytics
 * @param children - React component yang akan di-render di dalam body
 * @returns JSX element html dengan structure lengkap
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen overflow-x-hidden">
        <div className="film-grain" aria-hidden="true" />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
