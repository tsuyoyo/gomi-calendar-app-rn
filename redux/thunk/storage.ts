import { getAreaConfig, setAreaConfig } from '@/storage/areaConfig';
import {
  getReminderConfig,
  setReminderConfig,
} from '@/storage/reminderConfig';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { areaSlice } from '../slice/AreaSlice';
import { reminderSlice } from '../slice/ReminderSlice';

export const loadAreaConfig = createAsyncThunk(
  'storage/loadAreaConfig',
  async (_, thunkAPI) => {
    const areaId = await getAreaConfig();
    thunkAPI.dispatch(areaSlice.actions.setArea(areaId));
    return areaId;
  },
);

export const storeAreaConfig = createAsyncThunk(
  'storage/storeAreaConfig',
  async (args: { areaId: string }, _thunkAPI) => {
    await setAreaConfig(args.areaId);
  },
);

export type ReminderConfig = {
  isEnabled: boolean;
  time?: { hour: number; minute: number };
  day?: 'on-the-day' | 'day-before';
};

export const storeReminderConfig = createAsyncThunk(
  'storage/storeReminderConfig',
  async (args: ReminderConfig, _thunkAPI) => {
    setReminderConfig(args);
  },
);

export const loadReminderConfig = createAsyncThunk(
  'storage/loadReminderConfig',
  async (_, thunkAPI) => {
    const configObj = await getReminderConfig();
    if (configObj === null) {
      return;
    }
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
