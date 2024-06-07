import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { areaSlice } from '../slice/AreaSlice';
import { reminderSlice } from '../slice/ReminderSlice';

const KEY_AREA_ID = 'key-area-id';
const KEY_REMINDER_CONFIG = 'key-reminder-config';

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

export type ReminderConfig = {
  isEnabled: boolean;
  time?: { hour: number; minute: number };
};

export const storeReminderConfig = createAsyncThunk(
  'storage/storeReminderConfig',
  async (args: ReminderConfig, _thunkAPI) => {
    await AsyncStorage.setItem(
      KEY_REMINDER_CONFIG,
      JSON.stringify(args),
    );
  },
);

export const loadReminderConfig = createAsyncThunk(
  'storage/loadReminderConfig',
  async (_, thunkAPI) => {
    const config = await AsyncStorage.getItem(KEY_REMINDER_CONFIG);
    if (config === null) {
      return null;
    }
    const configObj = JSON.parse(config) as ReminderConfig;
    console.log(`reminderConfig: ${JSON.stringify(configObj)}`);
    thunkAPI.dispatch(
      reminderSlice.actions.setIsEnabled(configObj.isEnabled),
    );
    if (configObj.time !== undefined) {
      thunkAPI.dispatch(
        reminderSlice.actions.setTime(configObj.time),
      );
    }
    return configObj;
  },
);
