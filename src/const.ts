import { SepticCardConfig, SepticConfig } from "@/types/cards";

export const CARD_PREFIX = "septic" as const;

export const TANK_CARD_NAME = `${CARD_PREFIX}-tank-card` as const;

export const TANK_CARD_EDITOR_NAME = `${CARD_PREFIX}-tank-card-editor` as const;

export const TILE_CARD_NAME = `${CARD_PREFIX}-tile-card` as const;

export const SEPTIC_DIALOG_NAME = `${CARD_PREFIX}-dialog` as const;

export const SEPTIC_DEFAULT_CONFIG: Readonly<SepticConfig> = {
  entities: {
    level: "sensor.septic_tank_liquid_level",
    temp: "sensor.septic_tank_temperature",
    pressure: "sensor.septic_tank_pressure",
    x_level: "sensor.septic_tank_critical_level",
    exceeds_x_level: "binary_sensor.septic_tank_exceeds_critical_level",
    sdt: "sensor.septic_tank_sdt",
    error_name: "sensor.septic_tank_error",
  },
  tank: {
    header: { show: false, label: "card.header.label" },
    level: { show: false },
    scale: { position: "middle" },
  },
  level: { show: false, icon: "mdi:water-percent", label: "card.entities.level" },
  temp: { show: true, icon: "mdi:thermometer", label: "card.entities.temp" },
  pressure: { show: true, icon: "mdi:gauge", label: "card.entities.pressure" },
  x_level: { show: false, icon: "mdi:water-minus", label: "card.entities.x_level" },
  exceeds_x_level: { show: false, icon: "mdi:water-alert", label: "card.entities.exceeds_x_level" },
  sdt: { show: false, icon: "mdi:signal", label: "card.entities.sdt" },
  error_name: { show: false, icon: "mdi:alert-decagram-outline", label: "card.entities.error_name" },
};

export const SEPTIC_CARD_DEFAULT_CONFIG: Readonly<SepticCardConfig> = {
  type: `custom:${TANK_CARD_NAME}`,
  ...SEPTIC_DEFAULT_CONFIG,
};

export const TILE_CARD_DEFAULT_CONFIG: Readonly<SepticCardConfig> = {
  type: `custom:${TILE_CARD_NAME}`,
  ...SEPTIC_DEFAULT_CONFIG,
};
