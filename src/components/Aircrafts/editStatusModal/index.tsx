import { memo, useCallback, useMemo } from "react";
import { SelectProps } from "rc-select/lib/Select";
import { Form, Input, Modal, Select } from "antd";
import styled from "styled-components";

import { Aircraft } from "@/types/aircrafts";
import {
  useAddAircraftNewStatusMutation,
  useUpdateAircraftMutation,
} from "@/store/aircrafts/api";

type Props = {
  aircraft: Aircraft;
  onClose(): void;
};

const options: SelectProps["options"] = [
  {
    value: "airworthy",
    label: "Готов к вылету",
  },
  {
    value: "maintenance",
    label: "На тех обслуживании",
  },
];

export const AircraftEditStatusModal = memo<Props>((props) => {
  const { aircraft, onClose } = props;

  const [form] = Form.useForm();
  const [addNewStatus] = useAddAircraftNewStatusMutation();
  const [updateAircraft] = useUpdateAircraftMutation();

  const filteredOptions = useMemo(() => {
    return options.filter((o) => o.value !== aircraft.status);
  }, [aircraft]);

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (values: any) => {
      await addNewStatus({
        aircraftId: aircraft.id,
        date: new Date().toISOString(),
        ...values,
      }).unwrap();
      await updateAircraft({
        ...aircraft,
        status: values.newStatus,
      }).unwrap();
      onClose();
    },
    [addNewStatus, aircraft, onClose, updateAircraft],
  );

  return (
    <Modal
      title={`Сменить статус самолета "${aircraft.model}"`}
      open
      onCancel={onClose}
      cancelText="Отмена"
      okText="Сохранить"
      onOk={form.submit}
    >
      <FormWrapper>
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            name="newStatus"
            label="Новый статус"
            rules={[{ required: true, message: "Обязательное поле" }]}
            initialValue={filteredOptions[0]?.value}
          >
            <Select options={filteredOptions} />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Комментарий"
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input.TextArea />
          </Form.Item>
        </Form>
      </FormWrapper>
    </Modal>
  );
});

AircraftEditStatusModal.displayName = "AircraftEditStatusModal";

const FormWrapper = styled.div`
  padding: 16px 0;

  .ant-form-item {
    margin-bottom: 8px;
  }
`;
