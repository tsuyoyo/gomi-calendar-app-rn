import { GetScheduleReminderResponse } from '@/data/GetScheduleReminderResponse';
import { RemindDay } from '@/data/Reminder';
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { buildCommonHeader } from './buildCommonHeader';
import { BASE_API_URL } from './constants';

export const reminderApi = createApi({
  reducerPath: 'reminderApi',
  tagTypes: ['Reminders'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getScheduleReminders: builder.query<
      GetScheduleReminderResponse,
      { id: string; day: RemindDay }
    >({
      query: ({ id, day }) => ({
        url: `schedule/${id}/reminder`,
        method: 'GET',
        headers: {
          ...buildCommonHeader(),
        },
        params: {
          'remind-day': day,
        },
      }),
    }),
  }),
});

export const {
  useGetScheduleRemindersQuery,
  useLazyGetScheduleRemindersQuery,
} = reminderApi;
