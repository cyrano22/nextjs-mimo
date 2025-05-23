"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import CodeEditor from "@/components/editor/CodeEditor";
import LessonProgress, {
  LessonSummary,
} from "@/components/lessons/LessonProgress"; // Assuming LessonSummary is exported from LessonProgress or defined here
import QuizComponent from "@/components/lessons/QuizComponent";
import ExerciseComponent from "@/components/lessons/ExerciseComponent";

// Types for TypeScript
interface Example {
  title: string;
  code: string;
  explanation: string;
  language?: string;
}

interface ExerciseOption {
  id: number;
  text: string;
  correct: boolean;
}
interface Exercise {
  title: string;
  description: string;
  options?: ExerciseOption[];
  type?: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

interface Quiz {
  title: string;
  questions: QuizQuestion[];
}

interface Project {
  title: string;
  description: string;
  initialCode: string;
  solution: string;
  language?: string;
}

// Define a simple type for items in moduleLessons if it's passed around
// This should match what your API for a single module's lesson list might return, or what LessonProgress expects.
interface ModuleLessonSummary {
  id: string; // Full lesson ID like "1-1", "1-2"
  title: string;
  // Add other fields if needed by LessonProgress, e.g., status
}

interface LessonData {
  id: string;
  title: string;
  description?: string;
  content: string;
  example?: Example;
  exercise?: Exercise;
  quiz?: Quiz;
  project?: Project;
  duration?: number;
  difficulty?: "débutant" | "intermédiaire" | "avancé";
  prerequisites?: string[];
  tags?: string[];
  // Option A: If your lesson API returns the list of all lessons for its module
  moduleLessons?: ModuleLessonSummary[];
}

interface Params {
  moduleId: string;
  lessonId: string;
}

const LessonContent = ({ lesson }: { lesson: LessonData }) => {
  const handleCodeChange = (newCode: string) => {
    /* Placeholder */
  };
  const handleCodeRun = () => {
    /* Placeholder */
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 prose prose-indigo max-w-none">
      <div dangerouslySetInnerHTML={{ __html: lesson.content }} />

      {lesson.example && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            {lesson.example.title}
          </h3>
          <CodeEditor
            language={lesson.example.language || "javascript"}
            initialCode={lesson.example.code}
            readOnly={true}
            onCodeChange={handleCodeChange}
            onCodeRun={handleCodeRun}
          />
          {lesson.example.explanation && (
            <p className="mt-3 text-sm text-gray-600 italic">
              {lesson.example.explanation}
            </p>
          )}
        </div>
      )}

      {lesson.exercise && (
        <div className="mt-8 pt-6 border-t">
          <ExerciseComponent exercise={lesson.exercise} />
        </div>
      )}

      {lesson.quiz && (
        <div className="mt-8 pt-6 border-t">
          <QuizComponent quiz={lesson.quiz} />
        </div>
      )}

      {lesson.project && (
        <div className="mt-8 pt-6 border-t">
          <h3 className="text-xl font-semibold mb-3 text-gray-700">
            {lesson.project.title}
          </h3>
          {lesson.project.description && (
            <p className="mb-3 text-gray-600">{lesson.project.description}</p>
          )}
          <CodeEditor
            language={lesson.project.language || "javascript"}
            initialCode={lesson.project.initialCode}
            onCodeChange={handleCodeChange}
            onCodeRun={handleCodeRun}
          />
        </div>
      )}
    </div>
  );
};

const useLessonTitles = () => {
  const [lessonTitles, setLessonTitles] = useState<{ [key: string]: string }>(
    {}
  );

  const fetchLessonTitles = useCallback(async () => {
    // This line (127) should be fine once @types/node is correctly installed and recognized.
    if (
      Object.keys(lessonTitles).length > 0 &&
      process.env.NODE_ENV === "production"
    ) {
      return;
    }
    try {
      const response = await fetch("/api/modules");
      if (!response.ok) {
        console.warn(
          `Failed to fetch lesson titles, status: ${response.status}`
        );
        return;
      }
      const data = await response.json();
      const modules = data.modules || (Array.isArray(data) ? data : []);
      if (Array.isArray(modules)) {
        const newTitles: { [key: string]: string } = {};
        modules.forEach((moduleItem: any) => {
          if (moduleItem.lessons && Array.isArray(moduleItem.lessons)) {
            moduleItem.lessons.forEach(
              (lesson: { id: string; title: string }) => {
                if (lesson.id && lesson.title) {
                  newTitles[lesson.id] = lesson.title;
                }
              }
            );
          }
        });
        if (Object.keys(newTitles).length > 0) {
          setLessonTitles((prev) => ({ ...prev, ...newTitles }));
        }
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des titres de leçons:",
        error
      );
    }
  }, [lessonTitles]);

  return { lessonTitles, fetchLessonTitles };
};

