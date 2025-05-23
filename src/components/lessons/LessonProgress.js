"use client";

import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link for navigation

/**
 * @typedef {Object} LessonProgressProps
 * @property {string} currentLessonId - The ID of the current lesson (e.g., "1-1").
 * @property {string} moduleId - The ID of the current module (e.g., "1").
 * @property {'light' | 'dark'} [theme='light'] - The theme for the component.
 * @property {Array<Object>} [lessonsInModule] - Optional: Array of all lessons in the current module to help with next/prev logic.
 */

/**
 * LessonProgress component.
 * @param {LessonProgressProps} props
 */
export default function LessonProgress({
  currentLessonId,
  moduleId,
  theme: parentTheme = "light",
  // lessonsInModule // Example: if you pass all lessons for the module
}) {
  // In a real application, progress data would come from an API, context, or localStorage
  // based on currentLessonId and moduleId.
  // This is a placeholder for demonstrating the component structure.
  const [progress, setProgress] = useState({
    theory: false,
    example: false,
    exercise: false,
    quiz: false,
    project: false,
  });

  const [localTheme, setLocalTheme] = useState(parentTheme);

  useEffect(() => {
    setLocalTheme(parentTheme);
  }, [parentTheme]);

  // This progress logic is generic. For lesson-specific progress,
  // you'd fetch or calculate based on currentLessonId.
  const totalSteps = Object.keys(progress).length;
  const completedSteps = Object.values(progress).filter(Boolean).length;
  const progressPercentage = Math.round((completedSteps / totalSteps) * 100);

  const theme = localTheme; // Use localTheme for consistent styling

  // --- Example Next/Previous Lesson Logic (requires more data) ---
  // This is a simplified example. You'd typically get this from `lessonsInModule` prop
  // or fetch it based on `moduleId`.
  let prevLessonNumber = null;
  let nextLessonNumber = null;

  if (currentLessonId) {
    const lessonIdParts = currentLessonId.split("-");
    if (lessonIdParts.length === 2) {
      const currentNum = parseInt(lessonIdParts[1], 10);
      if (!isNaN(currentNum)) {
        if (currentNum > 1) {
          prevLessonNumber = currentNum - 1;
        }
        // To determine nextLessonNumber, you need to know the total lessons in the module.
        // Let's assume you have a `lessonsInModule` prop or fetch this info.
        // For this example, let's hardcode a max of 5 lessons for demonstration.
        const maxLessonsInModule = 5; // This should be dynamic
        if (currentNum < maxLessonsInModule) {
          nextLessonNumber = currentNum + 1;
        }
      }
    }
  }
  // --- End Example Next/Previous Lesson Logic ---

  return (
    <div
      className={`lesson-progress-container mt-12 p-6 border-t ${
        theme === "dark"
          ? "border-gray-700 bg-gray-800"
          : "border-gray-200 bg-gray-50"
      } rounded-lg shadow`}
    >
      <h3
        className={`text-lg font-semibold mb-4 ${
          theme === "dark" ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Progression de la Leçon (Module {moduleId} - Leçon{" "}
        {currentLessonId ? currentLessonId.split("-")[1] : "N/A"})
      </h3>

      <div className="space-y-4">
        <div
          className={`flex justify-between text-sm mb-1 ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          }`}
        >
          <span>{progressPercentage}% complété (étapes internes)</span>
          <span>
            {completedSteps}/{totalSteps} étapes
          </span>
        </div>

        <div
          className={`w-full rounded-full h-2.5 ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-300"
          }`}
        >
          <div
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
              theme === "dark" ? "bg-indigo-500" : "bg-indigo-600"
            }`}
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>

        {/* This list is currently generic, not tied to actual lesson parts.
            In a real app, this would reflect actual sub-sections of the current lesson. */}
        <ul className="space-y-2 mt-4 text-sm">
          {Object.entries(progress).map(([stepKey, isCompleted], index) => (
            <li key={stepKey} className="flex items-center">
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 text-xs font-mono ${
                  isCompleted
                    ? theme === "dark"
                      ? "bg-indigo-500 text-white"
                      : "bg-indigo-600 text-white"
                    : theme === "dark"
                    ? "bg-gray-600 text-gray-300"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
              <span
                className={`${
                  isCompleted
                    ? theme === "dark"
                      ? "text-gray-400 line-through"
                      : "text-gray-500 line-through"
                    : theme === "dark"
                    ? "font-medium text-gray-200"
                    : "font-medium text-gray-800"
                }`}
              >
                {stepKey.charAt(0).toUpperCase() + stepKey.slice(1)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Next/Previous Lesson Navigation */}
      <div className="flex justify-between mt-8 pt-4 border-t">
        {prevLessonNumber ? (
          <Link href={`/lessons/module/${moduleId}/lesson/${prevLessonNumber}`}>
            <span
              className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md transition-colors ${
                theme === "dark"
                  ? "border-gray-600 text-gray-300 bg-gray-700 hover:bg-gray-600"
                  : "border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Leçon Précédente
            </span>
          </Link>
        ) : (
          <span
            className={`inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md cursor-not-allowed ${
              theme === "dark"
                ? "border-gray-700 text-gray-500 bg-gray-800"
                : "border-gray-200 text-gray-400 bg-gray-100"
            }`}
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Leçon Précédente
          </span>
        )}

        {nextLessonNumber ? (
          <Link href={`/lessons/module/${moduleId}/lesson/${nextLessonNumber}`}>
            <span
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${
                theme === "dark"
                  ? "text-white bg-indigo-500 hover:bg-indigo-600"
                  : "text-white bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              Leçon Suivante
              <svg
                className="w-5 h-5 ml-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
          </Link>
        ) : (
          <span
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md cursor-not-allowed ${
              theme === "dark"
                ? "text-gray-500 bg-gray-700"
                : "text-gray-400 bg-gray-200"
            }`}
          >
            Leçon Suivante
            <svg
              className="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              ></path>
            </svg>
          </span>
        )}
      </div>
    </div>
  );
}
