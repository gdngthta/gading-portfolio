import type { Metadata } from "next";
import { Cormorant_Garamond, Inter, Space_Mono } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const spaceMono = Space_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Gading Tahta Widi — Software Engineering Portfolio",
  description:
    "Portfolio of Gading Tahta Widi, a Software Engineering student at Universiti Malaya focused on frontend, mobile apps, and practical software products.",
  keywords: [
    "portfolio",
    "software engineering",
    "frontend",
    "React",
    "Next.js",
    "TypeScript",
    "React Native",
    "mobile",
    "Universiti Malaya",
    "internship",
  ],
  authors: [{ name: "Gading Tahta Widi", url: "https://github.com/gdngthta" }],
  openGraph: {
    title: "Gading Tahta Widi — Software Engineering Portfolio",
    description:
      "Portfolio of Gading Tahta Widi, a Software Engineering student at Universiti Malaya focused on frontend, mobile apps, and practical software products.",
    type: "website",
    locale: "en_US",
    siteName: "GTW Records",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gading Tahta Widi — Software Engineering Portfolio",
    description:
      "Portfolio of Gading Tahta Widi, a Software Engineering student at Universiti Malaya focused on frontend, mobile apps, and practical software products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${spaceMono.variable} h-full`}
    >
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
