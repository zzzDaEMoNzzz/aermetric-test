import { AircraftsFilters } from "@/store/aircrafts/types";

export const getSearchParamsForAircraftsFilters = (
  filters: AircraftsFilters,
) => {
  const searchParams = new URLSearchParams();
  for (const key in filters) {
    const value = filters[key as keyof AircraftsFilters];
    if (value) {
      switch (key) {
        case "registrationNumber":
        case "model":
        case "status": {
          searchParams.set(`${key}_like`, value);
          break;
        }
        case "yearFrom":
          searchParams.set("year_gte", value);
          break;
        case "yearTo": {
          searchParams.set("year_lte", value);
          break;
        }
        default:
      }
    }
  }
  return searchParams.toString();
};
