import { useColorScheme } from '@/hooks/useColorScheme';
import { store } from '@/redux/store';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { PaperProvider } from 'react-native-paper';
import 'react-native-reanimated';
import { RootSiblingParent } from 'react-native-root-siblings';
import { Provider } from 'react-redux';
import '../i18n/i18n';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const RootLayout: React.FC = () => {
  if (__DEV__) {
    require('./ReactotronConfig');
  }

  // const { i18n } = useTranslation([]);
  // i18n.changeLanguage('ja');

  const colorScheme = useColorScheme();
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
    // <ThemeProvider
    //   value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    // >

    <RootSiblingParent>
      <Provider store={store}>
        <PaperProvider>
          <Stack>
            <Stack.Screen
              name="(tabs)"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
        </PaperProvider>
      </Provider>
    </RootSiblingParent>
  );
};

export default RootLayout;
