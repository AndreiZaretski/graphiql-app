import { configureStore } from '@reduxjs/toolkit';
import { graphiqlApi } from './api/graphiqlApi';

export const store = configureStore({
  reducer: {
    [graphiqlApi.reducerPath]: graphiqlApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(graphiqlApi.middleware),
});

export type AppState = ReturnType<typeof store.getState>;
