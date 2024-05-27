import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { List } from 'react-native-paper';

export const InfoAreaConfigComponent: React.FC = () => {
  const { t } = useTranslation(['area']);
  return (
    <List.Item
      title={t('title')}
      onPress={() => router.push('/area-selection-screen')}
    />
  );
};
