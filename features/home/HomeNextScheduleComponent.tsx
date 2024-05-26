import {
  HomeNextComponent,
  HomeNextComponentTrashInfo,
} from '@/data/screen/home/HomeNextComponent';
import { openBrowserAsync } from 'expo-web-browser';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { HomeTrashTypeIcon } from './HomeTrashTypeIcon';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 64,
    alignContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    marginStart: 16,
  },
  trashContainer: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  trashIcon: {},
  trashName: {
    marginStart: 12,
  },
  collectionDate: {
    textAlign: 'right',
    flex: 1,
  },
});

type HomeNextScheduleComponentProps = {
  nextComponent: HomeNextComponent;
};

const Services: React.FC<{
  trashInfos: HomeNextComponentTrashInfo[];
}> = ({ trashInfos }) =>
  trashInfos.map((info) => {
    const linkInfo = info.link;
    return (
      <View
        key={`next-${info.type.toString()}`}
        style={styles.trashContainer}
      >
        <HomeTrashTypeIcon type={info.type} />
        {linkInfo !== undefined ? (
          <Button
            style={styles.trashName}
            mode="text"
            onPress={() => openBrowserAsync(linkInfo.url)}
          >
            {info.name}
          </Button>
        ) : (
          <Text variant="bodyLarge" style={styles.trashName}>
            {info.name}
          </Text>
        )}
        <Text variant="bodyMedium" style={styles.collectionDate}>
          {info.nextDate}
        </Text>
      </View>
    );
  });

export const HomeNextScheduleComponent: React.FC<
  HomeNextScheduleComponentProps
> = ({ nextComponent }) => {
  return (
    <Card style={styles.container}>
      <Card.Title
        title={
          <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
            {nextComponent.title}
          </Text>
        }
      />
      <Card.Content>
        <Services trashInfos={nextComponent.trashTypes} />
      </Card.Content>
    </Card>
  );
};
