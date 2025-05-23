import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
const locales = ['en', 'fr'];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) {
    throw new Error(`Locale '${locale}' is not supported.`);
  }

  return {
    messages: (await import(`../public/locales/${locale}.json`)).default,
    locale: locale as string
  };
});
