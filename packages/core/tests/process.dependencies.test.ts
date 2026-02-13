import { describe, it, expect } from "bun:test";
import { type Extension, newContext, Vector } from "../index";

describe("processContext extension dependencies", () => {
  it("throws when an extension dependency is not found", () => {
    const ext = {
      dependencies: () => ["missing"],
    } satisfies Extension;

    expect(() =>
      newContext({
        factorScoreCombineWeight: new Vector([1, 1]),
        extensions: { a: ext },
      }),
    ).toThrow(/extension dependency "missing" of "a" not found/);
  });

  it("allows dependency on implicit extensions", () => {
    const ext = {
      dependencies: () => ["DAH_meta"],
    } satisfies Extension;

    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
      extensions: { x: ext },
    });

    expect(ctx).toBeDefined();
  });
});
