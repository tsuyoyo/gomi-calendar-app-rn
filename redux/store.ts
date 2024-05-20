import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import { areaApi } from './apiSlice/areaApi';
import areaReducer from './slice/AreaSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    area: areaReducer,
    [areaApi.reducerPath]: areaApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(areaApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
