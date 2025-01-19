import { memo } from "react";
import { Button } from "antd";
import { FilterOutlined, PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { useModalState } from "@/hooks/useModalState";
import { AircraftFiltersModal } from "@/components/Aircrafts/filters";

export const AircraftsToolbar = memo(() => {
  const filtersModal = useModalState();

  return (
    <Container>
      <h2>Самолеты</h2>
      <Actions>
        <Button
          variant="solid"
          color="green"
          icon={<FilterOutlined />}
          onClick={filtersModal.show}
        >
          Фильтры
        </Button>
        <Button variant="solid" color="blue" icon={<PlusOutlined />}>
          Добавить
        </Button>
      </Actions>
      {filtersModal.isVisible && (
        <AircraftFiltersModal onClose={filtersModal.hide} />
      )}
    </Container>
  );
});

AircraftsToolbar.displayName = "AircraftsToolbar";

const Container = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin-right: auto;
  }
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 0 4px;
`;
