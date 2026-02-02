import type { SepticCardConfig } from "@/types/cards";

import { SEPTIC_CARD_DEFAULT_CONFIG } from "@/const";

export function assertAllEntities(config: SepticCardConfig): void {
  if (!config.entities) {
    throw new Error("Missing entities configuration");
  }

  const requiredKeys = Object.keys(SEPTIC_CARD_DEFAULT_CONFIG.entities) as Array<
    keyof typeof SEPTIC_CARD_DEFAULT_CONFIG.entities
  >;

  for (const key of requiredKeys) {
    const entityId = config.entities[key];

    if (typeof entityId !== "string" || entityId.trim() === "") {
      throw new Error(`Missing entity: entities.${String(key)}`);
    }
  }
}
