"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavbarProps {
  onThemeToggle: () => void;
  currentTheme: string;
  fallbackRoute?: string;
}

export default function Navbar({
  onThemeToggle,
  currentTheme = "light",
  fallbackRoute = "/",
}: NavbarProps) {
  const pathname = usePathname();

  // Déterminer si la page actuelle concerne les quiz
  const isQuizPage =
    pathname?.includes("/quiz") || pathname?.includes("/exercises");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        currentTheme === "dark"
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
            <button
              onClick={onThemeToggle}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {currentTheme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
