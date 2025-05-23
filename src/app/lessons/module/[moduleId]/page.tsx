"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion"; // framer-motion can be used in Client Components

// ClientOnly wrapper is good for components that strictly need the browser environment
// but framer-motion itself is generally fine in client components.
// If you still face issues with framer-motion during SSR/hydration, you can use it.
const ClientOnly = ({ children }: { children: React.ReactNode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    // You might want to return a placeholder or null during SSR/pre-mount
    return null;
  }

  return <>{children}</>;
};

interface Lesson {
  id: number; // e.g., 1, 2, 3 (the lesson number within the module)
  title: string;
  duration?: number; // durée en minutes
  completed?: boolean;
  // Add other properties if your API returns them for the lesson list
}

interface Module {
  id: string; // e.g., "1", "2" (the module ID from the route)
  title: string;
  description: string;
  level: string;
  lessons: Lesson[];
  imageUrl?: string;
  totalCompletedLessons?: number; // This will be calculated client-side
  // Add other properties from your API if needed, like total module duration
  duration?: string; // e.g. "120 min"
}

interface ModulePageParams {
  moduleId: string;
}

export default function ModulePage({ params }: { params: ModulePageParams }) {
  const [module, setModule] = useState<Module | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null); // Renamed for clarity

  useEffect(() => {
    // This check is not strictly necessary for fetching,
    // as fetch is a browser API and this is a client component.
    // const isClientSide = typeof window !== "undefined";
    // if (!isClientSide) return;

    setIsLoading(true);
    setFetchError(null); // Reset error on new fetch

    fetch(`/api/modules/${params.moduleId}`)
      .then((res) => {
        if (!res.ok) {
          // Try to get a more specific error message if the API provides one
          return res
            .json()
            .then((errorData) => {
              throw new Error(
                errorData.error || `Module non trouvé (status ${res.status})`
              );
            })
            .catch(() => {
              // If res.json() fails or no specific error
              throw new Error(`Module non trouvé (status ${res.status})`);
            });
        }
        return res.json();
      })
      .then((data: Module) => {
        // Assuming your API returns data matching the Module interface
        console.log(`Module chargé: ${data.title}`);
        console.log(`Nombre de leçons: ${data.lessons?.length || 0}`);
        if (data.lessons?.length > 0) {
          console.log(
            `IDs des leçons: ${data.lessons.map((l) => l.id).join(", ")}`
          );
        }

        const totalLessons = data.lessons?.length || 0;
        const completedLessons =
          data.lessons?.filter((l) => l.completed).length || 0;
        // completionPercentage will be calculated in the render logic

        setModule({
          ...data,
          totalCompletedLessons: completedLessons, // Store the calculated completed lessons
        });
      })
      .catch((err) => {
        console.error("Erreur lors du chargement du module:", err);
        setFetchError(
          err instanceof Error
            ? err.message
            : "Une erreur inconnue est survenue."
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.moduleId]);

  if (isLoading) {
    // --- Skeleton UI for Loading State ---
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 animate-pulse">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center mb-6">
          <div className="h-4 bg-gray-300 rounded w-20"></div>
          <span className="mx-2 text-gray-400">/</span>
          <div className="h-4 bg-gray-300 rounded w-32"></div>
        </div>

        {/* Module Header Skeleton */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 mb-10">
          <div className="flex flex-col md:flex-row items-start gap-6">
            <div className="w-full md:w-1/3 h-56 bg-gray-300 rounded-lg"></div>
            <div className="flex-1 w-full">
              <div className="flex justify-between items-start">
                <div className="h-8 bg-gray-300 rounded w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded-full w-20"></div>
              </div>
              <div className="space-y-3 mt-4">
                <div className="h-4 bg-gray-300 rounded w-full"></div>
                <div className="h-4 bg-gray-300 rounded w-5/6"></div>
              </div>
              <div className="mt-8 bg-gray-200 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="h-4 bg-gray-300 rounded w-24"></div>
                  <div className="h-4 bg-gray-300 rounded w-16"></div>
                </div>
                <div className="w-full h-3 bg-gray-300 rounded-full"></div>
                <div className="h-4 bg-gray-300 rounded w-36 mt-2"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Section Skeleton */}
        <div className="mb-12">
          <div className="h-7 bg-gray-300 rounded w-48 mb-8"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <div className="h-5 bg-gray-300 rounded w-2/3"></div>
                      <div className="h-3 bg-gray-300 rounded w-1/3 mt-2"></div>
                    </div>
                  </div>
                  <div className="mt-6">
                    <div className="h-10 bg-gray-300 rounded-lg w-full"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-12">
          <div className="h-10 bg-gray-300 rounded-lg w-48"></div>
        </div>
      </div>
    );
  }

  if (fetchError || !module) {
    // --- Error Display UI ---
    return (
      <div className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center bg-white py-12 px-6 rounded-xl shadow-lg border border-red-200"
        >
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-red-600 mb-4">
            Erreur de chargement
          </h1>
          <p className="mb-8 text-gray-600 max-w-md mx-auto">
            {fetchError ||
              "Le module que vous recherchez n'existe pas ou une erreur s'est produite."}
          </p>
          <Link
            href="/learning-path"
            className="inline-flex items-center px-5 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Retour au Parcours
          </Link>
        </motion.div>
      </div>
    );
  }

  // If module data is loaded successfully:
  const totalLessons = module.lessons?.length || 0;
  const completedLessons = module.totalCompletedLessons || 0; // Use the pre-calculated value
  const completionPercentage =
    totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    // ClientOnly can wrap the entire return if framer-motion causes hydration issues.
    // However, often it's fine without if animations are simple or handled correctly.
    // <ClientOnly>
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center mb-4 text-sm">
        <Link
          href="/learning-path" // Assuming your main learning path overview is here
          className="text-indigo-600 hover:text-indigo-800 mr-2 transition-colors flex items-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Parcours
        </Link>
        <span className="text-gray-400">/</span>
        <span className="ml-2 text-gray-700 font-medium">{module.title}</span>
      </div>

      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-200 mb-10"
      >
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8">
          {module.imageUrl ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full md:w-1/3 flex-shrink-0"
            >
              <div className="relative rounded-lg overflow-hidden shadow-md group aspect-video md:aspect-auto md:h-56">
                <img
                  src={module.imageUrl}
                  alt={`Illustration pour ${module.title}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>
          ) : (
            <div className="w-full md:w-1/3 flex-shrink-0">
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 h-56 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white text-5xl font-bold opacity-80">
                  {module.id || module.title.charAt(0)}
                </span>
              </div>
            </div>
          )}

          <div className="flex-1">
            <div className="flex flex-wrap justify-between items-start gap-3">
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl lg:text-3xl font-bold text-gray-800"
              >
                {module.title}
              </motion.h1>
              <span className="bg-indigo-100 text-indigo-800 text-xs sm:text-sm font-medium px-3 py-1.5 rounded-full flex items-center whitespace-nowrap">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
                {module.level}
              </span>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-gray-600 mt-3 text-base leading-relaxed"
            >
              {module.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <span className="font-medium text-gray-700 flex items-center text-sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-indigo-500"
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
                  Progression du module
                </span>
                <span className="text-indigo-600 font-semibold text-sm mt-1 sm:mt-0">
                  {completionPercentage}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-gray-300 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: "0%" }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1, ease: "circOut", delay: 0.5 }}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full"
                />
              </div>
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-xs">
                  {completedLessons}/{totalLessons} leçons terminées
                </p>
                {completionPercentage === 100 && (
                  <span className="text-green-600 text-xs font-medium flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3.5 w-3.5 mr-1"
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
                    Module complété !
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Lessons Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} // Stagger animation
            className="text-xl md:text-2xl font-bold text-gray-800 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 md:h-6 md:w-6 mr-2 text-indigo-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Leçons du module
          </motion.h2>
          <div className="text-sm text-gray-500">
            {totalLessons} leçon{totalLessons !== 1 ? "s" : ""}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
          {module.lessons?.map((lesson, index) => (
            <motion.div
              key={lesson.id} // Use lesson.id if it's unique, otherwise index
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 + 0.2 }} // Stagger animation
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div
                    className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 ${
                      lesson.completed ? "bg-green-500" : "bg-indigo-500"
                    } rounded-full flex items-center justify-center mr-4 shadow-md group-hover:scale-105 transition-transform`}
                  >
                    <span className="text-base md:text-lg font-bold text-white">
                      {lesson.id}{" "}
                      {/* Assuming lesson.id is the lesson number */}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-md md:text-lg text-gray-800 group-hover:text-indigo-600 transition-colors">
                      {lesson.title}
                    </h3>
                    <div className="flex items-center mt-1.5 space-x-3">
                      {lesson.duration && (
                        <span className="flex items-center text-xs text-gray-500">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 text-gray-400 mr-1"
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
                          {lesson.duration} min
                        </span>
                      )}
                      {lesson.completed ? (
                        <span className="flex items-center text-xs text-green-600 font-medium">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Terminé
                        </span>
                      ) : (
                        <span className="flex items-center text-xs text-yellow-600 font-medium">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-3.5 w-3.5 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          À faire
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-5">
                  <Link
                    href={`/lessons/module/${params.moduleId}/lesson/${lesson.id}`} // Use lesson.id for navigation
                    className={`block w-full py-2.5 px-4 rounded-lg text-sm font-medium text-center transition-all transform hover:scale-[1.03] active:scale-[0.97] shadow-sm
                        ${
                          lesson.completed
                            ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                            : "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                        }`}
                    onClick={() => {
                      console.log(
                        `Navigating to lesson: moduleId=${params.moduleId}, lessonNumber=${lesson.id}`
                      );
                    }}
                  >
                    {lesson.completed
                      ? "Réviser la leçon"
                      : "Commencer la leçon"}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.3 + (module.lessons?.length || 0) * 0.05,
        }}
        className="flex justify-center mt-16"
      >
        <Link
          href="/learning-path"
          className="flex items-center bg-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all border border-gray-200 text-indigo-600 hover:text-indigo-700 group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2.5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour au Parcours d&apos;Apprentissage
        </Link>
      </motion.div>
    </div>
    // </ClientOnly>
  );
}
