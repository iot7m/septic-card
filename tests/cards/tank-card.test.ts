import { describe, expect, it } from "vitest";

import { SEPTIC_CARD_DEFAULT_CONFIG, TANK_CARD_NAME } from "@/const";

import "@/cards/tank-card";

import { createHass } from "@tests/fixtures";
import { type CardTestElement } from "@tests/types";

describe("tank-card", () => {
  it("renders without crashing when hass and default language", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig(SEPTIC_CARD_DEFAULT_CONFIG);
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Pressure");
    expect(el.shadowRoot!.textContent).toContain("Temperature");
  });

  it("renders without crashing when hass and language ru", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig(SEPTIC_CARD_DEFAULT_CONFIG);
    el.hass = createHass();
    el.hass.language = "ru";

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Давление");
    expect(el.shadowRoot!.textContent).toContain("Температура");
  });

  it("renders without crashing when error_name config are provided", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig({
      ...SEPTIC_CARD_DEFAULT_CONFIG,
      error_name: {
        ...SEPTIC_CARD_DEFAULT_CONFIG.error_name,
        show: true,
        label: "Error",
      },
    });
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Error");
  });
});
