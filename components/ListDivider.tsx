import { StyleSheet, View } from 'react-native';
import { appColors } from '@/styles/appColors';

const styles = StyleSheet.create({
  separator: {
    height: 0.5,
    backgroundColor: appColors.listDivider,
  },
});

export const ListDivider: React.FC = () => {
  return <View style={styles.separator} />;
};
