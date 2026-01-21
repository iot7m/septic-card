import { describe, expect, it } from "vitest";

import { CISTERN_CARD_EDITOR_NAME, CISTERN_CARD_NAME } from "@/const";

import "@/cards/cistern-card-editor";

import { ENTITIES, createHassMock } from "@tests/fixtures";
import { type CardEditorTestElement } from "@tests/types";

describe("cistern-card-editor", () => {
  it("renders ha-form when hass and config are provided", async () => {
    const el = document.createElement(CISTERN_CARD_EDITOR_NAME) as CardEditorTestElement;
    el.setConfig({ type: `custom:${CISTERN_CARD_NAME}`, entities: ENTITIES });
    el.hass = createHassMock();

    document.body.appendChild(el);
    await el.updateComplete;

    expect(el.shadowRoot).toBeTruthy();
    expect(el.shadowRoot!.querySelector("ha-form")).toBeTruthy();
  });
});
