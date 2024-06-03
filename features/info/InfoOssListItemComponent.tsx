import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { List } from 'react-native-paper';

export const InfoOssListItemComponent: React.FC = () => {
  const { t } = useTranslation('common');
  return (
    <List.Item
      title={t('oss-license')}
      onPress={() => router.push('oss-license-screen')}
    />
  );
};
