import { describe, expect, it } from "vitest";

import "@/cards/tank";

import { type LovelaceTestElement, createHassMock } from "@tests/hass";

describe("tank-card", () => {
  it("renders without crashing when hass and config are provided", async () => {
    const el = document.createElement("gseptik-tank-card") as LovelaceTestElement;
    el.hass = createHassMock();
    el.setConfig({ entity: "sensor.uroven_zhidkosti_septika" });

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Септик");
  });
});
