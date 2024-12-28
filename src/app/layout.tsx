import type { Metadata } from "next";
import localFont from "next/font/local";
// Context
import { ScreenSizeProvider } from "./context/screenSizeContext";
// Components
import Nav from "./components/nav";
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
      <body className={`${urbanist.variable} ${urbanistItalic.variable} ${jetBrainsMono.variable} ${jetBrainsMonoItalic.variable}`}>
        <ScreenSizeProvider>
          <Nav />
          <div style={{ paddingTop: '100px' }}>
            {children}
          </div>
        </ScreenSizeProvider>
      </body>
    </html>
  );
}
