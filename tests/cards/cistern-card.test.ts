import { describe, expect, it } from "vitest";

import { CISTERN_CARD_NAME } from "@/const";

import "@/cards/cistern-card";

import { ENTITIES, createHass } from "@tests/fixtures";
import { type CardTestElement } from "@tests/types";

describe("cistern-card", () => {
  it("renders without crashing when hass and config are provided", async () => {
    const el = document.createElement(CISTERN_CARD_NAME) as CardTestElement;
    el.setConfig({
      type: `custom:${CISTERN_CARD_NAME}`,
      entities: ENTITIES,
      header: { show: true, label: "Septic" },
    });
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Septic");
  });

  it("renders without crashing when error_name config are provided", async () => {
    const el = document.createElement(CISTERN_CARD_NAME) as CardTestElement;
    el.setConfig({
      type: `custom:${CISTERN_CARD_NAME}`,
      entities: ENTITIES,
      error_name: { show: true, label: "Error" },
    });
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Error");
  });

  it("renders without crashing when default config", async () => {
    const el = document.createElement(CISTERN_CARD_NAME) as CardTestElement;
    el.setConfig({
      type: `custom:${CISTERN_CARD_NAME}`,
      entities: ENTITIES,
    });
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Temperature");
    expect(el.shadowRoot!.textContent).toContain("Pressure");
  });
});
