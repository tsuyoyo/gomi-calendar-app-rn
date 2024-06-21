import { GetScheduleReminderResponse } from '@/data/GetScheduleReminderResponse';
import { buildCommonHeader } from '@/redux/apiSlice/buildCommonHeader';
import { BASE_API_URL } from '@/redux/apiSlice/constants';
import { getAreaConfig } from '@/storage/areaConfig';
import { setLastReminderUpdated } from '@/storage/lastReminderUpdate';
import { getReminderConfig } from '@/storage/reminderConfig';
import axios from 'axios';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';
import { Platform } from 'react-native';
import { registerRemindersByReminders } from './registerReminders';

const BACKGROUND_FETCH_TASK = 'background-fetch';

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
  const now = Date.now();
  console.log(
    `Got background fetch call at date: ${new Date(now).toISOString()}`,
  );

  if (Platform.OS === 'android') {
    const areaConfig = await getAreaConfig();
    const reminderConfig = await getReminderConfig();
    if (
      areaConfig !== null &&
      reminderConfig !== null &&
      reminderConfig.isEnabled
    ) {
      const api = axios.create({
        baseURL: BASE_API_URL,
        headers: { ...buildCommonHeader() },
        params: {
          'remind-day': reminderConfig.day,
        },
      });
      const response = await api.get(
        `schedule/${areaConfig}/reminder`,
      );
      const reminderResponse =
        response.data as GetScheduleReminderResponse;

      await setLastReminderUpdated(new Date());

      registerRemindersByReminders(reminderResponse.reminders);
    }
  }
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export const registerBackgroundFetchAsync = async () => {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    // Update notification config once in a day
    minimumInterval: 60 * 60, // * 24, // MEMO: Until it gets stable, update in every hour
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
};

export const unregisterBackgroundFetchAsync = async () => {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
};
