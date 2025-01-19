import { memo, useCallback } from "react";
import { SelectProps } from "rc-select/lib/Select";
import { Form, Input, InputNumber, Modal, Select, Space } from "antd";
import styled from "styled-components";

import { AircraftsFilters } from "@/store/aircrafts/types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  selectAircraftsFilters,
  setAircraftsFilters,
  setAircraftsPage,
} from "@/store/aircrafts/slice";

type Props = {
  onClose: () => void;
};

const YEAR_VALIDATION_ERROR =
  "Значение От должно быть меньше или равно значению До";

const STATUS_OPTIONS: SelectProps["options"] = [
  {
    value: "all",
    label: "Все",
  },
  {
    value: "airworthy",
    label: "Готов к вылету",
  },
  {
    value: "maintenance",
    label: "На тех обслуживании",
  },
];

export const AircraftFiltersModal = memo<Props>((props) => {
  const { onClose } = props;

  const dispatch = useAppDispatch();

  const initialValues = useAppSelector(selectAircraftsFilters);

  const [form] = Form.useForm();
  const yearFrom = Form.useWatch("yearFrom", form);
  const yearTo = Form.useWatch("yearTo", form);

  const onSubmit = useCallback(
    (filters: AircraftsFilters) => {
      dispatch(setAircraftsFilters(filters));
      dispatch(setAircraftsPage(1));
      onClose();
    },
    [onClose, dispatch],
  );

  return (
    <Modal
      title="Фильтры"
      open
      okText="Сохранить"
      cancelText="Отмена"
      onOk={form.submit}
      onCancel={onClose}
      destroyOnClose
    >
      <FormWrapper>
        <Form
          layout="vertical"
          form={form}
          initialValues={initialValues}
          onFinish={onSubmit}
          validateTrigger="onBlur"
        >
          <Form.Item name="registrationNumber" label="Регистрационный номер">
            <Input />
          </Form.Item>
          <Form.Item name="model" label="Модель">
            <Input />
          </Form.Item>
          <Form.Item label="Год выпуска">
            <Space split>
              <Form.Item
                name="yearFrom"
                noStyle
                rules={[
                  {
                    validator: async (_, value) => {
                      if (
                        typeof value === "number" &&
                        yearTo &&
                        value > yearTo
                      ) {
                        return Promise.reject(YEAR_VALIDATION_ERROR);
                      }
                    },
                  },
                ]}
              >
                <InputNumber addonBefore="От" />
              </Form.Item>
              <Form.Item
                name="yearTo"
                noStyle
                rules={[
                  {
                    validator: async (_, value) => {
                      if (
                        typeof value === "number" &&
                        yearFrom &&
                        value < yearFrom
                      ) {
                        return Promise.reject(YEAR_VALIDATION_ERROR);
                      }
                    },
                  },
                ]}
              >
                <InputNumber addonBefore="До" />
              </Form.Item>
            </Space>
          </Form.Item>
          <Form.Item name="status" label="Статус">
            <Select options={STATUS_OPTIONS} />
          </Form.Item>
        </Form>
      </FormWrapper>
    </Modal>
  );
});

AircraftFiltersModal.displayName = "AircraftFiltersModal";

const FormWrapper = styled.div`
  padding: 16px 0;

  .ant-form-item {
    margin-bottom: 8px;
  }
`;
