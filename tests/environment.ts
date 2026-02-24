import { HassEntity } from "home-assistant-js-websocket";

import type { HomeAssistant } from "@/types/hass";

import { SEPTIC_DEFAULT_CONFIG } from "@/const";

export function createHassEnvironment(): HomeAssistant {
  return {
    states: {
      [SEPTIC_DEFAULT_CONFIG.entities.level]: { state: "42", attributes: { unit_of_measurement: "%" } },
      [SEPTIC_DEFAULT_CONFIG.entities.temp]: { state: "5", attributes: { unit_of_measurement: "°C" } },
      [SEPTIC_DEFAULT_CONFIG.entities.pressure]: { state: "1010", attributes: { unit_of_measurement: "mbar" } },
      [SEPTIC_DEFAULT_CONFIG.entities.x_level]: { state: "80", attributes: { unit_of_measurement: "%" } },
      [SEPTIC_DEFAULT_CONFIG.entities.exceeds_x_level]: { state: "off", attributes: {} },
      [SEPTIC_DEFAULT_CONFIG.entities.sdt]: { state: "98", attributes: { unit_of_measurement: "%" } },
      [SEPTIC_DEFAULT_CONFIG.entities.error_name]: { state: "", attributes: {} },
    },

    formatEntityState: (stateObj: HassEntity) => {
      const uom = stateObj?.attributes?.unit_of_measurement ?? stateObj?.attributes?.unit ?? "";
      const state = stateObj?.state ?? "";
      return `${state}${uom ? ` ${uom}` : ""}`.trim();
    },
  } as unknown as HomeAssistant;
}
