import { useCallback, useState } from "react";
import { Table } from "antd";

import { useGetAllAircraftsQuery } from "@/store/aircrafts/api";

import { columns } from "./columns";

export const AircraftsTable = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);

  const { data, isLoading } = useGetAllAircraftsQuery({ page, perPage });

  const onChangePagination = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setPerPage(pageSize);
  }, []);

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
      }}
    />
  );
};
