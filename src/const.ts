import { SepticCardConfig } from "@/types/cards";

export const CARD_PREFIX = "septic" as const;

export const CISTERN_CARD_NAME = `${CARD_PREFIX}-cistern-card` as const;

export const CISTERN_CARD_EDITOR_NAME = `${CARD_PREFIX}-cistern-card-editor` as const;

export const TILE_CARD_NAME = `${CARD_PREFIX}-tile-card` as const;

export const SEPTIC_DIALOG_NAME = `${CARD_PREFIX}-dialog` as const;

/*
 * Default language is EN. This is workaround until i18n implementation.
 *
  header: { show: false, label: "Septic" },
  level: { show: false, icon: "mdi:water-percent", label: "Liquid level" },
  temp: { show: true, icon: "mdi:thermometer", label: "Temperature" },
  pressure: { show: true, icon: "mdi:gauge", label: "Pressure" },
  x_level: { show: false, icon: "mdi:water-alert", label: "Critical level" },
  exceeds_x_level: { show: false, icon: "mdi:alert-octagon-outline", label: "Exceeding the liquid level" },
  error_name: { show: false, icon: "mdi:alert-circle-outline", label: "Error" },
 */
export const SEPTIC_CARD_DEFAULT_CONFIG: Readonly<SepticCardConfig> = {
  entities: {
    level: "level",
    temp: "temp",
    pressure: "pressure",
    x_level: "x_level",
    exceeds_x_level: "exceeds_x_level",
    error_name: "error_name",
  },

  type: `custom:${CISTERN_CARD_NAME}`,
  header: { show: false, label: "card.header.label" },
  level: { show: false, icon: "mdi:water-percent", label: "card.entities.level" },
  temp: { show: true, icon: "mdi:thermometer", label: "card.entities.temp" },
  pressure: { show: true, icon: "mdi:gauge", label: "card.entities.pressure" },
  x_level: { show: false, icon: "mdi:water-alert", label: "card.entities.x_level" },
  exceeds_x_level: { show: false, icon: "mdi:alert-octagon-outline", label: "card.entities.exceeds_x_level" },
  error_name: { show: false, icon: "mdi:alert-circle-outline", label: "card.entities.error_name" },
};
