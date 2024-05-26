import {
  HomeTodayComponent,
  HomeTodayComponentTrashInfo,
} from '@/data/screen/home/HomeTodayComponent';
import { appColors } from '@/styles/appColors';
import { openBrowserAsync } from 'expo-web-browser';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Divider, Text } from 'react-native-paper';
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
  trashName: {
    marginStart: 12,
  },
});

type HomeTodayScheduleComponentProps = {
  todayComponent: HomeTodayComponent;
};

const TrashInfo: React.FC<{ info: HomeTodayComponentTrashInfo }> = ({
  info,
}) => {
  const linkInfo = info.link;
  return (
    <View style={styles.trashContainer}>
      <HomeTrashTypeIcon type={info.type} />
      {linkInfo !== undefined ? (
        <Button
          style={styles.trashName}
          textColor={appColors.linkTextColor}
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
    </View>
  );
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
      <TrashInfo key={type.type.toString()} info={type} />
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
