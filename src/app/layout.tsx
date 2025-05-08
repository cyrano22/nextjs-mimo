import React from "react";
import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import ClientLayout from "../components/layouts/ClientLayout";

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
    <html lang="fr">
      <body
        className={`${inter.variable} ${sourceCodePro.variable} antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
