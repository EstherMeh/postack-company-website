import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
  title: "Postack Solutions",
  description: "Powering Convenience, Innovation, and Growth. Postack Solutions delivers innovative digital services, including seamless grocery delivery, web development, and reliable server hosting.",
  keywords: ["web development", "hosting", "digital solutions", "Zambia", "grocery delivery", "technology"],
  authors: [{ name: "Postack Solutions" }],
  creator: "Postack Solutions",
  publisher: "Postack Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/Postack_logo.jpeg",
    apple: "/Postack_logo.jpeg",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: "#ffffff",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <meta name="color-scheme" content="light only" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white`}>
        {children}
      </body>
    </html>
  );
}
