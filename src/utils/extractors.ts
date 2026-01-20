import type { HomeAssistant } from "custom-card-helpers";

/**
 * Normalizes a GSeptik entity identifier to a full Home Assistant `entity_id`.
 *
 * Card configuration may use a shortened form without the `sensor.` prefix
 * for readability. Home Assistant, however, stores all states using full
 * `entity_id`s (e.g. `sensor.uroven_zhidkosti_septika`).
 *
 * This helper allows both forms to be used safely. Accepted inputs:
 * - `"uroven_zhidkosti_septika"` → `"sensor.uroven_zhidkosti_septika"`
 * - `"sensor.uroven_zhidkosti_septika"` → unchanged
 *
 * @param entityId - Entity identifier from card configuration
 * @returns Normalized Home Assistant `entity_id` with `sensor.` prefix
 */
export function toEntityId(entityId: string): string {
  if (entityId.includes("sensor.")) return entityId;
  return `sensor.${entityId}`;
}

/**
 * Liquid level (0–100%)
 */
export function getLevel(hass: HomeAssistant | undefined, entityId: string): number {
  const value = Number(hass?.states[toEntityId(entityId)]?.state);
  return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
}

/**
 * Critical level threshold (0–100%)
 */
export function getCriticalLevel(hass: HomeAssistant | undefined, entityId: string): number {
  const value = Number(hass?.states[toEntityId(entityId)]?.state);
  return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
}

/**
 * Septic temperature (raw number, no clamping)
 */
export function getTemperature(hass: HomeAssistant | undefined, entityId: string): number | null {
  const value = Number(hass?.states[toEntityId(entityId)]?.state);
  return Number.isNaN(value) ? null : value;
}

/**
 * Septic pressure (raw number, no clamping)
 */
export function getPressure(hass: HomeAssistant | undefined, entityId: string): number | null {
  const value = Number(hass?.states[toEntityId(entityId)]?.state);
  return Number.isNaN(value) ? null : value;
}

/**
 * Critical level exceeded flag ("Да" / "Нет")
 */
export function getExceedsCritical(hass: HomeAssistant | undefined, entityId: string): boolean | null {
  const raw = hass?.states[toEntityId(entityId)]?.state;
  if (!raw) return null;

  if (raw === "Да" || raw === "true" || raw === "on") return true;
  if (raw === "Нет" || raw === "false" || raw === "off") return false;
  return null;
}

/**
 * Septic error name / code
 */
export function getErrorName(hass: HomeAssistant | undefined, entityId: string): string | null {
  const value = hass?.states[toEntityId(entityId)]?.state;
  return value && value.length > 0 ? value : null;
}
