import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";

import { aircraftsApi } from "./aircrafts/api";
import { aircraftsSlice } from "./aircrafts/slice.ts";

export const store = configureStore({
  reducer: {
    [aircraftsApi.reducerPath]: aircraftsApi.reducer,
    [aircraftsSlice.reducerPath]: aircraftsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aircraftsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
