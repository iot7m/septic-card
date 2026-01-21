import { describe, expect, it } from "vitest";

import { TILE_CARD_NAME } from "@/const";

import "@/cards/tile-card";

import { ENTITIES, createHassMock } from "@tests/fixtures";
import { type CardTestElement } from "@tests/types";

describe("tile-card", () => {
  it("renders without crashing when hass and config are provided", async () => {
    const el = document.createElement(TILE_CARD_NAME) as CardTestElement;
    el.setConfig({ type: `custom:${TILE_CARD_NAME}`, entities: ENTITIES });
    el.hass = createHassMock();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Септик");
  });
});
