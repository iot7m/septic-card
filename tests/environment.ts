import type { HassEntities, HassEntity } from "home-assistant-js-websocket";

import type { FrontendLocaleData, HomeAssistant, LocalizeFunc } from "@/types/hass";

import { SEPTIC_DEFAULT_CONFIG } from "@/const";

export function createEntity(entity_id: string, state: string, attributes: Record<string, string> = {}): HassEntity {
  const now = new Date().toISOString();

  return {
    entity_id,
    state,
    attributes,
    last_changed: now,
    last_updated: now,
    context: {
      id: "test",
      parent_id: null,
      user_id: null,
    },
  };
}

export function createHassEnvironment(): HomeAssistant {
  const states: HassEntities = {
    [SEPTIC_DEFAULT_CONFIG.entities.level]: createEntity(SEPTIC_DEFAULT_CONFIG.entities.level, "42", {
      unit_of_measurement: "%",
    }),
    [SEPTIC_DEFAULT_CONFIG.entities.temp]: createEntity(SEPTIC_DEFAULT_CONFIG.entities.temp, "5", {
      unit_of_measurement: "°C",
    }),
    [SEPTIC_DEFAULT_CONFIG.entities.pressure]: createEntity(SEPTIC_DEFAULT_CONFIG.entities.pressure, "1010", {
      unit_of_measurement: "mbar",
    }),
    [SEPTIC_DEFAULT_CONFIG.entities.x_level]: createEntity(SEPTIC_DEFAULT_CONFIG.entities.x_level, "80", {
      unit_of_measurement: "%",
    }),
    [SEPTIC_DEFAULT_CONFIG.entities.exceeds_x_level]: createEntity(
      SEPTIC_DEFAULT_CONFIG.entities.exceeds_x_level,
      "off",
    ),
    [SEPTIC_DEFAULT_CONFIG.entities.sdt]: createEntity(SEPTIC_DEFAULT_CONFIG.entities.sdt, "98", {
      unit_of_measurement: "%",
    }),
    [SEPTIC_DEFAULT_CONFIG.entities.error_name]: createEntity(SEPTIC_DEFAULT_CONFIG.entities.error_name, ""),
  };

  const locale: FrontendLocaleData = {
    language: "en",
    number_format: "decimal_comma",
    time_format: "24",
    date_format: "DMY",
  };

  const config = {
    unit_system: {
      pressure: "mbar",
      temperature: "°C",
    },
  };

  const localize: LocalizeFunc = (key: string): string => key;

  return {
    states,
    language: "en",
    locale,
    config,
    localize,

    formatEntityState: (stateObj: HassEntity): string => {
      const uom =
        typeof stateObj.attributes.unit_of_measurement === "string" ? stateObj.attributes.unit_of_measurement : "";

      return uom ? `${stateObj.state} ${uom}` : stateObj.state;
    },
  };
}
