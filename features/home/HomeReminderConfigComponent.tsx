import { RootState } from '@/redux/store';
import { ReminderConfig } from '@/redux/thunk/storage';
import { appColors } from '@/styles/appColors';
import { router } from 'expo-router';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { Text, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';

const styles = StyleSheet.create({
  surface: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    flex: 1,
    marginHorizontal: 8,
    borderColor: appColors.primary,
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: appColors.background,
  },
  textContainer: {
    flexDirection: 'row',
  },
  textTitle: {
    flex: 1,
  },
  text: {
    color: appColors.primary,
  },
  textLastUpdated: {
    marginTop: 4,
  },
  textConfig: {},
  spacer: {
    height: 8,
  },
});

export const HomeReminderConfigComponent: React.FC = () => {
  const { t } = useTranslation('reminder-config');

  const reminderConfig = useSelector<
    RootState,
    ReminderConfig | null
  >((s) => s.reminder.config);

  const configText = useMemo(() => {
    const time = reminderConfig?.time;
    const when =
      reminderConfig?.day === 'day-before'
        ? t('day-before')
        : t('day-on-the-day');

    return reminderConfig?.isEnabled && time !== undefined
      ? t('home-component-time', {
          when,
          hour: time.hour.toString().padStart(2, '0'),
          minute: time.minute.toString().padStart(2, '0'),
        })
      : t('home-component-disabled');
  }, [
    reminderConfig?.day,
    reminderConfig?.isEnabled,
    reminderConfig?.time,
    t,
  ]);

  return (
    <TouchableRipple
      style={styles.surface}
      onPress={() => {
        router.push('/reminder-config-screen');
      }}
    >
      <>
        <View style={styles.textContainer}>
          <Text
            variant="titleSmall"
            style={{ ...styles.text, ...styles.textTitle }}
          >
            {t('home-component-title')}
          </Text>
          <Text variant="titleSmall" style={styles.textConfig}>
            {configText}
          </Text>
        </View>
      </>
    </TouchableRipple>
  );
};
