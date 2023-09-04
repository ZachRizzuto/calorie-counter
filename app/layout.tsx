"use client";
import { LogProvider } from "@/Components/Providers/LogProvider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Parry",
  description: "Counter those calories!",
  icons:
    "https://as1.ftcdn.net/v2/jpg/02/22/72/16/1000_F_222721696_pBZvmzx6hW6hHHlV8K2KA0tLS2qVzwvf.jpg",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <LogProvider>
        <body className={inter.className}>{children}</body>
      </LogProvider>
    </html>
  );
}
