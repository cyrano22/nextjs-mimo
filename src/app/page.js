
"use client";

import React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import MainNavigation from "../components/ui/MainNavigation";

// Types pour les features et les modules de cours
interface Feature {
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface CourseModule {
  title: string;
  description: string;
  image: string;
  level: string;
  lessons: number;
  duration: string;
  path: string;
}

export default function HomePage() {
  const [activeFeature, setActiveFeature] = useState(0);

  // Changer automatiquement la fonctionnalité mise en avant
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % features.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Données des fonctionnalités
  const features = [
    {
      title: "Apprentissage interactif",
      description:
        "Apprenez Next.js à travers des leçons interactives avec visualisation en temps réel du code que vous écrivez.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
      ),
    },
    {
      title: "Parcours progressif",
      description:
        "Évoluez du niveau débutant au niveau expert avec un parcours d'apprentissage structuré et adapté à votre rythme.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
    {
      title: "Système de gamification",
      description:
        "Gagnez des points XP, débloquez des badges et suivez votre progression pour rester motivé tout au long de votre apprentissage.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
    },
    {
      title: "Portfolio professionnel",
      description:
        "Créez un portfolio professionnel à partir des projets que vous réalisez pendant votre parcours d'apprentissage.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 text-indigo-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      ),
    },
  ];

  // Données des modules de cours
  const courseModules = [
    {
      title: "JavaScript Fondamentaux",
      description:
        "Maîtrisez les bases de JavaScript, le langage essentiel pour le développement web moderne.",
      image: "/javascript-module.jpg",
      level: "Débutant",
      lessons: 12,
      duration: "4-6 heures",
      path: "/javascript-fundamentals",
    },
    {
      title: "React Fondamentaux",
      description:
        "Apprenez React, la bibliothèque qui révolutionne la création d'interfaces utilisateur.",
      image: "/react-module.jpg",
      level: "Intermédiaire",
      lessons: 15,
      duration: "6-8 heures",
      path: "/react-fundamentals",
    },
    {
      title: "Next.js Débutant",
      description:
        "Découvrez Next.js, le framework React qui simplifie le développement d'applications web.",
      image: "/nextjs-beginner.jpg",
      level: "Intermédiaire",
      lessons: 10,
      duration: "5-7 heures",
      path: "/learning-path",
    },
  ];

  return (
    <div className="bg-pattern min-h-screen">
      <MainNavigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-white -z-10"></div>
        <div className="absolute inset-y-0 right-0 -z-10">
          <svg
            className="h-full w-48 md:w-96 text-indigo-50 opacity-50"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="currentColor" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="block text-gray-900">Apprenez Next.js</span>
                <span className="block title-gradient mt-1">
                  de façon interactive
                </span>
              </h1>

              <p className="mt-6 text-xl text-gray-600 max-w-3xl">
                Maîtrisez Next.js à travers un parcours d'apprentissage gamifié
                et interactif. Visualisez votre code en temps réel et
                construisez votre portfolio professionnel.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/learning-path" className="btn btn-primary">
                  Commencer à apprendre
                </Link>
                <Link
                  href="/javascript-fundamentals"
                  className="btn btn-outline"
                >
                  Explorer les fondamentaux
                </Link>
              </div>
            </div>

            <div className="mt-12 lg:mt-0 relative">
              <div className="relative mx-auto w-full rounded-lg shadow-xl overflow-hidden">
                <div className="aspect-w-5 aspect-h-3 bg-gray-800 rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 sm:p-8 w-full">
                      <div className="code-editor w-full h-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                        <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          </div>
                          <div className="text-xs text-gray-400">App.js</div>
                        </div>
                        <div className="p-4 text-left">
                          <pre className="text-xs sm:text-sm text-gray-300 font-mono">
                            <span className="text-blue-400">import</span>{" "}
                            <span className="text-yellow-300">React</span>{" "}
                            <span className="text-blue-400">from</span>{" "}
                            <span className="text-green-300">'react'</span>;
                            <br />
                            <br />
                            <span className="text-blue-400">
                              export default function
                            </span>{" "}
                            <span className="text-yellow-300">HomePage</span>(){" "}
                            {"{"}
                            <br />
                            &nbsp;&nbsp;
                            <span className="text-blue-400">return</span> (
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            <span className="text-red-400">div</span>&gt;
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            <span className="text-red-400">h1</span>{" "}
                            <span className="text-purple-400">className</span>=
                            <span className="text-green-300">"title"</span>&gt;
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Bienvenue
                            sur NextMimo!
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                            <span className="text-red-400">h1</span>&gt;
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;
                            <span className="text-red-400">p</span>&gt;
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apprenez
                            Next.js de façon interactive
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                            <span className="text-red-400">p</span>&gt;
                            <br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&lt;/
                            <span className="text-red-400">div</span>&gt;
                            <br />
                            &nbsp;&nbsp;);
                            <br />
                            {"}"}
                          </pre>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Effet de brillance */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg blur opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Fonctionnalités */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Une expérience d'apprentissage unique
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Découvrez comment notre approche interactive et gamifiée rend
              l'apprentissage de Next.js plus efficace et engageant.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-16">
              {/* Fonctionnalité mise en avant */}
              <div className="relative">
                <div className="aspect-w-3 aspect-h-2">
                  <div className="h-full w-full rounded-2xl bg-gray-100 overflow-hidden shadow-lg">
                    <div className="h-full w-full p-8 flex items-center justify-center">
                      <div
                        key={activeFeature}
                        className="text-center transition-opacity duration-500"
                      >
                        {features[activeFeature].icon}
                        <h3 className="mt-6 text-xl font-bold text-gray-900">
                          {features[activeFeature].title}
                        </h3>
                        <p className="mt-2 text-base text-gray-600">
                          {features[activeFeature].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Indicateurs */}
                <div className="mt-4 flex justify-center space-x-2">
                  {features.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveFeature(index)}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        index === activeFeature
                          ? "bg-indigo-600"
                          : "bg-gray-300"
                      }`}
                      aria-label={`Sélectionner la fonctionnalité ${
                        index + 1
                      }: ${features[index].title}`}
                    />
                  ))}
                </div>
              </div>

              {/* Liste des fonctionnalités */}
              <div className="space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12">
                {features.map((feature, index) => (
                  <div key={index} className="relative">
                    <div className="text-lg font-medium text-gray-900">
                      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-100 text-indigo-600 -left-16">
                        {feature.icon}
                      </div>
                      {feature.title}
                    </div>
                    <div className="mt-2 text-base text-gray-600">
                      {feature.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Modules de cours */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Commencez votre parcours d'apprentissage
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              Des fondamentaux de JavaScript à la maîtrise de Next.js, notre
              parcours complet vous guide étape par étape.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {courseModules.map((module, index) => (
              <div
                key={index}
                className="card card-hover overflow-hidden transform transition-transform hover:-translate-y-1 duration-300"
              >
                <div className="h-48 w-full bg-indigo-100 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-90"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-white p-6">
                      <h3 className="text-2xl font-bold">{module.title}</h3>
                      <div className="mt-2 flex items-center justify-center space-x-2">
                        <span className="badge badge-primary bg-white bg-opacity-20">
                          {module.level}
                        </span>
                        <span className="badge badge-primary bg-white bg-opacity-20">
                          {module.lessons} leçons
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{module.description}</p>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {module.duration}
                    </div>

                    <div className="flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-1 text-indigo-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Projets inclus
                    </div>
                  </div>

                  <Link href={module.path} className="btn btn-primary w-full">
                    Commencer
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className="py-16 sm:py-24 bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Prêt à devenir un expert Next.js ?
            </h2>
            <p className="mt-4 text-xl text-indigo-100 max-w-3xl mx-auto">
              Rejoignez des milliers d'apprenants et commencez votre parcours
              dès aujourd'hui.
            </p>

            <div className="mt-10">
              <Link
                href="/learning-path"
                className="btn bg-white text-indigo-700 hover:bg-indigo-50 focus:ring-indigo-200"
              >
                Commencer gratuitement
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
