import { useState } from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-lg font-semibold">NextJS Mimo Clone</p>
            <p className="text-gray-400">Apprenez Next.js de manière interactive</p>
          </div>
          <div className="flex space-x-4">
            <a href="/about" className="text-gray-300 hover:text-white">
              À propos
            </a>
            <a href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </a>
            <a href="/privacy" className="text-gray-300 hover:text-white">
              Confidentialité
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} NextJS Mimo Clone. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
