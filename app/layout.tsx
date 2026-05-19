import type { Metadata } from "next";
// @ts-ignore: CSS side-effect import type declarations handled by Next.js
import "./globals.css";
import "@/lib/self-ping";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        url: 'https://nasgorcok.com//img/logo/nasgor.webp',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="min-h-screen overflow-x-hidden">
        {children}
        <SpeedInsights />
        </body>
    </html>
  );
}
