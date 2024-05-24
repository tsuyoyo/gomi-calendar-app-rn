import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import 'intl-pluralrules';
import en from '../i18n/en.json';
import ja from '../i18n/ja.json';

// For Type (i18next.d.ts)
// Ref: https://www.i18next.com/overview/typescript
export const defaultNS = 'common';
export const resources = {
  ja: ja,
} as const;

i18n.use(initReactI18next).init({
  resources: {
    en: en,
    ja: ja,
  },
  // language to use,
  // more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
  lng: 'en',

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
  defaultNS: defaultNS,
  fallbackLng: {
    default: ['en'],
  },
});

export default i18n;
