import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_LAST_REMINDER_UPDATED = 'key-last-reminder-updated';

export const getLastReminderUpdated = async () => {
  const savedDateObj = await AsyncStorage.getItem(
    KEY_LAST_REMINDER_UPDATED,
  );
  return savedDateObj !== null
    ? (JSON.parse(savedDateObj) as {
        year: number;
        month: number;
        date: number;
        hour: number;
        minute: number;
      })
    : null;
};

export const setLastReminderUpdated = async (date: Date) => {
  const savedDated = {
    year: date.getFullYear(),
    month: date.getMonth(),
    hour: date.getHours(),
    date: date.getDate(),
    minute: date.getMinutes(),
  };
  return AsyncStorage.setItem(
    KEY_LAST_REMINDER_UPDATED,
    JSON.stringify(savedDated),
  );
};
