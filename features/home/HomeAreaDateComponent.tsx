import { AppPressable } from '@/components/ThemedPressable';
import { HomeAreaDateComponent as HomeAreaDateData } from '@/data/screen/home/HomeAreaDateComponent';
import { appColors } from '@/styles/appColors';
import { router } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Icon, Text } from 'react-native-paper';

const styles = StyleSheet.create({
  surface: {
    padding: 16,
    flex: 1,
    marginHorizontal: 8,
    marginTop: 8,
    backgroundColor: appColors.primary,
    borderRadius: 4,
  },
  textContainer: {
    flexDirection: 'row',
  },
  text: {
    color: 'white',
    marginStart: 16,
    marginEnd: 16,
  },
  spacer: {
    height: 8,
  },
});

export const HomeAreaDateComponent: React.FC<{
  data: HomeAreaDateData;
}> = ({ data }) => {
  return (
    <AppPressable
      style={styles.surface}
      onPress={() => {
        router.push('/area-selection-screen');
      }}
    >
      <>
        <View style={styles.textContainer}>
          <Icon source="map-marker" color="white" size={24} />
          <Text variant="titleMedium" style={styles.text}>
            {data.area}
          </Text>
        </View>
        <View style={styles.spacer} />
        <View style={styles.textContainer}>
          <Icon source="calendar" color="white" size={24} />
          <Text variant="titleMedium" style={styles.text}>
            {data.date}
          </Text>
        </View>
      </>
    </AppPressable>
  );
};
