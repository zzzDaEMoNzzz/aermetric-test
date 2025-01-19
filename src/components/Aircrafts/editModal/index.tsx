import { memo, useCallback } from "react";
import { Form, Input, InputNumber, Modal } from "antd";
import styled from "styled-components";

import { Aircraft } from "@/types/aircrafts";
import {
  useCreateAircraftMutation,
  useUpdateAircraftMutation,
} from "@/store/aircrafts/api";

type Props = {
  initialValues?: Aircraft;
  onClose: () => void;
};

export const AircraftEditModal = memo<Props>((props) => {
  const { initialValues, onClose } = props;

  const [form] = Form.useForm();
  const [updateAircraft] = useUpdateAircraftMutation();
  const [createAircraft] = useCreateAircraftMutation();

  const onSubmit = useCallback(
    (values: Aircraft) => {
      if (initialValues?.id) {
        updateAircraft({
          ...initialValues,
          ...values,
        });
      } else {
        createAircraft({
          ...values,
          status: "airworthy",
        });
      }
      onClose();
    },
    [updateAircraft, createAircraft, initialValues, onClose],
  );

  return (
    <Modal
      title={
        initialValues?.id ? "Редактирование самолета" : "Добавление самолета"
      }
      open
      okText="Сохранить"
      cancelText="Отмена"
      onCancel={onClose}
      onOk={form.submit}
      destroyOnClose
    >
      <FormWrapper>
        <Form
          layout="vertical"
          initialValues={initialValues}
          form={form}
          onFinish={onSubmit}
        >
          <Form.Item
            name="registrationNumber"
            label="Регистрационный номер"
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="model"
            label="Модель"
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="year"
            label="Год выпуска"
            rules={[{ required: true, message: "Обязательное поле" }]}
          >
            <InputNumber />
          </Form.Item>
        </Form>
      </FormWrapper>
    </Modal>
  );
});

AircraftEditModal.displayName = "AircraftEditModal";

const FormWrapper = styled.div`
  padding: 16px 0;

  .ant-form-item {
    margin-bottom: 8px;
  }

  .ant-input-number {
    width: 100%;
  }
`;
