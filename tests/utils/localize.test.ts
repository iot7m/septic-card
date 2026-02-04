import { describe, expect, it } from "vitest";

import { getTranslation, localize } from "@/utils/localize";

import en from "@/i18n/en.json";

describe("extractors", () => {
  it("get localize value", () => {
    const result = localize("card.header.title", "en");
    expect(result).toBe("Septic");
  });
  it("returns translation for nested key", () => {
    const result = getTranslation(en, ["card", "header", "title"]);
    expect(result).toBe("Septic");
  });
  it("returns translation for shallow key", () => {
    const result = getTranslation(en, ["card"]);
    expect(result).toBeUndefined();
  });

  it("returns undefined if key does not exist", () => {
    const result = getTranslation(en, ["card", "footer"]);
    expect(result).toBeUndefined();
  });

  it("returns undefined if path goes through a string", () => {
    const result = getTranslation(en, ["card", "header", "title", "extra"]);
    expect(result).toBeUndefined();
  });

  it("returns undefined if final value is not a string", () => {
    const result = getTranslation(en, ["card", "header"]);
    expect(result).toBeUndefined();
  });
});
