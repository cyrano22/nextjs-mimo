import React from "react";
import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import MainLayout from "../components/layouts/MainLayout";
import { Providers } from "./providers"; // Correction de l'importation sans extension

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
});

// Les métadonnées doivent être exportées d'un composant serveur (sans "use client")
export const metadata: Metadata = {
  title: "NextMimo - Apprenez Next.js de façon interactive",
  description:
    "Application d'apprentissage Next.js interactive et gamifiée, inspirée par Mimo",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap"
        />
      </head>
      <body className={`${inter.variable} ${sourceCodePro.variable} antialiased`}>
        <Providers>
          <MainLayout>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  );
}
