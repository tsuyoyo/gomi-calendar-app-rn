import { AppPressable } from '@/components/AppPressable';
import { ThemedButton } from '@/components/ThemedButton';
import { Area } from '@/data/Area';
import { useGetAreasQuery } from '@/redux/apiSlice/areaApi';
import { areaSlice } from '@/redux/slice/AreaSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { storeAreaConfig } from '@/redux/thunk/storage';
import { appColors } from '@/styles/appColors';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import Toast from 'react-native-root-toast';
import { useDispatch, useSelector } from 'react-redux';

const styles = StyleSheet.create({
  areaItemContainer: {
    minHeight: 64,
    width: '100%',
    paddingHorizontal: 16,
    paddingVertical: 8,
    justifyContent: 'center',
    verticalAlign: 'middle',
    backgroundColor: appColors.background,
  },
  areaItem: {
    flexDirection: 'row',
  },
  areaItemName: {
    flex: 1,
    verticalAlign: 'middle',
  },
  areaCheck: {
    justifyContent: 'center',
    verticalAlign: 'middle',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
  },
  button: {
    flex: 1,
  },
});

const CheckIcon: React.FC<{ isVisible: boolean }> = ({
  isVisible,
}) =>
  isVisible ? (
    <Ionicons
      style={styles.areaCheck}
      name="checkmark-sharp"
      size={24}
      color={appColors.primary}
    />
  ) : null;

const AreaItem: React.FC<{
  area: Area;
  isSelected: boolean;
  onClicked: () => void;
}> = ({ area, isSelected, onClicked }) => {
  return (
    <AppPressable
      key={area.id}
      style={styles.areaItemContainer}
      onPress={onClicked}
    >
      <View style={styles.areaItem}>
        <Text variant="labelLarge" style={styles.areaItemName}>
          {area.name}
        </Text>
        <CheckIcon isVisible={isSelected} />
      </View>
    </AppPressable>
  );
};

export const AreaSelectionList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation(['area']);

  const areaConfig = useSelector<
    RootState,
    string | null | undefined
  >((s) => s.area.areaId);

  const [selectedArea, setSelectedArea] = useState<
    string | null | undefined
  >(areaConfig);

  const { data, error, isLoading } = useGetAreasQuery();

  useEffect(() => {
    if (error !== undefined) {
      Toast.show(t('area:fetch-error'), {
        duration: Toast.durations.SHORT,
      });
    }
  }, [error, t]);

  return (
    <>
      <FlashList
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AreaItem
            area={item}
            isSelected={selectedArea === item.id}
            onClicked={() => {
              setSelectedArea(item.id);
            }}
          />
        )}
        estimatedItemSize={100}
        data={data?.areas ?? []}
        extraData={selectedArea}
        refreshing={isLoading}
        ItemSeparatorComponent={() => <Divider />}
      />
      <View style={styles.buttonContainer}>
        <ThemedButton
          style={{ ...styles.button }}
          text={t('area:apply-selection')}
          disabled={selectedArea === areaConfig}
          type="filledPrimary"
          onPress={() => {
            if (selectedArea !== undefined && selectedArea !== null) {
              dispatch(storeAreaConfig({ areaId: selectedArea }));
              dispatch(areaSlice.actions.setArea(selectedArea));
            }
            router.back();
          }}
        />
      </View>
    </>
  );
};
