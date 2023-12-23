import { configureStore } from '@reduxjs/toolkit';
import { documentationSlice } from './features/documentationSlice';
import { graphiqlApi } from './api/graphiqlApi';
import requestSlice from './features/requestDataSlice';

export const store = configureStore({
  reducer: {
    request: requestSlice,
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
