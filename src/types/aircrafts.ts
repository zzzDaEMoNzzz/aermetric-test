export type Aircraft = {
  id: string;
  registrationNumber: string;
  model: string;
  year: number;
  status: "airworthy" | "maintenance";
};
