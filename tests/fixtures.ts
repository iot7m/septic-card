import { GSeptikEntitiesConfig } from "@/types/cards";

import { HassLike } from "@tests/types";

export const ENTITIES: GSeptikEntitiesConfig = {
  level: "sensor.uroven_zhidkosti_septika",
  temp: "sensor.temperatura_septika",
  pressure: "sensor.davlenie_septika",
  x_level: "sensor.kriticheskii_uroven_septika",
  exceeds_x_level: "sensor.prevyshen_kriticheskii_uroven_septika",
  error_name: "sensor.oshibka_septika",
};

export function createHassMock(): HassLike {
  return {
    states: {
      [ENTITIES.level]: {
        state: "42",
        attributes: { unit_of_measurement: "%" },
        entity_id: ENTITIES.level,
      },
      [ENTITIES.temp]: {
        state: "5",
        attributes: { unit_of_measurement: "°C" },
        entity_id: ENTITIES.temp,
      },
      [ENTITIES.pressure]: {
        state: "1010",
        attributes: { unit_of_measurement: "mbar" },
        entity_id: ENTITIES.pressure,
      },
      [ENTITIES.x_level]: {
        state: "80",
        attributes: { unit_of_measurement: "%" },
        entity_id: ENTITIES.x_level,
      },
      [ENTITIES.exceeds_x_level]: {
        state: "Нет",
        attributes: {},
        entity_id: ENTITIES.exceeds_x_level,
      },
      [ENTITIES.error_name]: {
        state: "",
        attributes: {},
        entity_id: ENTITIES.error_name,
      },
    },
  };
}
