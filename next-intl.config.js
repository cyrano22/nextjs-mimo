module.exports = {
  defaultLocale: 'en',
  locales: ['en', 'fr'],
  localeDetection: true,
  // Load translations from the messages directory
  loadMessages: async (locale) => {
    try {
      return (await import(`./messages/${locale}.json`)).default;
    } catch (error) {
      console.error(`Failed to load messages for locale ${locale}:`, error);
      return {};
    }
  },
};
