import { useGetAreasQuery } from '@/redux/apiSlice/areaApi';
import { Link } from 'expo-router';
import { Modal, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  modalContent: {
    height: '80%',
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
  },
});

type Props = {
  isVisible: boolean;
};

export const AreaSelectionModal: React.FC<Props> = ({
  isVisible,
}) => {
  const { data } = useGetAreasQuery();

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modalContent}>
        <Link href="/area-selection-screen">地域を選択</Link>
      </View>
    </Modal>
  );
};
