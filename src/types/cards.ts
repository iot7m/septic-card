import type { LovelaceCardConfig } from "custom-card-helpers";

import type { SepticEntityKey } from "@/types/defs";

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

export interface GSpepticCardEditorConfig extends LovelaceCardConfig {
  entities?: SepticEntitiesConfig;
}
