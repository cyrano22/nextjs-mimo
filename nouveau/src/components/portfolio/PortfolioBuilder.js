"use client";

import { useState, useEffect } from 'react';

export default function PortfolioBuilder() {
  const [projects, setProjects] = useState([]);
  const [portfolioData, setPortfolioData] = useState({
    name: '',
    title: 'Développeur Next.js',
    bio: '',
    email: '',
    github: '',
    linkedin: '',
    website: '',
    skills: ['Next.js', 'React', 'JavaScript', 'Tailwind CSS'],
    theme: 'modern',
    selectedProjects: []
  });
  
  // Simuler le chargement des projets depuis le localStorage ou une API
  useEffect(() => {
    // Dans une application réelle, ces données viendraient d'une API
    const mockProjects = [
      {
        id: 'project-1',
        title: 'Application Todo avec Next.js',
        description: 'Une application de gestion de tâches créée avec Next.js et React.',
        thumbnail: '/images/projects/todo-app.jpg',
        technologies: ['Next.js', 'React', 'Tailwind CSS'],
        demoUrl: 'https://todo-app-demo.vercel.app',
        codeUrl: 'https://github.com/username/todo-app',
        moduleId: 'components',
        lessonId: 'components-lesson-3',
        completed: true,
        featured: false
      },
      {
        id: 'project-2',
        title: 'Blog personnel',
        description: 'Un blog personnel avec fonctionnalités de commentaires et système d\'authentification.',
        thumbnail: '/images/projects/blog.jpg',
        technologies: ['Next.js', 'React', 'NextAuth', 'MongoDB'],
        demoUrl: 'https://blog-demo.vercel.app',
        codeUrl: 'https://github.com/username/blog',
        moduleId: 'data-fetching',
        lessonId: 'data-fetching-lesson-5',
        completed: true,
        featured: true
      },
      {
        id: 'project-3',
        title: 'E-commerce',
        description: 'Une boutique en ligne avec panier d\'achat et paiement intégré.',
        thumbnail: '/images/projects/ecommerce.jpg',
        technologies: ['Next.js', 'React', 'Stripe', 'Tailwind CSS'],
        demoUrl: 'https://ecommerce-demo.vercel.app',
        codeUrl: 'https://github.com/username/ecommerce',
        moduleId: 'api-routes',
        lessonId: 'api-routes-lesson-4',
        completed: true,
        featured: false
      },
      {
        id: 'project-4',
        title: 'Dashboard analytique',
        description: 'Un tableau de bord pour visualiser des données analytiques avec des graphiques interactifs.',
        thumbnail: '/images/projects/dashboard.jpg',
        technologies: ['Next.js', 'React', 'D3.js', 'Recharts'],
        demoUrl: 'https://dashboard-demo.vercel.app',
        codeUrl: 'https://github.com/username/dashboard',
        moduleId: 'optimization',
        lessonId: 'optimization-lesson-3',
        completed: false,
        featured: false
      }
    ];
    
    // Simuler le chargement des projets depuis localStorage
    try {
      const storedProjects = JSON.parse(localStorage.getItem('portfolioProjects') || '[]');
      setProjects([...mockProjects, ...storedProjects]);
      
      // Initialiser les projets sélectionnés avec ceux qui sont complétés
      setPortfolioData(prev => ({
        ...prev,
        selectedProjects: [...mockProjects, ...storedProjects]
          .filter(p => p.completed)
          .map(p => p.id)
      }));
    } catch (error) {
      console.error("Erreur lors du chargement des projets:", error);
      setProjects(mockProjects);
    }
  }, []);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPortfolioData({
      ...portfolioData,
      [name]: value
    });
  };
  
  const handleSkillChange = (e) => {
    const value = e.target.value;
    if (e.key === 'Enter' && value.trim() !== '') {
      e.preventDefault();
      if (!portfolioData.skills.includes(value.trim())) {
        setPortfolioData({
          ...portfolioData,
          skills: [...portfolioData.skills, value.trim()]
        });
      }
      e.target.value = '';
    }
  };
  
  const removeSkill = (skillToRemove) => {
    setPortfolioData({
      ...portfolioData,
      skills: portfolioData.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  const toggleProjectSelection = (projectId) => {
    const isSelected = portfolioData.selectedProjects.includes(projectId);
    
    if (isSelected) {
      setPortfolioData({
        ...portfolioData,
        selectedProjects: portfolioData.selectedProjects.filter(id => id !== projectId)
      });
    } else {
      setPortfolioData({
        ...portfolioData,
        selectedProjects: [...portfolioData.selectedProjects, projectId]
      });
    }
  };
  
  const toggleProjectFeatured = (projectId) => {
    setProjects(projects.map(project => 
      project.id === projectId 
        ? { ...project, featured: !project.featured } 
        : project
    ));
  };
  
  const generatePortfolio = () => {
    // Dans une application réelle, nous enverrions les données au serveur
    // pour générer le portfolio et retourner une URL
    console.log('Données du portfolio:', portfolioData);
    console.log('Projets sélectionnés:', projects.filter(p => portfolioData.selectedProjects.includes(p.id)));
    
    // Simuler la génération du portfolio
    alert('Votre portfolio a été généré avec succès ! Vous pouvez maintenant le partager avec des recruteurs.');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-4 bg-indigo-600 text-white">
          <h2 className="text-xl font-bold">Créer votre portfolio professionnel</h2>
          <p className="text-indigo-100">Présentez vos projets et compétences aux recruteurs</p>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Colonne de gauche: Informations personnelles */}
            <div className="md:col-span-1 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Informations personnelles</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={portfolioData.name}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Titre professionnel *
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={portfolioData.title}
                      onChange={handleInputChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
                      Biographie
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="3"
                      value={portfolioData.bio}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Parlez de vous, de votre parcours et de vos objectifs professionnels..."
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Coordonnées</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={portfolioData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="github" className="block text-sm font-medium text-gray-700">
                      GitHub
                    </label>
                    <input
                      type="text"
                      id="github"
                      name="github"
                      value={portfolioData.github}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="https://github.com/username"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">
                      LinkedIn
                    </label>
                    <input
                      type="text"
                      id="linkedin"
                      name="linkedin"
                      value={portfolioData.linkedin}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700">
                      Site web personnel
                    </label>
                    <input
                      type="text"
                      id="website"
                      name="website"
                      value={portfolioData.website}
                      onChange={handleInputChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="https://monsite.com"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Compétences</h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="skills" className="block text-sm font-medium text-gray-700">
                      Ajouter une compétence
                    </label>
                    <input
                      type="text"
                      id="skills"
                      onKeyDown={handleSkillChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Tapez une compétence et appuyez sur Entrée"
                    />
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {portfolioData.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {skill}
                        <button 
                          type="button" 
                          onClick={() => removeSkill(skill)}
                          className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-600 focus:outline-none"
                        >
                          <span className="sr-only">Supprimer {skill}</span>
                          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Apparence</h3>
                
                <div>
                  <label htmlFor="theme" className="block text-sm font-medium text-gray-700">
                    Thème du portfolio
                  </label>
                  <select
                    id="theme"
                    name="theme"
                    value={portfolioData.theme}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="modern">Moderne</option>
                    <option value="minimal">Minimaliste</option>
                    <option value="classic">Classique</option>
                    <option value="dark">Sombre</option>
                  </select>
                </div>
              </div>
            </div>
            
            {/* Colonne de droite: Projets */}
            <div className="md:col-span-2">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Sélectionnez vos projets</h3>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <p className="text-sm text-gray-600">
                  Ces projets ont été créés pendant votre parcours d'apprentissage. Sélectionnez ceux que vous souhaitez inclure dans votre portfolio.
                </p>
              </div>
              
              <div className="space-y-4">
                {projects.length === 0 ? (
                  <div className="text-center py-8">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">Aucun projet</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      Vous n'avez pas encore de projets. Complétez des leçons pour créer des projets.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {projects.map((project) => (
                      <div 
                        key={project.id} 
                        className={`border rounded-lg overflow-hidden transition-colors ${
                          portfolioData.selectedProjects.includes(project.id) 
                            ? 'border-indigo-500 bg-indigo-50' 
                            : 'border-gray-200 hover:border-indigo-300'
                        } ${!project.completed ? 'opacity-60' : ''}`}
                      >
                        <div className="p-4">
                          <div className="flex items-start">
                            <div className="flex-shrink-0">
                              <div className="h-16 w-16 bg-gray-200 rounded-md flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                              </div>
                            </div>
                            <div className="ml-4 flex-1">
                              <div className="flex justify-between">
                                <h4 className="text-lg font-medium text-gray-900">{project.title}</h4>
                                <div className="flex items-center">
                                  {project.completed ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mr-2">
                                      Complété
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 mr-2">
                                      En cours
                                    </span>
                                  )}
                                </div>
                              </div>
                              <p className="mt-1 text-sm text-gray-600">{project.description}</p>
                              <div className="mt-2 flex flex-wrap gap-1">
                                {project.technologies.map((tech, index) => (
                                  <span 
                                    key={index} 
                                    className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                              
                              <div className="mt-4 flex justify-between items-center">
                                <div className="flex items-center">
                                  <input
                                    type="checkbox"
                                    id={`select-project-${project.id}`}
                                    checked={portfolioData.selectedProjects.includes(project.id)}
                                    onChange={() => toggleProjectSelection(project.id)}
                                    disabled={!project.completed}
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                  />
                                  <label htmlFor={`select-project-${project.id}`} className="ml-2 block text-sm text-gray-700">
                                    Inclure dans le portfolio
                                  </label>
                                </div>
                                
                                {portfolioData.selectedProjects.includes(project.id) && (
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      id={`feature-project-${project.id}`}
                                      checked={project.featured}
                                      onChange={() => toggleProjectFeatured(project.id)}
                                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label htmlFor={`feature-project-${project.id}`} className="ml-2 block text-sm text-gray-700">
                                      Mettre en avant
                                    </label>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-200 pt-6 flex justify-end">
            <button
              type="button"
              onClick={generatePortfolio}
              disabled={!portfolioData.name || portfolioData.selectedProjects.length === 0}
              className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white ${
                !portfolioData.name || portfolioData.selectedProjects.length === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              }`}
            >
              Générer mon portfolio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
