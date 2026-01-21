import { describe, expect, it } from "vitest";

import "@/const";
import { TILE_CARD_NAME } from "@/const";

import "@/cards/tile-card";

import { ENTITIES, type LovelaceTestElement, createHassMock } from "@tests/hass";

describe("tile-card", () => {
  it("renders without crashing when hass and config are provided", async () => {
    const el = document.createElement(TILE_CARD_NAME) as LovelaceTestElement;
    el.setConfig({ entities: ENTITIES });
    el.hass = createHassMock();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Септик");
  });
});
