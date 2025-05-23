// src/app/layout.tsx
import React from 'react';
import type { Metadata } from 'next';
import { Inter, Source_Code_Pro, Fira_Code } from 'next/font/google';
import './globals.css';
import MainLayout from '../components/layouts/MainLayout';
import { Providers } from './providers';

const inter = Inter({
  variable: '--font-sans',
  subsets: ['latin'],
});

const sourceCodePro = Source_Code_Pro({
  variable: '--font-mono',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--font-code',
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NextMimo - Apprenez Next.js de façon interactive',
  description: 'Application d\'apprentissage Next.js interactive et gamifiée, inspirée par Mimo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${sourceCodePro.variable} ${firaCode.variable}`}>
      <body className="antialiased">
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}