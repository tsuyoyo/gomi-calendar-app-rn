import { getLocales } from 'expo-localization';

export const buildCommonHeader = () => {
  const languageCode = getLocales()[0].languageCode;
  if (languageCode !== null) {
    return {
      locale: languageCode,
    };
  } else {
    return {};
  }
};
