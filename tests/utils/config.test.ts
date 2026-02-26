import { describe, expect, it } from "vitest";

import { SepticEntitiesConfig } from "@/types/cards";

import { mergeItem, resolveConfig } from "@/utils/config";

import { SEPTIC_CARD_DEFAULT_CONFIG } from "@/const";

const MOCK_ENTITIES: SepticEntitiesConfig = {
  level: "sensor.level",
  temp: "sensor.temp",
  pressure: "sensor.pressure",
  x_level: "sensor.x_level",
  exceeds_x_level: "sensor.exceeds_x_level",
  error_name: "sensor.error",
  sdt: "sensor.septic_tank_sdt",
};

describe("mergeConfig", () => {
  const defaults = {
    show: true,
    icon: "mdi:test",
    label: "Default",
  };

  const defaultsTankConfig = {
    type: "custom:test",
    entities: MOCK_ENTITIES,
    tank: {
      header: { show: true, label: "Default header" },
      level: { show: true },
      scale: { position: "middle" as const },
    },
    level: { show: true, icon: "", label: "" },
    temp: { show: true, icon: "", label: "" },
    pressure: { show: true, icon: "", label: "" },
    x_level: { show: true, icon: "", label: "" },
    exceeds_x_level: { show: true, icon: "", label: "" },
    sdt: { show: true, icon: "", label: "" },
    error_name: { show: true, icon: "", label: "" },
  };

  it("returns defaults when value is undefined", () => {
    const result = mergeItem(undefined, defaults);
    expect(result).toEqual(defaults);
  });

  it("overrides provided fields", () => {
    const result = mergeItem({ show: false }, defaults);
    expect(result).toEqual({
      show: false,
      icon: "mdi:test",
      label: "Default",
    });
  });

  it("overrides all fields", () => {
    const result = mergeItem({ show: false, icon: "mdi:new", label: "Custom" }, defaults);

    expect(result).toEqual({
      show: false,
      icon: "mdi:new",
      label: "Custom",
    });
  });

  it("uses defaults when tank is undefined", () => {
    const result = resolveConfig({ type: "x", entities: MOCK_ENTITIES }, defaultsTankConfig);
    expect(result.tank).toEqual(defaultsTankConfig.tank);
  });

  it("overrides nested tank values", () => {
    const result = resolveConfig(
      {
        type: "x",
        entities: MOCK_ENTITIES,
        tank: { header: { show: false } },
      },
      defaultsTankConfig,
    );

    expect(result.tank?.header?.show).toBe(false);
  });

  it("returns fully resolved config", () => {
    const result = resolveConfig({ type: "custom:test", entities: MOCK_ENTITIES }, SEPTIC_CARD_DEFAULT_CONFIG);

    expect(result.entities.level).toBe("sensor.level");
    expect(result.type).toBe("custom:test");
    expect(result.level?.show).toBeDefined();
    expect(result.tank?.header?.label).toBeDefined();
  });
});