export default function LessonPage({ params }: { params: Params }) {
  const { moduleId, lessonId } = params;
  const [lesson, setLesson] = useState<LessonData | null>(null);
  // State to hold the list of lessons for the current module, if fetched separately
  const [lessonsInCurrentModule, setLessonsInCurrentModule] = useState<
    ModuleLessonSummary[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [completionTime, setCompletionTime] = useState<number>(0);
  const { lessonTitles, fetchLessonTitles } = useLessonTitles();

  useEffect(() => {
    const timer = setInterval(() => {
      setCompletionTime((prevTime) => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    const fetchData = async () => {
      try {
        // Fetch single lesson data
        const lessonResponse = await fetch(
          `/api/modules/${moduleId}/lessons/${lessonId}`
        );
        if (!lessonResponse.ok) {
          let errorMessage = `Leçon non trouvée (status ${lessonResponse.status})`;
          try {
            const errorData = await lessonResponse.json();
            errorMessage = errorData.error || errorData.message || errorMessage;
          } catch (e) {
            /* Ignore */
          }
          throw new Error(errorMessage);
        }
        const lessonData: LessonData = await lessonResponse.json();
        setLesson(lessonData);

        if (
          lessonData.prerequisites?.some((prereq) => /^\d+-\d+$/.test(prereq))
        ) {
          fetchLessonTitles();
        }

        // Option B: If moduleLessons is not part of LessonData, fetch it separately for LessonProgress
        if (!lessonData.moduleLessons) {
          const moduleLessonsResponse = await fetch(`/api/modules/${moduleId}`); // API to get all lessons for a module
          if (moduleLessonsResponse.ok) {
            const moduleData = await moduleLessonsResponse.json();
            // Assuming moduleData has a 'lessons' array matching ModuleLessonSummary[]
            setLessonsInCurrentModule(moduleData.lessons || []);
          } else {
            console.warn(
              `Could not fetch lessons for module ${moduleId} for progress component.`
            );
            setLessonsInCurrentModule([]);
          }
        } else {
          // If moduleLessons is part of lessonData (Option A)
          setLessonsInCurrentModule(lessonData.moduleLessons);
        }
      } catch (err) {
        console.error(
          "Erreur lors du chargement des données de la leçon:",
          err
        );
        setError(
          err instanceof Error ? err.message : "Erreur de chargement inconnue."
        );
      } finally {
        setIsLoading(false);
      }
    };
    if (moduleId && lessonId) {
      fetchData();
    } else {
      setError(
        "Module ID ou Lesson ID manquant dans les paramètres de la page."
      );
      setIsLoading(false);
    }
  }, [moduleId, lessonId, fetchLessonTitles]);

  const formatPrerequisite = (prereq: string): string => {
    if (/^\d+-\d+$/.test(prereq)) {
      return lessonTitles[prereq]
        ? `${lessonTitles[prereq]} (Leçon ${prereq})`
        : `Leçon ${prereq}`;
    }
    return prereq;
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs < 10 ? "0" : ""}${secs}s`;
  };

  if (isLoading) {
    // ... isLoading JSX ... (same as before)
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-2 text-sm">
          <Link
            href="/learning-path"
            className="text-indigo-600 hover:text-indigo-800 mr-2 transition-colors"
          >
            Parcours
          </Link>
          <span className="text-gray-500">/</span>
          <Link
            href={`/learning-path#module-${moduleId}`}
            className="text-indigo-600 hover:text-indigo-800 mx-2 transition-colors"
          >
            Module {moduleId}
          </Link>
          <span className="text-gray-500">/</span>
          <span className="ml-2 text-gray-700">
            Chargement Leçon {lessonId}...
          </span>
        </div>
        <div className="animate-pulse space-y-6 mt-4">
          <div className="h-8 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-300 rounded-lg h-72"></div>
              <div className="bg-gray-300 rounded-lg h-48"></div>
            </div>
            <div className="bg-gray-300 rounded-lg h-64"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lesson) {
    // ... error JSX ... (same as before)
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center py-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <svg
              className="mx-auto h-12 w-12 text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h1 className="mt-5 text-2xl font-semibold text-red-600">
              Erreur de chargement
            </h1>
            <p className="mt-2 text-gray-600">
              {error ||
                "La leçon que vous recherchez n'existe pas ou est inaccessible."}
            </p>
            <div className="mt-6">
              <Link
                href={`/learning-path#module-${moduleId}`}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Retour au module {moduleId}
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* ... Breadcrumbs and Lesson Header JSX ... (same as before) */}
      <div className="mb-6 text-sm">
        <Link
          href="/learning-path"
          className="text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Parcours
        </Link>
        <span className="mx-2 text-gray-400">{">"}</span>
        <Link
          href={`/learning-path#module-${moduleId}`}
          className="text-indigo-600 hover:text-indigo-800 transition-colors"
        >
          Module {moduleId}
        </Link>
        <span className="mx-2 text-gray-400">{">"}</span>
        <span className="text-gray-600">Leçon {lessonId}</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white shadow-xl rounded-lg p-6 mb-8"
      >
        <div className="flex flex-col sm:flex-row justify-between sm:items-start mb-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {lesson.title}
            </h1>
            {lesson.description && (
              <p className="text-gray-600 text-md">{lesson.description}</p>
            )}
          </div>

          <div className="flex items-center mt-3 sm:mt-0 space-x-4 text-sm flex-shrink-0 sm:ml-6">
            {lesson.difficulty && (
              <span
                className={`font-semibold px-3 py-1 rounded-full text-xs ${
                  lesson.difficulty === "débutant"
                    ? "bg-green-100 text-green-800"
                    : lesson.difficulty === "intermédiaire"
                    ? "bg-yellow-100 text-yellow-800"
                    : lesson.difficulty === "avancé"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {lesson.difficulty.charAt(0).toUpperCase() +
                  lesson.difficulty.slice(1)}
              </span>
            )}
            {lesson.duration && (
              <div className="flex items-center text-gray-500">
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
                    d="M12 8v4l3 3m6-3a9 9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{lesson.duration} min</span>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-4 flex flex-col sm:flex-row justify-between sm:items-center">
          {lesson.tags && lesson.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3 sm:mb-0">
              {lesson.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-md flex items-center text-xs font-medium self-start sm:self-center">
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
                d="M12 8v4l3 3m6-3a9 9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Temps écoulé: {formatTime(completionTime)}</span>
          </div>
        </div>

        {lesson.prerequisites && lesson.prerequisites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-4 bg-blue-50 text-blue-700 p-4 rounded-md text-sm"
          >
            <h4 className="font-semibold mb-1 text-blue-800">Prérequis :</h4>
            <ul className="list-disc list-inside space-y-1">
              {lesson.prerequisites.map((prereq, index) => (
                <li key={index}>
                  {/^\d+-\d+$/.test(prereq) ? (
                    <Link
                      href={`/lessons/module/${prereq.split("-")[0]}/lesson/${
                        prereq.split("-")[1]
                      }`}
                      className="text-blue-600 hover:underline hover:text-blue-700 font-medium"
                    >
                      {formatPrerequisite(prereq)}
                    </Link>
                  ) : (
                    <span className="text-blue-700">
                      {formatPrerequisite(prereq)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>

      <LessonContent lesson={lesson} />

      <LessonProgress
        currentLessonId={lesson.id}
        moduleId={moduleId}
        theme="light"
        lessonsInModule={lessonsInCurrentModule} // Use the fetched/derived list
      />
    </div>
  );
}
