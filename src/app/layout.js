"use client";

import { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import AnimatedLayout from "../components/ui/AnimatedLayout";
import { usePathname } from "next/navigation";
import "./globals.css"; // Import des styles Tailwind

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Déterminer si la page actuelle est la page de connexion
  const isAuthPage = pathname === "/login" || pathname === "/register";

  return (
    <html lang="fr">
      <head>
        <title>NextMimo - Apprenez Next.js de façon interactive</title>
        <meta
          name="description"
          content="Application d'apprentissage Next.js interactive et gamifiée, inspirée par Mimo"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>
          {isAuthPage ? children : <AnimatedLayout>{children}</AnimatedLayout>}
        </AuthProvider>
      </body>
    </html>
  );
}
