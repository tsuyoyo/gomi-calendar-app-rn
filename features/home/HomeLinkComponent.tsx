import { LinkComponent } from '@/data/screen/common/LinkComponent';
import { appColors } from '@/styles/appColors';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { StyleSheet } from 'react-native';
import { Card, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 8,
  },
  previewContainer: {
    paddingBottom: 16,
  },
});

type HomeLinkComponentProps = {
  link: LinkComponent;
};

export const HomeLinkComponent: React.FC<HomeLinkComponentProps> = ({
  link,
}) => {
  return (
    <Card style={styles.container}>
      <LinkPreview
        containerStyle={styles.previewContainer}
        text={link.url}
        enableAnimation
        renderTitle={() => (
          <Text variant="titleLarge" style={{ fontWeight: 'bold' }}>
            {link.title}
          </Text>
        )}
        renderText={(text) => (
          <Text
            variant="titleSmall"
            style={{ color: appColors.linkTextColor }}
          >
            {text}
          </Text>
        )}
      />
    </Card>
  );
};
