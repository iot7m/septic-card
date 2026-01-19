import type { HomeAssistant } from "custom-card-helpers";

export function getLevel(hass: HomeAssistant | undefined) {
  const value = Number(hass?.states["sensor.uroven_zhidkosti_septika"]?.state);
  return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
}

export function getCriticalLevel(hass: HomeAssistant | undefined) {
  const value = Number(hass?.states["sensor.kriticheskii_uroven_septika"]?.state);
  return Number.isNaN(value) ? 0 : Math.min(Math.max(value, 0), 100);
}
