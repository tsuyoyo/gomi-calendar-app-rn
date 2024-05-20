import {
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from './constants';
import { Area } from '@/data/Area';

export const areaApi = createApi({
  reducerPath: 'areaApi',
  tagTypes: ['Areas'],
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
  }),
  endpoints: (builder) => ({
    getAreas: builder.query<Area[], void>({
      query: () => ({
        url: '/areas',
        method: 'GET',
        headers: {},
      }),
    }),
  }),
});

export const { useGetAreasQuery } = areaApi;
