import { cancelAllScheduledNotificationsAsync } from 'expo-notifications';
import { useCallback } from 'react';

export const useCancelReminders = () => {
  return useCallback(async () => {
    await cancelAllScheduledNotificationsAsync();
  }, []);
};
