import { configureStore } from "@reduxjs/toolkit";

import { aircraftsApi } from "./aircrafts/api";

export const store = configureStore({
  reducer: {
    [aircraftsApi.reducerPath]: aircraftsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aircraftsApi.middleware),
});
