"use client"
import "@/styles/globals.css";

import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});



export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en" className="h-full bg-white">
        <body className={`font-sans ${inter.variable} h-full`}>{children}</body>
      </html>
  );
}
