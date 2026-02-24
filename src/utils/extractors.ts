import type { HomeAssistant } from "custom-card-helpers";

import type { HassState } from "@/types/hass";

/**
 * Returns a state object (`hass.states[entity_id]`) for the given configured entity id.
 *
 * This is the single access point to Home Assistant state in the extractor layer.
 *
 * @param hass - Home Assistant instance (may be undefined during init)
 * @param entityId - Entity id from card config (short or full)
 * @returns State object or undefined if missing
 */
export function getStateObj(hass: HomeAssistant | undefined, entityId: string): HassState | undefined {
  return hass?.states?.[entityId] as HassState | undefined;
}

/**
 * Extracts `unit_of_measurement` from a Home Assistant state object.
 *
 * @param stateObj - State object from `hass.states`
 * @returns Unit string (e.g. "%", "°C") or empty string when missing/invalid
 */
export function getUnitOfMeasure(stateObj: HassState | undefined): string {
  const uom = stateObj?.attributes?.unit_of_measurement;
  return typeof uom === "string" ? uom : "";
}

/**
 * Extracts `friendly_name` from a Home Assistant state object with a fallback.
 *
 * @param stateObj - State object from `hass.states`
 * @param fallback - Default label when `friendly_name` is missing/invalid
 * @returns Human-readable entity name
 */
export function getFriendlyName(stateObj: HassState | undefined, fallback: string): string {
  const name = stateObj?.attributes?.friendly_name;
  return typeof name === "string" ? name : fallback;
}

/**
 * The function exists to make call sites self-documenting
 * (e.g. open more-info for "level" specifically).
 *
 * @param entityId - Entity id from card config (short or full)
 * @returns Normalized `sensor.*` entity_id
 */
export function getLevelEntityId(entityId: string): string {
  return entityId;
}

/**
 * Returns liquid level as a percentage clamped to 0..100.
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity id from card config (short or full)
 * @returns 0..100 (returns 0 when state is not numeric)
 */
export function getLevel(hass: HomeAssistant | undefined, entityId: string): number {
  const value = Number(getStateObj(hass, entityId)?.state);
  return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
}

/**
 * Returns critical level threshold as a percentage clamped to 0..100.
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity id from card config (short or full)
 * @returns 0..100 (returns 0 when state is not numeric)
 */
export function getCriticalLevel(hass: HomeAssistant | undefined, entityId: string): number {
  const value = Number(getStateObj(hass, entityId)?.state);
  return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
}

/**
 * Returns septic temperature as a raw number.
 *
 * No clamping is applied; invalid/non-numeric state returns null.
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity id from card config (short or full)
 * @returns Temperature value or null when invalid
 */
export function getTemperature(hass: HomeAssistant | undefined, entityId: string): number | null {
  const value = Number(getStateObj(hass, entityId)?.state);
  return Number.isNaN(value) ? null : value;
}

/**
 * Returns septic pressure as a raw number.
 *
 * No clamping is applied; invalid/non-numeric state returns null.
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity id from card config (short or full)
 * @returns Pressure value or null when invalid
 */
export function getPressure(hass: HomeAssistant | undefined, entityId: string): number | null {
  const value = Number(getStateObj(hass, entityId)?.state);
  return Number.isNaN(value) ? null : value;
}

/**
 * Parses a critical-level-exceeded flag from a textual entity state.
 *
 * Supported truthy values: "Да", "true", "on"
 * Supported falsy values:  "Нет", "false", "off"
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity id from card config (short or full)
 * @returns true/false when recognized, otherwise null
 */
export function getExceedsCritical(hass: HomeAssistant | undefined, entityId: string): boolean | null {
  const raw = getStateObj(hass, entityId)?.state.toLowerCase();
  if (!raw) return null;

  if (raw === "on") return true;
  if (raw === "off") return false;
  return null;
}

/**
 * Returns an error name/code from an entity state as a non-empty string.
 *
 * @param hass - Home Assistant instance
 * @param entityId - Entity id from card config (short or full)
 * @returns Error string or null when empty/missing
 */
export function getErrorName(hass: HomeAssistant | undefined, entityId: string): string | null {
  const value = getStateObj(hass, entityId)?.state;
  return value && value.length > 0 ? value : null;
}
