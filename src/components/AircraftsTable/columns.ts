import { ColumnsType } from "antd/es/table";

import { Aircraft } from "@/types/aircrafts.ts";

const getStatusText = (status: Aircraft["status"]): string => {
  switch (status) {
    case "airworthy":
      return "Готов к вылету";
    case "maintenance":
      return "На тех обслуживании";
    default:
      return "-";
  }
};

const getStatusColor = (status: Aircraft["status"]) => {
  switch (status) {
    case "airworthy":
      return "green";
    case "maintenance":
      return "red";
    default:
      return "inherit";
  }
};

export const columns: ColumnsType<Aircraft> = [
  {
    title: "Регистрационный номер",
    key: "registrationNumber",
    dataIndex: "registrationNumber",
    sorter: true,
  },
  {
    title: "Модель",
    key: "model",
    dataIndex: "model",
    sorter: true,
  },
  {
    title: "Год выпуска",
    key: "year",
    dataIndex: "year",
    sorter: true,
  },
  {
    title: "Статус",
    key: "status",
    dataIndex: "status",
    render: getStatusText,
    onCell: (record) => ({
      style: {
        color: getStatusColor(record.status),
      },
    }),
    sorter: true,
  },
];
