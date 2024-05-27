import { TrashType } from '@/data/TrashType';
import { appColors } from '@/styles/appColors';
import { openBrowserAsync } from 'expo-web-browser';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { HomeTrashTypeIcon } from './HomeTrashTypeIcon';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignContent: 'center',
    alignItems: 'center',
  },
  name: {
    marginStart: 12,
  },
  schedule: {
    flex: 1,
    textAlign: 'right',
  },
});

type HomeTrashInfoComponentProps = {
  trashType: TrashType;
  trashTypeName: string;
  guideUrl?: string;
  schedule?: string;
};
export const HomeTrashInfoComponent: React.FC<
  HomeTrashInfoComponentProps
> = ({ trashType, trashTypeName, guideUrl, schedule }) => {
  return (
    <View style={styles.container}>
      <HomeTrashTypeIcon type={trashType} />
      <Button
        style={styles.name}
        textColor={appColors.linkTextColor}
        mode="text"
        disabled={guideUrl === undefined}
        onPress={() => {
          if (guideUrl !== undefined) {
            openBrowserAsync(guideUrl);
          }
        }}
      >
        {trashTypeName}
      </Button>
      <Text style={styles.schedule} variant="bodyMedium">
        {schedule}
      </Text>
    </View>
  );
};
