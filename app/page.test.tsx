import { describe, expect, test } from "@jest/globals";
import { normaliseUuid, normaliseVolume } from "./lib/validation";

describe("UUID personal keys", () => {
  test("normalises a complete UUID", () => {
    expect(normaliseUuid(" 01999C2A-55A7-76F0-A6BB-68DB6BAFA9C4 ")).toBe(
      "01999c2a-55a7-76f0-a6bb-68db6bafa9c4",
    );
  });

  test.each(["", "not-a-key", "01999c2a55a776f0a6bb68db6bafa9c4"])(
    "rejects an invalid key: %s",
    (key) => expect(normaliseUuid(key)).toBeNull(),
  );
});

describe("water amounts", () => {
  test.each([1, 250, "500", 5000])("accepts a valid amount: %s", (amount) => {
    expect(normaliseVolume(amount)).toBe(Number(amount));
  });

  test.each([0, -1, 5001, Number.NaN, "water"])("rejects an invalid amount: %s", (amount) => {
    expect(normaliseVolume(amount)).toBeNull();
  });
});
