import { memo, useCallback, useMemo } from "react";
import { Table, TablePaginationConfig } from "antd";
import { type FilterValue, SorterResult } from "antd/es/table/interface";

import { Aircraft } from "@/types/aircrafts";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  useDeleteAircraftMutation,
  useGetAircraftsQuery,
} from "@/store/aircrafts/api";
import {
  selectAircraftsFilters,
  selectAircraftsPage,
  selectAircraftsPerPage,
  selectAircraftsSortBy,
  selectAircraftsSortOrder,
  setAircraftsPage,
  setAircraftsPerPage,
  setAircraftsSortBy,
  setAircraftsSortOrder,
} from "@/store/aircrafts/slice";

import { getColumns } from "./columns";

const getSorterParams = (
  sorter: SorterResult<Aircraft> | SorterResult<Aircraft>[],
) => {
  return Array.isArray(sorter) ? sorter[0] : sorter;
};

type Props = {
  onEdit: (aircraft: Aircraft) => void;
};

export const AircraftsTable = memo<Props>((props) => {
  const { onEdit } = props;

  const dispatch = useAppDispatch();

  const page = useAppSelector(selectAircraftsPage);
  const perPage = useAppSelector(selectAircraftsPerPage);
  const sortBy = useAppSelector(selectAircraftsSortBy);
  const sortOrder = useAppSelector(selectAircraftsSortOrder);
  const filters = useAppSelector(selectAircraftsFilters);

  const [deleteAircraft] = useDeleteAircraftMutation();

  const { data, isLoading } = useGetAircraftsQuery({
    page,
    perPage,
    sortBy,
    sortOrder,
    filters,
  });

  const onChangeTableParams = useCallback(
    (
      pagination: TablePaginationConfig,
      _: Record<string, FilterValue | null>,
      sorter: SorterResult<Aircraft> | SorterResult<Aircraft>[],
    ) => {
      if (pagination.current && pagination.pageSize) {
        dispatch(setAircraftsPage(pagination.current));
        dispatch(setAircraftsPerPage(pagination.pageSize));
      }

      const sortParams = getSorterParams(sorter);
      dispatch(
        setAircraftsSortBy(
          sortParams.columnKey ? String(sortParams.columnKey) : "id",
        ),
      );
      dispatch(setAircraftsSortOrder(sortParams.order || "ascend"));
    },
    [dispatch],
  );

  const columns = useMemo(() => {
    return getColumns({
      onEdit,
      onDelete: deleteAircraft,
    });
  }, [onEdit, deleteAircraft]);

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
        pageSizeOptions: [5, 10, 20],
        showSizeChanger: true,
      }}
      showSorterTooltip={false}
      onChange={onChangeTableParams}
      scroll={{
        x: "1000px",
      }}
    />
  );
});

AircraftsTable.displayName = "AircraftsTable";
