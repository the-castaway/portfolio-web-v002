import type { Metadata } from "next";
import localFont from "next/font/local";
import "./styles/globals.css";
import Link from 'next/link';
import { Suspense } from "react";
import Loading from "./loader";
import Navigation from "./components/nav";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Jaime Castaneda | 2025 Folio",
  description: "A Bay Area-based creative whose strategy and design come together to shape inspiring projects that resonate with our time.",
  icons: "/media/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div>LAYOUT</div>
        <Navigation />
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/archive">Archive</Link>
        {children}
      </body>
    </html>
  );
}
