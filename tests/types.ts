import type { HomeAssistant } from "custom-card-helpers";

import { GSpepticCardEditorConfig, SepticCardConfig } from "@/types/cards";

export type CardTestElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: SepticCardConfig): void;
  updateComplete: Promise<void>;
};

export type CardEditorTestElement = HTMLElement & {
  hass: HomeAssistant;
  setConfig(config: GSpepticCardEditorConfig): void;
  updateComplete: Promise<void>;
};

export type DialogTestElement = HTMLElement & {
  hass: HomeAssistant;
  entity: string;
  updateComplete: Promise<void>;
};
