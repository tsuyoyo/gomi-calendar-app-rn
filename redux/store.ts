import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { areaApi } from './apiSlice/areaApi';
import areaReducer from './slice/AreaSlice';
import reactotron from '@/app/ReactotronConfig';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    area: areaReducer,
    [areaApi.reducerPath]: areaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(areaApi.middleware),
  enhancers: (defaultEnhancers) =>
    __DEV__
      ? defaultEnhancers().concat(reactotron.createEnhancer())
      : defaultEnhancers(),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
