import { ReminderConfig } from '@/redux/thunk/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_REMINDER_CONFIG = 'key-reminder-config';

export const getReminderConfig = async () => {
  return AsyncStorage.getItem(KEY_REMINDER_CONFIG).then((data) => {
    if (data === null) {
      return null;
    }
    const configObj = JSON.parse(data) as ReminderConfig;
    console.log(`reminderConfig: ${JSON.stringify(configObj)}`);
    return configObj;
  });
};

export const setReminderConfig = async (
  reminderConfig: ReminderConfig,
) => {
  return AsyncStorage.setItem(
    KEY_REMINDER_CONFIG,
    JSON.stringify(reminderConfig),
  );
};
