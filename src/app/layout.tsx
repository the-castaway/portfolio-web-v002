import type { Metadata } from "next";
import localFont from "next/font/local";
// Context
import { ScreenSizeProvider } from "./context/screenSizeContext";
// Styles
import "./styles/global.css";

// Fonts
const urbanist = localFont({
  src: "./fonts/Urbanist-VariableFont_wght.ttf",
  variable: "--font-urbanist",
  weight: "100 200 300 400 500 600 700 800 900",
});
const urbanistItalic = localFont({
  src: "./fonts/Urbanist-Italic-VariableFont_wght.ttf",
  variable: "--font-urbanist-italic",
  weight: "100 200 300 400 500 600 700 800 900",
});
const jetBrainsMono = localFont({
  src: "./fonts/JetBrainsMono-VariableFont_wght.ttf",
  variable: "--font-jetbrains-mono",
  weight: "100 200 300 400 500 600 700 800 900",
});
const jetBrainsMonoItalic = localFont({
  src: "./fonts/JetBrainsMono-Italic-VariableFont_wght.ttf",
  variable: "--font-jetbrains-mono-italic",
  weight: "100 200 300 400 500 600 700 800 900",
});

// Metadata
export const metadata: Metadata = {
  title: "Jaime Castaneda | 2025 Folio",
  description: "Product Designer with a strong technical background, taking products from 0 to 1 by bridging design and engineering to create intuitive, high-impact experiences.",
  icons: "/media/favicon.ico",
  openGraph: { images: "/media/og.webp" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${urbanist.variable} ${urbanistItalic.variable} ${jetBrainsMono.variable} ${jetBrainsMonoItalic.variable}`}>
        <ScreenSizeProvider>
          {children}
        </ScreenSizeProvider>
      </body>
    </html>
  );
}
