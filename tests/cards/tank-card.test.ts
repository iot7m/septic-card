import { describe, expect, it } from "vitest";

import { localize } from "@/utils/localize";

import { SEPTIC_CARD_DEFAULT_CONFIG, SEPTIC_DEFAULT_CONFIG, TANK_CARD_NAME } from "@/const";

import "@/cards/tank-card";

import { createHassEnvironment } from "@tests/environment";
import { type CardTestElement } from "@tests/types";

describe("tank-card", () => {
  it("renders with default config", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig(SEPTIC_CARD_DEFAULT_CONFIG);
    el.hass = createHassEnvironment();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain(localize("card.entities.pressure", "en"));
    expect(el.shadowRoot!.textContent).toContain(localize("card.entities.temp", "en"));
  });

  it("renders with ru language", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig(SEPTIC_CARD_DEFAULT_CONFIG);
    el.hass = createHassEnvironment();
    el.hass.language = "ru";

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain(localize("card.entities.pressure", "ru"));
    expect(el.shadowRoot!.textContent).toContain(localize("card.entities.temp", "ru"));
  });

  it("renders with custom error_name", async () => {
    const el = document.createElement(TANK_CARD_NAME) as CardTestElement;
    el.setConfig({
      ...SEPTIC_CARD_DEFAULT_CONFIG,
      error_name: {
        ...SEPTIC_CARD_DEFAULT_CONFIG.error_name,
        show: false,
      },
    });
    el.hass = createHassEnvironment();
    el.hass.states[SEPTIC_DEFAULT_CONFIG.entities.error_name] = {
      ...el.hass.states[SEPTIC_DEFAULT_CONFIG.entities.error_name],
      state: "Some error",
      attributes: {},
    };

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Some error");
  });
});
