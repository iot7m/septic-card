import type { LovelaceCardConfig } from "custom-card-helpers";

export type SepticEntityKey = "level" | "temp" | "pressure" | "x_level" | "exceeds_x_level" | "error_name";

export type SepticEntitiesConfig = Record<SepticEntityKey, string>;

interface SepticHeaderConfig {
  label: string;
  show: boolean;
}

interface SepticLevelConfig {
  show: boolean;
}
interface SepticScaleConfig {
  position: "left" | "middle";
}

interface SepticItemConfig {
  label?: string;
  icon?: string;
  show: boolean;
}

interface TankStyleConfig {
  header?: SepticHeaderConfig;
  level?: SepticLevelConfig;
  scale?: SepticScaleConfig;
}

export interface SepticCardConfig extends LovelaceCardConfig {
  entities: SepticEntitiesConfig;
  tank?: TankStyleConfig;
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
