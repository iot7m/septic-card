import { describe, expect, it } from "vitest";

import type { GSeptikCardConfig } from "@/types/cards";
import { GSEPTIK_ENTITY_DEFS } from "@/types/defs";

import { assertAllEntities } from "@/utils/asserts";

import { ENTITIES } from "@tests/fixtures";

describe("assertAllEntities", () => {
  it("does not throw when all required entities are present", () => {
    const config: GSeptikCardConfig = {
      type: "custom:test-card",
      entities: { ...ENTITIES },
    };

    expect(() => assertAllEntities(config)).not.toThrow();
  });

  it("throws with a clear message when a required entity is missing", () => {
    const missingKey = GSEPTIK_ENTITY_DEFS[0].key;
    const entities: Record<string, string> = { ...ENTITIES };
    delete entities[missingKey];

    const config: GSeptikCardConfig = {
      type: "custom:test-card",
      entities: entities as unknown as GSeptikCardConfig["entities"],
    };

    expect(() => assertAllEntities(config)).toThrowError(`Missing entity: entities.${missingKey}`);
  });
});
