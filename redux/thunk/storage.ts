import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { areaSlice } from '../slice/AreaSlice';
import { RootState } from '../store';

const KEY_AREA_ID = 'key-area-id';

export const loadAreaConfig = createAsyncThunk(
  'storage/loadAreaConfig',
  async (_, thunkAPI) => {
    const areaId = await AsyncStorage.getItem(KEY_AREA_ID);
    thunkAPI.dispatch(areaSlice.actions.setArea(areaId));
    return areaId;
  },
);

export const storeAreaConfig = createAsyncThunk(
  'storage/storeAreaConfig',
  async (_, thunkAPI) => {
    const areaId = (thunkAPI.getState() as RootState).area.areaId;
    return AsyncStorage.setItem(KEY_AREA_ID, areaId ?? '');
  },
);
