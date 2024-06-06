import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NotificationConfig } from '../thunk/storage';

export type NotificationState = {
  config: NotificationConfig;
};

const initialState: NotificationState = {
  config: { isEnabled: false },
};

export const notificationSlice = createSlice({
  name: 'notification',
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
