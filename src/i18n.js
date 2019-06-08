import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Fetch from 'i18next-fetch-backend'

i18n
  .use(LanguageDetector)
  .use(Fetch)
  .init({
    debug: process.env.NODE_ENV === 'production' ? false : false,
    interpolation: { escapeValue: false },
    fallbackLng: 'en',
    ns: ['main', 'common'],
    whitelist: ['en', 'ru'],
    load: 'languageOnly',
    react: { wait: true },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      caches: ['localStorage']
    }
  })

export default i18n
