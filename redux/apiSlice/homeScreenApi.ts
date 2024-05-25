import { HomeResponse } from '@/data/screen/home/HomeResponse';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_API_URL } from './constants';

export const homeScreenApi = createApi({
    reducerPath: 'homeScreenApi',
    tagTypes: ['HomeScreen'],
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_API_URL,
      }),
      endpoints: (builder) => ({
        getHomeScreen: builder.query<HomeResponse, string>({
          query: (id) => ({
            url: `/screen/home/${id}`,
            method: 'GET',
            headers: {},
          }),
        }),
      }),
});

export const { useGetHomeScreenQuery, useLazyGetHomeScreenQuery } = homeScreenApi;