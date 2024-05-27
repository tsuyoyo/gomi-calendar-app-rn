import RNLanguageDetector from '@os-team/i18next-react-native-language-detector';
import i18n from 'i18next';
import 'intl-pluralrules';
import { initReactI18next } from 'react-i18next';
import { NativeModules } from 'react-native';
import en from '../i18n/en.json';
import ja from '../i18n/ja.json';

const deviceInfo = NativeModules.DeviceInfo;

const locale = deviceInfo.localeIdentifier;
console.log(`locale - ${locale}`);

// For Type (i18next.d.ts)
// Ref: https://www.i18next.com/overview/typescript
export const defaultNS = 'common';
export const resources = {
  ja: ja,
} as const;

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'ja',
    supportedLngs: ['en', 'ja'],
    resources: {
      en: en,
      ja: ja,
    },
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
    defaultNS: defaultNS,
  });

export default i18n;
