import { LinkComponent } from '@/data/screen/common/LinkComponent';
import { LinkPreview } from '@flyerhq/react-native-link-preview';
import { StyleSheet, View } from 'react-native';
import { Card, Icon, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    paddingBottom: 16,
  },
  previewContainer: {
    paddingBottom: 0,
    paddingHorizontal: 0,
    paddingTop: 0,
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
          <View style={{ flexDirection: 'row' }}>
            <Icon source="information-outline" size={24} />
            <Text variant="bodyLarge" style={{ fontWeight: 'bold' }}>
              {link.title}
            </Text>
          </View>
        )}
        renderText={() => null}
      />
    </Card>
  );
};
