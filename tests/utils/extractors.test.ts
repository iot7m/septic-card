import { describe, expect, it } from "vitest";

import type { HassState } from "@/types/hass";

import {
  getCriticalLevel,
  getEntityId,
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

import { ENTITIES, createHass } from "@tests/fixtures";

describe("extractors", () => {
  it("getEntityId adds sensor prefix", () => {
    expect(getEntityId("uroven_zhidkosti_septika")).toBe("sensor.uroven_zhidkosti_septika");
  });

  it("getStateObj returns state object", () => {
    const hass = createHass();
    expect(getStateObj(hass, ENTITIES.level)?.state).toBe("42");
  });

  it("getUnitOfMeasure returns unit", () => {
    const hass = createHass();
    const stateObj = getStateObj(hass, ENTITIES.level);
    expect(getUnitOfMeasure(stateObj)).toBe("%");
  });

  it("getFriendlyName returns friendly_name", () => {
    const state: HassState = {
      state: "42",
      attributes: { friendly_name: "Уровень жидкости септика" },
    };

    expect(getFriendlyName(state, "Fallback")).toBe("Уровень жидкости септика");
  });

  it("getLevelEntityId returns normalized id", () => {
    expect(getLevelEntityId("uroven")).toBe("sensor.uroven");
  });

  it("getLevel returns numeric level", () => {
    const hass = createHass();
    expect(getLevel(hass, ENTITIES.level)).toBe(42);
  });

  it("getCriticalLevel returns numeric critical level", () => {
    const hass = createHass();
    expect(getCriticalLevel(hass, ENTITIES.x_level)).toBe(80);
  });

  it("getTemperature returns raw value", () => {
    const hass = createHass();
    expect(getTemperature(hass, ENTITIES.temp)).toBe(5);
  });

  it("getPressure returns raw value", () => {
    const hass = createHass();
    expect(getPressure(hass, ENTITIES.pressure)).toBe(1010);
  });

  it("getExceedsCritical parses no as false", () => {
    const hass = createHass();
    expect(getExceedsCritical(hass, ENTITIES.exceeds_x_level)).toBe(false);
  });

  it("getErrorName returns null for empty string", () => {
    const hass = createHass();
    expect(getErrorName(hass, ENTITIES.error_name)).toBeNull();
  });
});
