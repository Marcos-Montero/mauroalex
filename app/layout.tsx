import "./globals.css";

import { Suspense } from "react";

import { YoutubeIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

import { Toaster } from "@/components/ui/sonner";

import { Nav } from "./components/nav";
import { inter } from "./fonts";

export const metadata: Metadata = {
  title: "Mauro Alex",
  description: "Blog de calistenia de Mauro Alex",
};
export const Footer = () => {
  return (
    <footer className="flex justify-between items-center h-16 bg-black/50 text-white px-8">
      <p>© 2021 Mauro Alex</p>
      <div className="relative h-8 w-8 hover:blure-none hover:scale-105">
        <div className="top-0 l-0absolute bg-red-600 rounded-full h-8 w-8 blur-sm"></div>
        <Link
          href="https://www.youtube.com/@mauroalexx"
          target="_blank"
          className="absolute top-[12%] left-[12%]"
        >
          <YoutubeIcon className="h-6 w-6" fill="transparent" />
        </Link>
      </div>
    </footer>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col overflow-hidden">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
        <Footer />
        <Toaster />
      </body>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
        crossOrigin="anonymous"
      />
    </html>
  );
}
