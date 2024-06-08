import AsyncStorage from '@react-native-async-storage/async-storage';
const KEY_AREA_ID = 'key-area-id';

export const getAreaConfig = async () => {
  return AsyncStorage.getItem(KEY_AREA_ID);
};

export const setAreaConfig = async (areaId: string) => {
  return AsyncStorage.setItem(KEY_AREA_ID, areaId);
};
