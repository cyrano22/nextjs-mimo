
"use client";

import { useEffect } from "react";
import { AuthProvider } from "../contexts/AuthContext";
import AnimatedLayout from "../components/ui/AnimatedLayout";
import MainNavigation from "../components/ui/MainNavigation";
import Footer from "../components/ui/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

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
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          {isAuthPage ? (
            children
          ) : (
            <>
              <MainNavigation />
              <div className="flex-grow pt-20">
                <AnimatedLayout>{children}</AnimatedLayout>
              </div>
              <Footer />
            </>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
