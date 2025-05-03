
import './globals.css'
import MainNavigation from '../components/ui/MainNavigation'
import Footer from '../components/ui/Footer'

export const metadata = {
  title: 'Next Mimo - Apprendre Next.js de façon interactive',
  description: 'Une plateforme interactive pour apprendre Next.js inspirée par Mimo',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="min-h-screen flex flex-col bg-gray-50">
        <MainNavigation />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
