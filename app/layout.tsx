import './globals.css';

import { Suspense } from 'react';

import type { Metadata } from 'next';

import { Nav } from './components/nav';
import { Victor_Mono } from './fonts';

export const metadata: Metadata = {
  title: "Mauro Alex",
  description: "Blog de calistenia de Mauro Alex",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Victor_Mono.className}>
      <body className="fle flex-col overflow-hidden">
        <Suspense>
          <Nav />
        </Suspense>
        {children}
      </body>
      <script
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_GOOGLE_ADS_CLIENT_ID}`}
        crossOrigin="anonymous"
      />
    </html>
  );
}
