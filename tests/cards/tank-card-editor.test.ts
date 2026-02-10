import { describe, expect, it } from "vitest";

import { SEPTIC_CARD_DEFAULT_CONFIG, TANK_CARD_EDITOR_NAME } from "@/const";

import "@/cards/tank-card-editor";

import { createHass } from "@tests/fixtures";
import { type CardEditorTestElement } from "@tests/types";

describe("tank-card-editor", () => {
  it("renders ha-form when hass and config are provided", async () => {
    const el = document.createElement(TANK_CARD_EDITOR_NAME) as CardEditorTestElement;
    el.setConfig(SEPTIC_CARD_DEFAULT_CONFIG);
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.querySelector("ha-form")).toBeTruthy();
  });
});
