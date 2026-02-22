import type { LovelaceCardConfig } from "custom-card-helpers";

export type SepticEntityKey = "level" | "temp" | "pressure" | "x_level" | "exceeds_x_level" | "sdt" | "error_name";

export type SepticEntitiesConfig = Record<SepticEntityKey, string>;

export interface SepticItemConfig {
  label?: string;
  icon?: string;
  show?: boolean;
}

interface SepticHeaderConfig {
  label?: string;
  show?: boolean;
}

interface SepticLevelConfig {
  show?: boolean;
}

interface SepticScaleConfig {
  position: "left" | "middle";
}

export interface SepticTankConfig {
  header?: SepticHeaderConfig;
  level?: SepticLevelConfig;
  scale?: SepticScaleConfig;
}

export interface SepticCardConfig extends LovelaceCardConfig {
  entities: SepticEntitiesConfig;
  tank?: SepticTankConfig;
  pressure?: SepticItemConfig;
  x_level?: SepticItemConfig;
  level?: SepticItemConfig;
  temp?: SepticItemConfig;
  exceeds_x_level?: SepticItemConfig;
  error_name?: SepticItemConfig;
}

export interface SpepticCardEditorConfig extends LovelaceCardConfig {
  entities?: SepticEntitiesConfig;
}
