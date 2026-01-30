export type SepticEntityKey = "level" | "temp" | "pressure" | "x_level" | "exceeds_x_level" | "error_name";

export type SepticEntityDef = {
  key: SepticEntityKey;
  icon: string;
  label: string;
  show: boolean;
};

export const SEPTIC_ENTITY_DEFS: ReadonlyArray<SepticEntityDef> = [
  { key: "level", icon: "mdi:water-percent", label: "Уровень жидкости", show: false },
  { key: "temp", icon: "mdi:thermometer", label: "Температура", show: true },
  { key: "pressure", icon: "mdi:gauge", label: "Давление", show: true },
  { key: "x_level", icon: "mdi:water-alert", label: "Критический уровень", show: false },
  { key: "exceeds_x_level", icon: "mdi:alert-octagon-outline", label: "Превышение уровня", show: false },
  { key: "error_name", icon: "mdi:alert-circle-outline", label: "Ошибка", show: false },
];
