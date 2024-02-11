import './globals.css';

import type { Metadata } from 'next';

import { Nav } from './components/nav';
import { Victor_Mono } from './fonts';

export const metadata: Metadata = {
  title: "Hanma Club",
  description: "Club for Hanma blooded people",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={Victor_Mono.className}>
      <body className="fle flex-col overflow-hidden">
        <Nav />
        {children}
      </body>
    </html>
  );
}
