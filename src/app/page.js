import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white py-20">
        <main className="container mx-auto px-4"> {/*This is where the changes were applied */}
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Apprenez Next.js de manière interactive</h1>
            <p className="text-xl mb-8">Une plateforme d'apprentissage gamifiée pour maîtriser Next.js à travers des leçons interactives et des exercices pratiques</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/lessons" className="btn-primary text-center">
                Commencer à apprendre
              </Link>
              <Link href="/dashboard" className="bg-white text-indigo-600 hover:bg-gray-100 font-medium py-2 px-4 rounded-md transition-colors text-center">
                Voir le tableau de bord
              </Link>
            </div>
          </div>
        </main> {/*This is where the changes were applied */}
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <main className="container mx-auto px-4"> {/*This is where the changes were applied */}
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi apprendre avec nous ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Apprentissage interactif</h3>
              <p className="text-gray-600">Apprenez en pratiquant avec des exercices interactifs et des défis de code en temps réel</p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progression à votre rythme</h3>
              <p className="text-gray-600">Suivez votre progression et apprenez à votre propre rythme avec des leçons structurées</p>
            </div>
            <div className="card text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Expérience gamifiée</h3>
              <p className="text-gray-600">Gagnez des points, débloquez des badges et montez en niveau tout en développant vos compétences</p>
            </div>
          </div>
        </main> {/*This is where the changes were applied */}
      </section>

      {/* Modules Preview Section */}
      <section className="py-16 bg-gray-50">
        <main className="container mx-auto px-4"> {/*This is where the changes were applied */}
          <h2 className="text-3xl font-bold text-center mb-12">Ce que vous allez apprendre</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card border-t-4 border-indigo-500">
              <h3 className="text-xl font-semibold mb-3">Introduction à Next.js</h3>
              <p className="text-gray-600 mb-4">Découvrez les bases de Next.js et ses avantages par rapport à React</p>
              <Link href="/lessons/module/1" className="text-indigo-600 font-medium hover:text-indigo-800">
                Explorer le module →
              </Link>
            </div>
            <div className="card border-t-4 border-indigo-500">
              <h3 className="text-xl font-semibold mb-3">Fondamentaux de Next.js</h3>
              <p className="text-gray-600 mb-4">Maîtrisez le routage, les pages et la récupération de données</p>
              <Link href="/lessons/module/2" className="text-indigo-600 font-medium hover:text-indigo-800">
                Explorer le module →
              </Link>
            </div>
            <div className="card border-t-4 border-indigo-500">
              <h3 className="text-xl font-semibold mb-3">Fonctionnalités Avancées</h3>
              <p className="text-gray-600 mb-4">Explorez les API Routes, les middlewares et l'optimisation</p>
              <Link href="/lessons/module/3" className="text-indigo-600 font-medium hover:text-indigo-800">
                Explorer le module →
              </Link>
            </div>
            <div className="card border-t-4 border-indigo-500">
              <h3 className="text-xl font-semibold mb-3">Déploiement et Performance</h3>
              <p className="text-gray-600 mb-4">Apprenez à déployer et optimiser vos applications Next.js</p>
              <Link href="/lessons/module/4" className="text-indigo-600 font-medium hover:text-indigo-800">
                Explorer le module →
              </Link>
            </div>
          </div>
        </main> {/*This is where the changes were applied */}
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 text-white">
        <main className="container mx-auto px-4 text-center"> {/*This is where the changes were applied */}
          <h2 className="text-3xl font-bold mb-6">Prêt à commencer votre voyage Next.js ?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Rejoignez des milliers d'apprenants qui maîtrisent Next.js grâce à notre plateforme interactive et gamifiée</p>
          <Link href="/lessons" className="bg-white text-indigo-600 hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors inline-block">
            Commencer gratuitement
          </Link>
        </main> {/*This is where the changes were applied */}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-lg font-semibold">NextJS Mimo Clone</p>
              <p className="text-gray-400">Apprenez Next.js de manière interactive</p>
            </div>
            <div className="flex space-x-4">
              <Link href="/about" className="text-gray-300 hover:text-white">
                À propos
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-white">
                Contact
              </Link>
              <Link href="/privacy" className="text-gray-300 hover:text-white">
                Confidentialité
              </Link>
            </div>
          </div>
          <div className="mt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} NextJS Mimo Clone. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}