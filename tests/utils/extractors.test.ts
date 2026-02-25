import { describe, expect, it } from "vitest";

import {
  getCriticalLevel,
  getErrorName,
  getExceedsCritical,
  getFriendlyName,
  getLevel,
  getLevelEntityId,
  getPressure,
  getStateObj,
  getTemperature,
  getUnitOfMeasure,
} from "@/utils/extractors";

import { SEPTIC_CARD_DEFAULT_CONFIG } from "@/const";

import { createEntity, createHassEnvironment } from "@tests/environment";

describe("extractors", () => {
  it("getStateObj returns state object", () => {
    const hass = createHassEnvironment();
    expect(getStateObj(hass, SEPTIC_CARD_DEFAULT_CONFIG.entities.level)?.state).toBe("42");
  });

  it("getUnitOfMeasure returns unit", () => {
    const hass = createHassEnvironment();
    const stateObj = getStateObj(hass, SEPTIC_CARD_DEFAULT_CONFIG.entities.level);
    expect(getUnitOfMeasure(stateObj)).toBe("%");
  });

  it("getFriendlyName returns friendly_name", () => {
    const state = createEntity("sensor.test", "42", { friendly_name: "Liquid level" });

    expect(getFriendlyName(state, "Fallback")).toBe("Liquid level");
  });

  it("getLevelEntityId returns normalized id", () => {
    expect(getLevelEntityId("sensor.septic_tank_liquid_level")).toBe("sensor.septic_tank_liquid_level");
  });

  it("getLevel returns numeric level", () => {
    const hass = createHassEnvironment();
    expect(getLevel(hass, SEPTIC_CARD_DEFAULT_CONFIG.entities.level)).toBe(42);
  });

  it("getCriticalLevel returns numeric critical level", () => {
    const hass = createHassEnvironment();
    expect(getCriticalLevel(hass, SEPTIC_CARD_DEFAULT_CONFIG.entities.x_level)).toBe(80);
  });

  it("getTemperature returns raw value", () => {
    const hass = createHassEnvironment();
    expect(getTemperature(hass, SEPTIC_CARD_DEFAULT_CONFIG.entities.temp)).toBe(5);
  });

  it("getPressure returns raw value", () => {
    const hass = createHassEnvironment();
    expect(getPressure(hass, SEPTIC_CARD_DEFAULT_CONFIG.entities.pressure)).toBe(1010);
  });

  it("getExceedsCritical parses no as false", () => {
    const hass = createHassEnvironment();
    expect(getExceedsCritical(hass, SEPTIC_CARD_DEFAULT_CONFIG.entities.exceeds_x_level)).toBe(false);
  });

  it("getErrorName returns null for empty string", () => {
    const hass = createHassEnvironment();
    expect(getErrorName(hass, SEPTIC_CARD_DEFAULT_CONFIG.entities.error_name)).toBeNull();
  });
});
