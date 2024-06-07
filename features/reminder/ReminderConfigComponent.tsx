import { reminderSlice } from '@/redux/slice/ReminderSlice';
import { AppDispatch, RootState } from '@/redux/store';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import {
  Checkbox,
  Divider,
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
  timeTitle: {
    flex: 1,
    textAlignVertical: 'center',
  },
  time: {
    textAlignVertical: 'center',
    fontWeight: 'bold',
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
    <>
      <TouchableRipple
        onPress={() => setIsTimePickerVisible(true)}
        disabled={!isEnabled}
      >
        <View style={styles.container}>
          <Text variant="bodyLarge" style={styles.timeTitle}>
            {t('time-title')}
          </Text>
          <Text variant="bodyLarge" style={styles.time}>
            {time === undefined || !isEnabled
              ? '--:--'
              : t('time', {
                  hour: time.hour.toString().padStart(2, '0'),
                  minute: time.minute.toString().padStart(2, '0'),
                })}
          </Text>
        </View>
      </TouchableRipple>
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
    </>
  );
};

export const ReminderConfigComponent: React.FC = () => {
  return (
    <>
      <IsEnabledConfig />
      <Divider />
      <TimeConfig />
      <Divider />
    </>
  );
};
