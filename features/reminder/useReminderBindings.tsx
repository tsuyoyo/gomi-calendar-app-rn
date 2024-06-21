import { HomeResponse } from '@/data/screen/home/HomeResponse';
import { useLazyGetScheduleRemindersQuery } from '@/redux/apiSlice/reminderApi';
import { AppDispatch, RootState } from '@/redux/store';
import {
  ReminderConfig,
  storeReminderConfig,
} from '@/redux/thunk/storage';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerRemindersByReminders } from './registerReminders';
import { useCancelReminders } from './useCancelReminders';
import { useRegisterReminders } from './useRegisterReminders';

export const useReminderBindings = (
  id: string,
  homeResponse?: HomeResponse,
) => {
  const dispatch = useDispatch<AppDispatch>();

  const registerReminders = useRegisterReminders();

  const cancelReminders = useCancelReminders();

  const reminderConfig = useSelector<RootState, ReminderConfig>(
    (s) => s.reminder.config,
  );

  const [trigger] = useLazyGetScheduleRemindersQuery();

  useEffect(() => {
    dispatch(storeReminderConfig(reminderConfig));

    if (reminderConfig.isEnabled) {
      const components = homeResponse?.weeklyScheduleComponents;
      const weeklySchedule =
        components !== undefined && components?.length > 0
          ? components[0]
          : null;

      if (Platform.OS === 'ios') {
        if (weeklySchedule !== null) {
          console.log(
            'length of weeklySchedule - ' +
              weeklySchedule.schedules.length,
          );
          registerReminders(weeklySchedule.calendar);
        }
      } else {
        trigger({
          id,
          day: reminderConfig.day ?? 'day-on-the-day',
        }).then((response) => {
          const reminders = response.data?.reminders;
          if (reminders !== undefined && reminders.length > 0) {
            registerRemindersByReminders(reminders);
          } else {
            console.log(
              'No reminder is found at setting reminders (useReminderBindings)',
            );
          }
        });
      }
    } else {
      cancelReminders();
    }
  }, [
    cancelReminders,
    homeResponse?.reminders,
    homeResponse?.weeklyScheduleComponents,
    dispatch,
    registerReminders,
    reminderConfig,
    trigger,
    id,
  ]);
};
