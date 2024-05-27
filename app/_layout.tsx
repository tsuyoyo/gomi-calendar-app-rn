import { store } from '@/redux/store';
import { useFonts } from 'expo-font';
import { useLocales } from 'expo-localization';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import {
  MD3LightTheme as DefaultTheme,
  Icon,
  PaperProvider,
  Text,
} from 'react-native-paper';
import 'react-native-reanimated';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import '../i18n/i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const theme = {
  ...DefaultTheme,
  // myOwnProperty: true,
  colors: {
    ...DefaultTheme.colors,
    // primary: appColors.primary,
    // secondary: appColors.secondary,
    // tertiary: '#a1b2c3',
  },
};

export const RootLayout: React.FC = () => {
  if (__DEV__) {
    require('./ReactotronConfig');
  }
  const { t, i18n } = useTranslation(['common', 'area']);

  const locales = useLocales();

  useEffect(() => {
    if (locales.length > 0) {
      const langCode = locales[0].languageCode;
      if (langCode !== null) {
        i18n.changeLanguage(langCode);
      }
    }
    console.log(`i18n.language - ${locales[0].languageCode}`);
  }, [i18n, i18n.language, locales]);

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RootSiblingParent>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: true,
                headerTitle: '',
                headerLeft: () => (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignContent: 'center',
                    }}
                  >
                    <Icon source="trash-can-outline" size={24} />
                    <Text
                      variant="titleMedium"
                      style={{ marginStart: 16 }}
                    >
                      {t('app-title')}
                    </Text>
                  </View>
                ),
              }}
            />
            <Stack.Screen
              name="area-selection-screen"
              options={{
                headerShown: true,
                headerTitle: t('area:title'),
              }}
            />
            <Stack.Screen
              name="oss-license-screen"
              options={{
                headerShown: true,
                headerTitle: 'OSS License',
              }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PaperProvider>
      </Provider>
    </RootSiblingParent>
  );
};

export default RootLayout;
