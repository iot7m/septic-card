export type GSeptikEntityKey = "level" | "temp" | "pressure" | "x_level" | "exceeds_x_level" | "error_name";

export type GSeptikEntityDef = {
  key: GSeptikEntityKey;
  icon: string;
  label: string;
};

export const GSEPTIK_ENTITY_DEFS: ReadonlyArray<GSeptikEntityDef> = [
  { key: "level", icon: "mdi:water-percent", label: "Уровень жидкости" },
  { key: "temp", icon: "mdi:thermometer", label: "Температура" },
  { key: "pressure", icon: "mdi:gauge", label: "Давление" },
  { key: "x_level", icon: "mdi:water-alert", label: "Критический уровень" },
  { key: "exceeds_x_level", icon: "mdi:alert-octagon-outline", label: "Превышение уровня" },
  { key: "error_name", icon: "mdi:alert-circle-outline", label: "Ошибка" },
];
