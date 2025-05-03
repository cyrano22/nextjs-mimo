
"use client";

import React from 'react';

export default function Header({ title, subtitle }) {
  return (
    <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-2 text-lg md:text-xl">{subtitle}</p>}
      </div>
    </header>
  );
}
