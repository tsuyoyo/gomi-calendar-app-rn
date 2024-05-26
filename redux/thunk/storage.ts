import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { areaSlice } from '../slice/AreaSlice';

const KEY_AREA_ID = 'key-area-id';

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
