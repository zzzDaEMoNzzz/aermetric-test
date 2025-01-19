import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Aircraft } from "@/types/aircrafts";
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
  endpoints: (build) => ({
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
    }),
  }),
});

export const { useGetAircraftsQuery } = aircraftsApi;
