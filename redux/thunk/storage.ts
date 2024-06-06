import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { areaSlice } from '../slice/AreaSlice';
import { notificationSlice } from '../slice/NotificationSlice';

const KEY_AREA_ID = 'key-area-id';
const KEY_NOTIFICATION_CONFIG = 'key-notification-config';

export const loadAreaConfig = createAsyncThunk(
  'storage/loadAreaConfig',
  async (_, thunkAPI) => {
    const areaId = await AsyncStorage.getItem(KEY_AREA_ID);
    console.log(`areaId - ${areaId}`);
    thunkAPI.dispatch(areaSlice.actions.setArea(areaId));
    return areaId;
  },
);

export const storeAreaConfig = createAsyncThunk(
  'storage/storeAreaConfig',
  async (args: { areaId: string }, _thunkAPI) => {
    await AsyncStorage.setItem(KEY_AREA_ID, args.areaId);
  },
);

export type NotificationConfig = {
  isEnabled: boolean;
  time?: { hour: number; minute: number };
};

export const storeNotificationConfig = createAsyncThunk(
  'storage/storeNotificationConfig',
  async (args: NotificationConfig, _thunkAPI) => {
    await AsyncStorage.setItem(
      KEY_NOTIFICATION_CONFIG,
      JSON.stringify(args),
    );
  },
);

export const loadNotificationConfig = createAsyncThunk(
  'storage/loadNotificationConfig',
  async (_, thunkAPI) => {
    const config = await AsyncStorage.getItem(
      KEY_NOTIFICATION_CONFIG,
    );
    if (config === null) {
      return null;
    }
    const configObj = JSON.parse(config) as NotificationConfig;
    console.log(`notificationConfig: ${JSON.stringify(configObj)}`);
    thunkAPI.dispatch(
      notificationSlice.actions.setIsEnabled(configObj.isEnabled),
    );
    if (configObj.time !== undefined) {
      thunkAPI.dispatch(
        notificationSlice.actions.setTime(configObj.time),
      );
    }
    return configObj;
  },
);
