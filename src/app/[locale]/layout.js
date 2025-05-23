import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';

// Fonction pour charger les messages de traduction
export function generateStaticParams() {
  return [{ locale: 'en' }, { locale: 'fr' }];
}

export default async function LocaleLayout({ children, params: { locale } }) {
  let messages;
  try {
    // Charger les messages de traduction pour la locale actuelle
    messages = (await import(`../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}:`, error);
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
