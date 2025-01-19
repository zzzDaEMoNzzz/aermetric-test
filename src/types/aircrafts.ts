export type Aircraft = {
  id: string;
  registrationNumber: string;
  model: string;
  year: number;
  status: "airworthy" | "maintenance";
};

export type AircraftStatusHistoryItem = {
  id: string;
  aircraftId: string;
  newStatus: Aircraft["status"];
  date: string;
  comment: string;
};
