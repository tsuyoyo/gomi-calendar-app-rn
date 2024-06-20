import { Reminder } from '@/data/Reminder';
import { getReminderConfig } from '@/storage/reminderConfig';
import {
  cancelAllScheduledNotificationsAsync,
  scheduleNotificationAsync,
} from 'expo-notifications';
import {
  CHANNEL_ID,
  DEFAULT_REMINDER_TIME,
} from './useRegisterReminders';

export const registerRemindersByReminders = async (
  remindDay: 'on-the-day' | 'day-before' | undefined,
  reminders: Reminder[],
) => {
  const reminderConfig = await getReminderConfig();
  await cancelAllScheduledNotificationsAsync();

  console.log(`Registering ${reminders.length} reminders...`);
  reminders.forEach(async (reminder) => {
    const reminderDate = new Date();
    const remindHour =
      reminderConfig?.time?.hour ?? DEFAULT_REMINDER_TIME.hour;
    const remindMin =
      reminderConfig?.time?.minute ?? DEFAULT_REMINDER_TIME.minute;

    reminderDate.setFullYear(reminder.year);
    reminderDate.setMonth(reminder.month - 1);
    reminderDate.setDate(
      remindDay === 'day-before' ? reminder.date - 1 : reminder.date,
    );
    reminderDate.setHours(remindHour);
    reminderDate.setMinutes(remindMin);
    reminderDate.setSeconds(0);

    console.log(`   ${JSON.stringify(reminder)}`);
    await scheduleNotificationAsync({
      content: {
        title: reminder.title,
        body: reminder.message,
      },
      trigger: {
        date: reminderDate,
        channelId: CHANNEL_ID,
      },
    });
  });
};
