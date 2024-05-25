import { ThemedText } from '@/components/ThemedText';
import { LinkComponent } from '@/data/screen/common/LinkComponent';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingVertical: 8,
  },
  previewContainer: {
    backgroundColor: 'grey',
    borderRadius: 20,
    // marginVertical: 8,
    paddingBottom: 16,
    overflow: 'hidden',
  },
});

export const HomeLinkComponent: React.FC<{ link: LinkComponent }> = ({
  link,
}) => {
  const { t } = useTranslation(['common']);
  return (
    <View style={styles.container}>
      <LinkPreview
        containerStyle={styles.previewContainer}
        text={link.url}
        enableAnimation
        renderTitle={() => (
          <ThemedText type="defaultSemiBold">{link.title}</ThemedText>
        )}
      />
    </View>
  );
};
