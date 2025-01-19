import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Aircraft, AircraftStatusHistoryItem } from "@/types/aircrafts";
import { PaginationMeta, PaginationParams } from "@/types/pagination";
import { SortParams } from "@/types/sorting";

import { AircraftsFilters } from "./types";
import { getSearchParamsForAircraftsFilters } from "./utils";

type GetAircraftsParams = PaginationParams &
  SortParams & {
    filters: AircraftsFilters;
  };

export const aircraftsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/aircrafts" }),
  tagTypes: ["Aircraft", "AircraftStatus"],
  endpoints: (build) => ({
    /**
     * Aircrafts
     * */
    getAircrafts: build.query<
      {
        items: Aircraft[];
        meta: PaginationMeta & SortParams;
      },
      GetAircraftsParams
    >({
      query: ({ page, perPage, sortBy, sortOrder, filters }) => {
        const order = sortOrder === "descend" ? "desc" : "asc";
        let url = `/?_page=${page}&_limit=${perPage}&_sort=${sortBy}&_order=${order}`;
        const filtersParams = getSearchParamsForAircraftsFilters(filters);
        if (filtersParams) {
          url += `&${filtersParams}`;
        }
        return url;
      },
      transformResponse(data: Aircraft[], meta, params) {
        const totalHeader = meta?.response?.headers.get("X-total-count") || "";
        const total = parseInt(totalHeader, 10);
        return {
          items: data,
          meta: {
            ...params,
            total,
          },
        };
      },
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({
                type: "Aircraft" as const,
                id,
              })),
              "Aircraft",
            ]
          : ["Aircraft"],
    }),

    createAircraft: build.mutation<Aircraft, Partial<Aircraft>>({
      query(body) {
        return {
          url: "/",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Aircraft"],
    }),

    updateAircraft: build.mutation<Aircraft, Partial<Aircraft>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: id!,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Aircraft"],
    }),

    deleteAircraft: build.mutation<void, Aircraft["id"]>({
      query(id) {
        return {
          url: id,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Aircraft"],
    }),

    /**
     * Statuses
     * */
    getAircraftStatusHistory: build.query<
      AircraftStatusHistoryItem[],
      Aircraft["id"]
    >({
      query(id) {
        return `/${id}/status-history`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: "AircraftStatus" as const,
                id,
              })),
              "AircraftStatus",
            ]
          : ["AircraftStatus"],
    }),

    addAircraftNewStatus: build.mutation<
      void,
      Omit<AircraftStatusHistoryItem, "id">
    >({
      query(data) {
        return {
          url: `/${data.aircraftId}/status`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["AircraftStatus"],
    }),
  }),
});

export const {
  useGetAircraftsQuery,
  useCreateAircraftMutation,
  useUpdateAircraftMutation,
  useDeleteAircraftMutation,

  useGetAircraftStatusHistoryQuery,
  useAddAircraftNewStatusMutation,
} = aircraftsApi;
