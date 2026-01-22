import { describe, expect, it } from "vitest";

import { GSEPTIK_DIALOG_NAME } from "@/const";

import "@/dialogs/gseptik-dialog";

import { createHass } from "@tests/fixtures";
import type { DialogTestElement } from "@tests/types";

describe("gseptik-dialog", () => {
  it("renders dialog when hass and entity are provided", async () => {
    const el = document.createElement(GSEPTIK_DIALOG_NAME) as DialogTestElement;
    el.entity = "sensor.uroven_zhidkosti_septika";
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
