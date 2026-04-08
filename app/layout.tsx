import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Veridian — Compliance API for Fintechs",
  description:
    "KYC identity verification, sanctions screening, and AML compliance via a single REST API. Transparent pricing, no enterprise contracts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" style={{ backgroundColor: '#050a09', color: '#e8f5ef' }}>
        {children}
      </body>
    </html>
  );
}
