import { TrashType } from '@/data/TrashType';
import {
  HomeTodayComponent,
  HomeTodayComponentTrashInfo,
} from '@/data/screen/home/HomeTodayComponent';
import { openBrowserAsync } from 'expo-web-browser';
import { useTranslation } from 'react-i18next';
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
      <TrashInfo key={type.toString()} info={type} />
    ))
  );

export const HomeTodayScheduleComponent: React.FC<
  HomeTodayScheduleComponentProps
> = ({ todayComponent }) => {
  const trashTypes: HomeTodayComponentTrashInfo[] = [
    {
      type: TrashType.BURNABLE,
      name: '燃えるゴミ',
      link: {
        text: 'ガイド',
        url: 'https://www.city.narashino.lg.jp/material/files/group/35/R6dashikataguidebook_02.pdf',
      },
    },
    {
      type: TrashType.RECYCLABLE,
      name: '再利用可能ゴミ',
      link: {
        text: 'ガイド',
        url: 'https://www.city.narashino.lg.jp/material/files/group/35/R6dashikataguidebook_04.pdf',
      },
    },
    {
      type: TrashType.HARMFUL,
      name: '危険物',
      link: {
        text: 'ガイド',
        url: 'https://www.city.narashino.lg.jp/material/files/group/35/R6dashikataguidebook_04.pdf',
      },
    },
    {
      type: TrashType.INCOMBUSTIBLE,
      name: '燃えないごみ',
      link: {
        text: 'ガイド',
        url: 'https://www.city.narashino.lg.jp/material/files/group/35/R6dashikataguidebook_04.pdf',
      },
    },
  ];
  return (
    <Card style={styles.container}>
      <Card.Title
        title={
          <Text variant="titleMedium" style={{ fontWeight: 'bold' }}>
            {todayComponent.title}
          </Text>
        }
      />
      <Card.Content>
        <Services trashInfos={trashTypes} />
      </Card.Content>
    </Card>
  );
};
