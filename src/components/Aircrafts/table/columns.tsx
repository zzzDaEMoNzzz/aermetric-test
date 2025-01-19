import { ColumnsType } from "antd/es/table";
import { Button, Flex, Tooltip } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  HistoryOutlined,
} from "@ant-design/icons";
import styled from "styled-components";

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
      return "blue";
  }
};

type GetColumnsProps = {
  onEdit: (aircraft: Aircraft) => void;
  onDelete: (id: Aircraft["id"]) => void;
  onShowHistory: (aircraft: Aircraft) => void;
  onEditStatus: (aircraft: Aircraft) => void;
};

export const getColumns = (props: GetColumnsProps): ColumnsType<Aircraft> => {
  const { onEdit, onDelete, onShowHistory, onEditStatus } = props;
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
      render: (status, record) => {
        return (
          <StatusButtonWrapper>
            <Tooltip title="Изменить статус">
              <Button
                icon={<EditOutlined />}
                iconPosition="end"
                size="small"
                variant="text"
                color={getStatusColor(status)}
                onClick={() => onEditStatus(record)}
              >
                {getStatusText(status)}
              </Button>
            </Tooltip>
          </StatusButtonWrapper>
        );
      },
      sorter: true,
    },
    {
      title: "",
      key: "actions",
      width: 80,
      render: (_, record) => (
        <Flex gap="small" justify="flex-end">
          <Tooltip title="Показать историю статусов">
            <Button
              shape="circle"
              icon={<HistoryOutlined />}
              onClick={() => {
                onShowHistory(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Редактировать самолет">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={() => {
                onEdit(record);
              }}
            />
          </Tooltip>
          <Tooltip title="Удалить самолет">
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

const StatusButtonWrapper = styled.div`
  margin-left: -7px;
`;
