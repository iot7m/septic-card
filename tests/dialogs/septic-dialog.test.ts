import { describe, expect, it } from "vitest";

import { SEPTIC_DIALOG_NAME } from "@/const";

import "@/dialogs/tank-dialog";

import { createHass } from "@tests/fixtures";
import type { DialogTestElement } from "@tests/types";

describe("septic-dialog", () => {
  it("renders with default config", async () => {
    const el = document.createElement(SEPTIC_DIALOG_NAME) as DialogTestElement;
    el.entity = "sensor.septic_tank_liquid_level";
    el.hass = createHass();

    document.body.appendChild(el);
    await el.updateComplete;

    const root = el.shadowRoot;
    expect(root).toBeTruthy();

    const dialog = root!.querySelector("ha-dialog");
    expect(dialog).not.toBeNull();
    expect(dialog!.getAttribute("heading")).toBe("Септик");
  });
});
