import { ColumnsType } from "antd/es/table";

import { AircraftStatusHistoryItem } from "@/types/aircrafts";

const statusValues: Record<AircraftStatusHistoryItem["newStatus"], string> = {
  airworthy: "Готов к вылету",
  maintenance: "На тех обслуживании",
};

export const columns: ColumnsType<AircraftStatusHistoryItem> = [
  {
    title: "Дата",
    key: "date",
    dataIndex: "date",
    render: (date) => {
      return new Date(date).toLocaleString();
    },
  },
  {
    title: "Новый статус",
    key: "newStatus",
    dataIndex: "newStatus",
    render: (status: AircraftStatusHistoryItem["newStatus"]) => {
      return statusValues[status];
    },
  },
  {
    title: "Комментарий",
    key: "comment",
    dataIndex: "comment",
  },
];
