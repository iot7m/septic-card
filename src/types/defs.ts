export type SepticEntityKey = "level" | "temp" | "pressure" | "x_level" | "exceeds_x_level" | "error_name";

export type SepticEntityDef = {
  key: SepticEntityKey;
  icon: string;
  label: string;
};

export const SEPTIC_ENTITY_DEFS: ReadonlyArray<SepticEntityDef> = [
  { key: "level", icon: "mdi:water-percent", label: "Liquid level" },
  { key: "temp", icon: "mdi:thermometer", label: "Temperature" },
  { key: "pressure", icon: "mdi:gauge", label: "Pressure" },
  { key: "x_level", icon: "mdi:water-alert", label: "Critical level" },
  { key: "exceeds_x_level", icon: "mdi:alert-octagon-outline", label: "Exceeding the liquid level" },
  { key: "error_name", icon: "mdi:alert-circle-outline", label: "Error" },
];
