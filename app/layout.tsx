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
import BackToTop from "@/components/BackToTop";
import NextTopLoader from 'nextjs-toploader';

/**\n * Metadata untuk SEO dan Open Graph
n * Mencakup title, description, keywords, robots config, dan OpenGraph settings
 */
export const metadata: Metadata = {
  title:       "Nasi Goreng Mamas Ucok",
  description: "Nasi Goreng Mamas Ucok, nasi goreng yang dibuat dengan cinta oleh Mohammad Fathuloh, berlokasi di Denpasar Bali.",
  keywords: ['nasigoreng', 'nasi goreng', 'mohammadfathuloh'],
  icons: {
  icon:   "/img/favicon/logo.png",
  apple:  "/img/favicon/logo.png",
  shortcut: "/img/favicon/logo.png",
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
      <head>
        {/* Preload background images */}
        <link rel="preload" href="/img/common/bg/bg.webp" as="image" type="image/webp" />
        <link rel="preload" href="/img/common/bg/btn-bg.webp" as="image" type="image/webp" />
        {/* Preload logos */}
        <link rel="preload" href="/img/logo/nasgor.webp" as="image" type="image/webp" />
        {/* Preload custom fonts */}
        <link rel="preload" href="/fonts/re9_big.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/re9_small.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen overflow-x-hidden relative">
        {/* Progress Bar Khusus Initial Load */}
        <div id="initial-loader" suppressHydrationWarning style={{ position: 'fixed', top: 0, left: 0, height: '3px', background: 'var(--c-red)', zIndex: 99999, width: '0%', transition: 'width 0.5s ease-out, opacity 0.3s', boxShadow: '0 0 10px var(--c-red), 0 0 5px var(--c-red)' }} />
        <script dangerouslySetInnerHTML={{ __html: `
          (function() {
            var loader = document.getElementById('initial-loader');
            if (loader) {
              loader.style.width = '30%';
              var slowLoad = setTimeout(function() { loader.style.width = '70%'; }, 500);
              window.addEventListener('load', function() {
                clearTimeout(slowLoad);
                loader.style.width = '100%';
                setTimeout(function() { loader.style.opacity = '0'; }, 400);
              });
            }
          })();
        `}} />
        
        <NextTopLoader color="var(--c-red)" showSpinner={false} height={3} shadow="0 0 10px var(--c-red),0 0 5px var(--c-red)" />
        <div className="film-grain" aria-hidden="true" />
        {children}
        <BackToTop />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
