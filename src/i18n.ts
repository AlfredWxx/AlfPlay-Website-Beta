import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enCommon from './locales/en/common.json';
import zhCommon from './locales/zh/common.json';
import frCommon from './locales/fr/common.json';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: {
      en: {
        common: enCommon,
      },
      zh: {
        common: zhCommon,
      },
      fr: {
        common: frCommon,
      },
    },
    fallbackLng: 'en',
    debug: true,
    ns: ['common'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n; 