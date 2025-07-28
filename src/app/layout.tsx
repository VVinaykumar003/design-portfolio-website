// src/app/layout.tsx
import './globals.css';
import { ReactNode } from 'react';
import { Inter } from 'next/font/google'; // or any font
// import Navbar from './user/components/Navbar';
// import { usePathname } from 'next/navigation';
import { Metadata } from 'next';
import ClientWrapper from './ClientWrapper';

export const metadata: Metadata = {
  title: 'My App',
  description: 'Admin + User App',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  // This hook doesn't work directly in layout.tsx
  // So use a workaround below
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientWrapper>{children}</ClientWrapper>
      </body>
    </html>
  );
}
