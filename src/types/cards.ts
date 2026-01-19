import type { LovelaceCardConfig } from "custom-card-helpers";

export interface GSeptikEntitiesConfig {
  level: string;
  temp: string;
  pressure: string;
  x_level: string;
  exceeds_x_level: string;
  error_name: string;
}

export interface GSeptikCardConfig extends LovelaceCardConfig {
  entities: GSeptikEntitiesConfig;
}
