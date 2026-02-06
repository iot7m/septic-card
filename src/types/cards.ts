import type { LovelaceCardConfig } from "custom-card-helpers";

export type SepticEntityKey = "level" | "temp" | "pressure" | "x_level" | "exceeds_x_level" | "error_name";

export type SepticEntitiesConfig = Record<SepticEntityKey, string>;

interface SepticHeaderConfig {
  label: string;
  show: boolean;
}

interface SepticItemConfig {
  label?: string;
  icon?: string;
  show: boolean;
}

export interface SepticCardConfig extends LovelaceCardConfig {
  entities: SepticEntitiesConfig;
  header?: SepticHeaderConfig;
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
