import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Aircraft } from "@/types/aircrafts";
import { PaginationMeta, PaginationParams } from "@/types/pagination";
import { SortParams } from "@/types/sorting";

export const aircraftsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/aircrafts" }),
  endpoints: (build) => ({
    getAllAircrafts: build.query<
      {
        items: Aircraft[];
        meta: PaginationMeta & SortParams;
      },
      PaginationParams & SortParams
    >({
      query: ({ page, perPage, sortBy, sortOrder }) => {
        const order = sortOrder === "descend" ? "desc" : "asc";
        return `/?_page=${page}&_limit=${perPage}&_sort=${sortBy}&_order=${order}`;
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

export const { useGetAllAircraftsQuery } = aircraftsApi;
