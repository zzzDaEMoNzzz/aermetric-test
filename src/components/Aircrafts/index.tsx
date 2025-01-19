import { memo } from "react";
import styled from "styled-components";

import { AircraftsTable } from "./table";
import { AircraftsToolbar } from "./toolbar";
import { AircraftsFiltersTags } from "./filters";

export const Aircrafts = memo(() => {
  return (
    <AircraftsContainer>
      <AircraftsToolbar />
      <AircraftsFiltersTags />
      <AircraftsTable />
    </AircraftsContainer>
  );
});

Aircrafts.displayName = "Aircrafts";

const AircraftsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px 0;
`;
