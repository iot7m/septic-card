import { describe, expect, it } from "vitest";

import "@/cistern";

type HassState = { state: string };
type HassLike = { states: Record<string, HassState> };

interface CisternCardElement extends HTMLElement {
  hass?: HassLike;
  setConfig(config: { entity: string }): void;
  updateComplete: Promise<void>;
}

function createHassMock(): HassLike {
  return {
    states: {
      "sensor.uroven_zhidkosti_septika": { state: "42" },
      "sensor.kriticheskii_uroven_septika": { state: "80" },
      "sensor.prevyshen_kriticheskii_uroven_septika": { state: "Нет" },
      "sensor.temperatura_septika": { state: "5" },
      "sensor.davlenie_septika": { state: "1010" },
    },
  };
}

describe("cistern-card", () => {
  it("renders without crashing when hass and config are provided", async () => {
    const el = document.createElement("cistern-card") as CisternCardElement;

    el.hass = createHassMock();
    el.setConfig({ entity: "sensor.uroven_zhidkosti_septika" });

    document.body.appendChild(el);

    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.textContent).toContain("Септик");
  });
});
