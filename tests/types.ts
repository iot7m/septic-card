import { GSeptikCardConfig, GSpepticCardEditorConfig } from "@/types/cards";

export type HassState = {
  state: string;
  attributes: Record<string, unknown>;
  entity_id?: string;
};

export type HassLike = {
  states: Record<string, HassState>;
};

export type CardTestElement = HTMLElement & {
  hass?: HassLike;
  setConfig(config: GSeptikCardConfig): void;
  updateComplete: Promise<void>;
};

export type CardEditorTestElement = HTMLElement & {
  hass: unknown;
  setConfig(config: GSpepticCardEditorConfig): void;
  updateComplete: Promise<void>;
};
