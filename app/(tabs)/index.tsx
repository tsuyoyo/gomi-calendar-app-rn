import { HomeContentsList } from '@/features/home/HomeContentsList';
import { useLazyGetHomeScreenQuery } from '@/redux/apiSlice/homeScreenApi';
import { AppDispatch, RootState } from '@/redux/store';
import { loadAreaConfig } from '@/redux/thunk/storage';
import { router } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Dialog, Text } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

export default function HomeScreen() {
  const dispatch = useDispatch<AppDispatch>();
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  const { t } = useTranslation(['common', 'home']);
  const areaConfig = useSelector<
    RootState,
    string | undefined | null
  >((s) => s.area.areaId);
  const [trigger, result] = useLazyGetHomeScreenQuery();

  useEffect(() => {
    dispatch(loadAreaConfig());
  }, [dispatch]);

  useEffect(() => {
    if (areaConfig === undefined) {
      // Do nothing, because it's not been loaded the data from storage yet.
    } else if (areaConfig === null) {
      setIsDialogVisible(true);
    } else {
      trigger(areaConfig);
      setIsDialogVisible(false);
    }
  }, [areaConfig, t, trigger]);

  const openAreaConfig = useCallback(() => {
    router.push('/area-selection-screen');
    setIsDialogVisible(false);
  }, []);

  const { data, error, isError, isLoading, isFetching } = result;

  if (isDialogVisible) {
    return (
      <Dialog visible={isDialogVisible} onDismiss={openAreaConfig}>
        <Dialog.Title>{t('common:welcome')}</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">
            {t('home:no-area-config-alert')}
          </Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={openAreaConfig}>{t('common:ok')}</Button>
        </Dialog.Actions>
      </Dialog>
    );
  }

  if (data === undefined) {
    return null;
  }
  return (
    <>
      <HomeContentsList response={data} isLoading={isFetching} />
    </>
  );
}
