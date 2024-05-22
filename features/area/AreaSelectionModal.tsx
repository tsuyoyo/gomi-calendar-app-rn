import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Area } from '@/data/Area';
import { useGetAreasQuery } from '@/redux/apiSlice/areaApi';
import { RootState } from '@/redux/store';

const styles = StyleSheet.create({
  modalContent: {
    height: 300,
    width: 400,
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

const AreaItem: React.FC<{ area: Area; isSelected: boolean }> = ({
  area,
  isSelected,
}) => {
  return <Text>{area.name}</Text>;
};

export const AreaSelectionModal: React.FC<Props> = ({
  isVisible,
}) => {
  const areaConfig = useSelector<RootState>((s) => s.area.areaId);
  const { data } = useGetAreasQuery();

  //   useEffect(() => {
  //     console.log(`data - ${JSON.stringify(data)}`);
  //   }, [data]);

  //   console.log(`data.size - ${data?.areas.length}`);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
    >
      <View style={styles.modalContent}>
        {/* <FlashList
          renderItem={({ item }) => {
            return (
              <AreaItem
                area={item}
                isSelected={areaConfig === item.id}
              />
            );
          }}
          estimatedItemSize={100}
          data={data?.areas ?? []}
          style={{ flex: 1 }}
        /> */}
        <Link href="/area-selection-screen">地域を選択</Link>
      </View>
    </Modal>
  );
};
