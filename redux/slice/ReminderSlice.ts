import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ReminderConfig } from '../thunk/storage';

export type ReminderState = {
  config: ReminderConfig;
};

const initialState: ReminderState = {
  config: { isEnabled: true, time: { hour: 6, minute: 45 } },
};

export const reminderSlice = createSlice({
  name: 'reminder',
  initialState,
  reducers: {
    setIsEnabled: (state, action: PayloadAction<boolean>) => {
      const currentConfig = state.config;
      state.config = {
        ...currentConfig,
        isEnabled: action.payload,
      };
    },
    setTime: (
      state,
      action: PayloadAction<{ hour: number; minute: number }>,
    ) => {
      const currentConfig = state.config;
      state.config = {
        ...currentConfig,
        time: action.payload,
      };
    },
  },
});

export default reminderSlice.reducer;
