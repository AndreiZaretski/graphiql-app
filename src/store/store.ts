import { configureStore } from '@reduxjs/toolkit';
import { documentationSlice } from './features/documentationSlice';
import { graphiqlApi } from './api/graphiqlApi';

export const store = configureStore({
  reducer: {
    documentationSlice: documentationSlice.reducer,
    [graphiqlApi.reducerPath]: graphiqlApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      graphiqlApi.middleware
    ),
});

export type AppState = ReturnType<typeof store.getState>;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
