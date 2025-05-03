
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MainNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className={`text-xl font-bold ${isScrolled ? 'text-indigo-600' : 'text-indigo-600'}`}>
                NextMimo
              </span>
            </Link>
          </div>

          {/* Navigation Desktop */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              href="/learning-path"
              className={`text-sm font-medium ${
                pathname === '/learning-path'
                  ? 'text-indigo-600'
                  : isScrolled
                  ? 'text-gray-900 hover:text-indigo-600'
                  : 'text-gray-800 hover:text-indigo-600'
              } transition-colors`}
            >
              Parcours
            </Link>
            <Link
              href="/lessons"
              className={`text-sm font-medium ${
                pathname === '/lessons'
                  ? 'text-indigo-600'
                  : isScrolled
                  ? 'text-gray-900 hover:text-indigo-600'
                  : 'text-gray-800 hover:text-indigo-600'
              } transition-colors`}
            >
              Leçons
            </Link>
            <Link
              href="/javascript-fundamentals"
              className={`text-sm font-medium ${
                pathname === '/javascript-fundamentals'
                  ? 'text-indigo-600'
                  : isScrolled
                  ? 'text-gray-900 hover:text-indigo-600'
                  : 'text-gray-800 hover:text-indigo-600'
              } transition-colors`}
            >
              JavaScript
            </Link>
            <Link
              href="/react-fundamentals"
              className={`text-sm font-medium ${
                pathname === '/react-fundamentals'
                  ? 'text-indigo-600'
                  : isScrolled
                  ? 'text-gray-900 hover:text-indigo-600'
                  : 'text-gray-800 hover:text-indigo-600'
              } transition-colors`}
            >
              React
            </Link>
          </div>

          <div className="hidden md:flex md:items-center md:space-x-4">
            <Link
              href="/dashboard"
              className={`text-sm font-medium px-4 py-2 rounded-md ${
                isScrolled
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              } transition-colors`}
            >
              Tableau de bord
            </Link>
          </div>

          {/* Bouton menu mobile */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className={`inline-flex items-center justify-center p-2 rounded-md ${
                isScrolled
                  ? 'text-gray-700 hover:text-indigo-600 hover:bg-gray-100'
                  : 'text-gray-700 hover:text-indigo-600 hover:bg-white'
              }`}
              aria-expanded="false"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="sr-only">Ouvrir le menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile */}
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:hidden bg-white shadow-lg absolute w-full`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/learning-path"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/learning-path'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-800 hover:bg-gray-50 hover:text-indigo-600'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Parcours
          </Link>
          <Link
            href="/lessons"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/lessons'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-800 hover:bg-gray-50 hover:text-indigo-600'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            Leçons
          </Link>
          <Link
            href="/javascript-fundamentals"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/javascript-fundamentals'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-800 hover:bg-gray-50 hover:text-indigo-600'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            JavaScript
          </Link>
          <Link
            href="/react-fundamentals"
            className={`block px-3 py-2 rounded-md text-base font-medium ${
              pathname === '/react-fundamentals'
                ? 'bg-indigo-50 text-indigo-600'
                : 'text-gray-800 hover:bg-gray-50 hover:text-indigo-600'
            }`}
            onClick={() => setIsMenuOpen(false)}
          >
            React
          </Link>
          <Link
            href="/dashboard"
            className="block px-3 py-2 rounded-md text-base font-medium bg-indigo-600 text-white hover:bg-indigo-700"
            onClick={() => setIsMenuOpen(false)}
          >
            Tableau de bord
          </Link>
        </div>
      </div>
    </nav>
  );
}
