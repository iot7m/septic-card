import type { SepticCardConfig } from "@/types/cards";
import { SEPTIC_CONFIG_DEFS } from "@/types/defs";

export function assertAllEntities(config: SepticCardConfig): void {
  if (!config.entities) {
    throw new Error("Missing entities configuration");
  }

  const requiredKeys = Object.keys(SEPTIC_CONFIG_DEFS.entities) as Array<keyof typeof SEPTIC_CONFIG_DEFS.entities>;

  for (const key of requiredKeys) {
    const entityId = config.entities[key];

    if (typeof entityId !== "string" || entityId.trim() === "") {
      throw new Error(`Missing entity: entities.${String(key)}`);
    }
  }
}
