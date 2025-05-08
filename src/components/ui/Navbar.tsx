"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { ThemeSwitcher } from "./theme-switcher";

interface NavbarProps {
  fallbackRoute?: string;
}

export default function Navbar({
  fallbackRoute = "/",
}: NavbarProps) {
  const pathname = usePathname();
  const { theme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Éviter l'erreur d'hydratation en ne rendant le thème que côté client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Déterminer si la page actuelle concerne les quiz
  const isQuizPage =
    pathname?.includes("/quiz") || pathname?.includes("/exercises");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        mounted && (theme === "dark" || resolvedTheme === "dark")
          ? "bg-gray-900 text-white"
          : "bg-white text-gray-800"
      } shadow-md`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link
              href={fallbackRoute}
              className="flex-shrink-0 flex items-center"
            >
              <span className="text-xl font-bold">NextJS App</span>
            </Link>
            <nav className="hidden sm:ml-6 sm:flex sm:space-x-4 items-center">
              <Link
                href="/dashboard"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/dashboard" ? "bg-indigo-500 text-white" : ""
                }`}
              >
                Dashboard
              </Link>
              <Link
                href="/lessons"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname?.startsWith("/lessons")
                    ? "bg-indigo-500 text-white"
                    : ""
                }`}
              >
                Cours
              </Link>
              <Link
                href="/exercises"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  isQuizPage ? "bg-indigo-500 text-white" : ""
                }`}
              >
                Exercices & Quiz
              </Link>
              <Link
                href="/profile"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === "/profile" ? "bg-indigo-500 text-white" : ""
                }`}
              >
                Profil
              </Link>
            </nav>
          </div>
          <div className="flex items-center">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
