import { InfoResponse } from '@/data/screen/info/InfoResponse';
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from './constants';

export const infoScreenApi = createApi({
  reducerPath: 'infoScreenApi',
  tagTypes: ['InfoScreen'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getInfoScreen: builder.query<InfoResponse, string>({
      query: (id) => ({
        url: `/screen/info/${id}`,
        method: 'GET',
        headers: {},
      }),
    }),
  }),
});

export const { useGetInfoScreenQuery, useLazyGetInfoScreenQuery } =
  infoScreenApi;
