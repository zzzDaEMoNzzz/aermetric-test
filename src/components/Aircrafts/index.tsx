import { memo } from "react";
import styled from "styled-components";

import { Aircraft } from "@/types/aircrafts";
import { useModalState } from "@/hooks/useModalState";

import { AircraftsTable } from "./table";
import { AircraftsToolbar } from "./toolbar";
import { AircraftsFiltersTags } from "./filters";
import { AircraftEditModal } from "./editModal";

export const Aircrafts = memo(() => {
  const aircraftModal = useModalState<Aircraft | undefined>();

  return (
    <AircraftsContainer>
      <AircraftsToolbar onCreate={() => aircraftModal.show(undefined)} />
      <AircraftsFiltersTags />
      <AircraftsTable onEdit={aircraftModal.show} />
      {aircraftModal.isVisible && (
        <AircraftEditModal
          initialValues={aircraftModal.data}
          onClose={aircraftModal.hide}
        />
      )}
    </AircraftsContainer>
  );
});

Aircrafts.displayName = "Aircrafts";

const AircraftsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
`;
