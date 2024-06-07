import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { List } from 'react-native-paper';

export const InfoReminderConfigComponent: React.FC = () => {
  const { t } = useTranslation('reminder-config');
  return (
    <List.Item
      title={t('title')}
      onPress={() => router.push('reminder-config-screen')}
    />
  );
};
