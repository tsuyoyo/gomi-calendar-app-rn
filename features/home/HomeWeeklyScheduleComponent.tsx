import {
  HomeWeeklyScheduleComponent as HomeWeeklyScheduleComponentData,
  HomeWeeklyScheduleTrashTypeInfo,
} from '@/data/screen/home/HomeWeeklyScheduleComponent';
import { openBrowserAsync } from 'expo-web-browser';
import { StyleSheet } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
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
    marginVertical: 4,
  },
  trashName: {
    marginStart: 12,
    flex: 1,
  },
});

type HomeWeeklyScheduleComponentProps = {
  schedule: HomeWeeklyScheduleComponentData;
};

const Services: React.FC<{
  trashInfos: HomeWeeklyScheduleTrashTypeInfo[];
}> = ({ trashInfos }) =>
  trashInfos.map((type) => (
    <HomeTrashInfoComponent
      key={`weekly-${type.type.toString()}`}
      trashType={type.type}
      trashTypeName={type.name}
      guideUrl={type.guideUrl}
      schedule={type.schedule}
    />
  ));

export const HomeWeeklyScheduleComponent: React.FC<
  HomeWeeklyScheduleComponentProps
> = ({ schedule }) => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
          {schedule.title}
        </Text>
        <Divider style={{ marginVertical: 8 }} />
        <Services trashInfos={schedule.schedules} />
        <Divider style={{ marginVertical: 8 }} />
        <Text variant="bodyMedium">{schedule.description}</Text>
        <Button
          mode="text"
          onPress={() => openBrowserAsync(schedule.calendarLink.url)}
        >
          {schedule.calendarLink.title}
        </Button>
      </Card.Content>
    </Card>
  );
};
