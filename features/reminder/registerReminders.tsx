import { CalendarEntry, TrashSchedule } from '@/data/CalendarEntry';
import { TrashType } from '@/data/TrashType';
import {
  CalendarTriggerInputValue,
  DateTriggerInput,
  WeeklyTriggerInput,
  cancelAllScheduledNotificationsAsync,
  scheduleNotificationAsync,
} from 'expo-notifications';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform } from 'react-native';
import { getWeekNumberThisMonth } from './getWeekNumberThisMonth';

const generateiOSTriggers = (schedule: TrashSchedule) => {
  const triggerBase = {
    hour: 7,
    minute: 0,
    //   seconds: 10,
    timezone: 'JST',
    repeats: true,
    channelId: 'narashino-gomi-calendar',
  };
  const triggers = Array<CalendarTriggerInputValue>();

  if (schedule.weeks === undefined || schedule.weeks.length === 0) {
    schedule.days.forEach((d) => {
      triggers.push({
        ...triggerBase,
        weekday: d,
      });
    });
  } else {
    schedule.weeks.forEach((w) => {
      schedule.days.forEach((d) => {
        triggers.push({
          ...triggerBase,
          weekOfMonth: w,
          weekday: d,
        });
      });
    });
  }
  return triggers;
};

// Memo: AndroidとiOSでreminderの設定方法が違うっぽい
// https://docs.expo.dev/versions/latest/sdk/notifications/#weeklynotificationtrigger
export const useRegisterReminders = () => {
  const { t } = useTranslation('reminder');

  const generateAndroidTriggers = useCallback(
    (schedule: TrashSchedule) => {
      const triggerBase = {
        channelId: 'narashino-gomi-calendar',
        hour: 7,
        minute: 0,
      };
      const triggers = Array<WeeklyTriggerInput | DateTriggerInput>();

      if (
        schedule.weeks === undefined ||
        schedule.weeks.length === 0
      ) {
        schedule.days.forEach((d) => {
          triggers.push({
            ...triggerBase,
            repeats: true,
            // https://docs.expo.dev/versions/latest/sdk/notifications/#weeklytriggerinput
            // On WeeklyTriggerInput, weekday is 1 origin (1 indicates Sunday)
            weekday: d + 1,
          });
        });

        // TODO: Remove below once test is done.
        const now = new Date();
        now.setSeconds(now.getSeconds() + 3);
        triggers.push({
          channelId: 'narashino-gomi-calendar',
          date: now,
        });
      } else {
        schedule.weeks.forEach((w) => {
          schedule.days.forEach((d) => {
            const today = new Date();
            const thisWeekInMonth = getWeekNumberThisMonth();
            const reminderDate = new Date();
            reminderDate.setHours(7);
            reminderDate.setMinutes(0);

            if (today.getDay() < d && thisWeekInMonth === w) {
              console.log('Android trigger - 1');
              // E.g.) Today:2, reminder:5,
              // the next date to reminder can be calculated by
              // today.getDate() + (5 - 2)
              reminderDate.setDate(
                today.getDate() + d - today.getDay(),
              );
            } else if (
              today.getDay() > d &&
              thisWeekInMonth + 1 === w
            ) {
              console.log('Android trigger - 2');
              // E.g.) Today:5, reminder:2,
              // the next date to reminder can be calculated by
              // today.getDate() + (7 - 5) + 2
              reminderDate.setDate(
                today.getDate() + 7 - today.getDay() + d,
              );
            } else if (
              today.getDay() === d &&
              thisWeekInMonth === w &&
              today.getHours() === 6 // TODO: modify it to the configured time
            ) {
              console.log('Android trigger - 3');
              // When today is the collection day,
              // make a push notification immediately.
              reminderDate.setDate(today.getDate());
              reminderDate.setHours(today.getHours());
              reminderDate.setMinutes(today.getMinutes());
              reminderDate.setSeconds(today.getSeconds() + 3);
            } else {
              // In other cases, reminder isn't set this time.
              return;
            }
            triggers.push({
              channelId: triggerBase.channelId,
              date: reminderDate,
            });
          });
        });
      }
      return triggers;
    },
    [],
  );

  const registerNotification = useCallback(
    (trash: TrashType, schedule: TrashSchedule) => {
      const content = {
        title: t('title', { trash: trash.toString() }),
        body: t('message'),
      };

      if (Platform.OS === 'ios') {
        const triggers = generateiOSTriggers(schedule);
        console.log(`Set ${triggers.length} reminders on iOS`);
        triggers.forEach(async (trigger) => {
          await scheduleNotificationAsync({
            content,
            trigger,
          });
        });
      } else {
        const triggers = generateAndroidTriggers(schedule);
        console.log(`Set ${triggers.length} reminders on Android`);
        triggers.forEach(async (trigger) => {
          console.log(JSON.stringify(trigger));
          await scheduleNotificationAsync({
            content,
            trigger,
          });
        });
      }
    },
    [generateAndroidTriggers, t],
  );

  return useCallback(
    async (calendar: CalendarEntry) => {
      await cancelAllScheduledNotificationsAsync();

      const { burnable, incombustible, recyclable, harmful } =
        calendar;

      if (burnable.days.length > 0) {
        registerNotification(TrashType.BURNABLE, burnable);
      }
      if (incombustible.days.length > 0) {
        registerNotification(TrashType.INCOMBUSTIBLE, incombustible);
      }
      if (recyclable.days.length > 0) {
        registerNotification(TrashType.RECYCLABLE, recyclable);
      }
      if (harmful.days.length > 0) {
        registerNotification(TrashType.HARMFUL, harmful);
      }
    },
    [registerNotification],
  );
};
