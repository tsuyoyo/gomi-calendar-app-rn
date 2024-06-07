import { HomeResponse } from '@/data/screen/home/HomeResponse';
import { AppDispatch, RootState } from '@/redux/store';
import {
  ReminderConfig,
  storeReminderConfig,
} from '@/redux/thunk/storage';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

      if (weeklySchedule !== null) {
        console.log(
          'length of weeklySchedule - ' +
            weeklySchedule.schedules.length,
        );
        registerReminders(weeklySchedule.calendar);
      }
    } else {
      cancelReminders();
    }
  }, [
    cancelReminders,
    data?.weeklyScheduleComponents,
    dispatch,
    registerReminders,
    reminderConfig,
  ]);
};
