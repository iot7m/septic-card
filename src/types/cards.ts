import type { LovelaceCardConfig } from "custom-card-helpers";

import type { GSeptikEntityKey } from "@/types/defs";

export type GSeptikEntitiesConfig = Record<GSeptikEntityKey, string>;

interface GSeptikHeaderConfig {
  label: string;
  show: boolean;
}

interface GSeptikItemConfig {
  label?: string;
  icon?: string;
  show: boolean;
}

export interface GSeptikCardConfig extends LovelaceCardConfig {
  entities: GSeptikEntitiesConfig;
  header?: GSeptikHeaderConfig;
  pressure?: GSeptikItemConfig;
  x_level?: GSeptikItemConfig;
  level?: GSeptikItemConfig;
  temp?: GSeptikItemConfig;
  exceeds_x_level?: GSeptikItemConfig;
  error_name?: GSeptikItemConfig;
}

export interface GSpepticCardEditorConfig extends LovelaceCardConfig {
  entities?: GSeptikEntitiesConfig;
}
