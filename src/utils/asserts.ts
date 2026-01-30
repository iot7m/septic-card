import type { SepticCardConfig } from "@/types/cards";
import { SEPTIC_ENTITY_DEFS } from "@/types/defs";

export function assertAllEntities(config: SepticCardConfig): void {
  for (const def of SEPTIC_ENTITY_DEFS) {
    if (!config.entities?.[def.key]) {
      throw new Error(`Missing entity: entities.${def.key}`);
    }
  }
}
