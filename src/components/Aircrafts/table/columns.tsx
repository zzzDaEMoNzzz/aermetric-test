import { ColumnsType } from "antd/es/table";
import { Button, Flex, Tooltip } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

import { Aircraft } from "@/types/aircrafts";

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

type GetColumnsProps = {
  onEdit: (aircraft: Aircraft) => void;
  onDelete: (id: Aircraft["id"]) => void;
};

export const getColumns = (props: GetColumnsProps): ColumnsType<Aircraft> => {
  const { onEdit, onDelete } = props;
  return [
    {
      title: "Регистрационный номер",
      key: "registrationNumber",
      dataIndex: "registrationNumber",
      width: 140,
      sorter: true,
    },
    {
      title: "Модель",
      key: "model",
      dataIndex: "model",
      width: 140,
      sorter: true,
    },
    {
      title: "Год выпуска",
      key: "year",
      dataIndex: "year",
      width: 140,
      sorter: true,
    },
    {
      title: "Статус",
      key: "status",
      dataIndex: "status",
      width: 140,
      render: getStatusText,
      onCell: (record) => ({
        style: {
          color: getStatusColor(record.status),
        },
      }),
      sorter: true,
    },
    {
      title: "",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Flex gap="small" justify="flex-end">
          <Tooltip title="Редактировать">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                onEdit(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Удалить">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={() => {
                onDelete(record.id);
              }}
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];
};
