import { reminderSlice } from '@/redux/slice/ReminderSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { getLastReminderUpdated } from '@/storage/lastReminderUpdate';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  Checkbox,
  Divider,
  RadioButton,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    flexDirection: 'row',
  },
  isEnabledTitle: {
    flex: 1,
    textAlignVertical: 'center',
  },
  timeContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  timeConfigContainer: {
    flexDirection: 'row',
    verticalAlign: 'middle',
    alignItems: 'center',
  },
  timeText: {
    paddingVertical: 12,
  },
  timeTitle: {
    marginBottom: 12,
  },
  dayRadioButtonGroupContainer: {
    flexDirection: 'column',
    flex: 1,
    marginStart: 4,
  },
  dayRadioButtonText: {
    textAlignVertical: 'center',
  },
  dayRadioButtonContainer: {
    alignContent: 'flex-end',
    flexDirection: 'row',
  },
});

const IsEnabledConfig: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('reminder-config');
  const isEnabled = useSelector<RootState, boolean>(
    (s) => s.reminder.config.isEnabled,
  );
  const onPress = useCallback(
    () => dispatch(reminderSlice.actions.setIsEnabled(!isEnabled)),
    [dispatch, isEnabled],
  );

  return (
    <TouchableRipple onPress={onPress}>
      <View style={styles.container}>
        <Text variant="bodyLarge" style={styles.isEnabledTitle}>
          {t('enabled-title')}
        </Text>
        <Checkbox status={isEnabled ? 'checked' : 'unchecked'} />
      </View>
    </TouchableRipple>
  );
};

const TimeConfig: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('reminder-config');

  const time = useSelector<
    RootState,
    { hour: number; minute: number } | undefined
  >((s) => s.reminder.config.time);

  const isEnabled = useSelector<RootState, boolean>(
    (s) => s.reminder.config.isEnabled,
  );

  const date = useMemo(() => {
    const d = new Date();
    if (time !== undefined) {
      d.setHours(time.hour);
      d.setMinutes(time.minute);
    }
    return d;
  }, [time]);

  const [isTimePickerVisible, setIsTimePickerVisible] =
    useState(false);

  return (
    <View style={styles.timeContainer}>
      <Text variant="bodyLarge" style={styles.timeTitle}>
        {t('time-title')}
      </Text>
      <View style={styles.timeConfigContainer}>
        <RemindDayConfig />
        <TouchableRipple
          onPress={() => setIsTimePickerVisible(true)}
          disabled={!isEnabled}
        >
          <Text variant="headlineMedium" style={styles.timeText}>
            {time === undefined || !isEnabled
              ? '--:--'
              : t('time', {
                  hour: time.hour.toString().padStart(2, '0'),
                  minute: time.minute.toString().padStart(2, '0'),
                })}
          </Text>
        </TouchableRipple>
      </View>

      <DatePicker
        modal
        mode="time"
        open={isTimePickerVisible}
        date={date}
        onConfirm={(date) => {
          dispatch(
            reminderSlice.actions.setTime({
              hour: date.getHours(),
              minute: date.getMinutes(),
            }),
          );
          setIsTimePickerVisible(false);
        }}
        onCancel={() => {
          setIsTimePickerVisible(false);
        }}
      />
    </View>
  );
};

const RemindDayConfig: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation('reminder-config');

  const isEnabled = useSelector<RootState, boolean>(
    (s) => s.reminder.config.isEnabled,
  );
  const dayConfig = useSelector<RootState, string | undefined>(
    (s) => s.reminder.config.day,
  );
  return (
    <>
      <View style={styles.dayRadioButtonGroupContainer}>
        <TouchableRipple
          onPress={() => {
            dispatch(reminderSlice.actions.setDay('day-on-the-day'));
          }}
          disabled={!isEnabled}
        >
          <View style={styles.dayRadioButtonContainer}>
            <RadioButton
              value="day-on-the-day"
              disabled={!isEnabled}
              status={
                dayConfig === 'day-on-the-day'
                  ? 'checked'
                  : 'unchecked'
              }
              onPress={() =>
                dispatch(
                  reminderSlice.actions.setDay('day-on-the-day'),
                )
              }
            />
            <Text
              variant="bodyLarge"
              style={styles.dayRadioButtonText}
            >
              {t('day-on-the-day')}
            </Text>
          </View>
        </TouchableRipple>
        <TouchableRipple
          onPress={() =>
            dispatch(reminderSlice.actions.setDay('day-before'))
          }
          disabled={!isEnabled}
        >
          <View style={styles.dayRadioButtonContainer}>
            <RadioButton
              value="day-before"
              disabled={!isEnabled}
              status={
                dayConfig === 'day-before' ? 'checked' : 'unchecked'
              }
              onPress={() =>
                dispatch(reminderSlice.actions.setDay('day-before'))
              }
            />
            <Text
              variant="bodyLarge"
              style={styles.dayRadioButtonText}
            >
              {t('day-before')}
            </Text>
          </View>
        </TouchableRipple>
      </View>
    </>
  );
};

export const ReminderConfigComponent: React.FC = () => {
  const { t } = useTranslation('reminder-config');

  const [lastConfigUpdated, setLastConfigUpdated] = useState<{
    year: number;
    month: number;
    date: number;
    hour: number;
    minute: number;
  } | null>(null);

  useEffect(() => {
    getLastReminderUpdated().then(setLastConfigUpdated);
  }, []);

  const lastUpdated = useMemo(() => {
    if (lastConfigUpdated === null) {
      return '--:--';
    }
    const { year, month, date } = lastConfigUpdated;
    const hour = lastConfigUpdated.hour.toString().padStart(2, '0');
    const minute = lastConfigUpdated.minute
      .toString()
      .padStart(2, '0');
    return `${year}/${month}/${date} ${hour}:${minute}`;
  }, [lastConfigUpdated]);

  return (
    <View style={{ flexDirection: 'column', height: '100%' }}>
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <IsEnabledConfig />
        <Divider />
        <TimeConfig />
        <Divider />
      </View>
      <Text
        variant="labelSmall"
        style={{
          marginVertical: 8,
          marginHorizontal: 8,
          textAlign: 'right',
        }}
      >{`${t('home-component-last-updated')} (${lastUpdated})`}</Text>
    </View>
  );
};
