import {
  HomeNextComponent,
  HomeNextComponentTrashInfo,
} from '@/data/screen/home/HomeNextComponent';
import { StyleSheet } from 'react-native';
import { Card, Divider, Text } from 'react-native-paper';
import { HomeTrashInfoComponent } from './HomeTrashInfoComponent';

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
    return (
      <HomeTrashInfoComponent
        key={`next-${info.type.toString()}`}
        trashType={info.type}
        trashTypeName={info.name}
        guideUrl={info.link?.url}
        schedule={info.nextDate}
      />
    );
  });

export const HomeNextScheduleComponent: React.FC<
  HomeNextScheduleComponentProps
> = ({ nextComponent }) => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
          {nextComponent.title}
        </Text>
        <Divider
          style={{
            marginVertical: 8,
          }}
        />
        <Services trashInfos={nextComponent.trashTypes} />
      </Card.Content>
    </Card>
  );
};
