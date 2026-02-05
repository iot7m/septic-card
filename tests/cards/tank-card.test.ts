import { describe, expect, it } from "vitest";

import { TANK_CARD_NAME } from "@/const";

import "@/cards/tank-card";

import { ENTITIES, createHass } from "@tests/fixtures";
import { type CardTestElement } from "@tests/types";

describe("tank-card", () => {
  it("renders without crashing when hass and default lengauge", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig({
      type: `custom:${TANK_CARD_NAME}`,
      entities: ENTITIES,
    });
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Pressure");
    expect(el.shadowRoot!.textContent).toContain("Temperature");
  });

  it("renders without crashing when hass and lengauge ru", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig({
      type: `custom:${TANK_CARD_NAME}`,
      entities: ENTITIES,
    });
    el.hass = createHass();
    el.hass.language = "ru";
    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Давление");
    expect(el.shadowRoot!.textContent).toContain("Температура");
  });

  it("renders without crashing when hass and config are provided", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig({
      type: `custom:${TANK_CARD_NAME}`,
      entities: ENTITIES,
      header: { show: true, label: "Septic" },
    });
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Septic");
  });

  it("renders without crashing when default config", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig({
      type: `custom:${TANK_CARD_NAME}`,
      entities: ENTITIES,
      temp: { show: true, icon: "mdi:thermometer", label: "Temperature" },
      pressure: { show: true, icon: "mdi:gauge", label: "Pressure" },
    });
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Temperature");
    expect(el.shadowRoot!.textContent).toContain("Pressure");
  });

  it("renders without crashing when error_name config are provided", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig({
      type: `custom:${TANK_CARD_NAME}`,
      entities: ENTITIES,
      error_name: { show: true, label: "Error" },
    });
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Error");
  });
});
