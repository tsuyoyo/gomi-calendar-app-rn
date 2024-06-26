import { Area } from '@/data/Area';
import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { buildCommonHeader } from './buildCommonHeader';
import { BASE_API_URL } from './constants';

export const areaApi = createApi({
  reducerPath: 'areaApi',
  tagTypes: ['Areas'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getAreas: builder.query<{ areas: Area[] }, void>({
      query: () => ({
        url: '/areas',
        method: 'GET',
        headers: {
          ...buildCommonHeader(),
        },
      }),
    }),
  }),
});

export const { useGetAreasQuery } = areaApi;
