import { describe, expect, it } from "vitest";

import "@/const";
import { CISTERN_CARD_NAME } from "@/const";

import "@/cards/cistern-card";

import { ENTITIES, type LovelaceTestElement, createHassMock } from "@tests/hass";

describe("cistern-card", () => {
  it("renders without crashing when hass and config are provided", async () => {
    const el = document.createElement(CISTERN_CARD_NAME) as LovelaceTestElement;
    el.setConfig({ entities: ENTITIES });
    el.hass = createHassMock();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Септик");
  });
});
