import { describe, it, expect } from "bun:test";
import { makeEntryMeta, makeImpactMeta } from "../src/meta-helpers";
import { newContext, processContext } from "../src/process";
import { Vector } from "../src/math";
import { ScalarMatrix } from "../src/math";
import type { Extension } from "../src/extension";

describe("processContext simple", () => {
  it("runs for a single-entry dataset", async () => {
    const ctx = newContext({
      factorScoreCombineWeight: new Vector([1, 1]),
    });
    const entry = { id: "e1", DAH_meta: makeEntryMeta() };
    const impact = {
      DAH_meta: makeImpactMeta(),
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

  it("newContext uses getFactorScoreWeights from an extension (covers lines 74-79, 240-242)", () => {
    // An extension that provides getFactorScoreWeights — this exercises the
    // runExtensionHooksSync inner body (lines 240-242) and the
    // getFactorScoreWeights hook body (lines 74-79) in process.ts.
    const weights = new Vector([2, 3]);
    const ext: Extension = {
      name: "test_weight_ext",
      getFactorScoreWeights() {
        return weights;
      },
    };
    const ctx = newContext({ extensions: [ext] });
    expect(ctx.factorScoreCombineWeight).toBe(weights);
  });
});
