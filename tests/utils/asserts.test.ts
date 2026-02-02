import { describe, expect, it } from "vitest";

import type { SepticCardConfig } from "@/types/cards";

import { assertAllEntities } from "@/utils/asserts";

import { SEPTIC_CARD_DEFAULT_CONFIG } from "@/const";

import { ENTITIES } from "@tests/fixtures";

describe("assertAllEntities", () => {
  it("does not throw when all required entities are present", () => {
    const config: SepticCardConfig = {
      type: "custom:test-card",
      entities: { ...ENTITIES },
    };

    expect(() => assertAllEntities(config)).not.toThrow();
  });

  it("throws with a clear message when a required entity is missing", () => {
    const missingKey = Object.keys(SEPTIC_CARD_DEFAULT_CONFIG.entities)[0];
    const entities: Record<string, string> = { ...ENTITIES };
    delete entities[missingKey];

    const config: SepticCardConfig = {
      type: "custom:test-card",
      entities: entities as unknown as SepticCardConfig["entities"],
    };

    expect(() => assertAllEntities(config)).toThrowError(`Missing entity: entities.${missingKey}`);
  });
});
