import { describe, expect, it } from "vitest";

import { TILE_CARD_DEFAULT_CONFIG, TILE_CARD_NAME } from "@/const";

import "@/cards/tile-card";

import { createHass } from "@tests/fixtures";
import { type CardTestElement } from "@tests/types";

describe("tile-card", () => {
  it("renders with default config", async () => {
    const el = document.createElement(TILE_CARD_NAME) as CardTestElement;
    el.setConfig(TILE_CARD_DEFAULT_CONFIG);
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Септик");
  });
});
