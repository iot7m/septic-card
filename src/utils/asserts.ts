import type { GSeptikCardConfig } from "@/types/cards";
import { GSEPTIK_ENTITY_DEFS } from "@/types/defs";

export function assertAllEntities(config: GSeptikCardConfig): void {
  for (const def of GSEPTIK_ENTITY_DEFS) {
    if (!config.entities?.[def.key]) {
      throw new Error(`Missing entity: entities.${def.key}`);
    }
  }
}
