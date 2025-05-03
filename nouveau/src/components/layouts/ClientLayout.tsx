"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "../../contexts/AuthContext";
import AnimatedLayout from "../ui/AnimatedLayout";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";
import styles from "./ClientLayout.module.css";

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();
  const [theme, setTheme] = useState<string>("light");

  // Effet pour gérer les éventuelles erreurs de parsing JSON
  useEffect(() => {
    // Nettoyer le cache local si nécessaire
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        const checkCacheIntegrity = () => {
          // Vérifie si les entrées du localStorage liées à Next.js sont valides
          for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            if (key?.startsWith("next-")) {
              try {
                const value = localStorage.getItem(key);
                if (value) JSON.parse(value);
              } catch (e) {
                console.warn(
                  `Corrupted cache entry detected for ${key}, cleaning...`
                );
                localStorage.removeItem(key);
              }
            }
          }
        };

        checkCacheIntegrity();
      }
    } catch (e) {
      console.error("Error checking cache integrity:", e);
    }
  }, []);

  // Effet pour gérer le thème - Version améliorée
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme");
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

      const themeToApply = savedTheme || (prefersDark ? "dark" : "light");
      setTheme(themeToApply);

      // Appliquer les classes au document avec transition douce
      document.body.style.transition =
        "background-color 0.3s ease, color 0.3s ease";

      if (themeToApply === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }

      // Force une réaffectation des couleurs pour les éléments de texte
      const textElements = document.querySelectorAll(
        "p, h1, h2, h3, h4, h5, h6, span, a"
      );
      textElements.forEach((el) => {
        el.classList.add("text-refresh");
        setTimeout(() => el.classList.remove("text-refresh"), 50);
      });
    }
  }, []);

  // Fonction pour changer le thème
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Vérifier si la page est une page de module ou leçon
  const isLessonPage =
    pathname.includes("/lessons/module") ||
    pathname.includes("/lessons/lesson");

  // Déterminer si la page actuelle est la page de connexion
  const isAuthPage = pathname === "/login" || pathname === "/register";

  // Utiliser des classes CSS au lieu de styles inline
  const mainClassName = `min-h-screen pt-16 ${
    isLessonPage
      ? theme === "dark"
        ? styles.lessonDark
        : styles.lessonLight
      : ""
  }`;

  // Déterminer le type de page pour les attributs data
  const pageType = pathname.includes("/lessons/module")
    ? "module"
    : pathname.includes("/lessons/lesson")
    ? "lesson"
    : "regular";

  return (
    <AuthProvider>
      {isAuthPage ? (
        children
      ) : (
        <div className={theme === "dark" ? "dark" : ""}>
          <Navbar
            onThemeToggle={toggleTheme}
            currentTheme={theme}
            fallbackRoute="/dashboard"
          />
          <AnimatedLayout>
            <main className={mainClassName} data-page-type={pageType}>
              {children}
            </main>
          </AnimatedLayout>
          <Footer />
        </div>
      )}
    </AuthProvider>
  );
}
