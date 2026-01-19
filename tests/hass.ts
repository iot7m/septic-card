export type HassState = {
  state: string;
  attributes: Record<string, unknown>;
  entity_id?: string;
};

export type HassLike = {
  states: Record<string, HassState>;
};

export interface LovelaceTestElement extends HTMLElement {
  hass?: HassLike;
  setConfig(config: { entity: string }): void;
  updateComplete: Promise<void>;
}

export function createHassMock(): HassLike {
  return {
    states: {
      "sensor.uroven_zhidkosti_septika": {
        state: "42",
        attributes: { unit_of_measurement: "%" },
        entity_id: "sensor.uroven_zhidkosti_septika",
      },
      "sensor.temperatura_septika": {
        state: "5",
        attributes: { unit_of_measurement: "°C" },
        entity_id: "sensor.temperatura_septika",
      },
      "sensor.davlenie_septika": {
        state: "1010",
        attributes: { unit_of_measurement: "mbar" },
        entity_id: "sensor.davlenie_septika",
      },
      "sensor.kriticheskii_uroven_septika": {
        state: "80",
        attributes: { unit_of_measurement: "%" },
        entity_id: "sensor.kriticheskii_uroven_septika",
      },
      "sensor.prevyshen_kriticheskii_uroven_septika": {
        state: "Нет",
        attributes: {},
        entity_id: "sensor.prevyshen_kriticheskii_uroven_septika",
      },
      "sensor.oshibka_septika": {
        state: "",
        attributes: {},
        entity_id: "sensor.oshibka_septika",
      },
    },
  };
}
