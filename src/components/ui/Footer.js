"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function PortfolioBuilder() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState({
    name: "",
    title: "Développeur Next.js",
    bio: "",
    email: "",
    github: "",
    linkedin: "",
    website: "",
    skills: ["Next.js", "React", "JavaScript", "Tailwind CSS"],
    theme: "modern",
    selectedProjects: [],
  });

  // Charger le profil utilisateur et ses données depuis l'API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Récupérer le profil utilisateur
        const profileResponse = await fetch("/api/profile");
        if (profileResponse.ok) {
          const profile = await profileResponse.json();

          // Pré-remplir les données du portfolio avec les informations du profil
          setPortfolioData((prevData) => ({
            ...prevData,
            name: profile.fullName || "",
            email: profile.email || "",
            github: profile.github || "",
            linkedin: profile.linkedin || "",
            website: profile.website || "",
            bio: profile.bio || "",
          }));
        }

        // Récupérer les projets de l'utilisateur
        const projectsResponse = await fetch("/api/user-projects");
        if (projectsResponse.ok) {
          const userProjects = await projectsResponse.json();
          setProjects(userProjects);

          // Pré-sélectionner les projets marqués comme favoris
          const featuredProjects = userProjects
            .filter((project) => project.featured)
            .map((project) => project.id);

          setPortfolioData((prevData) => ({
            ...prevData,
            selectedProjects: featuredProjects,
          }));
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        // Charger des données locales en cas d'erreur pour la démo
        loadLocalProjects();
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  // Fonction de secours qui charge des projets locaux (pour la démo)
  const loadLocalProjects = () => {
    const storedProjects = JSON.parse(
      localStorage.getItem("portfolioProjects") || "[]",
    );

    if (storedProjects.length === 0) {
      const defaultProjects = [
        {
          id: "project-1",
          title: "Application Todo avec Next.js",
          description:
            "Une application de gestion de tâches créée avec Next.js et React.",
          thumbnail: "/images/projects/todo-app.jpg",
          technologies: ["Next.js", "React", "Tailwind CSS"],
          demoUrl: "https://todo-app-demo.vercel.app",
          codeUrl: "https://github.com/username/todo-app",
          moduleId: "components",
          lessonId: "components-lesson-3",
          completed: true,
          featured: false,
        },
        {
          id: "project-2",
          title: "Blog personnel",
          description:
            "Un blog personnel avec fonctionnalités de commentaires et système d'authentification.",
          thumbnail: "/images/projects/blog.jpg",
          technologies: ["Next.js", "React", "NextAuth", "MongoDB"],
          demoUrl: "https://blog-demo.vercel.app",
          codeUrl: "https://github.com/username/blog",
          moduleId: "data-fetching",
          lessonId: "data-fetching-lesson-5",
          completed: true,
          featured: true,
        },
      ];

      setProjects(defaultProjects);
      setPortfolioData((prevData) => ({
        ...prevData,
        selectedProjects: defaultProjects
          .filter((p) => p.featured)
          .map((p) => p.id),
      }));

      localStorage.setItem(
        "portfolioProjects",
        JSON.stringify(defaultProjects),
      );
    } else {
      setProjects(storedProjects);
      setPortfolioData((prevData) => ({
        ...prevData,
        selectedProjects: storedProjects
          .filter((p) => p.featured)
          .map((p) => p.id),
      }));
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData({
      ...portfolioData,
      [name]: value,
    });
  };

  const handleSkillChange = (e) => {
    const skills = e.target.value
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);
    setPortfolioData({
      ...portfolioData,
      skills,
    });
  };

  const toggleProjectSelection = (projectId) => {
    setPortfolioData((prevData) => {
      const selectedProjects = [...prevData.selectedProjects];

      if (selectedProjects.includes(projectId)) {
        return {
          ...prevData,
          selectedProjects: selectedProjects.filter((id) => id !== projectId),
        };
      } else {
        return {
          ...prevData,
          selectedProjects: [...selectedProjects, projectId],
        };
      }
    });
  };

  const savePortfolio = async () => {
    try {
      const response = await fetch("/api/portfolio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(portfolioData),
      });

      if (response.ok) {
        alert("Portfolio sauvegardé avec succès!");
      } else {
        throw new Error("Erreur lors de la sauvegarde");
      }
    } catch (error) {
      console.error("Erreur:", error);

      localStorage.setItem("portfolioData", JSON.stringify(portfolioData));
      alert("Portfolio sauvegardé localement (mode hors ligne)");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Créer votre portfolio
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Informations personnelles */}
        <div className="space-y-6">[...]</div>
        {/* Projets */}
        <div className="md:col-span-2">[...]</div>
      </div>

      <div className="mt-8 flex justify-end space-x-4">
        <Link href="/portfolio/preview" className="...">
          Prévisualiser
        </Link>
        <button onClick={savePortfolio} className="...">
          Sauvegarder
        </button>
      </div>
    </div>
  );
}
