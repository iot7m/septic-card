import type { HomeAssistant } from "custom-card-helpers";

/**
 * Normalizes a GSeptik entity identifier to a full Home Assistant `entity_id`.
 *
 * GSeptik cards support a shortened entity notation in the card configuration,
 * where the `sensor.` prefix can be omitted for readability.
 *
 * The card YAML configuration typically looks like this:
 *
 * ```yaml
 * - type: custom:gseptik-cistern-card
 *   entities:
 *     level: uroven_zhidkosti_septika
 *     temp: temperatura_septika
 *     pressure: davlenie_septika
 *     x_level: kriticheskii_uroven_septika
 *     exceeds_x_level: prevyshen_kriticheskii_uroven_septika
 *     error_name: oshibka_septika
 * ```
 *
 * Internally, Home Assistant stores all states using full `entity_id`s
 * such as `sensor.uroven_zhidkosti_septika`. This helper ensures that both
 * full and short forms are supported.
 *
 * Accepted inputs:
 * - `"uroven_zhidkosti_septika"` → `"sensor.uroven_zhidkosti_septika"`
 * - `"sensor.uroven_zhidkosti_septika"` → unchanged
 *
 * @param entityId - Entity identifier from card configuration (with or without `sensor.` prefix)
 * @returns Normalized Home Assistant entity_id with `sensor.` prefix
 */
function toEntityId(entityId: string): string {
  if (entityId.includes("sensor.")) return entityId;
  return `sensor.${entityId}`;
}

export function getLevel(hass: HomeAssistant | undefined, entityId: string): number {
  const value = Number(hass?.states[toEntityId(entityId)]?.state);
  return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
}

export function getCriticalLevel(hass: HomeAssistant | undefined, entityId: string): number {
  const value = Number(hass?.states[toEntityId(entityId)]?.state);
  return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
}
