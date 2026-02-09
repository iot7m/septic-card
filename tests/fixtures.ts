import type { HomeAssistant } from "custom-card-helpers";

import { SepticEntitiesConfig } from "@/types/cards";

import { SEPTIC_CARD_DEFAULT_CONFIG } from "@/const";

export const ENTITIES: SepticEntitiesConfig = {
  ...SEPTIC_CARD_DEFAULT_CONFIG.entities,
};

export function createHass(): HomeAssistant {
  return {
    states: {
      [ENTITIES.level]: { state: "42", attributes: { unit_of_measurement: "%" } },
      [ENTITIES.temp]: { state: "5", attributes: { unit_of_measurement: "°C" } },
      [ENTITIES.pressure]: { state: "1010", attributes: { unit_of_measurement: "mbar" } },
      [ENTITIES.x_level]: { state: "80", attributes: { unit_of_measurement: "%" } },
      [ENTITIES.exceeds_x_level]: { state: "Нет", attributes: {} },
      [ENTITIES.sdt]: { state: "98", attributes: { unit_of_measurement: "%" } },
      [ENTITIES.error_name]: { state: "", attributes: {} },
    },
  } as unknown as HomeAssistant;
}
