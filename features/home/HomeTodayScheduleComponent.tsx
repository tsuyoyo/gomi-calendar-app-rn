import {
  HomeTodayComponent,
  HomeTodayComponentTrashInfo,
} from '@/data/screen/home/HomeTodayComponent';
import { useTranslation } from 'react-i18next';
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
  trashName: {
    marginStart: 12,
  },
});

type HomeTodayScheduleComponentProps = {
  todayComponent: HomeTodayComponent;
};

const NoTrashCollection: React.FC = () => {
  const { t } = useTranslation(['home']);
  return (
    <Text variant="bodyMedium">{t('home:no-collection-today')}</Text>
  );
};

const Services: React.FC<{
  trashInfos: HomeTodayComponentTrashInfo[];
}> = ({ trashInfos }) =>
  trashInfos.length === 0 ? (
    <NoTrashCollection />
  ) : (
    trashInfos.map((type) => (
      <HomeTrashInfoComponent
        key={`today-${type.type.toString()}`}
        trashType={type.type}
        trashTypeName={type.name}
        guideUrl={type.link?.url}
      />
    ))
  );

export const HomeTodayScheduleComponent: React.FC<
  HomeTodayScheduleComponentProps
> = ({ todayComponent }) => {
  return (
    <Card style={styles.container}>
      <Card.Content>
        <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
          {todayComponent.title}
        </Text>
        <Divider style={{ marginVertical: 8 }} />
        <Services trashInfos={todayComponent.trashTypes} />
      </Card.Content>
    </Card>
  );
};
