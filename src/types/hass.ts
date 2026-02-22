import type { HassEntities, HassEntity } from "home-assistant-js-websocket";

import { LitElement } from "lit";

export type HassState = {
  state: string;
  attributes?: {
    unit_of_measurement?: unknown;
    friendly_name?: unknown;
    [key: string]: unknown;
  };
};

export interface FrontendLocaleData {
  language: string;
  number_format: "comma_decimal" | "decimal_comma" | "space_comma" | "system";
  time_format: "12" | "24" | "system";
  date_format: "language" | "system" | "DMY" | "MDY" | "YMD";
}

export type LocalizeFunc = (key: string, placeholders?: Record<string, string | number>) => string;

export interface UnitSystem {
  length: string;
  mass: string;
  temperature: string;
  volume: string;
  pressure: string;
  wind_speed: string;
  precipitation: string;
}

export interface HomeAssistant {
  states: HassEntities;
  language: string;
  locale: FrontendLocaleData;

  config: {
    unit_system: UnitSystem;
  };

  localize: LocalizeFunc;

  formatEntityState(stateObj: HassEntity): string;

  formatEntityAttributeValue(stateObj: HassEntity, attribute: string, value?: string | number | boolean | null): string;
}

export interface LovelaceCardConfig {
  type: string;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;

  setConfig(config: LovelaceCardConfig): void;

  getCardSize?(): number;
}

export interface ConfigChangedDetail<TConfig> {
  config: TConfig;
}

export type ConfigChangedEvent<TConfig> = CustomEvent<ConfigChangedDetail<TConfig>>;

export interface LovelaceCardEditor<TConfig> extends LitElement {
  hass?: HomeAssistant;
  setConfig(config: TConfig): void;
}
