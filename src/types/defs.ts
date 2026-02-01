import { SepticCardConfig } from "./cards";

import { CISTERN_CARD_NAME } from "@/const";

export const SEPTIC_CONFIG_DEFS: Readonly<SepticCardConfig> = {
  entities: {
    level: "level",
    temp: "temp",
    pressure: "pressure",
    x_level: "x_level",
    exceeds_x_level: "exceeds_x_level",
    error_name: "error_name",
  },
  type: `custom:${CISTERN_CARD_NAME}`,
  header: { show: false, label: "Septic" },
  level: { show: false, icon: "mdi:water-percent", label: "Liquid level" },
  temp: { show: true, icon: "mdi:thermometer", label: "Temperature" },
  pressure: { show: true, icon: "mdi:gauge", label: "Pressure" },
  x_level: { show: false, icon: "mdi:water-alert", label: "Critical level" },
  exceeds_x_level: { show: false, icon: "mdi:alert-octagon-outline", label: "Exceeding the liquid level" },
  error_name: { show: false, icon: "mdi:alert-circle-outline", label: "Error" },
};
