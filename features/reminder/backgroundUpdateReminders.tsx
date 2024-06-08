import { HomeResponse } from '@/data/screen/home/HomeResponse';
import { buildCommonHeader } from '@/redux/apiSlice/buildCommonHeader';
import { BASE_API_URL } from '@/redux/apiSlice/constants';
import { getAreaConfig } from '@/storage/areaConfig';
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
      });
      const response = await api.get(`screen/home/${areaConfig}`);
      const homeResponse = response.data as HomeResponse;

      registerRemindersByReminders(homeResponse.reminders);
    }
  }
  return BackgroundFetch.BackgroundFetchResult.NewData;
});

export async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 1000 * 60 * 24, // Update notification config once in a day
    stopOnTerminate: false, // android only,
    startOnBoot: true, // android only
  });
}

export async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}
