import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { useEffect } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Area } from '@/data/Area';
import { useGetAreasQuery } from '@/redux/apiSlice/areaApi';

const styles = StyleSheet.create({
  areaItem: {
    minHeight: 64,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
  },
});

const AreaItem: React.FC<{
  area: Area;
  isSelected: boolean;
  onClicked: () => void;
}> = ({ area, isSelected, onClicked }) => {
  return (
    <Pressable
      style={styles.areaItem}
      android_ripple={{ color: 'grey' }}
      onPress={() => {
        console.log(`onClicked - ${area.name}`);
        onClicked();
      }}
    >
      {isSelected ? (
        <Ionicons name="checkmark-circle" size={32} color="green" />
      ) : null}
      <Text key={area.id}>{area.name}</Text>
    </Pressable>
  );
};

export const AreaSelectionList: React.FC<{
  selectedAreaId?: string | null;
  onAreaSelected: (areaId: string) => void;
}> = ({ selectedAreaId, onAreaSelected }) => {
  const { data, error, isLoading } = useGetAreasQuery();

  useEffect(() => {
    if (error !== undefined) {
      // Show toast
    }
  });

  return (
    <FlashList
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <AreaItem
          area={item}
          isSelected={selectedAreaId === item.id}
          onClicked={() => {
            onAreaSelected(item.id);
          }}
        />
      )}
      estimatedItemSize={100}
      data={data?.areas ?? []}
      extraData={selectedAreaId}
      refreshing={isLoading}
    />
  );
};
