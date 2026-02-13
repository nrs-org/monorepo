import { describe, it, expect } from "bun:test";
import { newContext, processContext } from "../src/process";
import { Vector } from "../src/math";
import { ScalarMatrix } from "../src/math";

describe("processContext simple", () => {
  it("runs for a single-entry dataset", async () => {
    const ctx = newContext({
      extensions: {},
      factorScoreCombineWeight: new Vector([1, 1]),
    });
    const entry = { id: "e1", DAH_meta: {} };
    const impact = {
      DAH_meta: {},
      contributors: new Map([["e1", new ScalarMatrix(1)]]),
      score: new Vector([0.5, 0.2]),
    };
    const data = {
      entries: new Map([["e1", entry]]),
      impacts: [impact],
      relations: [],
    };
    const res = await processContext(ctx, data);
    const r = res.get("e1");
    expect(r).toBeDefined();
    expect(r?.overallVector.data.length).toBe(2);
    expect(r?.overallVector.data.every(Number.isFinite)).toBe(true);
  });
});
