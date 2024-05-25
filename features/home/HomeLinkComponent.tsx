import { ThemedText } from '@/components/ThemedText';
import { LinkComponent } from '@/data/screen/common/LinkComponent';
import * as WebBrowser from 'expo-web-browser';
import { useTranslation } from 'react-i18next';

export const HomeLinkComponent: React.FC<{ link: LinkComponent }> = ({
  link,
}) => {
  const { t } = useTranslation(['common']);
  return (
    <>
      <ThemedText type="subtitle">{link.title}</ThemedText>
      <ThemedText
        type="link"
        onPress={() => WebBrowser.openBrowserAsync(link.url)}
      >
        {t('common:open-by-tap')}
      </ThemedText>
    </>
  );
};
