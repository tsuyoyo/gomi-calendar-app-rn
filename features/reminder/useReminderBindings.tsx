import { HomeResponse } from '@/data/screen/home/HomeResponse';
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

export const useReminderBindings = (data?: HomeResponse) => {
  const dispatch = useDispatch<AppDispatch>();

  const registerReminders = useRegisterReminders();
  const cancelReminders = useCancelReminders();

  const reminderConfig = useSelector<RootState, ReminderConfig>(
    (s) => s.reminder.config,
  );

  useEffect(() => {
    dispatch(storeReminderConfig(reminderConfig));

    if (reminderConfig.isEnabled) {
      const components = data?.weeklyScheduleComponents;
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
        const reminders = data?.reminders;
        if (reminders !== undefined && reminders.length > 0) {
          registerRemindersByReminders(reminders);
        } else {
          console.log(
            'No reminder is found at setting reminders (useReminderBindings)',
          );
        }
      }
    } else {
      cancelReminders();
    }
  }, [
    cancelReminders,
    data?.reminders,
    data?.weeklyScheduleComponents,
    dispatch,
    registerReminders,
    reminderConfig,
  ]);
};
