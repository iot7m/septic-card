import type { LovelaceCardConfig } from "custom-card-helpers";

import type { GSeptikEntityKey } from "@/types/defs";

export type GSeptikEntitiesConfig = Record<GSeptikEntityKey, string>;

export interface GSeptikCardConfig extends LovelaceCardConfig {
  entities: GSeptikEntitiesConfig;
}

export interface GSpepticCardEditorConfig extends LovelaceCardConfig {
  entities?: GSeptikEntitiesConfig;
}
