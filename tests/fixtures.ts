import type { HomeAssistant } from "custom-card-helpers";

import { SEPTIC_DEFAULT_CONFIG } from "@/const";

export function createHass(): HomeAssistant {
  return {
    states: {
      [SEPTIC_DEFAULT_CONFIG.entities.level]: { state: "42", attributes: { unit_of_measurement: "%" } },
      [SEPTIC_DEFAULT_CONFIG.entities.temp]: { state: "5", attributes: { unit_of_measurement: "°C" } },
      [SEPTIC_DEFAULT_CONFIG.entities.pressure]: { state: "1010", attributes: { unit_of_measurement: "mbar" } },
      [SEPTIC_DEFAULT_CONFIG.entities.x_level]: { state: "80", attributes: { unit_of_measurement: "%" } },
      [SEPTIC_DEFAULT_CONFIG.entities.exceeds_x_level]: { state: "Нет", attributes: {} },
      [SEPTIC_DEFAULT_CONFIG.entities.sdt]: { state: "98", attributes: { unit_of_measurement: "%" } },
      [SEPTIC_DEFAULT_CONFIG.entities.error_name]: { state: "", attributes: {} },
    },
  } as unknown as HomeAssistant;
}
