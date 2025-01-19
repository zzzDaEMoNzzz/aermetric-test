import { SortOrder } from "antd/es/table/interface";

import { Aircraft } from "@/types/aircrafts";

export type AircraftsStore = {
  page: number;
  perPage: number;
  sortBy: string;
  sortOrder: SortOrder;
  filters: AircraftsFilters;
};

export type AircraftsFilters = {
  registrationNumber: string | null;
  model: string | null;
  yearFrom: string | null;
  yearTo: string | null;
  status: Aircraft["status"] | "all";
};
