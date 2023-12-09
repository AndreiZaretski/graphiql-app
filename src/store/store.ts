import { configureStore } from '@reduxjs/toolkit';
import errorSlice from './features/emptySlice';

export const store = configureStore({
  reducer: {
    //delete this reducer
    error: errorSlice,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
});

export type AppState = ReturnType<typeof store.getState>;
