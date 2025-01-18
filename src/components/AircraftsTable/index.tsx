import { useCallback, useState } from "react";
import { Table, TablePaginationConfig } from "antd";
import {
  type FilterValue,
  SorterResult,
  SortOrder,
} from "antd/es/table/interface";

import { Aircraft } from "@/types/aircrafts";
import { useGetAllAircraftsQuery } from "@/store/aircrafts/api";

import { columns } from "./columns";

const getSorterParams = (
  sorter: SorterResult<Aircraft> | SorterResult<Aircraft>[],
) => {
  return Array.isArray(sorter) ? sorter[0] : sorter;
};

export const AircraftsTable = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [sortBy, setSortBy] = useState<string>("id");
  const [sortOrder, setSortOrder] = useState<SortOrder>("ascend");

  const { data, isLoading } = useGetAllAircraftsQuery({
    page,
    perPage,
    sortBy,
    sortOrder,
  });

  const onChangePagination = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setPerPage(pageSize);
  }, []);

  const onChangeTableParams = useCallback(
    (
      _: TablePaginationConfig,
      __: Record<string, FilterValue | null>,
      sorter: SorterResult<Aircraft> | SorterResult<Aircraft>[],
    ) => {
      const sortParams = getSorterParams(sorter);
      setSortBy(String(sortParams.columnKey));
      setSortOrder(sortParams.order || "ascend");
    },
    [],
  );

  return (
    <Table
      rowKey="id"
      loading={isLoading}
      dataSource={data?.items}
      columns={columns}
      pagination={{
        current: data?.meta.page,
        pageSize: data?.meta.perPage,
        total: data?.meta.total,
        onChange: onChangePagination,
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: true,
      }}
      showSorterTooltip={false}
      onChange={onChangeTableParams}
    />
  );
};
