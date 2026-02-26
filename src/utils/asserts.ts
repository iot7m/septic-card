import type { SepticEntityKey } from "@/types/cards";

import { SEPTIC_CARD_DEFAULT_CONFIG } from "@/const";

type HasEntities = {
  entities: Record<SepticEntityKey, string>;
};
export function assertAllEntities(config: HasEntities): void {
  const requiredKeys = Object.keys(SEPTIC_CARD_DEFAULT_CONFIG.entities) as SepticEntityKey[];

  for (const key of requiredKeys) {
    const entityId = config.entities[key];

    if (typeof entityId !== "string" || entityId.trim() === "") {
      throw new Error(`Missing entity: entities.${key}`);
    }
  }
}
