
"use client";

import './globals.css';
import Footer from '../components/ui/Footer';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <head>
        <title>NextJS Mimo Clone</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Plateforme d'apprentissage Next.js" />
        <link rel="icon" href="/favicon.ico" />
        {/* Ajouter une police pour l'éditeur de code */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50">
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
