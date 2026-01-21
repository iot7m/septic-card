import { describe, expect, it } from "vitest";

import "@/cards/cistern-card";

import { ENTITIES, type LovelaceTestElement, createHassMock } from "@tests/hass";

describe("cistern-card", () => {
  it("renders without crashing when hass and config are provided", async () => {
    const el = document.createElement("gseptik-cistern-card") as LovelaceTestElement;
    el.hass = createHassMock();
    el.setConfig({ entities: ENTITIES });

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Септик");
  });
});
