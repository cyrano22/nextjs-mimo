
"use client";

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-700 p-4 text-white">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">NextMimo</h1>
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-indigo-200 transition-colors">
            Accueil
          </Link>
          <Link href="/lessons" className="hover:text-indigo-200 transition-colors">
            Cours
          </Link>
          <Link href="/dashboard" className="hover:text-indigo-200 transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
