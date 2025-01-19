import { memo } from "react";
import { Modal, Table } from "antd";

import { Aircraft } from "@/types/aircrafts";
import { useGetAircraftStatusHistoryQuery } from "@/store/aircrafts/api";

import { columns } from "./columns";

type Props = {
  aircraft: Aircraft;
  onClose(): void;
};

export const StatusHistoryModal = memo<Props>((props) => {
  const { aircraft, onClose } = props;
  const { data, isLoading } = useGetAircraftStatusHistoryQuery(aircraft.id);
  return (
    <Modal
      title={`История смены статусов "${aircraft.model}"`}
      open
      onCancel={onClose}
      footer={false}
    >
      <Table
        rowKey="id"
        dataSource={data}
        loading={isLoading}
        columns={columns}
        pagination={false}
      />
    </Modal>
  );
});

StatusHistoryModal.displayName = "StatusHistoryModal";
