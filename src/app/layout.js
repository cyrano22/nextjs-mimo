
import './globals.css'
import MainNavigation from '@/components/ui/MainNavigation'
import Footer from '@/components/ui/Footer'

export const metadata = {
  title: 'Next Mimo - Apprendre Next.js de façon interactive',
  description: 'Plateforme d\'apprentissage interactive pour Next.js, inspirée de Mimo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        <MainNavigation />
        <main className="pt-20 pb-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
