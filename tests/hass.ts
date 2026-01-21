export type HassState = {
  state: string;
  attributes: Record<string, unknown>;
  entity_id?: string;
};

export type HassLike = {
  states: Record<string, HassState>;
};

export type GSeptikEntitiesConfig = {
  level: string;
  temp: string;
  pressure: string;
  x_level: string;
  exceeds_x_level: string;
  error_name: string;
};

export type GSeptikCardConfig = {
  // In real HA this extends LovelaceCardConfig, but for tests we only need "entities".
  entities: GSeptikEntitiesConfig;
};

export interface LovelaceTestElement extends HTMLElement {
  setConfig(config: GSeptikCardConfig): void;
  hass?: HassLike;
  updateComplete: Promise<void>;
}

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
