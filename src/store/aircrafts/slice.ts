import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SortOrder } from "antd/es/table/interface";

import { AircraftsFilters, AircraftsStore } from "./types";

const initialState: AircraftsStore = {
  page: 1,
  perPage: 5,
  sortBy: "id",
  sortOrder: "ascend",
  filters: {
    registrationNumber: null,
    model: null,
    yearFrom: null,
    yearTo: null,
    status: "all",
  },
};

export const aircraftsSlice = createSlice({
  name: "aircrafts",
  initialState,
  reducers: {
    setAircraftsPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setAircraftsPerPage: (state, action: PayloadAction<number>) => {
      state.perPage = action.payload;
    },
    setAircraftsSortBy: (state, action: PayloadAction<string>) => {
      state.sortBy = action.payload;
    },
    setAircraftsSortOrder: (state, action: PayloadAction<SortOrder>) => {
      state.sortOrder = action.payload;
    },
    setAircraftsFilters: (state, action: PayloadAction<AircraftsFilters>) => {
      state.filters = action.payload;
    },
    removeAircraftsFilter: (
      state,
      action: PayloadAction<keyof AircraftsFilters>,
    ) => {
      state.filters[action.payload] = initialState.filters[
        action.payload
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ] as any;
    },
  },
  selectors: {
    selectAircraftsPage: (state) => state.page,
    selectAircraftsPerPage: (state) => state.perPage,
    selectAircraftsSortBy: (state) => state.sortBy,
    selectAircraftsSortOrder: (state) => state.sortOrder,
    selectAircraftsFilters: (state) => state.filters,
  },
});

export const {
  setAircraftsPage,
  setAircraftsPerPage,
  setAircraftsSortBy,
  setAircraftsSortOrder,
  setAircraftsFilters,
  removeAircraftsFilter,
} = aircraftsSlice.actions;

export const {
  selectAircraftsPage,
  selectAircraftsPerPage,
  selectAircraftsSortBy,
  selectAircraftsSortOrder,
  selectAircraftsFilters,
} = aircraftsSlice.selectors;
