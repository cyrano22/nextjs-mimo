// src/data/lessons/module8/lesson1.js
const lesson1 = {
  id: '8-1',
  title: 'Internationalisation (i18n) avec Next.js',
  description: 'Apprenez à rendre votre application Next.js multilingue en utilisant le support i18n natif et des bibliothèques populaires.',
  difficulty: 'intermédiaire',
  duration: 60, // Durée augmentée pour introduire une lib
  tags: ['Next.js', 'i18n', 'Traduction', 'Multilingue', 'next-intl'],
  prerequisites: ['6-1'], // Connaissance de l'App Router est utile, ou Pages Router
  content: `
    <h2>Introduction à l'Internationalisation (i18n)</h2>
    <p>L'internationalisation (souvent abrégée en "i18n" - 18 lettres entre 'i' et 'n') est le processus de conception et de développement d'une application de manière à ce qu'elle puisse être facilement adaptée à différentes langues et régions sans modifications techniques majeures.</p>

    <h3>Support i18n Natif de Next.js</h3>
    <p>Next.js offre un support intégré pour l'internationalisation via sa configuration de routage i18n. Cela permet de gérer différentes versions linguistiques de vos pages basées sur des préfixes de locale dans l'URL (ex: \`/en/about\`, \`/fr/about\`) ou des domaines par langue.</p>
    
    <h4>Configuration dans <code>next.config.js</code></h4>
    <pre><code class="language-javascript">// next.config.js
module.exports = {
  i18n: {
    // Liste des langues supportées par votre application
    locales: ['en', 'fr', 'es'],
    // Langue par défaut si aucune locale n'est détectée ou spécifiée
    defaultLocale: 'en',
    // Optionnel: Détection automatique de la langue préférée de l'utilisateur (via header Accept-Language)
    // localeDetection: true, // true par défaut
  },
};</code></pre>
    <p>Avec cette configuration, Next.js gérera automatiquement le routage. Par exemple, visiter \`/fr/produits\` affichera la page des produits en français.</p>

    <h3>Gestion des Traductions avec une Bibliothèque (Ex: <code>next-intl</code>)</h3>
    <p>Bien que Next.js gère le routage, vous aurez besoin d'une solution pour gérer les chaînes de caractères traduites. Des bibliothèques comme <code>next-intl</code> (pour App Router et Pages Router) ou <code>next-i18next</code> (principalement pour Pages Router, mais s'adapte) sont très populaires.</p>
    <p>Nous allons prendre <code>next-intl</code> comme exemple. Elle s'intègre bien avec l'App Router et Server Components.</p>

    <h4>1. Installation et Configuration de <code>next-intl</code></h4>
    <pre><code class="language-bash">npm install next-intl</code></pre>
    <p>Créez un fichier <code>i18n.js</code> (ou <code>i18n.ts</code>) à la racine :</p>
    <pre><code class="language-javascript">// i18n.js
import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({locale}) => {
  // Chargez les messages pour la locale donnée.
  // Vous pouvez charger dynamiquement le fichier JSON ici.
  return {
    messages: (await import(\`./messages/\${locale}.json\`)).default
  };
});</code></pre>
    <p>Créez un dossier <code>messages</code> avec vos fichiers de traduction :</p>
    <pre><code>// messages/en.json
{
  "HomePage": {
    "title": "Welcome to our Website!",
    "description": "Discover our amazing products and services."
  },
  "Navbar": {
    "home": "Home",
    "about": "About Us"
  }
}

// messages/fr.json
{
  "HomePage": {
    "title": "Bienvenue sur Notre Site Web !",
    "description": "Découvrez nos produits et services incroyables."
  },
  "Navbar": {
    "home": "Accueil",
    "about": "À Propos"
  }
}</code></pre>
    <p>Configurez le middleware pour <code>next-intl</code> (<code>middleware.js</code>) :</p>
    <pre><code class="language-javascript">// middleware.js
import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'fr', 'es'], // Doit correspondre à next.config.js et vos fichiers messages
  defaultLocale: 'en'
});
 
export const config = {
  // Ignorer les chemins qui ne nécessitent pas d'i18n (ex: assets, api)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};</code></pre>

    <h4>2. Utilisation dans les Composants (avec <code>next-intl</code>)</h4>
    <p>Dans les Server Components (App Router) :</p>
    <pre><code class="language-javascript">// app/[locale]/page.jsx (Exemple de page d'accueil)
import { useState } from 'react';
import { useTranslations, useLocale, Link } from 'next-intl';
import { useRouter } from 'next-intl/client';

export default function HomePage() {
  const t = useTranslations('HomePage'); // 'HomePage' correspond à la clé dans vos JSON
  const currentLocale = useLocale();
  const router = useRouter();
  const locales = ['en', 'fr']; // Liste des langues supportées

  const handleChangeLanguage = (locale) => {
    if (locale !== currentLocale) {
      router.push(router.pathname, router.pathname, { locale });
    }
  };

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span>Langue:</span>
        {locales.map((locale) => (
          <button
            key={locale}
            onClick={() => handleChangeLanguage(locale)}
            disabled={locale === currentLocale}
            style={{
              padding: '5px 10px',
              border: '1px solid #ccc',
              borderRadius: '4px',
              cursor: locale === currentLocale ? 'default' : 'pointer',
              backgroundColor: locale === currentLocale ? '#f0f0f0' : 'white'
            }}
          >
            {locale.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}</code></pre>
    <p>Dans les Client Components (<code>'use client';</code>) :</p>
    <pre><code class="language-javascript">// components/ClientTranslatedComponent.jsx
'use client';
import {useTranslations} from 'next-intl';

export default function ClientTranslatedComponent() {
  const t = useTranslations('SomeNamespace');
  return <button>{t('submitButton')}</button>;
}</code></pre>
    <p>Pour utiliser <code>useTranslations</code> dans les Client Components, vous devez envelopper votre layout racine avec <code>NextIntlClientProvider</code>.</p>
    <pre><code class="language-javascript">// app/[locale]/layout.jsx
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
 
export default async function LocaleLayout({children, params: {locale}}) {
  const messages = await getMessages(); // Récupère les messages pour la locale actuelle
 
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* Votre Header, Navbar, etc. ici */}
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}</code></pre>

    <h3>Sélecteur de Langue</h3>
    <p>Pour permettre aux utilisateurs de changer de langue, vous pouvez utiliser le hook <code>useRouter</code> de Next.js (ou des helpers de <code>next-intl</code>).</p>
  `,
  example: {
    title: 'Composant Navbar Multilingue avec Sélecteur de Langue (next-intl & App Router)',
    code: `// components/Navbar.jsx
'use client'; // Si le sélecteur est interactif

import Link from 'next/link';
import { usePathname } from 'next/navigation'; // Pour App Router
import { useLocale, useTranslations } from 'next-intl';

export default function Navbar() {
  const t = useTranslations('Navbar');
  const locale = useLocale();
  const pathname = usePathname(); // Récupère le chemin sans la locale

  // Fonction pour reconstruire le chemin avec une nouvelle locale
  // next-intl gère souvent cela via son Link ou des configurations de middleware.
  // Pour un exemple simple, si pathname inclut déjà la locale (ex: '/fr/about')
  // on pourrait le manipuler, mais next-intl abstrait cela.
  // Le Link de next-intl est généralement préféré: import {Link} from '@/navigation'; (après configuration)

  // Exemple simple avec Link de next/link si next-intl/link n'est pas configuré
  const getLocalizedPath = (targetLocale) => {
    // Ceci est une simplification. Une vraie app utiliserait le Link de next-intl
    // ou une logique plus robuste pour reconstruire le chemin.
    // Le middleware de next-intl est censé gérer la redirection et le préfixe.
    // Si on est sur /fr/about, et on clique sur 'en', on veut /en/about.
    // pathname ici pourrait être /about si la locale est déjà retirée par un hook de next-intl
    // ou /fr/about si c'est le pathname brut.
    // Avec \\\`next-intl\\\` et son \\\`Link\\\` custom, c'est plus simple : <Link href={pathname} locale="en">EN</Link>
    return \\\`/\${targetLocale}\${pathname.includes(\\\`/\${locale}\\\`)? pathname.substring(locale.length + 1) : pathname}\\\`;
  };


  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', background: '#eee' }}>
      <div>
        <Link href="/" locale={locale} style={{ marginRight: '10px' }}>{t('home')}</Link>
        <Link href="/about" locale={locale}>{t('about')}</Link>
      </div>
      <div>
        <span style={{ marginRight: '10px' }}>Langue:</span>
        {['en', 'fr', 'es'].map((loc) => (
          <Link 
            key={loc} 
            href={pathname} // Le Link de next-intl/navigation est mieux ici
            locale={loc}
            style={{ 
              marginRight: '5px', 
              fontWeight: locale === loc ? 'bold' : 'normal',
              textDecoration: locale === loc ? 'underline' : 'none'
            }}
          >
            {loc.toUpperCase()}
          </Link>
        ))}
      </div>
    </nav>
  );
}

// N'oubliez pas d'avoir des traductions pour Navbar.home et Navbar.about
// dans vos fichiers messages/en.json, messages/fr.json etc.
// Exemple:
// messages/en.json -> "Navbar": { "home": "Home", "about": "About Us" }
// messages/fr.json -> "Navbar": { "home": "Accueil", "about": "À Propos" }
`,
    explanation: 'Ce composant Navbar utilise `useTranslations` de `next-intl` pour afficher des liens traduits et un sélecteur de langue simple. Le `Link` de `next-intl` (souvent importé depuis un alias comme `@/navigation`) est généralement recommandé pour une gestion transparente des chemins localisés.'
  },
  exercise: {
    title: 'Créer un Sélecteur de Langue Amélioré',
    description: 'Implémentez un composant `LanguageSwitcher` qui affiche les langues disponibles sous forme de boutons ou de liens. La langue active doit être mise en évidence et non cliquable. Utilisez `next-intl` (ou la bibliothèque i18n de votre choix) pour traduire les noms des langues (ex: "Français" au lieu de "FR").',
    initialCode: `// components/LanguageSwitcher.jsx
'use client';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation'; // Pour App Router
import Link from 'next/link'; // Ou le Link de next-intl si configuré

const locales = ['en', 'fr', 'es']; // Devrait venir de votre config

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher'); // Supposons un namespace 'LanguageSwitcher'
  const currentLocale = useLocale();
  const pathname = usePathname();

  // TODO:
  // 1. Mapper sur 'locales' pour créer un lien/bouton pour chaque langue.
  // 2. Utiliser t(\\\`\\${locale}\\\`) pour obtenir le nom traduit de la langue (ex: t('en') -> "English").
  //    (Nécessite des entrées comme "en": "English", "fr": "Français" dans LanguageSwitcher.json)
  // 3. Mettre en évidence la 'currentLocale' et la rendre non cliquable ou désactivée.
  // 4. Assurer que les liens pointent vers la version correcte de la page actuelle dans la nouvelle langue.
  //    (Le Link de next-intl simplifie cela).

  return (
    <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <span>{t('selectLanguage')}:</span>
      {locales.map((locale) => (
        <button
          key={locale}
          onClick={() => handleChangeLanguage(locale)}
          disabled={locale === currentLocale}
          style={{
            padding: '5px 10px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: locale === currentLocale ? 'default' : 'pointer',
            backgroundColor: locale === currentLocale ? '#f0f0f0' : 'white'
          }}
        >
          {t(locale)}
        </button>
      ))}
    </div>
  );
}

// Fichier de traduction exemple: messages/en.json
// {
//   "LanguageSwitcher": {
//     "selectLanguage": "Select Language",
//     "en": "English",
//     "fr": "French",
//     "es": "Spanish"
//   }
// }
`,
    solution: `// components/LanguageSwitcher.jsx
'use client';
import { useLocale, useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
// Idéalement, utilisez le Link configuré par next-intl, souvent aliasé.
// import {Link} from '@/navigation'; // Si vous avez configuré next-intl/navigation
import NextLink from 'next/link'; // Utilisation de next/link pour cet exemple générique

// Ces locales devraient idéalement venir de votre configuration i18n (i18n.js ou next.config.js)
const supportedLocales = ['en', 'fr', 'es'];

export default function LanguageSwitcher() {
  // Supposons un namespace "Global" ou "Common" pour les noms de langue si ce n'est pas spécifique au switcher
  const t = useTranslations('Global'); 
  const currentLocale = useLocale();
  const pathname = usePathname(); // Le pathname sans la locale (si next-intl est bien configuré)

  return (
    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', padding: '0.5rem', background: '#f0f0f0', borderRadius: '5px' }}>
      <span style={{ marginRight: '0.5rem' }}>{t('language')}:</span> {/* Supposons Global.language -> "Language" */}
      {supportedLocales.map((locale) => {
        const isActive = locale === currentLocale;
        return (
          <NextLink
            key={locale}
            href={pathname} // next-intl Link gère cela pour pointer vers la version localisée du pathname
            locale={locale} // Spécifie la locale cible pour le Link
            passHref // Important si le Link de next/link enveloppe un composant custom ou <a>
            legacyBehavior={false} // Recommandé pour les nouvelles versions de Next.js
            aria-disabled={isActive}
            style={{
              padding: '0.3rem 0.6rem',
              textDecoration: 'none',
              color: isActive ? '#007bff' : '#333',
              fontWeight: isActive ? 'bold' : 'normal',
              border: isActive ? '2px solid #007bff' : '2px solid transparent',
              borderRadius: '4px',
              pointerEvents: isActive ? 'none' : 'auto',
              opacity: isActive ? 0.7 : 1,
              transition: 'all 0.2s ease-in-out',
            }}
          >
            {t(locale)} {/* Traduit 'en' en "English", 'fr' en "Français", etc. */}
          </NextLink>
        );
      })}
    </div>
  );
}

// Fichier de traduction exemple (ex: messages/en.json):
// {
//   "Global": {
//     "language": "Language",
//     "en": "English",
//     "fr": "French",
//     "es": "Spanish"
//   }
// }
// Fichier de traduction exemple (ex: messages/fr.json):
// {
//   "Global": {
//     "language": "Langue",
//     "en": "Anglais",
//     "fr": "Français",
//     "es": "Espagnol"
//   }
// }
`,
  },
  quiz: {
    title: 'Quiz sur l\'Internationalisation avec Next.js',
    questions: [
      {
        question: 'Dans `next.config.js`, quelle propriété définit la langue par défaut de l\'application ?',
        options: ['defaultLang', 'primaryLocale', 'defaultLocale', 'mainLanguage'],
        correctAnswer: 'defaultLocale',
      },
      {
        question: 'Si vous utilisez une bibliothèque comme `next-intl`, où sont généralement stockés les fichiers de traduction (ex: `en.json`, `fr.json`) ?',
        options: ['Dans `public/locales/`', 'Dans un dossier `messages/` ou `locales/` à la racine (configurable)', 'Directement dans les composants', 'Dans `next.config.js`'],
        correctAnswer: 'Dans un dossier `messages/` ou `locales/` à la racine (configurable)',
        explanation: 'Avec des bibliothèques comme next-intl, la convention est souvent un dossier `messages/` ou `locales/` à la racine, mais cela peut être configuré.'
      },
      {
        question: 'Quel hook est couramment fourni par des bibliothèques comme `next-intl` ou `next-i18next` pour accéder aux chaînes traduites dans les composants React ?',
        options: ['useRouterLocale()', 'useLanguage()', 'useTranslations() (ou `useTranslation()`)', 'useMessages()'],
        correctAnswer: 'useTranslations() (ou `useTranslation()`)',
      },
    ],
  },
  project: {
    title: 'Site Vitrine Multilingue Simple',
    description: 'Créez un site vitrine de 2-3 pages (Accueil, À Propos, Contact) entièrement traduisible en au moins deux langues (anglais et français). Utilisez `next-intl` ou une bibliothèque similaire.',
    requirements: [
      'Configuration correcte de l\'i18n dans Next.js (`next.config.js`, `middleware.js` pour `next-intl`).',
      'Mise en place des fichiers de messages (ex: `messages/en.json`, `messages/fr.json`).',
      'Traduction de tout le contenu textuel des pages (titres, paragraphes, labels de boutons).',
      'Implémentation d\'un sélecteur de langue fonctionnel et stylisé.',
      'Assurer une navigation correcte entre les versions linguistiques des pages.',
      'Utilisation de `NextIntlClientProvider` pour les Client Components si nécessaire.'
    ],
    tips: [
      'Commencez par structurer vos fichiers de messages avec des namespaces logiques.',
      'Testez fréquemment le changement de langue sur toutes les pages.',
      'Utilisez le composant `Link` fourni par `next-intl` (ou votre bibliothèque i18n) pour une gestion simplifiée des URL localisées.',
      'Pensez à la mise en page qui pourrait devoir s\'adapter à des longueurs de texte différentes selon la langue.'
    ],
    bonus: [
      'Adaptez le format des dates ou des nombres affichés en fonction de la locale (voir leçon 8-3).',
      'Implémentez la traduction des métadonnées de la page (titre de l\'onglet, description) pour le SEO.',
      'Gérez les images ou les médias spécifiques à une langue (si applicable).'
    ]
  },
  hasExercise: true,
  hasQuiz: true,
  hasProject: true
};

export default lesson1;