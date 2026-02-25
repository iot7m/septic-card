import type { HassEntities, HassEntity } from "home-assistant-js-websocket";

import { LitElement } from "lit";

export interface FrontendLocaleData {
  language: string;
  number_format: "comma_decimal" | "decimal_comma" | "space_comma" | "system";
  time_format: "12" | "24" | "system";
  date_format: "language" | "system" | "DMY" | "MDY" | "YMD";
}

export type LocalizeFunc = (key: string, placeholders?: Record<string, string | number>) => string;

export interface HomeAssistant {
  states: HassEntities;
  language: string;
  locale: FrontendLocaleData;

  config: {
    unit_system?: Record<string, string>;
  };

  localize: LocalizeFunc;

  formatEntityState(stateObj: HassEntity): string;
}

export interface LovelaceCardConfig {
  type: string;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;

  setConfig(config: LovelaceCardConfig): void;

  getCardSize?(): number;
}
export interface LovelaceCardEditor<TConfig> extends LitElement {
  hass?: HomeAssistant;
  setConfig(config: TConfig): void;
}
