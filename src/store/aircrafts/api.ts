import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { Aircraft } from "@/types/aircrafts.ts";

export const aircraftsApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8000/api/aircrafts" }),
  endpoints: (build) => ({
    getAllAircrafts: build.query<
      {
        items: Aircraft[];
        meta: { page: number; perPage: number; total: number };
      },
      { page: number; perPage: number }
    >({
      query: ({ page, perPage }) => `/?_page=${page}&_limit=${perPage}`,
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
