import type { LovelaceCardConfig } from "custom-card-helpers";

import type { GSeptikEntityKey } from "@/types/defs";

export type GSeptikEntitiesConfig = Record<GSeptikEntityKey, string>;

interface GsepticHeader {
  label: string;
  show: boolean;
}
interface GsepticEntityItem {
  label: string;
  icon: string;
  show: boolean;
}

export interface GSeptikCardConfig extends LovelaceCardConfig {
  entities: GSeptikEntitiesConfig;
  header?: GsepticHeader;
  pressure?: GsepticEntityItem;
  x_level?: GsepticEntityItem;
  level?: GsepticEntityItem;
  temp?: GsepticEntityItem;
  exceeds_x_level?: GsepticEntityItem;
  error_name?: GsepticEntityItem;
}

export interface GSpepticCardEditorConfig extends LovelaceCardConfig {
  entities?: GSeptikEntitiesConfig;
}
