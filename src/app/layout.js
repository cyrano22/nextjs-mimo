"use client";

import './globals.css';
import Footer from '../components/ui/Footer';
import Navbar from '../components/ui/Navbar';
import { useState, useEffect } from 'react';
import SimpleAIAssistant from '@/components/learning/SimpleAIAssistant';
import GlobalAIAssistant from '@/components/layouts/GlobalAIAssistant';

export default function RootLayout({ children }) {
  const [theme, setTheme] = useState('light');

  // Effet pour initialiser le thème au chargement
  useEffect(() => {
    // Vérifier s'il y a un thème sauvegardé dans localStorage
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const themeToUse = savedTheme || (prefersDark ? 'dark' : 'light');
      setTheme(themeToUse);

      // Appliquer le thème au document
      if (themeToUse === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  // Fonction pour basculer entre mode clair et sombre
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Sauvegarder dans localStorage
    localStorage.setItem('theme', newTheme);
    
    // Appliquer au document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <html lang="fr" className={theme === 'dark' ? 'dark' : ''}>
      <head>
        <title>NextJS Mimo Clone</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Plateforme d'apprentissage Next.js" />
        <link rel="icon" href="/favicon.ico" />
        {/* Ajouter une police pour l'éditeur de code */}
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap" />
      </head>
      <body className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar onThemeToggle={toggleTheme} currentTheme={theme} />
        <main className="flex-grow pt-16 md:pt-20">
          {children}
        </main>
        <Footer />
        <SimpleAIAssistant />
        <GlobalAIAssistant />
      </body>
    </html>
  );
}
