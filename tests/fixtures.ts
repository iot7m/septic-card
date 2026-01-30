import type { HomeAssistant } from "custom-card-helpers";

import { SepticEntitiesConfig } from "@/types/cards";

export const ENTITIES: SepticEntitiesConfig = {
  level: "sensor.uroven_zhidkosti_septika",
  temp: "sensor.temperatura_septika",
  pressure: "sensor.davlenie_septika",
  x_level: "sensor.kriticheskii_uroven_septika",
  exceeds_x_level: "sensor.prevyshen_kriticheskii_uroven_septika",
  error_name: "sensor.oshibka_septika",
};

export function createHass(): HomeAssistant {
  return {
    states: {
      [ENTITIES.level]: { state: "42", attributes: { unit_of_measurement: "%" } },
      [ENTITIES.temp]: { state: "5", attributes: { unit_of_measurement: "°C" } },
      [ENTITIES.pressure]: { state: "1010", attributes: { unit_of_measurement: "mbar" } },
      [ENTITIES.x_level]: { state: "80", attributes: { unit_of_measurement: "%" } },
      [ENTITIES.exceeds_x_level]: { state: "Нет", attributes: {} },
      [ENTITIES.error_name]: { state: "", attributes: {} },
    },
  } as unknown as HomeAssistant;
}
