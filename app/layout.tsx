import type { Metadata } from "next";
// @ts-ignore: CSS side-effect import type declarations handled by Next.js
import "./globals.css";

export const metadata: Metadata = {
  title:       "Nasi Goreng Mamas Ucok",
  description: "mENU • nasgorcok.com • Nasi Goreng Mamas Ucok",
  icons: {
  icon:   "/img/logo.png",
  apple:  "/img/logo.png",
  shortcut: "/img/logo.png",
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
        </body>
    </html>
  );
}
