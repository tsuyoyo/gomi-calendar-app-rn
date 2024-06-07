import reactotron from '@/app/ReactotronConfig';
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { areaApi } from './apiSlice/areaApi';
import { homeScreenApi } from './apiSlice/homeScreenApi';
import { infoScreenApi } from './apiSlice/infoScreenApi';
import areaReducer from './slice/AreaSlice';
import reminderReducer from './slice/ReminderSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    area: areaReducer,
    reminder: reminderReducer,
    [areaApi.reducerPath]: areaApi.reducer,
    [homeScreenApi.reducerPath]: homeScreenApi.reducer,
    [infoScreenApi.reducerPath]: infoScreenApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(areaApi.middleware)
      .concat(homeScreenApi.middleware)
      .concat(infoScreenApi.middleware),
  enhancers: (defaultEnhancers) =>
    __DEV__
      ? defaultEnhancers().concat(reactotron.createEnhancer())
      : defaultEnhancers(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
