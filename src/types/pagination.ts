export type PaginationParams = {
  page: number;
  perPage: number;
};

export type PaginationMeta = PaginationParams & {
  total: number;
};
