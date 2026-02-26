import { SepticCardConfig, SpepticCardEditorConfig } from "@/types/cards";
import type { HomeAssistant } from "@/types/hass";

export type CardTestElement = HTMLElement & {
  hass?: HomeAssistant;
  setConfig(config: SepticCardConfig): void;
  updateComplete: Promise<void>;
};

export type CardEditorTestElement = HTMLElement & {
  hass: HomeAssistant;
  setConfig(config: SpepticCardEditorConfig): void;
  updateComplete: Promise<void>;
};

export type DialogTestElement = HTMLElement & {
  hass: HomeAssistant;
  entity: string;
  updateComplete: Promise<void>;
};
