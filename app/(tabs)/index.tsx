import { Link, router } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Alert,
  Image,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Counter } from '@/features/counter/Counter';
import { AppDispatch, RootState } from '@/redux/store';
import { loadAreaConfig } from '@/redux/thunk/storage';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const { t, i18n } = useTranslation([
    'translation',
    'common',
    'home',
  ]);
  const areaConfig = useSelector<RootState>((s) => s.area.areaId);

  useEffect(() => {
    dispatch(loadAreaConfig());
  }, [dispatch]);

  useEffect(() => {
    if (areaConfig === undefined || areaConfig === null) {
      Alert.alert(
        t('common:welcome'),
        t('home:no-area-config-alert'),
        [
          {
            text: t('home:open-area-config'),
            onPress: () => {
              router.push('/area-selection-screen');
            },
          },
        ],
      );
    }
  }, [areaConfig, t]);

  const [currentLanguage, setCurrentLanguage] = useState<'ja' | 'en'>(
    'ja',
  );

  return (
    <>
      {/* <AreaSelectionModal
        isVisible={areaConfig === undefined || areaConfig === null}
      /> */}
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText
            onPress={() => {
              const lang = currentLanguage === 'ja' ? 'en' : 'ja';
              setCurrentLanguage(lang);
              i18n.changeLanguage(lang);
            }}
            type="title"
          >
            {t('translation:welcome')}
          </ThemedText>
          {/* <HelloWave /> */}
          <Counter />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Text>Home Screen</Text>
          <Link href="/area-selection-screen">Present modal</Link>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit{' '}
            <ThemedText type="defaultSemiBold">
              app/(tabs)/index.tsx
            </ThemedText>{' '}
            to see changes. Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2: Explore</ThemedText>
          <ThemedText>
            Tap the Explore tab to learn more about what's included in
            this starter app.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">
            Step 3: Get a fresh start
          </ThemedText>
          <ThemedText>
            When you're ready, run{' '}
            <ThemedText type="defaultSemiBold">
              npm run reset-project
            </ThemedText>{' '}
            to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
            directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">
              app-example
            </ThemedText>
            .
          </ThemedText>
        </ThemedView>
      </ParallaxScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  noAreaConfig: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  modalContent: {
    height: '80%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
